'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, BrainCircuit, Loader2, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

// Dynamic mock data generator
const generateChartData = (payoutOffset = 0) => {
  const data = [];
  let balance = 125000 + payoutOffset;
  const today = new Date();
  
  for (let i = 0; i < 60; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Simulate natural fluctuation
    const change = Math.random() * 8000 - 4000;
    balance += change;
    
    // Deliberately create a dry spell around day 45
    if (i > 40 && i < 50) {
      balance -= 15000; 
    }
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: Math.round(balance),
      dayOffset: i
    });
  }
  return data;
};

export default function Dashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiData, setAiData] = useState<any>(null);
  const [acceptedOptionId, setAcceptedOptionId] = useState<string | null>(null);
  const [payoutOffset, setPayoutOffset] = useState(0);

  // Memoize chart data so it updates reactively based on the loan payout
  const chartData = useMemo(() => generateChartData(payoutOffset), [payoutOffset]);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setAiData(null);
    setAcceptedOptionId(null);
    setPayoutOffset(0);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId: 'mock-uuid-for-demo' })
      });
      const json = await res.json();
      if (json.ai_response) {
        setAiData(json.ai_response);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAcceptOption = (option: any) => {
    setAcceptedOptionId(option.id);
    setPayoutOffset(option.net_payout); // Immediately fix the chart!
  };

  const isResolved = acceptedOptionId !== null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard Snapshot</h1>
          <p className="text-zinc-400 text-sm mt-1">Review your projected liquidity and cash flow position.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
            {isAnalyzing ? 'Analyzing...' : 'Run FlowState Agent'}
          </button>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard 
          title="Current Balance" 
          amount={`$${(125000 + payoutOffset).toLocaleString()}`} 
          trend={isResolved ? "+12.4%" : "+2.4%"} 
          trendUp={true} 
          subtitle={isResolved ? "funds injected" : "vs. last month"}
        />
        <KPICard 
          title="Avg Monthly Runway" 
          amount={isResolved ? "6.8 Months" : "4.2 Months"} 
          trend={isResolved ? "+2.6mo" : "-0.5%"} 
          trendUp={isResolved} 
          subtitle={isResolved ? "bridge secured" : "burn rate increased"}
        />
        
        {/* Dynamic Insight Card */}
        {isResolved ? (
           <div className="bg-emerald-950/30 border border-emerald-500/30 p-5 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
            <h3 className="text-emerald-400 text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Agent Resolution Active
            </h3>
            <p className="text-2xl font-semibold text-white mt-2">Liquidity Secured</p>
            <p className="text-emerald-300/80 text-sm mt-2 font-medium">Gap resolved completely.</p>
          </div>
        ) : aiData?.prediction?.dry_spell_detected ? (
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-red-500/30 p-5 rounded-2xl relative overflow-hidden group animate-in fade-in zoom-in duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full -mr-16 -mt-16 transition-all group-hover:bg-red-500/20" />
            <h3 className="text-zinc-400 text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
              AI Prediction Alert
            </h3>
            <p className="text-2xl font-semibold text-white mt-2">Dry Spell Detected</p>
            <p className="text-red-400 text-sm mt-2 font-medium">In approx. 45 days. See chart.</p>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-center items-center text-center opacity-70">
            <BrainCircuit className="w-8 h-8 text-zinc-600 mb-2" />
            <p className="text-sm font-medium text-zinc-400">Agent On Standby</p>
          </div>
        )}
      </div>

      {/* AI AI Resolutions UI (Visible only when aiData is present and not yet resolved) */}
      {aiData && !isResolved && (
        <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-6 animate-in slide-in-from-top-4 duration-500 fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Agent Recommended Resolutions</h2>
              <p className="text-sm text-zinc-400">AI evaluated 14 products to bridge your day 45 deficit of ${Math.abs(aiData.prediction.lowest_balance_projected).toLocaleString()}.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {aiData.resolutions.map((res: any) => (
              <div key={res.id} className="bg-zinc-900 border border-zinc-700/50 p-5 rounded-xl hover:border-indigo-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 rounded-md">
                    {res.type}
                  </span>
                  <span className="text-sm font-medium text-zinc-400">Fee: ${res.fee_amount}</span>
                </div>
                <h3 className="text-white font-medium text-lg mt-3">{res.title}</h3>
                <p className="text-sm text-zinc-400 mt-2 h-10">{res.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-xl font-bold text-white">
                    +${res.net_payout.toLocaleString()}
                  </div>
                  <button 
                    onClick={() => handleAcceptOption(res)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-white hover:text-black text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    {res.action_text}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 60-Day Cash Flow Chart */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden transition-all duration-700">
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div>
            <h2 className="text-lg font-semibold text-white">60-Day Liquidity Projection</h2>
            <p className="text-sm text-zinc-400">Powered by FlowState Agent analysis.</p>
          </div>
        </div>

        {/* The Chart */}
        <div className="h-[400px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isResolved ? "#10b981" : "#6366f1"} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isResolved ? "#10b981" : "#6366f1"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#52525b" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#52525b" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', color: '#fafafa' }}
                itemStyle={{ color: isResolved ? '#34d399' : '#818cf8' }}
                cursor={{ stroke: '#3f3f46', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke={isResolved ? "#10b981" : "#6366f1"} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorBalance)" 
                activeDot={{ r: 6, fill: isResolved ? '#34d399' : '#818cf8', stroke: '#09090b', strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

function KPICard({ title, amount, trend, trendUp, subtitle }: { title: string; amount: string; trend: string; trendUp: boolean; subtitle: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl transition-all duration-500 hover:border-zinc-700">
      <h3 className="text-zinc-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-semibold text-white mt-2">{amount}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className={`text-xs font-medium flex items-center px-1.5 py-0.5 rounded-md ${trendUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
          {trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {trend}
        </span>
        <span className="text-zinc-500 text-xs">{subtitle}</span>
      </div>
    </div>
  );
}
