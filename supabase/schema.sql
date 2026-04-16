-- Supabase SQL Schema for FlowState Phase 2
-- Run this in your Supabase SQL Editor

-- 1. Businesses Table (The Micro-SME Users)
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    current_balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Invoices Table (Incoming funds expected)
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    invoice_number VARCHAR(100) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid', 'overdue', 'factored')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Transactions Table (Historical and Pending outbound/inbound)
-- Note: 'pending' transactions act like forecasted bills/payroll
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL, -- negative for outflows, positive for inflows
    transaction_date DATE NOT NULL,
    type VARCHAR(50) CHECK (type IN ('payroll', 'rent', 'equipment', 'revenue', 'loan', 'software', 'misc')),
    status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a Mock Business directly for testing
INSERT INTO businesses (company_name, current_balance) 
VALUES ('Acme Design Studio', 45000.00);
