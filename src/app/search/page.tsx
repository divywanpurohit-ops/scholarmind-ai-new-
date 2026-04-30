"use client";

import { 
  Search, 
  Filter, 
  Download, 
  Bookmark, 
  Quote, 
  Languages, 
  Sparkles, 
  FileText,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Users,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Modal } from "@/components/ui/Modal";

const publishers = [
  "Google Scholar", "PubMed", "Springer", "Elsevier", "Nature", "ScienceDirect", "Wiley", "IEEE Xplore", "arXiv"
];

const results = [
  {
    title: "Quantum Decryption Algorithms in Post-Silicon Era",
    authors: "L. Zhang, M. Schmidt, et al.",
    abstract: "This paper explores the theoretical foundations of quantum-resistant decryption in architectures beyond 2nm silicon. We propose a new class of lattices...",
    doi: "10.1038/s41586-024-0012-x",
    publisher: "Nature",
    citations: 142,
    year: "2024",
    tags: ["Quantum", "Security", "Hardware"]
  },
  {
    title: "Machine Learning in Molecular Dynamics: A Review",
    authors: "K. Chandra, A. Gupta",
    abstract: "The integration of neural networks into molecular dynamics simulations has accelerated the discovery of new catalysts for green energy applications...",
    doi: "10.1021/acs.jpcc.3c0892",
    publisher: "ACS Publications",
    citations: 89,
    year: "2023",
    tags: ["ML", "Chemistry", "Energy"]
  },
  {
    title: "Distributed Ledger Technology for Peer-to-Peer Energy Trading",
    authors: "R. Sharma, J. Doe",
    abstract: "We present a decentralized framework for energy trading in microgrids using advanced blockchain consensus protocols that minimize latency...",
    doi: "10.1109/TPWRS.2024.335412",
    publisher: "IEEE Xplore",
    citations: 56,
    year: "2024",
    tags: ["Blockchain", "Smart Grid", "Energy"]
  }
];

export default function AcademicSearch() {
  const [activePublisher, setActivePublisher] = useState("Google Scholar");
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const externalLinks = [
    { name: "Google Scholar", icon: Globe, url: `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}` },
    { name: "PubMed", icon: Search, url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}` },
    { name: "arXiv", icon: FileText, url: `https://arxiv.org/search/?query=${encodeURIComponent(query)}&searchtype=all` },
    { name: "Semantic Scholar", icon: TrendingUp, url: `https://www.semanticscholar.org/search?q=${encodeURIComponent(query)}` },
  ];

  const handleSummarize = async (paper: any) => {
    setSummarizingId(paper.doi);
    try {
      const content = `Title: ${paper.title}\n\nAbstract Snippet: ${paper.abstract}`;
      
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      
      if (data.error) {
        setModalTitle("Error");
        setModalContent(data.error);
        setIsModalOpen(true);
      } else {
        setModalTitle(`AI Summary: ${paper.title}`);
        setModalContent(data.summary || data.result); // Supporting both possible API responses
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Summarization failed:", error);
      setModalTitle("Error");
      setModalContent("Failed to connect to the AI service. Please try again later.");
      setIsModalOpen(true);
    } finally {
      setSummarizingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
        icon={<Sparkles className="w-5 h-5" />}
      >
        <div className="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
          {modalContent}
        </div>
      </Modal>

      {/* Search Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {query ? `Search results for "${query}"` : "Academic Search"}
            </h1>
            <p className="text-sm text-slate-500 font-medium">Deep-indexing 200M+ research papers across all major repositories.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 premium-gradient text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20">
              <TrendingUp className="w-4 h-4" />
              Impact Analytics
            </button>
          </div>
        </div>

        {/* External Redirect Cards */}
        {query && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            {externalLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center justify-between group hover:border-indigo-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                    <link.icon className="w-4 h-4 text-indigo-600 group-hover:text-white transition-all" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Open in {link.name}</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-indigo-600 transition-all" />
              </a>
            ))}
          </div>
        )}

        {/* Publisher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {publishers.map((pub) => (
            <button
              key={pub}
              onClick={() => setActivePublisher(pub)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold border transition-all whitespace-nowrap ${
                activePublisher === pub 
                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                : "bg-white border-slate-200 text-slate-500 hover:border-indigo-400 hover:text-indigo-600"
              }`}
            >
              {pub}
            </button>
          ))}
        </div>
      </div>

      {/* Results List */}
      <div className="grid gap-6">
        {results.map((paper, i) => (
          <motion.div
            key={paper.doi}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 group"
          >
            <div className="flex gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                      <span>{paper.publisher}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span>{paper.year}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight cursor-pointer">
                      {paper.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <button className="p-2 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{paper.authors}</span>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 font-medium">
                  {paper.abstract}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {paper.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-200">
                      {tag}
                    </span>
                  ))}
                  <div className="flex-1" />
                  <div className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg border border-indigo-100">
                    <Quote className="w-3 h-3" />
                    {paper.citations} Citations
                  </div>
                </div>
              </div>

              <div className="w-48 flex flex-col gap-3">
                <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button 
                  onClick={() => handleSummarize(paper)}
                  disabled={summarizingId === paper.doi}
                  className={`w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 ${summarizingId === paper.doi ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Sparkles className={`w-4 h-4 ${summarizingId === paper.doi ? 'animate-spin' : ''}`} />
                  {summarizingId === paper.doi ? 'Summarizing...' : 'AI Summarize'}
                </button>
                <button className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                  <Languages className="w-4 h-4" />
                  Translate
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

