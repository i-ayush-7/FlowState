'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Search, Filter, Download } from 'lucide-react';
import clsx from 'clsx';

const mockTransactions = [
  { id: 'tx_1', date: 'May 15, 2024', description: 'Wayne Enterprises Invoice #INV-2046', category: 'Revenue', amount: 48000.00, status: 'Pending' },
  { id: 'tx_2', date: 'May 10, 2024', description: 'Stark Industries Invoice #INV-2045', category: 'Revenue', amount: 12000.00, status: 'Completed' },
  { id: 'tx_3', date: 'May 05, 2024', description: 'Quarterly Tax Payment', category: 'Taxes', amount: -30000.00, status: 'Scheduled' },
  { id: 'tx_4', date: 'May 01, 2024', description: 'Payroll Run 1', category: 'Payroll', amount: -15000.00, status: 'Completed' },
  { id: 'tx_5', date: 'Apr 28, 2024', description: 'AWS Hosting', category: 'Software', amount: -1250.00, status: 'Completed' },
  { id: 'tx_6', date: 'Apr 25, 2024', description: 'WeWork Office Rent', category: 'Rent', amount: -6500.00, status: 'Completed' },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Transactions Ledger</h1>
          <p className="text-zinc-400 text-sm mt-1">Review historical payments, invoices, and scheduled outflows.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/50">
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Description</th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Amount</th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4 text-sm text-zinc-300 whitespace-nowrap">{tx.date}</td>
                  <td className="p-4 text-sm font-medium text-white">{tx.description}</td>
                  <td className="p-4 text-sm">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800 text-zinc-300">
                      {tx.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-semibold text-right whitespace-nowrap">
                    <span className={clsx("flex items-center justify-end gap-1", tx.amount > 0 ? "text-emerald-400" : "text-white")}>
                      {tx.amount > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} className="text-red-400" />}
                      ${Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    <span className={clsx(
                      "px-2.5 py-1 rounded-md text-xs font-medium border",
                      tx.status === 'Completed' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                      tx.status === 'Pending' ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                      "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                    )}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
