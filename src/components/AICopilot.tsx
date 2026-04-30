"use client";

import { 
  Bot, 
  Sparkles, 
  Search, 
  Send,
  MoreHorizontal,
  ChevronRight,
  FileSearch,
  Lightbulb,
  Zap
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AICopilot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello Dr. Chandra. I've analyzed your current session. You're exploring Quantum Decryption. Would you like me to synthesize the latest related pre-prints from arXiv?" }
  ]);
  const [input, setInput] = useState("");

  const handleAction = (action: string) => {
    if (action === "Find Related Papers") {
      alert("Triggering universal search for related research papers...");
    } else {
      setMessages([...messages, { 
        role: "user", content: action 
      }, { 
        role: "assistant", content: `Analyzing... I'm currently processing the request to "${action.toLowerCase()}" using the Gemini 1.5 Pro engine.` 
      }]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "That's an interesting research direction. Based on my cross-publisher analysis, focusing on lattice-based cryptography would yield the highest security margin for your current architecture." }]);
    }, 1500);
  };

  return (
    <div className="w-[380px] h-screen bg-white border-l border-slate-200 flex flex-col relative overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Research Copilot</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active • Gemini 1.5 Pro</span>
            </div>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 transition-all">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                msg.role === "user" 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none"
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-4 space-y-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Smart Actions</p>
        <div className="flex flex-col gap-2">
          {[
            { label: "Explain Concept", icon: Lightbulb },
            { label: "Summarize Page", icon: FileSearch },
            { label: "Find Related Papers", icon: Search }
          ].map((action) => (
            <button 
              key={action.label}
              onClick={() => handleAction(action.label)}
              className="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-400 hover:bg-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:bg-indigo-50 transition-all">
                  <action.icon className="w-4 h-4 text-slate-500 group-hover:text-indigo-600" />
                </div>
                <span className="text-xs font-bold text-slate-700">{action.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-6 pt-2">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything..."
            className="w-full h-14 pl-6 pr-16 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 premium-gradient text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
