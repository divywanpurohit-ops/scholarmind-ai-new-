"use client";

import { 
  FileText, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  BookOpen,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const reviewData = [
  {
    id: 1,
    title: "Quantum Neural Networks: A Comprehensive Survey",
    status: "Completed",
    methods: "Systematic Review, Meta-analysis",
    findings: "Hybrid architectures outperform classical NN in specific optimization tasks.",
    citations: 24,
    lastModified: "2 hours ago"
  },
  {
    id: 2,
    title: "Ethical Implications of AI in Genetic Engineering",
    status: "In Progress",
    methods: "Case Studies, Ethical Framework Analysis",
    findings: "Identification of critical transparency gaps in CRISPR research protocols.",
    citations: 12,
    lastModified: "1 day ago"
  },
  {
    id: 3,
    title: "Large Language Models in Clinical Diagnosis",
    status: "Draft",
    methods: "Experimental Validation, Comparative Study",
    findings: "Pending analysis of diagnostic accuracy vs. human practitioners.",
    citations: 0,
    lastModified: "3 days ago"
  }
];

export default function LiteratureReview() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Literature Review</h1>
            <p className="text-sm text-slate-500 font-medium">Synthesize research findings and manage your academic bibliography.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-6 py-3 premium-gradient text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">
            <Plus className="w-4 h-4" />
            New Review
          </button>
        </div>
      </div>

      {/* Synthesis AI Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-10 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="relative z-10 space-y-6 max-w-2xl">
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">AI Synthesis Engine</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            Generate your Literature Review synthesis with AI
          </h2>
          <p className="text-slate-400 font-medium text-sm leading-relaxed">
            Our Gemini-powered engine analyzes your library, extracts key themes, and generates a structured synthesis with proper citations and identified research gaps.
          </p>
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center gap-2">
            Synthesize Current Workspace
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        {/* Decoration */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[100px]" />
          <div className="h-full flex items-center justify-center">
            <BookOpen className="w-48 h-48 text-indigo-400 opacity-20" />
          </div>
        </div>
      </motion.div>

      {/* Review Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest border-b-2 border-indigo-600 pb-1">All Reviews</button>
            <button className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all pb-1">Published</button>
            <button className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all pb-1">Archived</button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter reviews..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Research Paper / Topic</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Methodology</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Findings</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Citations</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reviewData.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{review.title}</p>
                      <p className="text-[10px] text-slate-400 font-medium">Modified {review.lastModified}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      review.status === "Completed" ? "bg-emerald-50 text-emerald-600" : 
                      review.status === "In Progress" ? "bg-indigo-50 text-indigo-600" : 
                      "bg-slate-100 text-slate-500"
                    }`}>
                      {review.status === "Completed" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {review.status}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs text-slate-600 font-medium max-w-[200px]">{review.methods}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs text-slate-600 font-medium max-w-[300px] line-clamp-2">{review.findings}</p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-sm font-bold text-slate-900">{review.citations}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all shadow-sm">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all shadow-sm">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
