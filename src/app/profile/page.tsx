"use client";

import { 
  User, 
  MapPin, 
  Link as LinkIcon, 
  Mail, 
  Globe, 
  Users, 
  FileText, 
  Quote, 
  TrendingUp,
  Award,
  BookOpen,
  Camera,
  Edit3,
  Plus,
  Building2
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Projects", value: "12", icon: BookOpen },
  { label: "Papers", value: "154", icon: FileText },
  { label: "Citations", value: "2.4k", icon: Quote },
  { label: "h-index", value: "18", icon: TrendingUp },
];

export default function ProfilePage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Profile Header Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card overflow-hidden"
      >
        {/* Banner */}
        <div className="h-48 w-full bg-slate-900 relative">
          <div className="absolute inset-0 premium-gradient opacity-40" />
          <button className="absolute bottom-4 right-4 p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all">
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-10 pb-10 relative">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Avatar */}
            <div className="-mt-20 relative">
              <div className="w-40 h-40 rounded-[40px] bg-white p-1.5 shadow-2xl relative">
                <div className="w-full h-full rounded-[36px] bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-indigo-50">
                  <User className="w-20 h-20 text-indigo-600" />
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg border-4 border-white hover:scale-110 transition-all">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 pt-6 lg:pt-8 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Kailash Chandra</h1>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full border border-indigo-100 uppercase tracking-widest">Pro Researcher</span>
                  </div>
                  <p className="text-lg text-slate-500 font-medium">Senior Researcher | Quantum Chemistry & Molecular Dynamics</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="px-6 py-3 premium-gradient text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Upload Paper
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>Stanford University</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>California, USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-slate-400" />
                  <a href="#" className="text-indigo-600 hover:underline">scholar.google.com/chandra</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats and Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Bio & Socials */}
        <div className="space-y-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 space-y-6"
          >
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">About Me</h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Passionate researcher focusing on the intersection of Quantum Mechanics and Artificial Intelligence. Leading a team of 15 researchers in developing next-generation catalysts for carbon sequestration.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                  <span className="text-xs font-bold text-slate-700">LinkedIn Profile</span>
                </div>
                <TrendingUp className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
                  <span className="text-xs font-bold text-slate-700">Research X</span>
                </div>
                <TrendingUp className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 space-y-6"
          >
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Top Achievements</h2>
            <div className="space-y-4">
              {[
                { title: "Nobel Research Fellow", date: "2024", icon: Award },
                { title: "Top 1% Citations", date: "2023", icon: TrendingUp },
                { title: "Best Paper Award", date: "2022", icon: FileText },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.title}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Stats & Experience */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-6 flex flex-col items-center justify-center text-center group hover:scale-105 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <stat.icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-all" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8 space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Recent Publications</h2>
              <button className="text-xs font-bold text-indigo-600 uppercase hover:underline">View All</button>
            </div>
            
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-6 group cursor-pointer">
                  <div className="w-12 h-16 bg-slate-50 rounded-lg flex-shrink-0 flex items-center justify-center border border-slate-100 group-hover:border-indigo-200 transition-all shadow-sm">
                    <FileText className="w-6 h-6 text-slate-300 group-hover:text-indigo-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-all">
                      Analysis of Quantum Decoherence in Biological Neural Networks
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Published in Nature Communications • Jan 2024</p>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">DOI: 10.1038/s41467-024-12345-z</span>
                      <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold">
                        <TrendingUp className="w-3 h-3" />
                        84 Citations
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
