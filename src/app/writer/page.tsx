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
  BookOpen,
  ArrowRight
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
      const response = await fetch("/api/writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, tool }),
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    alert("Copied to clipboard!");
  };

  return (
    <div className="space-y-8 p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <PenTool className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Academic AI Writer & Humanizer</h1>
            <p className="text-sm text-slate-500 font-medium">Professional scholarly editor with no word limits and advanced paraphrasing logic.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel flex flex-col min-h-[650px] shadow-2xl">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-[2.5rem]">
              <div className="flex items-center gap-6 px-4">
                <button className="text-xs font-black text-slate-900 border-b-2 border-indigo-600 pb-1 uppercase tracking-widest">Scholar Editor</button>
                <button className="text-xs font-bold text-slate-400 hover:text-slate-600 pb-1 transition-all uppercase tracking-widest">Outline Mode</button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setInputText("")} className="p-2 text-slate-400 hover:text-rose-500 transition-all" title="Clear Editor"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your research manuscript or notes here for professional transformation..."
              className="flex-1 p-10 bg-transparent resize-none focus:outline-none text-slate-700 font-medium leading-relaxed text-xl placeholder:text-slate-300"
            />
            <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-white rounded-b-[2.5rem]">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Word Count</span>
                  <span className="text-sm font-bold text-slate-900">{inputText.split(/\s+/).filter(Boolean).length}</span>
                </div>
                <div className="w-px h-6 bg-slate-100" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Characters</span>
                  <span className="text-sm font-bold text-slate-900">{inputText.length}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleProcess("paraphrase")}
                  disabled={isProcessing || !inputText}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all disabled:opacity-50"
                >
                  <RefreshCcw className={`w-3.5 h-3.5 ${isProcessing && activeTool === 'paraphrase' ? 'animate-spin' : ''}`} />
                  Paraphrase Pro
                </button>
                <button 
                  onClick={() => handleProcess("draft")}
                  disabled={isProcessing || !inputText}
                  className="flex items-center gap-2 px-8 py-3 premium-gradient text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isProcessing && activeTool === 'draft' ? 'animate-spin' : ''}`} />
                  Generate Draft
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-8 space-y-8 shadow-xl">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Scholarly Enhancements</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: "humanize", label: "AI Humanizer", desc: "Bypass detection & academic tone", icon: Zap, color: "bg-indigo-100 text-indigo-600", hover: "hover:border-indigo-400" },
                { id: "summarize", label: "Research Summary", desc: "Create high-impact abstracts", icon: AlignLeft, color: "bg-emerald-100 text-emerald-600", hover: "hover:border-emerald-400" },
                { id: "paraphrase", label: "Scholarly Paraphrase", desc: "Improve vocabulary & flow", icon: RefreshCcw, color: "bg-amber-100 text-amber-600", hover: "hover:border-amber-400" },
              ].map((tool) => (
                <button 
                  key={tool.id}
                  onClick={() => handleProcess(tool.id as any)}
                  disabled={isProcessing || !inputText}
                  className={`w-full p-5 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 flex items-center justify-between group transition-all ${tool.hover} disabled:opacity-50`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${tool.color} flex items-center justify-center group-hover:scale-110 transition-all shadow-sm`}>
                      <tool.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{tool.label}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{tool.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {(isProcessing || outputText) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-8 bg-slate-900 text-white space-y-6 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-20 h-20 text-white" />
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">AI Result: {activeTool}</span>
                  </div>
                  {outputText && !isProcessing && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </div>
                
                <div className="min-h-[200px] max-h-[400px] overflow-y-auto custom-scrollbar text-sm text-slate-300 leading-relaxed font-medium relative z-10">
                  {isProcessing ? (
                    <div className="flex flex-col gap-4">
                      <div className="h-2 w-full bg-white/10 rounded animate-pulse" />
                      <div className="h-2 w-full bg-white/10 rounded animate-pulse" />
                      <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse" />
                      <div className="h-2 w-1/2 bg-white/10 rounded animate-pulse" />
                      <p className="text-[10px] text-slate-500 font-bold uppercase text-center mt-4 tracking-tighter">Processing large dataset without limits...</p>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{outputText}</div>
                  )}
                </div>

                {outputText && !isProcessing && (
                  <div className="flex items-center gap-3 pt-6 border-t border-white/10 relative z-10">
                    <button 
                      onClick={() => {setInputText(outputText); setOutputText("");}}
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/20"
                    >
                      Apply Changes
                    </button>
                    <button onClick={copyToClipboard} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all" title="Copy Output"><Copy className="w-4 h-4" /></button>
                    <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all" title="Download (.txt)"><Download className="w-4 h-4" /></button>
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
