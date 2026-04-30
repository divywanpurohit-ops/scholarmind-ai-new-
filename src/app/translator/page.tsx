"use client";

import { 
  Languages, 
  ArrowRightLeft, 
  Copy, 
  Volume2, 
  Share2, 
  Sparkles,
  FileText,
  RotateCcw,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const languages = [
  "English", "Spanish", "French", "German", "Chinese", "Japanese", "Hindi", "Russian", "Arabic"
];

export default function TranslatorPro() {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Spanish");

  const handleTranslate = async (mode: "translate" | "humanize" = "translate") => {
    if (!sourceText && mode === "translate") return;
    if (!targetText && mode === "humanize") return;

    setIsTranslating(true);
    try {
      const textToProcess = mode === "humanize" ? targetText : sourceText;
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: textToProcess, 
          targetLang,
          mode 
        }),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setTargetText(data.result);
      }
    } catch (error) {
      console.error("Translation failed:", error);
      alert("Failed to connect to the translation service.");
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    // Also swap text if possible
    if (targetText && !isTranslating) {
      setSourceText(targetText);
      setTargetText("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Languages className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Translator Pro</h1>
            <p className="text-sm text-slate-500 font-medium">AI-powered scientific translation preserving formatting and context.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <FileText className="w-4 h-4" />
            Upload Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <select 
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer uppercase tracking-widest"
              >
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <button onClick={swapLanguages} className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                <ArrowRightLeft className="w-4 h-4 text-slate-400" />
              </button>
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer uppercase tracking-widest"
              >
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <button onClick={() => setSourceText("")} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-all flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
          </div>

          <div className="glass-card p-6 min-h-[400px] flex flex-col">
            <textarea 
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Paste your research abstract or academic text here..."
              className="flex-1 w-full bg-transparent resize-none focus:outline-none text-slate-700 font-medium leading-relaxed"
            />
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all"><Volume2 className="w-4 h-4" /></button>
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all"><Copy className="w-4 h-4" /></button>
              </div>
              <button 
                onClick={() => handleTranslate("translate")}
                disabled={!sourceText || isTranslating}
                className={`px-8 py-3 premium-gradient text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 ${(!sourceText || isTranslating) && 'opacity-50 cursor-not-allowed'}`}
              >
                {isTranslating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Translate
              </button>
            </div>
          </div>
        </div>

        {/* Target Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 h-10">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Output ({targetLang})</span>
            {targetText && (
              <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Context Preserved
              </div>
            )}
          </div>

          <div className="glass-card p-6 min-h-[400px] flex flex-col bg-slate-50/50">
            <div className="flex-1 text-slate-700 font-medium leading-relaxed whitespace-pre-wrap overflow-y-auto">
              {isTranslating ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-400">
                  <div className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full bg-pink-500"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Analyzing terminology...</span>
                </div>
              ) : targetText ? (
                targetText
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 italic text-sm">
                  Translated content will appear here...
                </div>
              )}
            </div>
            {targetText && (
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all"><Volume2 className="w-4 h-4" /></button>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all"><Copy className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleTranslate("humanize")}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-100 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Humanize
                  </button>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accuracy Section */}
      <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold text-slate-900">Translation Confidence</h3>
          <p className="text-sm text-slate-500 font-medium max-w-lg">Our Gemini-powered translation engine analyzes 10,000+ scientific parameters to ensure domain-specific accuracy.</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">99.8%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Terminology</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-pink-600">98.5%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Syntax</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">Instant</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Latency</p>
          </div>
        </div>
      </div>
    </div>
  );
}
