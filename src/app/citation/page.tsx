"use client";

import { 
  Quote, 
  Search, 
  Copy, 
  CheckCircle2, 
  Download,
  BookOpen,
  Link as LinkIcon,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CitationGenerator() {
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [citation, setCitation] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!query) return;
    setIsGenerating(true);
    setCitation(null);

    // Simulate API call to fetch metadata and generate citations
    setTimeout(() => {
      const mockCitation = {
        title: "Quantum Decryption Algorithms in Post-Silicon Era",
        authors: "Zhang, L., Schmidt, M., et al.",
        year: "2024",
        journal: "Nature",
        formats: [
          { style: "APA (7th ed.)", text: "Zhang, L., & Schmidt, M. (2024). Quantum Decryption Algorithms in Post-Silicon Era. Nature, 625(1), 112-118. https://doi.org/10.1038/s41586-024-0012-x" },
          { style: "MLA (9th ed.)", text: "Zhang, L., and M. Schmidt. \"Quantum Decryption Algorithms in Post-Silicon Era.\" Nature, vol. 625, no. 1, 2024, pp. 112-118." },
          { style: "Chicago (17th ed.)", text: "Zhang, L., and M. Schmidt. \"Quantum Decryption Algorithms in Post-Silicon Era.\" Nature 625, no. 1 (2024): 112-118." },
          { style: "Harvard", text: "Zhang, L. and Schmidt, M., 2024. Quantum Decryption Algorithms in Post-Silicon Era. Nature, 625(1), pp.112-118." },
        ]
      };
      setCitation(mockCitation);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Quote className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Citation Generator</h1>
            <p className="text-sm text-slate-500 font-medium">Instantly format citations in APA, MLA, Chicago, and more.</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-900">Enter URL, DOI, ISBN, or Title</label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400">
              {query.includes("http") ? <LinkIcon className="w-5 h-5" /> : 
               query.includes("10.") ? <BookOpen className="w-5 h-5" /> : 
               <Search className="w-5 h-5" />}
            </div>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., https://doi.org/10.1038/s41586-024-0012-x"
              className="w-full pl-12 pr-32 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button 
              onClick={handleGenerate}
              disabled={!query || isGenerating}
              className="absolute right-2 px-6 py-2 premium-gradient text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate"}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {citation && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 flex items-start gap-4 bg-indigo-50/50">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{citation.title}</h3>
                <p className="text-sm text-slate-600 font-medium">{citation.authors} • {citation.year} • {citation.journal}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {citation.formats.map((format: any, i: number) => (
                <div key={i} className="glass-card p-6 space-y-4 group hover:border-sky-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-lg">
                      {format.style}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(format.text, i)}
                      className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                    >
                      {copiedIndex === i ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed pl-4 border-l-2 border-slate-200 group-hover:border-sky-400 transition-all">
                    {format.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                <Download className="w-4 h-4" />
                Export as BibTeX
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
