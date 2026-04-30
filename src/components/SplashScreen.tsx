"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 1000); // Wait for fade out animation
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          {/* Floating Particles Simulation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  opacity: 0 
                }}
                animate={{ 
                  y: [null, "-100%"],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: Math.random() * 5 + 5, 
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
                className="absolute w-1 h-1 bg-indigo-200 rounded-full"
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            <div className="w-24 h-24 premium-gradient rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 glow-effect mb-8">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl font-bold tracking-tight text-slate-900 mb-2"
            >
              ScholarMind <span className="text-indigo-600">AI</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-slate-500 font-medium tracking-widest uppercase text-xs"
            >
              Research Beyond Limits
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              <span>AI Powered</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span>Secure</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span>Unlimited Research</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
