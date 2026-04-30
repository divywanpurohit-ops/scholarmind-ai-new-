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
  RefreshCcw,
  Clock,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function VideoStudio() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAssembling, setIsAssembling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [scenes, setScenes] = useState<{prompt: string, status: string}[]>([]);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState(false);
  
  // TTL States
  const [showTTL, setShowTTL] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showTTL && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleReset();
    }
    return () => clearInterval(timer);
  }, [showTTL, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddScene = async () => {
    if (!currentPrompt) return;
    setIsGenerating(true);
    
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

  const handleDownload = () => {
    if (!generatedVideo) return;
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', 'scholarmind_simulation.mp4');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Start TTL
    setShowTTL(true);
    setTimeLeft(3600); // Reset to 1 hour
  };

  const handleReset = () => {
    setScenes([]);
    setGeneratedVideo(false);
    setShowTTL(false);
    setTimeLeft(3600);
  };

  return (
    <div className="space-y-8 p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Video Studio</h1>
            <p className="text-sm text-slate-500 font-medium">Create multi-scene scientific simulations with temporary 1-hour secure storage.</p>
          </div>
        </div>
        
        <AnimatePresence>
          {showTTL && (
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="flex items-center gap-4 bg-rose-50 border border-rose-100 px-6 py-3 rounded-2xl shadow-sm"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Erasure In</span>
                <span className="text-sm font-black text-rose-600 font-mono">{formatTime(timeLeft)}</span>
              </div>
              <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-600/20">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scene Canvas */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel aspect-video bg-slate-900 rounded-[3rem] overflow-hidden relative flex items-center justify-center group border-none shadow-2xl">
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
                      className="absolute inset-0 border-b-2 border-indigo-500 rounded-full"
                    />
                    <div className="absolute inset-4 bg-indigo-500/10 rounded-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-white text-lg font-bold mb-2">{status}</p>
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-400">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-widest">Master Simulation Ready</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white tracking-tight leading-tight max-w-xl mx-auto">
                      {scenes.length} High-Fidelity Scenes Compiled & Encrypted
                    </h2>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-24 h-24 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl mx-auto cursor-pointer group-hover:bg-white/20 transition-all"
                    >
                      <Play className="w-10 h-10 text-white fill-white ml-1" />
                    </motion.div>
                  </div>
                </motion.div>
              ) : scenes.length > 0 ? (
                <motion.div 
                  key={activeSceneIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="absolute inset-0 bg-indigo-900/20 backdrop-blur-md" />
                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-600/20">
                      <span className="text-[10px] font-black uppercase tracking-widest">Active Scene {activeSceneIndex + 1}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white max-w-lg leading-relaxed">{scenes[activeSceneIndex].prompt}</h2>
                    <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em]">Live Render Status: {scenes[activeSceneIndex].status}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-6 text-center z-10">
                  <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center mb-4 shadow-inner">
                    <Video className="w-12 h-12 text-white/20" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Scientific Animation Studio</h2>
                  <p className="text-slate-400 font-medium max-w-sm">Describe complex physical or molecular interactions to build a professional research video.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex-1 py-5 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-3 uppercase tracking-widest">
              <Share2 className="w-5 h-5" />
              Secure Link
            </button>
            <button 
              onClick={handleDownload}
              disabled={!generatedVideo}
              className={`flex-1 py-5 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-700 hover:border-emerald-400 hover:text-emerald-600 transition-all flex items-center justify-center gap-3 uppercase tracking-widest ${!generatedVideo && 'opacity-50 cursor-not-allowed'}`}
            >
              <Download className="w-5 h-5" />
              Download 4K MP4
            </button>
          </div>
        </div>

        {/* Scene Management Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-8 space-y-8 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-indigo-500" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Storyboard ({scenes.length})</h3>
              </div>
              <Settings2 className="w-4 h-4 text-slate-400 hover:text-indigo-600 cursor-pointer" />
            </div>

            <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
              <AnimatePresence>
                {scenes.map((scene, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setActiveSceneIndex(i)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${activeSceneIndex === i ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scene {i + 1}</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-tighter">Rendered</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 line-clamp-2">{scene.prompt}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isGenerating && (
                <div className="p-4 rounded-2xl border border-dashed border-indigo-300 bg-indigo-50/50 flex items-center gap-4 animate-pulse">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                  </div>
                  <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Rendering...</span>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Describe Next Scene</label>
                <textarea 
                  value={currentPrompt}
                  onChange={(e) => setCurrentPrompt(e.target.value)}
                  placeholder="E.g. Zoom into the atomic nucleus..."
                  className="w-full h-28 p-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 resize-none shadow-inner"
                />
              </div>
              <button 
                onClick={handleAddScene}
                disabled={!currentPrompt || isGenerating}
                className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                Add Scene
              </button>
            </div>

            <button 
              onClick={handleAssemble}
              disabled={scenes.length === 0 || isAssembling || generatedVideo}
              className={`w-full py-5 premium-gradient text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 ${ (scenes.length === 0 || isAssembling || generatedVideo) && 'opacity-50 cursor-not-allowed'}`}
            >
              <Video className="w-5 h-5" />
              Compile 4K Film
            </button>
            
            {generatedVideo && (
              <button 
                onClick={handleReset}
                className="w-full py-3 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-3 h-3" />
                Discard & Start New
              </button>
            )}
          </div>
          
          <div className="glass-panel p-6 bg-amber-50 border-amber-100 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <p className="text-[10px] font-bold text-amber-800 leading-relaxed uppercase tracking-tight">
              Privacy Alert: All rendered assets are cached for exactly 1 hour after first download. Ensure local storage is secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
