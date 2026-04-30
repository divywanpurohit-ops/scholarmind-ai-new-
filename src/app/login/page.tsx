"use client";

import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome to ScholarMind AI</h1>
          <p className="text-slate-500 text-sm font-medium">Your research operating system.</p>
        </div>

        {/* Login Card */}
        <div className="glass-panel p-8 rounded-[32px] shadow-2xl border-white/50 bg-white/40">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu"
                  className="w-full h-12 pl-12 pr-4 bg-white/50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <button className="text-[10px] font-bold text-indigo-600 uppercase hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-12 pr-4 bg-white/50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" className="rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-xs font-medium text-slate-600">Remember me</span>
            </div>

            <button className="w-full py-4 premium-gradient text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">
              Sign In
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white/40 px-4 text-slate-400 font-bold tracking-widest">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">
              <Globe className="w-4 h-4" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              ORCID
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold text-indigo-600 hover:underline">
            Create Account
          </Link>
        </p>
      </motion.div>

      {/* Footer Info */}
      <div className="absolute bottom-8 left-0 w-full text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Enterprise Security • GDPR Compliant • AES-256 Encryption
        </p>
      </div>
    </div>
  );
}
