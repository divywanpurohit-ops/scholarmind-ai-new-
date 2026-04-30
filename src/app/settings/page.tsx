"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  User, 
  Shield, 
  Cpu, 
  Globe, 
  Bell, 
  CreditCard,
  Key,
  Database,
  Cloud,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Save,
  Trash2,
  Video,
  Search,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";

const sidebarItems = [
  { id: "ai", label: "AI Connections", icon: Cpu },
  { id: "keys", label: "API Keys Management", icon: Key },
  { id: "profile", label: "Research Profile", icon: User },
  { id: "general", label: "General", icon: Settings },
  { id: "security", label: "Security & Keys", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("keys");
  const [keys, setKeys] = useState({
    gemini: "",
    video: "",
    search: "",
    writing: ""
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load from local storage
    const savedKeys = localStorage.getItem("scholarmind_api_keys");
    if (savedKeys) {
      setKeys(JSON.parse(savedKeys));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("scholarmind_api_keys", JSON.stringify(keys));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const clearKeys = () => {
    if (confirm("Are you sure you want to remove all API keys?")) {
      const empty = { gemini: "", video: "", search: "", writing: "" };
      setKeys(empty);
      localStorage.removeItem("scholarmind_api_keys");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
            <p className="text-sm text-slate-500 font-medium">Manage your academic OS environment and tool APIs.</p>
          </div>
        </div>
        
        {isSaved && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100 font-bold text-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            Config Saved Successfully
          </motion.div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Settings Sidebar */}
        <div className="lg:w-64 flex-shrink-0 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? "bg-white text-indigo-600 shadow-sm border border-slate-200" 
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-panel p-10 space-y-10"
          >
            {activeTab === "keys" && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900">API Key Management</h2>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      Connect your own API providers to power ScholarMind's research tools.
                    </p>
                  </div>
                  <button 
                    onClick={clearKeys}
                    className="p-3 text-slate-400 hover:text-rose-500 transition-all bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Gemini Key */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Google Gemini Pro / Flash</span>
                      </div>
                      <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-[10px] font-bold text-indigo-600 uppercase hover:underline">Get Key</a>
                    </div>
                    <input 
                      type="password" 
                      placeholder="Enter Gemini API Key..."
                      value={keys.gemini}
                      onChange={(e) => setKeys({...keys, gemini: e.target.value})}
                      className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                    />
                  </div>

                  {/* Video Studio Key */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-purple-500" />
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Video Studio Rendering Engine</span>
                    </div>
                    <input 
                      type="password" 
                      placeholder="Enter Rendering Engine Key (Optional)..."
                      value={keys.video}
                      onChange={(e) => setKeys({...keys, video: e.target.value})}
                      className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                    />
                  </div>

                  {/* Academic Search Key */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Cross-Publisher Search API</span>
                    </div>
                    <input 
                      type="password" 
                      placeholder="Enter Search Provider Key..."
                      value={keys.search}
                      onChange={(e) => setKeys({...keys, search: e.target.value})}
                      className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    Keys are stored locally only
                  </div>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-8 py-4 premium-gradient text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Configuration
                  </button>
                </div>
              </>
            )}

            {activeTab !== "keys" && (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-slate-200" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Module Under Update</h3>
                  <p className="text-sm text-slate-500 max-w-xs">The {activeTab} section is being refined for academic use.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
