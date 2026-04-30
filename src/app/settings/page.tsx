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
  ExternalLink
} from "lucide-react";
import { useState } from "react";

const sidebarItems = [
  { id: "general", label: "General", icon: Settings },
  { id: "profile", label: "Research Profile", icon: User },
  { id: "ai", label: "AI Connections", icon: Cpu },
  { id: "security", label: "Security & Keys", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const aiProviders = [
  { 
    id: "gemini", 
    name: "Google Gemini", 
    desc: "Primary research & summarization engine", 
    status: "connected",
    icon: Globe,
    color: "text-blue-500"
  },
  { 
    id: "openai", 
    name: "OpenAI GPT-4", 
    desc: "Used for complex reasoning tasks", 
    status: "warning",
    icon: Database,
    color: "text-emerald-500"
  },
  { 
    id: "claude", 
    name: "Anthropic Claude", 
    desc: "Scientific paper analysis expert", 
    status: "disconnected",
    icon: Cloud,
    color: "text-orange-500"
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("ai");
  const [geminiKey, setGeminiKey] = useState("••••••••••••••••••••••••");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-sm text-slate-500 font-medium">Manage your academic OS environment and AI integrations.</p>
        </div>
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
            className="glass-card p-10 space-y-10"
          >
            {activeTab === "ai" && (
              <>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-900">AI Model Connections</h2>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Configure your preferred AI providers. ScholarMind AI will automatically switch between models based on the complexity of the research task.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {aiProviders.map((provider) => (
                    <div key={provider.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between group hover:border-indigo-200 transition-all">
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm ${provider.color}`}>
                          <provider.icon className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900">{provider.name}</h3>
                            {provider.status === "connected" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                            {provider.status === "warning" && <AlertCircle className="w-3.5 h-3.5 text-orange-500" />}
                          </div>
                          <p className="text-xs text-slate-500 font-medium">{provider.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {provider.status === "connected" ? (
                          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 uppercase tracking-widest">Configure</button>
                        ) : (
                          <button className="px-4 py-2 premium-gradient text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-md">Connect API</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Key className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-sm font-bold text-slate-900">Primary Gemini API Key</h3>
                    </div>
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-[10px] font-bold text-indigo-600 uppercase hover:underline flex items-center gap-1">
                      Get Key <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="relative">
                    <input 
                      type="password" 
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      className="w-full h-14 pl-6 pr-24 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
                      Save Key
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Keys are encrypted at rest and never shared. We recommend using a limited-scope key for production environments.
                  </p>
                </div>
              </>
            )}

            {activeTab !== "ai" && (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-slate-200" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Under Construction</h3>
                  <p className="text-sm text-slate-500 max-w-xs">The {activeTab} settings are currently being optimized for the next release.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
