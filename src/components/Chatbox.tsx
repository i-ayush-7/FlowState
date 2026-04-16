'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: "Hello! I'm your FlowState Copilot. I have live access to your bank balance and pending invoices. How can I help you project your cash flow today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      const data = await res.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error checking your data.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Network error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 z-50 focus:outline-none"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[380px] h-[550px] bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
      
      {/* Header */}
      <div className="h-16 bg-zinc-950/50 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">FlowState Copilot</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-zinc-400">Database connected</span>
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={clsx("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
            <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center shrink-0", msg.role === 'user' ? "bg-zinc-800" : "bg-indigo-600/20")}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-400" /> : <Bot className="w-4 h-4 text-indigo-400" />}
            </div>
            <div className={clsx("max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed", 
              msg.role === 'user' ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-zinc-800 text-zinc-100 rounded-tl-sm")}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 flex-row">
            <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="bg-zinc-800 rounded-2xl rounded-tl-sm p-3 flex items-center">
               <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950/30 shrink-0">
        <form onSubmit={sendMessage} className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your cash flow..." 
            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-indigo-500/50 transition"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 text-white rounded-lg transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
