import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase in the API route
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessId } = body;

    if (!businessId) {
      return NextResponse.json({ error: 'businessId is required' }, { status: 400 });
    }

    let businessContext = null;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      // 1. Fetch Business Data
      const { data: business } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .single();

      // 2. Fetch Pending Invoices
      const { data: invoices } = await supabase
        .from('invoices')
        .select('*')
        .eq('business_id', businessId)
        .eq('status', 'unpaid');

      // 3. Fetch Pending Transactions
      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('business_id', businessId)
        .eq('status', 'pending');

      businessContext = {
        business,
        invoices,
        transactions
      };
    } else {
      console.warn("Supabase credentials missing. Bypassing database fetch for prototype mock mode.");
    }

    // 4. Send to n8n Webhook for AI Analysis 
    // (If webhook is not set up, we return the mock AI response for prototype continuity)
    if (n8nWebhookUrl) {
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(businessContext)
      });

      if (!n8nResponse.ok) {
        throw new Error('Failed to reach n8n webhook');
      }

      const aiAnalysis = await n8nResponse.json();
      return NextResponse.json({ success: true, ai_response: aiAnalysis });
    }

    // Mock response if n8n is not hooked up yet, simulating both predictive and resolution agents.
    console.warn("n8n Webhook not configured. Returning mock AI analysis.");
    
    // Calculate the gap to happen in exactly 45 days from today
    const drySpellDate = new Date();
    drySpellDate.setDate(drySpellDate.getDate() + 45);

    const mockAiPayload = {
      prediction: {
        dry_spell_detected: true,
        dry_spell_date: drySpellDate.toISOString().split('T')[0],
        lowest_balance_projected: -10500.00,
        primary_cause: "A $30,000 quarterly tax payment combined with $15,000 payroll drains the remaining balance before the $48,000 Wayne Enterprises invoice clears 10 days later."
      },
      resolutions: [
        {
          id: "opt_1",
          type: "factoring",
          title: "Factor Invoice #INV-2046",
          description: "Advance $48,000 from Wayne Enterprises today. Eliminates the Day 45 gap and instantly shores up reserves.",
          fee_amount: 1440.00,
          net_payout: 46560.00,
          action_text: "Accept Factoring"
        },
        {
          id: "opt_2",
          type: "loan",
          title: "30-Day Bridge Loan",
          description: "Receive $15,000 immediately to cover the specific deficit. Repayment triggered when Stark Industries clears.",
          fee_amount: 600.00,
          net_payout: 15000.00,
          action_text: "Accept Bridge Loan"
        }
      ]
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, is_mock: true, ai_response: mockAiPayload });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
