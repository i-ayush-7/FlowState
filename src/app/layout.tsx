import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LayoutDashboard, Wallet, ArrowRightLeft, Settings, Bell, Search, Activity } from 'lucide-react';
import clsx from 'clsx';
import Chatbox from '@/components/Chatbox';

const inter = Inter({ subsets: ['latin'] });

const EagleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className={className}>
    <path d="M473.8 206.8c-1.3-3.4-3.5-6.3-5.9-8.4-11-9.9-24.9-18.7-39.7-25.1-41-17.7-90.1-26.6-137.9-28.7-9.5-.4-19.1-.5-28.6-.2-12.8.4-25.5 1.5-38.1 3.5-23.7 3.8-46.7 10.4-67.9 21.6-9.5 5.1-18.6 10.8-27 17.1-16.7 12.6-30.8 28.1-41 45.4-8.8 14.8-14.7 31-16.8 48.2-1 8.2-1.3 16.6-.7 24.8 1.1 14.2 4.4 28.1 9.8 41.1 6.8 16.3 16.7 31 28.8 43.6 15.3 15.8 33.7 28.2 53.6 37 20 8.8 41.3 14 62.8 15.3 14.7.9 29.5.3 44-.9 4.3-.4 5.9-6 2.3-9s-8.1-4.7-12.2-5.7c-21.7-5.3-44.5-5.3-66.2.2-6.1 1.5-12.1 3.5-18 5.8-2 .8-4.2-.8-3.7-2.9 2.5-10.7 7.7-20.7 15.5-28.9 9.3-9.8 20.9-17.3 33.5-21.7 17-5.9 35.1-8.3 53.2-7.5 12.4.5 24.8 2.3 36.8 5.6 10.4 2.8 20.4 7 29.7 12.5 1.7 1 3.9-.2 3.9-2.2 0-9.6-3.7-18.6-10.4-25.3-6.1-6.1-13.7-10.7-21.9-13.8-13.1-5-27-7.4-40.8-7.7-15.4-.3-30.8 1.5-45.7 6.1-23.9 7.4-46.1 20.8-64.2 38.6-11.4 11.2-20.9 23.9-28 38.1-1.3 2.7-5.3 2.7-6.5.1-6.9-14.8-10-31.5-8.5-48 .8-9 2.5-17.9 5.2-26.4 5.7-18.1 15-34.7 27.6-48.4 12.1-13.2 26.6-24.1 42.6-31.9 20.7-10.1 42.9-16.1 65.5-18.8 11.7-1.4 23.5-1.9 35.2-1.3 27 .9 53.3 5.3 78.4 13.9 14.8 5.1 29 11.6 42.3 19.3 1.9 1.1 3.1.2 3.1-2 0-3.3-1.1-6.1-2.9-8.4z" />
    <path d="M245 137.9c13.7-6.2 28.5-10 43.7-11.3 11-.9 22.1-.8 33.1.8 12.8 1.8 25.1 5.3 36.7 10.4 16.3 7.2 31 17.3 42.5 29.2 6.6 6.8 12.2 14.5 16.5 22.7 1.5 2.9 5.8 2.7 6.9-.3 2.6-6.9 4-14.4 3.9-21.9-.2-12.7-3.9-25.3-10.9-36.5-6.6-10.7-15.4-20-25.6-27.6-13.6-10.1-28.7-17.7-44.7-22.3-17.3-5.1-35.4-7.6-53.5-7.5-15.1.1-30.1 1.9-44.6 5.8-21 5.6-40.8 15.3-58.2 28.5-13.6 10.3-25.5 22.8-35.2 36.8-5.3 7.7-9.5 15.9-12.8 24.5-1.1 2.8 2.7 5.1 4.7 2.8 6.4-7.4 13.5-14.3 21.3-20.6z"/>
  </svg>
);

export const metadata: Metadata = {
  title: 'FlowState | Predictive Liquidity Agent',
  description: 'AI-driven cash flow prediction and micro-loan generation for SMEs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={clsx(inter.className, "bg-[#040409] text-zinc-50 flex h-screen antialiased overflow-hidden relative")}>
        
        {/* Global Ambient Glassmorphic Glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0"></div>

        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-zinc-800/40 bg-black/30 backdrop-blur-3xl flex-col hidden md:flex relative z-10 shadow-2xl">
          <div className="p-6 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <EagleIcon className="w-5 h-5 text-zinc-50" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white drop-shadow-sm">Flow<span className="text-indigo-400">State</span></span>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            <NavItem href="/" icon={<LayoutDashboard size={20} />} label="Dashboard" active />
            <NavItem href="/transactions" icon={<ArrowRightLeft size={20} />} label="Transactions" />
            <NavItem href="/financing" icon={<Wallet size={20} />} label="Financing Options" />
          </nav>
          
          <div className="p-4 border-t border-zinc-800">
            <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
          
          {/* Top Navigation Bar */}
          <header className="h-16 border-b border-zinc-800/40 bg-black/20 backdrop-blur-3xl flex items-center justify-between px-8 z-20 shrink-0">
            <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-700/50 rounded-full px-4 py-2 w-96 transition-all focus-within:border-indigo-500/50 shadow-inner">
              <Search className="w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search transactions, invoices..." 
                className="bg-transparent border-none outline-none text-sm text-zinc-300 w-full placeholder:text-zinc-600 focus:ring-0"
              />
            </div>
            
            <div className="flex items-center gap-6">
              <button className="relative text-zinc-400 hover:text-zinc-100 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-zinc-900"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-zinc-700 cursor-pointer shadow-lg"></div>
            </div>
          </header>

          {/* Dynamic Page Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-transparent relative z-0">
            {children}
          </div>
        </main>
        
        <Chatbox />

      </body>
    </html>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a 
      href={href} 
      className={clsx(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
        active 
          ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/10 text-indigo-300 font-semibold border-l-2 border-indigo-500' 
          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 border-l-2 border-transparent'
      )}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
