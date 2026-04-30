"use client";

import { motion } from "framer-motion";
import { Sparkles, User, Mail, Lock, Building2, GraduationCap, Microscope, Briefcase } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-purple-600 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Join ScholarMind AI</h1>
          <p className="text-slate-500 text-sm font-medium">Empowering the next generation of academic excellence.</p>
        </div>

        {/* Register Card */}
        <div className="glass-panel p-10 rounded-[40px] shadow-2xl border-white/50 bg-white/40">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Dr. Kailash Chandra" className="w-full h-12 pl-12 pr-4 bg-white/50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" placeholder="k.chandra@university.edu" className="w-full h-12 pl-12 pr-4 bg-white/50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="password" placeholder="••••••••" className="w-full h-12 pl-12 pr-4 bg-white/50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm" />
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Institution</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Harvard Medical School" className="w-full h-12 pl-12 pr-4 bg-white/50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Research Field</label>
                  <div className="relative">
                    <Microscope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select className="w-full h-12 pl-12 pr-4 bg-white/50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm appearance-none">
                      <option>Quantum Chemistry</option>
                      <option>Molecular Biology</option>
                      <option>Artificial Intelligence</option>
                      <option>Theoretical Physics</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Academic Role</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select className="w-full h-12 pl-12 pr-4 bg-white/50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm appearance-none">
                      <option>Senior Researcher</option>
                      <option>PhD Candidate</option>
                      <option>Postdoctoral Fellow</option>
                      <option>Professor</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" className="rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-xs font-medium text-slate-600 leading-none">
                I agree to the <button className="font-bold text-indigo-600 hover:underline">Terms of Service</button> and <button className="font-bold text-indigo-600 hover:underline">Research Ethics Agreement</button>.
              </span>
            </div>

            <button className="w-full py-5 premium-gradient text-white rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all">
              Initialize My Research Workspace
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already a member?{" "}
          <Link href="/login" className="font-bold text-indigo-600 hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
