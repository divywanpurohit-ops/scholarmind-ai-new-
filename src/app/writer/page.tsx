"use client";

import { 
  PenTool, 
  Sparkles, 
  FileText, 
  AlignLeft, 
  RefreshCcw, 
  Download, 
  Copy, 
  Trash2,
  Loader2,
  CheckCircle2,
  Zap,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function AIWriter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTool, setActiveTool] = useState<"draft" | "humanize" | "summarize" | "paraphrase">("draft");

  const handleProcess = async (tool: typeof activeTool) => {
    if (!inputText) return;
    setIsProcessing(true);
    setActiveTool(tool);

    try {
      // In a real app, we'd call different Gemini prompts based on tool
      const response = await fetch("/api/translate", { // Reusing translate endpoint logic for demo
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: inputText, 
          mode: tool === "humanize" ? "humanize" : "translate", // Fallback for simplicity in demo
          targetLang: "Academic English" 
        }),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setOutputText(data.result);
      }
    } catch (error) {
      console.error("Processing failed:", error);
      alert("Failed to connect to the writing service.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <PenTool className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Writer & Editor</h1>
            <p className="text-sm text-slate-500 font-medium">Professional academic writing assistant with advanced humanizing tools.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card flex flex-col min-h-[500px]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <button className="text-xs font-bold text-slate-900 border-b-2 border-indigo-600 pb-1">Editor</button>
                <button className="text-xs font-bold text-slate-400 hover:text-slate-600 pb-1 transition-all">Outline</button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setInputText("")} className="p-2 text-slate-400 hover:text-rose-500 transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Start writing or paste your research content here..."
              className="flex-1 p-8 bg-transparent resize-none focus:outline-none text-slate-700 font-medium leading-relaxed text-lg"
            />
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white rounded-b-2xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {inputText.split(/\s+/).filter(Boolean).length} Words • {inputText.length} Characters
              </span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleProcess("paraphrase")}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  Paraphrase
                </button>
                <button 
                  onClick={() => handleProcess("draft")}
                  className="flex items-center gap-2 px-6 py-2 premium-gradient text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Draft
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-900">Academic Tools</h3>
            
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => handleProcess("humanize")}
                className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between group hover:border-indigo-400 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900">AI Humanizer</p>
                    <p className="text-[10px] text-slate-500">Bypass detection, sound natural.</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => handleProcess("summarize")}
                className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between group hover:border-emerald-400 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <AlignLeft className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900">Research Summary</p>
                    <p className="text-[10px] text-slate-500">Concise academic abstracts.</p>
                  </div>
                </div>
              </button>

              <button 
                className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between group hover:border-amber-400 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900">Citation Check</p>
                    <p className="text-[10px] text-slate-500">Verify academic integrity.</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {(isProcessing || outputText) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 bg-slate-900 text-white space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">AI Suggestion</span>
                  </div>
                  {outputText && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                
                <div className="min-h-[100px] text-sm text-slate-300 leading-relaxed italic">
                  {isProcessing ? (
                    <div className="flex flex-col gap-2">
                      <div className="h-2 w-full bg-white/10 rounded animate-pulse" />
                      <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse" />
                      <div className="h-2 w-1/2 bg-white/10 rounded animate-pulse" />
                    </div>
                  ) : (
                    outputText
                  )}
                </div>

                {outputText && (
                  <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                    <button 
                      onClick={() => {setInputText(outputText); setOutputText("");}}
                      className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold uppercase transition-all"
                    >
                      Apply to Editor
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"><Copy className="w-4 h-4" /></button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"><Download className="w-4 h-4" /></button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
