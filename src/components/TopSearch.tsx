"use client";

import { Search, Command, Bell, Globe, User, Moon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TopSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex-1 max-w-2xl">
        <form onSubmit={handleSearch} className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 200M+ papers, DOIs, or researchers..."
            className="w-full h-12 pl-12 pr-24 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded-lg shadow-sm pointer-events-none">
            <Command className="w-3 h-3 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400">K</span>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Globe className="w-5 h-5" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Moon className="w-5 h-5" />
          </button>
        </div>

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900">Dr. Kailash Chandra</p>
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Pro Member</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center border border-indigo-200 group-hover:border-indigo-400 transition-all shadow-sm">
            <User className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
