"use client";

import { 
  Video, 
  Sparkles, 
  Play, 
  Settings2, 
  Share2, 
  Download,
  Mic,
  Music,
  Monitor,
  Loader2,
  CheckCircle2,
  RefreshCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function VideoStudio() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAssembling, setIsAssembling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [scenes, setScenes] = useState<{prompt: string, status: string}[]>([]);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState(false);

  const handleAddScene = async () => {
    if (!currentPrompt) return;
    setIsGenerating(true);
    
    // Simulate scene generation
    setTimeout(() => {
      const newScene = {
        prompt: currentPrompt,
        status: "Rendered"
      };
      setScenes([...scenes, newScene]);
      setActiveSceneIndex(scenes.length);
      setCurrentPrompt("");
      setIsGenerating(false);
    }, 1500);
  };

  const handleAssemble = () => {
    if (scenes.length === 0) return;
    setIsAssembling(true);
    setProgress(0);
    
    const steps = [
      { p: 15, s: "Stitching scenes together..." },
      { p: 35, s: "Synchronizing AI narration..." },
      { p: 60, s: "Applying physics engine overlays..." },
      { p: 85, s: "Encoding high-fidelity MP4..." },
      { p: 100, s: "Finalizing Export..." },
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
          setGeneratedVideo(true);
        }, 500);
      }
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Video Studio</h1>
            <p className="text-sm text-slate-500 font-medium">Create multi-scene scientific simulations step-by-step.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {setScenes([]); setGeneratedVideo(false);}}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            New Simulation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scene Canvas */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card aspect-video bg-slate-900 rounded-[32px] overflow-hidden relative flex items-center justify-center group border-none shadow-2xl">
            <AnimatePresence mode="wait">
              {isAssembling ? (
                <motion.div 
                  key="assembling"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6 text-center z-20"
                >
                  <div className="relative w-24 h-24">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-b-2 border-rose-500 rounded-full"
                    />
                    <div className="absolute inset-4 bg-rose-500/10 rounded-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-rose-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-white text-lg font-bold mb-2">{status}</p>
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-rose-500"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : generatedVideo ? (
                <motion.div 
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000')] bg-cover bg-center opacity-40 grayscale" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />
                  
                  <div className="relative z-10 text-center space-y-6 p-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full text-rose-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Full Simulation Ready</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight leading-tight max-w-lg">
                      {scenes.length} Scenes Successfully Compiled
                    </h2>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl mx-auto"
                    >
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </motion.div>
                  </div>
                </motion.div>
              ) : scenes.length > 0 ? (
                <motion.div 
                  key={activeSceneIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="absolute inset-0 bg-rose-900/20 backdrop-blur-sm" />
                  <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500 text-white rounded-full">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Scene {activeSceneIndex + 1}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white max-w-md">{scenes[activeSceneIndex].prompt}</h2>
                    <p className="text-rose-300 text-xs font-mono">STATUS: {scenes[activeSceneIndex].status}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-center z-10">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Video className="w-10 h-10 text-white/20" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Simulation Studio</h2>
                  <p className="text-slate-400 font-medium max-w-xs">Add scenes step-by-step to build a complex scientific animation.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:border-rose-400 hover:text-rose-600 transition-all flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Simulation
            </button>
            <button 
              disabled={!generatedVideo}
              className={`flex-1 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:border-rose-400 hover:text-rose-600 transition-all flex items-center justify-center gap-2 ${!generatedVideo && 'opacity-50 cursor-not-allowed'}`}
            >
              <Download className="w-4 h-4" />
              Download MP4
            </button>
          </div>
        </div>

        {/* Scene Management Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Storyboard ({scenes.length})</h3>
              <Settings2 className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
              {scenes.map((scene, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveSceneIndex(i)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${activeSceneIndex === i ? 'border-rose-500 bg-rose-50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Scene {i + 1}</p>
                  <p className="text-xs font-bold text-slate-700 truncate">{scene.prompt}</p>
                </div>
              ))}
              {isGenerating && (
                <div className="p-3 rounded-xl border border-dashed border-rose-300 bg-rose-50/50 flex items-center gap-3 animate-pulse">
                  <Loader2 className="w-3 h-3 text-rose-500 animate-spin" />
                  <span className="text-xs font-medium text-rose-600">Rendering scene...</span>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Next Scene Prompt</label>
                <textarea 
                  value={currentPrompt}
                  onChange={(e) => setCurrentPrompt(e.target.value)}
                  placeholder="Describe the molecular movement..."
                  className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-4 focus:ring-rose-500/10 resize-none shadow-inner"
                />
              </div>
              <button 
                onClick={handleAddScene}
                disabled={!currentPrompt || isGenerating}
                className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-rose-400 hover:text-rose-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                Add Scene
              </button>
            </div>

            <button 
              onClick={handleAssemble}
              disabled={scenes.length === 0 || isAssembling}
              className={`w-full py-4 premium-gradient text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 ${scenes.length === 0 && 'opacity-50 cursor-not-allowed'}`}
            >
              <Video className="w-4 h-4" />
              Compile Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
