"use client";

import { 
  ShieldCheck, 
  Search, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Upload,
  Globe,
  Loader2,
  Sparkles,
  BarChart2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const mockIssues = [
  { id: 1, type: "Consistency", message: "Inconsistent data reporting between Figure 2 and Table 4.", severity: "High" },
  { id: 2, type: "Citation", message: "Reference [14] is cited but missing from the bibliography.", severity: "Medium" },
  { id: 3, type: "Integrity", message: "Paraphrasing of Section 3.2 is too close to original source (Nature, 2023).", severity: "High" },
  { id: 4, type: "Readability", message: "Passive voice usage is higher than recommended (42%).", severity: "Low" },
];

export default function ResearchAudit() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [score, setScore] = useState(0);

  const startAudit = () => {
    setIsAuditing(true);
    setAuditComplete(false);
    setScore(0);
    
    // Simulate auditing process
    setTimeout(() => {
      setIsAuditing(false);
      setAuditComplete(true);
      setScore(84);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Research Audit</h1>
            <p className="text-sm text-slate-500 font-medium">Verify academic integrity, consistency, and citation accuracy with AI.</p>
          </div>
        </div>
      </div>

      {!auditComplete && !isAuditing ? (
        <div className="glass-card p-12 text-center space-y-6">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Upload Your Manuscript</h2>
          <p className="text-slate-500 font-medium max-w-md mx-auto">
            Drop your research paper (PDF/Word) here to run a comprehensive integrity audit. 
            We check for plagiarism, data consistency, and citation gaps.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button 
              onClick={startAudit}
              className="px-8 py-4 premium-gradient text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              Select File
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Analyze URL
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Audit Status */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-8 text-center space-y-6 relative overflow-hidden">
              {isAuditing && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Scanning Document...</p>
                </div>
              )}
              
              <div className="relative inline-block">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="364.42"
                    initial={{ strokeDashoffset: 364.42 }}
                    animate={{ strokeDashoffset: 364.42 - (364.42 * score) / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-emerald-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-slate-900">{score}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Integrity</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Audit Result: Good</h3>
                <p className="text-xs text-slate-500 font-medium">Your manuscript meets most academic standards. {mockIssues.length} minor issues found.</p>
              </div>

              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <BarChart2 className="w-4 h-4" />
                View Full Report
              </button>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Integrity Metrics</h3>
              <div className="space-y-4">
                {[
                  { label: "Originality", val: 92 },
                  { label: "Data Consistency", val: 88 },
                  { label: "Citation Accuracy", val: 76 },
                ].map((m) => (
                  <div key={m.label} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-500 uppercase">{m.label}</span>
                      <span className="text-slate-900">{m.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${m.val}%` }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Issue List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-slate-900">Identified Issues</h3>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600 uppercase">
                  <div className="w-2 h-2 rounded-full bg-rose-600" /> High Priority
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 uppercase">
                  <div className="w-2 h-2 rounded-full bg-amber-600" /> Warning
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {mockIssues.map((issue, i) => (
                <motion.div 
                  key={issue.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 flex items-start justify-between group hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      issue.severity === 'High' ? 'bg-rose-50 text-rose-600' : 
                      issue.severity === 'Medium' ? 'bg-amber-50 text-amber-600' : 
                      'bg-slate-50 text-slate-400'
                    }`}>
                      {issue.severity === 'High' ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{issue.type}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                          issue.severity === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
                        }`}>{issue.severity} Severity</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">{issue.message}</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-300 group-hover:text-indigo-600 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-8 bg-indigo-900 text-white flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">AI Audit Tip</span>
                </div>
                <h4 className="text-lg font-bold">Optimize Citation Structure</h4>
                <p className="text-xs text-indigo-200 font-medium max-w-md">Our AI recommends using APA 7th Edition for this manuscript to align with the journal targets in your profile.</p>
              </div>
              <button className="px-6 py-3 bg-white text-indigo-900 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-50 transition-all">
                Auto-Fix Citations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
