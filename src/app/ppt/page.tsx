"use client";

import { 
  Presentation, 
  Sparkles, 
  Layout, 
  Plus, 
  Download, 
  MonitorPlay,
  Settings,
  Grid,
  Loader2,
  CheckCircle2,
  FileText,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function PPTStudio() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAssembling, setIsAssembling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [slides, setSlides] = useState<{prompt: string, title: string, bullets: string[]}[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [generatedDecks, setGeneratedDecks] = useState(false);

  const handleAddSlide = async () => {
    if (!currentPrompt) return;
    setIsGenerating(true);
    
    try {
      // In a real app, we'd call Gemini here to get slide content for this specific prompt
      const response = await fetch("/api/summarize", { // Reusing summarize for a quick mock or dedicated endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `Generate a slide title and 3 bullet points for this topic: ${currentPrompt}` }),
      });
      const data = await response.json();
      
      const newSlide = {
        prompt: currentPrompt,
        title: currentPrompt.length > 30 ? currentPrompt.substring(0, 30) + "..." : currentPrompt,
        bullets: [
          "Key insight derived from prompt analysis.",
          "Supporting evidence and theoretical framework.",
          "Practical implications and future directions."
        ]
      };
      
      setSlides([...slides, newSlide]);
      setActiveSlideIndex(slides.length);
      setCurrentPrompt("");
    } catch (error) {
      console.error("Failed to add slide:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAssemble = () => {
    if (slides.length === 0) return;
    setIsAssembling(true);
    setProgress(0);
    
    const steps = [
      { p: 20, s: "Synthesizing all slide prompts..." },
      { p: 40, s: "Ensuring logical flow and transitions..." },
      { p: 60, s: "Generating high-fidelity visual assets..." },
      { p: 80, s: "Optimizing layout for academic standards..." },
      { p: 100, s: "Packaging for PPTX export..." },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatus(steps[currentStep].s);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAssembling(false);
          setGeneratedDecks(true);
        }, 500);
      }
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Presentation className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">PPT Studio</h1>
            <p className="text-sm text-slate-500 font-medium">Build professional academic presentations step-by-step.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {setSlides([]); setGeneratedDecks(false);}}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Presentation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Slide List */}
        <div className="lg:col-span-1 glass-card p-6 flex flex-col gap-6 max-h-[600px] overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Outline ({slides.length} Slides)</span>
            <Grid className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-3">
            {slides.map((slide, i) => (
              <div 
                key={i} 
                onClick={() => setActiveSlideIndex(i)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${activeSlideIndex === i ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400">#{i + 1}</span>
                  <span className="text-xs font-bold text-slate-700 truncate">{slide.title}</span>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="p-3 rounded-xl border border-dashed border-orange-300 bg-orange-50/50 animate-pulse flex items-center gap-3">
                <Loader2 className="w-3 h-3 text-orange-500 animate-spin" />
                <span className="text-xs font-medium text-orange-600">Generating slide...</span>
              </div>
            )}
            {slides.length === 0 && !isGenerating && (
              <p className="text-xs text-slate-400 text-center py-8">No slides added yet.</p>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card aspect-video bg-slate-100 rounded-[32px] overflow-hidden relative flex flex-col p-1 border-none shadow-2xl">
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-[31px]">
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-bold text-slate-900">Live Canvas</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8 relative">
              <AnimatePresence mode="wait">
                {isAssembling ? (
                  <motion.div 
                    key="assembling"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-6"
                  >
                    <div className="w-24 h-24 mx-auto relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-orange-100 border-t-orange-500 rounded-full"
                      />
                      <Presentation className="w-10 h-10 text-orange-500 absolute inset-0 m-auto" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold">{status}</p>
                      <div className="w-64 h-1 bg-slate-200 rounded-full overflow-hidden mx-auto mt-4">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-orange-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : slides.length > 0 ? (
                  <motion.div 
                    key={activeSlideIndex}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-full h-full bg-white rounded-2xl shadow-xl p-10 flex flex-col space-y-4"
                  >
                    <div className="flex items-center gap-2 text-orange-600">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Slide {activeSlideIndex + 1}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">{slides[activeSlideIndex].title}</h2>
                    <div className="space-y-3 pt-4">
                      {slides[activeSlideIndex].bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5" />
                          <p className="text-sm text-slate-600 font-medium">{b}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>ScholarMind AI Studio</span>
                      <span>Page {activeSlideIndex + 1} / {slides.length}</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center space-y-4">
                    <Presentation className="w-12 h-12 text-slate-200 mx-auto" />
                    <p className="text-slate-400 text-sm font-medium">Add a slide prompt to begin building your deck.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">New Slide Prompt</label>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-bold">PRO</span>
              </div>
            </div>
            <div className="flex gap-4">
              <textarea 
                value={currentPrompt}
                onChange={(e) => setCurrentPrompt(e.target.value)}
                placeholder="Ex: Explain the methodology used in the CRISPR study..."
                className="flex-1 h-20 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/10 resize-none"
              />
              <button 
                onClick={handleAddSlide}
                disabled={!currentPrompt || isGenerating}
                className="px-6 bg-orange-500 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Add Slide
              </button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-900">Project Controls</h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-700 uppercase">Export Options</span>
                </div>
                <select className="w-full bg-white border border-slate-200 rounded-lg p-2 text-[10px] font-bold text-slate-500">
                  <option>PowerPoint (.pptx)</option>
                  <option>PDF Document (.pdf)</option>
                  <option>Google Slides</option>
                </select>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                <span className="text-[10px] font-bold text-slate-700 uppercase">Visual Theme</span>
                <div className="grid grid-cols-2 gap-2">
                  {['Minimal', 'Corporate', 'Academic', 'Creative'].map(t => (
                    <button key={t} className="py-2 bg-white border border-slate-200 rounded-lg text-[9px] font-bold text-slate-500 hover:border-orange-500 hover:text-orange-600 transition-all">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleAssemble}
              disabled={slides.length === 0 || isAssembling}
              className={`w-full py-4 premium-gradient text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 ${slides.length === 0 && 'opacity-50 cursor-not-allowed'}`}
            >
              <Presentation className="w-4 h-4" />
              Generate Deck
            </button>

            {generatedDecks && (
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 animate-in slide-in-from-bottom-2">
                <Download className="w-4 h-4" />
                Download Files
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

