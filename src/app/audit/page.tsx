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
  BarChart2,
  Database,
  SearchCode,
  FileSearch,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const auditCategories = [
  { id: "plagiarism", label: "Plagiarism Scan", status: "Clean", icon: SearchCode, score: 98 },
  { id: "consistency", label: "Data Consistency", status: "Warning", icon: Database, score: 64 },
  { id: "citation", label: "Citation Integrity", status: "Issues Found", icon: FileSearch, score: 72 },
  { id: "bias", label: "Algorithmic Bias", status: "Neutral", icon: BarChart2, score: 89 },
];

const detailedIssues = [
  { id: 1, type: "Data Conflict", message: "Values in Table 2.1 (p. 14) contradict the summarized results in the Abstract.", severity: "High", action: "Review Dataset" },
  { id: 2, type: "Missing Reference", message: "Statement regarding 'Lattice-based encryption' lacks a supporting citation.", severity: "High", action: "Add Citation" },
  { id: 3, type: "Methodology Gap", message: "Control group parameters are underspecified in Section 2.3.", severity: "Medium", action: "Expand Section" },
  { id: 4, type: "Tone Check", message: "Informal language detected in Conclusion ('amazing results').", severity: "Low", action: "Formalize" },
];

export default function ResearchAudit() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const startAudit = () => {
    setIsAuditing(true);
    setAuditComplete(false);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAuditing(false);
            setAuditComplete(true);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <div className="space-y-8 p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Research Audit & Integrity</h1>
            <p className="text-sm text-slate-500 font-medium">Professional manuscript vetting for consistency, plagiarism, and data validity.</p>
          </div>
        </div>
      </div>

      {!auditComplete && !isAuditing ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-20 text-center space-y-8 shadow-2xl border-dashed border-2 border-indigo-100"
        >
          <div className="w-32 h-32 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4 relative">
            <Upload className="w-12 h-12 text-indigo-600" />
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100">
              <Sparkles className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">Manuscript Integrity Shield</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg leading-relaxed">
              Upload your research document to perform a deep-scan audit. 
              Our AI verifies cross-table consistency, citation validity, and scientific tone.
            </p>
          </div>
          <div className="flex justify-center gap-6 pt-4">
            <button 
              onClick={startAudit}
              className="px-10 py-5 premium-gradient text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/30 hover:scale-105 transition-all flex items-center gap-3"
            >
              <FileCheck className="w-5 h-5" />
              Start Audit Scan
            </button>
            <button className="px-10 py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center gap-3">
              <Globe className="w-5 h-5" />
              Import from DOI
            </button>
          </div>
        </motion.div>
      ) : isAuditing ? (
        <div className="glass-panel p-20 flex flex-col items-center justify-center space-y-8">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
              <motion.circle 
                cx="80" cy="80" r="70" stroke="#6366f1" strokeWidth="12" fill="transparent" 
                strokeDasharray="440"
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 - (440 * progress) / 100 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900">{progress}%</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scanning</span>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Performing Cross-Data Validation</h3>
            <p className="text-sm text-slate-500 font-medium">Checking internal consistency between tables, figures, and abstract text...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Summary Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-8 space-y-8 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Audit Scorecard</h3>
                <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Action Required</span>
              </div>
              
              <div className="flex justify-center">
                <div className="relative w-48 h-48">
                   <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="84" stroke="#f1f5f9" strokeWidth="14" fill="transparent" />
                    <circle cx="96" cy="96" r="84" stroke="#f59e0b" strokeWidth="14" fill="transparent" strokeDasharray="527" strokeDashoffset="527" />
                    <motion.circle 
                      cx="96" cy="96" r="84" stroke="#f59e0b" strokeWidth="14" fill="transparent" 
                      strokeDasharray="527"
                      initial={{ strokeDashoffset: 527 }}
                      animate={{ strokeDashoffset: 527 - (527 * 78) / 100 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">78</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safety Score</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {auditCategories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <cat.icon className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{cat.label}</p>
                        <p className={`text-[10px] font-bold ${cat.status === 'Clean' ? 'text-emerald-500' : 'text-amber-500'}`}>{cat.status}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-900">{cat.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Issues Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Integrity Vulnerabilities</h3>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Download full report</button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {detailedIssues.map((issue, i) => (
                <motion.div 
                  key={issue.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-6 flex items-center justify-between group hover:border-indigo-200 transition-all shadow-md"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      issue.severity === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 
                      'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {issue.severity === 'High' ? <AlertTriangle className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{issue.type}</span>
                        <span className={`px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                          issue.severity === 'High' ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/20' : 'bg-amber-100 text-amber-700'
                        }`}>{issue.severity} Priority</span>
                      </div>
                      <p className="text-base font-bold text-slate-800">{issue.message}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg">
                    {issue.action}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="glass-panel p-8 premium-gradient text-white flex items-center justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck className="w-32 h-32" />
              </div>
              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-2 text-indigo-200">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Global Integrity Check</span>
                </div>
                <h4 className="text-2xl font-bold">Unify Manuscript Data</h4>
                <p className="text-sm text-indigo-100 font-medium max-w-xl">Our auditor detected inconsistencies between your dataset and the written summary. Would you like to auto-sync the Abstract with the verified Table data?</p>
              </div>
              <button className="px-10 py-5 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl relative z-10">
                Auto-Sync Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
