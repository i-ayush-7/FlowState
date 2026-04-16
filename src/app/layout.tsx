import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LayoutDashboard, Wallet, ArrowRightLeft, Settings, Bell, Search } from 'lucide-react';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={clsx(inter.className, "bg-zinc-950 text-zinc-50 flex h-screen antialiased overflow-hidden")}>
        
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex-col hidden md:flex">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">Flow<span className="text-indigo-500">State</span></span>
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
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* Top Navigation Bar */}
          <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-8 z-10 shrink-0">
            <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 w-96 transition-all focus-within:border-indigo-500/50">
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
          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#09090b]">
            {children}
          </div>
        </main>

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
          ? 'bg-indigo-500/10 text-indigo-400 font-medium' 
          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
      )}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
