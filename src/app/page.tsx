"use client";

import { 
  Sparkles, 
  Search, 
  UploadCloud, 
  FileText, 
  Languages, 
  Presentation, 
  Video,
  ArrowUpRight,
  TrendingUp,
  BookOpen,
  Quote,
  FolderKanban,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { label: "Projects", value: "12", growth: "+2", icon: FolderKanban },
  { label: "Papers", value: "154", growth: "+24", icon: FileText },
  { label: "Citations", value: "2.4k", growth: "+142", icon: Quote },
  { label: "h-index", value: "18", growth: "+1", icon: TrendingUp },
];

const actionCards = [
  { title: "Academic Search", desc: "Search 200M+ global papers", icon: Search, color: "bg-blue-500", href: "/search" },
  { title: "Literature Review", desc: "Synthesize related works", icon: FileText, color: "bg-indigo-500", href: "/review" },
  { title: "Research Audit", desc: "Check academic integrity", icon: Sparkles, color: "bg-purple-500", href: "/audit" },
  { title: "Translator Pro", desc: "100+ languages preserved", icon: Languages, color: "bg-pink-500", href: "/translator" },
  { title: "PPT Studio", desc: "Create slides from research", icon: Presentation, color: "bg-orange-500", href: "/ppt" },
  { title: "Video Studio", desc: "Generate scientific explainers", icon: Video, color: "bg-rose-500", href: "/video" },
];

const recentActivity = [
  { id: 1, action: "Generated Citation", detail: "Quantum Decryption Algorithms in Post-Silicon Era", time: "2 hours ago", icon: Quote, status: "success" },
  { id: 2, action: "Translated Abstract", detail: "Machine Learning in Molecular Dynamics", time: "5 hours ago", icon: Languages, status: "success" },
  { id: 3, action: "Failed Integrity Check", detail: "Draft_v2.docx - Plagiarism Flagged", time: "Yesterday", icon: AlertCircle, status: "error" },
  { id: 4, action: "Created Presentation", detail: "Blockchain Energy Trading", time: "Yesterday", icon: Presentation, status: "success" },
];

export default function Dashboard() {
  return (
    <div className="space-y-10 pb-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[32px] bg-white border border-slate-200 p-10 flex items-center justify-between shadow-sm"
      >
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Pro Researcher</span>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Welcome back, <span className="text-indigo-600">Scholar</span>
          </h1>
          
          <p className="text-slate-500 font-medium leading-relaxed">
            Your research workspace is optimized and ready. You have <span className="text-slate-900 font-bold">4 new citations</span> and <span className="text-slate-900 font-bold">2 pending reviews</span> this week.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Link href="/search" className="px-6 py-3 premium-gradient text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              Start Research
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
              View Analytics
            </button>
          </div>
        </div>

        {/* Abstract Decoration */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px]" />
        </div>

        <div className="hidden lg:block relative z-10 w-72 h-72">
          <div className="absolute inset-0 bg-indigo-50 rounded-[40px] rotate-6" />
          <div className="absolute inset-0 bg-white border border-slate-100 rounded-[40px] shadow-2xl flex items-center justify-center">
            <BookOpen className="w-32 h-32 text-indigo-600/20" />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-card p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <div className="flex items-center gap-1 mt-1 text-emerald-600">
                <ArrowUpRight className="w-3 h-3" />
                <span className="text-[10px] font-bold">{stat.growth} this month</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-slate-400" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Action Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
            <button className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-widest">View All Tools</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {actionCards.map((card, i) => (
              <Link href={card.href} key={card.title}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-6 group cursor-pointer h-full flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-6`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{card.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600 opacity-0 group-hover:opacity-100 transition-all mt-6">
                    <span className="text-xs font-bold uppercase tracking-widest">Launch Tool</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
          </div>
          <div className="glass-card p-6 flex flex-col gap-6">
            {recentActivity.map((activity, i) => (
              <motion.div 
                key={activity.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex gap-4 group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  activity.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1 pb-4 border-b border-slate-100 w-full group-last:border-0 group-last:pb-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{activity.action}</h4>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium line-clamp-1">{activity.detail}</p>
                </div>
              </motion.div>
            ))}
            
            <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-all mt-4">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

