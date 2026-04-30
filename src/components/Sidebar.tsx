"use client";

import { 
  LayoutDashboard, 
  Search, 
  Library, 
  FileText, 
  Languages, 
  Presentation, 
  Video, 
  PenTool, 
  ShieldCheck, 
  Quote, 
  Bot, 
  BarChart3, 
  Database, 
  FolderKanban, 
  NotebookPen, 
  Bookmark, 
  Settings,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Search, label: "Academic Search", href: "/search" },
  { icon: Library, label: "My Library", href: "/library" },
  { icon: FileText, label: "Literature Review", href: "/review" },
  { icon: Languages, label: "Translator Pro", href: "/translator" },
  { icon: Presentation, label: "PPT Studio", href: "/ppt" },
  { icon: Video, label: "Video Studio", href: "/video" },
  { icon: PenTool, label: "AI Writer", href: "/writer" },
  { icon: ShieldCheck, label: "Research Audit", href: "/audit" },
  { icon: Quote, label: "Citation Generator", href: "/citation" },
  { icon: Bot, label: "RAG Copilot", href: "/copilot" },
  { icon: BarChart3, label: "Visualizer", href: "/visualizer" },
  { icon: Database, label: "Data Analyzer", href: "/analyzer" },
];

const workspaceItems = [
  { icon: FolderKanban, label: "Projects", href: "/projects" },
  { icon: NotebookPen, label: "Notes", href: "/notes" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[280px] h-screen dark-sidebar-gradient flex flex-col p-4 border-r border-white/5 overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-8 mb-4">
        <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">
          ScholarMind <span className="text-indigo-400">AI</span>
        </span>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-8">
        <nav className="space-y-1">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Main Menu</p>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                pathname === item.href 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                pathname === item.href ? "text-indigo-400" : "text-slate-500"
              )} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <nav className="space-y-1">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Workspace</p>
          {workspaceItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                pathname === item.href 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                pathname === item.href ? "text-indigo-400" : "text-slate-500"
              )} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Action */}
      <div className="mt-8 space-y-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Storage</span>
            <span className="text-white font-bold">85% Used</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[85%] premium-gradient rounded-full" />
          </div>
          <button className="w-full py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold uppercase tracking-widest hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
            <Zap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
