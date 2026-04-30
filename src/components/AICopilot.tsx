"use client";

import { 
  Bot, 
  Sparkles, 
  Search, 
  Send,
  MoreHorizontal,
  ChevronRight,
  FileSearch,
  Lightbulb,
  Zap,
  Loader2,
  Trash2
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 नमस्ते! मैं ScholarMind AI Research Copilot हूँ। आप मुझसे कुछ भी पूछ सकते हैं — research, poetry, coding, thoughts, कुछ भी! मैं Gemini AI से powered हूँ।" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendToGemini = async (allMessages: Message[]) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, { role: "assistant", content: `⚠️ Error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Network error. Please check your connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    sendToGemini(updatedMessages);
  };

  const handleAction = (action: string) => {
    if (isLoading) return;
    const userMsg: Message = { role: "user", content: action };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    sendToGemini(updatedMessages);
  };

  const clearChat = () => {
    setMessages([
      { role: "assistant", content: "🔄 Chat cleared! Ask me anything — research, poetry, coding, या कुछ भी!" }
    ]);
  };

  return (
    <div className="w-[380px] h-screen bg-white border-l border-slate-200 flex flex-col relative overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Research Copilot</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active • Gemini 2.0 Flash</span>
            </div>
          </div>
        </div>
        <button onClick={clearChat} className="p-2 text-slate-400 hover:text-rose-500 transition-all" title="Clear Chat">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm whitespace-pre-wrap ${
                msg.role === "user" 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none"
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-none bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
              <span className="text-xs font-medium text-slate-500">Thinking...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-4 space-y-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Smart Actions</p>
        <div className="flex flex-col gap-2">
          {[
            { label: "Explain a concept to me", icon: Lightbulb },
            { label: "Write me a poem", icon: Sparkles },
            { label: "Find research papers on AI", icon: Search }
          ].map((action) => (
            <button 
              key={action.label}
              onClick={() => handleAction(action.label)}
              disabled={isLoading}
              className="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-400 hover:bg-white transition-all group disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:bg-indigo-50 transition-all">
                  <action.icon className="w-4 h-4 text-slate-500 group-hover:text-indigo-600" />
                </div>
                <span className="text-xs font-bold text-slate-700">{action.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-6 pt-2">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="w-full h-14 pl-6 pr-16 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 premium-gradient text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
