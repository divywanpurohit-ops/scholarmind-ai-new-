"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopSearch from "@/components/TopSearch";
import AICopilot from "@/components/AICopilot";
import BottomDock from "@/components/BottomDock";
import SplashScreen from "@/components/SplashScreen";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onFinish={() => setShowSplash(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex h-screen bg-slate-50 overflow-hidden"
          >
            {/* Column 1: Sidebar */}
            <Sidebar />

            {/* Column 2: Main Content */}
            <div className="flex-1 flex flex-col min-w-0 relative h-full">
              <TopSearch />
              <main className="flex-1 overflow-y-auto custom-scrollbar p-8 pb-32">
                {children}
              </main>
              <BottomDock />
            </div>

            {/* Column 3: AI Copilot */}
            <AICopilot />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

