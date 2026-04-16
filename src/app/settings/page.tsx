'use client';

import React from 'react';
import { User, Building2, Link as LinkIcon, Shield, Bell, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage your business profile, integrations, and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 space-y-1">
          <SettingsTab icon={<Building2 size={18} />} label="Company Profile" active />
          <SettingsTab icon={<LinkIcon size={18} />} label="Integrations" />
          <SettingsTab icon={<Shield size={18} />} label="Security" />
          <SettingsTab icon={<Bell size={18} />} label="Notifications" />
          <SettingsTab icon={<HelpCircle size={18} />} label="Help & Support" />
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-8">
          
          {/* Company Profile Section */}
          <div className="bg-black/30 backdrop-blur-3xl border border-zinc-700/50 shadow-2xl rounded-2xl p-6 transition-all duration-500">
            <h2 className="text-lg font-semibold text-white mb-6">Company Profile</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Legal Business Name</label>
                <input 
                  type="text" 
                  defaultValue="Admin" 
                  className="w-full bg-black/40 border border-zinc-700/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500/50 transition backdrop-blur-md" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Employer Identification Number (EIN)</label>
                  <input 
                    type="text" 
                    defaultValue="**-*******" 
                    className="w-full bg-black/40 border border-zinc-700/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500/50 transition font-mono backdrop-blur-md" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Industry</label>
                  <select className="w-full bg-black/40 border border-zinc-700/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500/50 transition appearance-none backdrop-blur-md">
                    <option>Creative Agency</option>
                    <option>SaaS</option>
                    <option>E-Commerce</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-800 flex justify-end">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2 rounded-lg transition shadow-lg shadow-indigo-600/20">
                Save Changes
              </button>
            </div>
          </div>

          {/* Integrations Section */}
          <div className="bg-black/30 backdrop-blur-3xl border border-zinc-700/50 shadow-2xl rounded-2xl p-6 transition-all duration-500">
            <h2 className="text-lg font-semibold text-white mb-6">Connected Data Sources</h2>
            <div className="space-y-4">
               {/* Plaid Connection */}
               <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-md border border-zinc-700/40 rounded-xl hover:border-zinc-500/30 transition-all">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-2">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Plaid_logo.svg" alt="Plaid" className="w-full opacity-90" />
                   </div>
                   <div>
                     <h3 className="text-white font-medium">Plaid Banking</h3>
                     <p className="text-zinc-500 text-sm">Last synced 2 hours ago</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                   <span className="text-sm font-medium text-emerald-500">Connected</span>
                 </div>
               </div>

               {/* QuickBooks Connection */}
               <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-md border border-zinc-700/40 rounded-xl hover:border-zinc-500/30 transition-all">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg bg-[#2CA01C] flex items-center justify-center p-1.5">
                     <svg viewBox="0 0 100 100" fill="white" className="w-full"><path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 85C30.7 85 15 69.3 15 50S30.7 15 50 15s35 15 35 35-15.7 35-35 35z"/></svg>
                   </div>
                   <div>
                     <h3 className="text-white font-medium">QuickBooks Online</h3>
                     <p className="text-zinc-500 text-sm">Invoices & Payables</p>
                   </div>
                 </div>
                 <button className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md text-sm font-medium transition">
                   Connect
                 </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function SettingsTab({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition text-sm font-medium ${
      active ? 'bg-indigo-600/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
    }`}>
      {icon}
      {label}
    </button>
  );
}
