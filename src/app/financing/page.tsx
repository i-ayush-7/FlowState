'use client';

import React from 'react';
import { Wallet, ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react';

const mockOffers = [
  { id: 'off_1', type: 'Invoice Factoring', rate: '2.5%', max: '$50,000', term: 'Net-60 Match', status: 'Pre-Approved', partner: 'Stripe Capital' },
  { id: 'off_2', type: 'Short-term Bridge', rate: '4.9%', max: '$25,000', term: '30 Days', status: 'Pre-Approved', partner: 'Brex' },
  { id: 'off_3', type: 'Revenue Advance', rate: '6.0%', max: '$100,000', term: '12 Months', status: 'Needs Review', partner: 'Clearco' }
];

export default function FinancingPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Financing Options</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage active capital or explore new pre-approved credit lines.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20">
          <Wallet size={16} /> Link Bank Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Capital */}
        <div className="bg-gradient-to-br from-indigo-950/40 to-zinc-950 border border-indigo-500/30 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Active Credit Line</h2>
              <p className="text-zinc-400 text-sm">FlowState Premium Tier</p>
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-sm text-zinc-400 font-medium tracking-wide uppercase">Available Draw</p>
            <p className="text-3xl font-semibold text-white mt-1">$75,000.00</p>
          </div>
          <div className="mt-8 flex gap-3 relative z-10">
            <button className="flex-1 bg-white text-black font-medium py-3 rounded-xl hover:bg-zinc-200 transition">Draw Funds</button>
            <button className="flex-1 bg-zinc-800 text-white font-medium py-3 rounded-xl hover:bg-zinc-700 transition">Make Payment</button>
          </div>
        </div>

        {/* Factoring Widget */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
           <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Invoice Factoring</h2>
                <p className="text-zinc-400 text-sm">Clear outstanding balances instantly</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              FlowState predicts $60,000 in outstanding unpaid invoices over the next 30 days. You have two eligible invoices ready for immediate advance.
            </p>
           </div>
           <button className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-xl transition">
             Factor Invoices
           </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Marketplace Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockOffers.map(offer => (
             <div key={offer.id} className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition">
               <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 px-2.5 py-1 rounded-md">
                    {offer.type}
                  </span>
                  {offer.status === 'Pre-Approved' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
               </div>
               <h3 className="text-white font-medium text-lg mb-1">{offer.partner}</h3>
               <div className="space-y-2 mt-4 text-sm">
                 <div className="flex justify-between text-zinc-400">
                    <span>Limit</span>
                    <span className="text-white font-medium">{offer.max}</span>
                 </div>
                 <div className="flex justify-between text-zinc-400">
                    <span>Rate</span>
                    <span className="text-white font-medium">{offer.rate}</span>
                 </div>
                 <div className="flex justify-between text-zinc-400">
                    <span>Term</span>
                    <span className="text-white font-medium">{offer.term}</span>
                 </div>
               </div>
               <button className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium py-2 rounded-lg transition">
                 View Details
               </button>
             </div>
          ))}
        </div>
      </div>

    </div>
  );
}
