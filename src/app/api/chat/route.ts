import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';

import fs from 'fs';
import path from 'path';

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
let apiKey = process.env.GEMINI_API_KEY || '';

// The dynamic read happens inside POST to ensure fresh grabs

export async function POST(request: Request) {
  // Fallback to read directly from .env.local if the server hasn't been restarted recently
  try {
    if (!apiKey || !supabaseUrl) {
      const envPath = path.resolve(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
          if (line.startsWith('GEMINI_API_KEY=')) apiKey = line.split('=')[1].replace(/"/g, '').trim();
          if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].replace(/"/g, '').trim();
          if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].replace(/"/g, '').trim();
        });
      }
    }
  } catch (e) {}

  // Initialize GenAI inside the handler to ensure it captures the dynamically loaded API key
  const ai = new GoogleGenAI({ apiKey });

  try {
    const { message, businessId = 'mock-uuid-for-demo' } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API Key missing' }, { status: 500 });
    }

    let businessContext = null;

    // Fetch from Supabase exactly like our main logic
    if (supabaseUrl && supabaseKey && businessId !== 'mock-uuid-for-demo') {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data: business } = await supabase.from('businesses').select('*').eq('id', businessId).single();
      const { data: invoices } = await supabase.from('invoices').select('*').eq('business_id', businessId).eq('status', 'unpaid');
      const { data: transactions } = await supabase.from('transactions').select('*').eq('business_id', businessId).eq('status', 'pending');

      businessContext = { business, invoices, transactions };
    } else {
      // Fallback mock context if Supabase is bypassed
      businessContext = {
        business: { company_name: "Admin", current_balance: 125000 },
        invoices: [{ invoice_number: 'INV-2046', client_name: 'Wayne Enterprises', amount: 48000.00, due_date: 'In 55 days', status: 'unpaid' }],
        transactions: [
             { description: 'Quarterly Tax Payment', amount: -30000.00, due: 'In 45 days' },
             { description: 'Payroll Run 2', amount: -15000.00, due: 'In 50 days' }
        ]
      };
    }

    // System prompt enriched by live database state
    const systemPrompt = `
You are the FlowState AI Copilot. You are an expert financial advisor for small businesses.
The user is talking to you from their FlowState dashboard. 

Here is their LIVE CURRENT FINANCIAL SNAPSHOT directly from the database:
------------------------------------------
Company Name: ${businessContext.business?.company_name || 'Unknown'}
Current Bank Balance: $${businessContext.business?.current_balance?.toLocaleString() || '0'}
Unpaid Invoices (Inflows): ${JSON.stringify(businessContext.invoices)}
Pending Bills/Transactions (Outflows): ${JSON.stringify(businessContext.transactions)}
------------------------------------------

Instructions:
1. Answer their specific question accurately based on this data.
2. Be professional, concise, empathetic, and extremely helpful.
3. If they ask about affording something, do the math: look at their balance, subtract pending bills, and add arriving invoices (if any arrive before the bill).
4. FlowState's primary value is detecting "Dry Spells" and proposing Micro-Loans / Factoring. If they risk dropping below zero, proactively recommend our services.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: message }] }
        ],
        config: {
            systemInstruction: systemPrompt,
            temperature: 0.2
        }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
