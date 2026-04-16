// scripts/seed.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup env variables from .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Requires service role for seeding

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local!");
  console.error("Please add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log('🌱 Starting database seeding...');

  try {
    // 1. Create or ensure we have our test business
    const { data: businessData, error: businessError } = await supabase
      .from('businesses')
      .insert({
        company_name: 'Admin',
        current_balance: 45000.00
      })
      .select('id')
      .single();

    if (businessError) throw businessError;
    const businessId = businessData.id;
    console.log(`✅ Created Business: Admin (${businessId})`);

    // Helper to get future dates
    const getFutureDate = (days) => {
      const d = new Date();
      d.setDate(d.getDate() + days);
      return d.toISOString().split('T')[0];
    };

    // 2. Generate Pending Transactions (The Outflows)
    // We aim to drain the balance of $45k by day 45.
    const transactions = [
      { business_id: businessId, description: 'Payroll Run 1', amount: -15000.00, transaction_date: getFutureDate(15), type: 'payroll', status: 'pending' },
      { business_id: businessId, description: 'Office Rent', amount: -6500.00, transaction_date: getFutureDate(30), type: 'rent', status: 'pending' },
      { business_id: businessId, description: 'Freelancer Fees', amount: -4000.00, transaction_date: getFutureDate(35), type: 'misc', status: 'pending' },
      // THE CRITICAL GAP: Day 45 massive outflow causing negative balance (~-$10,500 deficit)
      { business_id: businessId, description: 'Quarterly Tax Payment', amount: -30000.00, transaction_date: getFutureDate(45), type: 'misc', status: 'pending' },
      { business_id: businessId, description: 'Payroll Run 2', amount: -15000.00, transaction_date: getFutureDate(50), type: 'payroll', status: 'pending' }
    ];

    const { error: txError } = await supabase.from('transactions').insert(transactions);
    if (txError) throw txError;
    console.log(`✅ Seeded ${transactions.length} pending transactions.`);

    // 3. Generate Invoices (The Inflows that are arriving too late)
    const invoices = [
      { business_id: businessId, invoice_number: 'INV-2045', client_name: 'Stark Industries', amount: 12000.00, due_date: getFutureDate(10), status: 'unpaid' },
      // This massive invoice would save them, but it's on net-60 terms and arrives Day 55 (Too late for the Day 45 tax/payroll hit!)
      { business_id: businessId, invoice_number: 'INV-2046', client_name: 'Wayne Enterprises', amount: 48000.00, due_date: getFutureDate(55), status: 'unpaid' }
    ];

    const { error: invError } = await supabase.from('invoices').insert(invoices);
    if (invError) throw invError;
    console.log(`✅ Seeded ${invoices.length} outstanding invoices.`);

    console.log('🎉 Seeding complete! The 45-day dry spell scenario is ready for AI prediction.');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  }
}

seedData();
