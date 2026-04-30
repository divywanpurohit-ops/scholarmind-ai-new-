"use client";

import { 
  Languages, 
  Presentation, 
  Video, 
  PenTool, 
  Quote, 
  Bot, 
  ShieldCheck, 
  BarChart3, 
  Search,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const tools = [
  { icon: Search, label: "Search", href: "/search" },
  { icon: Languages, label: "Translate", href: "/translator" },
  { icon: Presentation, label: "PPT", href: "/ppt" },
  { icon: Video, label: "Video", href: "/video" },
  { icon: PenTool, label: "Writer", href: "/writer" },
  { icon: Quote, label: "Citation", href: "/citation" },
  { icon: Bot, label: "Copilot", href: "/copilot" },
  { icon: ShieldCheck, label: "Audit", href: "/audit" },
  { icon: BarChart3, label: "Analyze", href: "/analyzer" },
];

export default function BottomDock() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, type: "spring" }}
        className="glass-panel p-2 rounded-[32px] flex items-center gap-1 shadow-2xl border-white/20"
      >
        <div className="flex items-center gap-1 px-1">
          {tools.map((tool, i) => (
            <Link key={tool.label} href={tool.href}>
              <motion.button
                whileHover={{ y: -8, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-3 rounded-2xl hover:bg-white transition-all duration-300"
              >
                <tool.icon className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                  {tool.label}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                </div>
              </motion.button>
            </Link>
          ))}
        </div>

        <div className="w-px h-8 bg-slate-200 mx-2" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center justify-center"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}
