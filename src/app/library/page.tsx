"use client";

import { 
  Plus, 
  UploadCloud, 
  File, 
  MoreVertical, 
  Search, 
  Filter,
  FolderPlus,
  Link as LinkIcon,
  FileText,
  Trash2,
  Library
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const files = [
  { name: "Quantum_Computing_Review.pdf", type: "PDF", size: "2.4 MB", date: "2 hours ago" },
  { name: "Simulation_Results_v1.csv", type: "CSV", size: "12 MB", date: "Yesterday" },
  { name: "Conference_Draft.docx", type: "DOCX", size: "450 KB", date: "3 days ago" },
  { name: "Lab_Experiments.pptx", type: "PPTX", size: "8.1 MB", date: "Last week" },
];

export default function MyLibrary() {
  const [isDragging, setIsDragging] = useState(false);
  const [doi, setDoi] = useState("");

  const handleDoiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (doi.trim()) {
      alert(`DOI ${doi} submitted. ScholarMind is fetching metadata...`);
      setDoi("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Library className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Research Library</h1>
            <p className="text-sm text-slate-500 font-medium">Your private, encrypted repository for all research assets.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleDoiSubmit} className="relative group">
            <input 
              type="text" 
              value={doi}
              onChange={(e) => setDoi(e.target.value)}
              placeholder="Enter DOI (e.g. 10.1038/...)"
              className="h-12 pl-4 pr-32 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-64 shadow-sm"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
            >
              Add DOI
            </button>
          </form>
          <button className="flex items-center gap-2 px-6 py-3 premium-gradient text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">
            <FolderPlus className="w-4 h-4" />
            Create Project
          </button>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`relative border-2 border-dashed rounded-[32px] p-12 transition-all ${
          isDragging 
          ? "border-indigo-600 bg-indigo-50/50 scale-[0.99]" 
          : "border-slate-200 bg-white hover:border-indigo-400 hover:bg-slate-50/50"
        }`}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isDragging ? "bg-indigo-600 text-white animate-bounce" : "bg-indigo-50 text-indigo-600"}`}>
            <UploadCloud className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Drag & drop your research papers</h3>
            <p className="text-sm text-slate-500 font-medium">Support for PDF, DOCX, PPTX, CSV, and DOI URLs. Max file size 1GB.</p>
          </div>
          <div className="flex items-center gap-3 pt-4">
            <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
              Browse Files
            </button>
            <button className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center gap-2">
              <LinkIcon className="w-3.5 h-3.5" />
              Add DOI
            </button>
          </div>
        </div>
      </motion.div>

      {/* Files List */}
      <div className="glass-card overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h3 className="text-sm font-bold text-slate-900">Recent Uploads</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search workspace..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 w-64"
              />
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Size</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Added</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {files.map((file) => (
                <tr key={file.name} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-all">
                        <FileText className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md border border-slate-200 uppercase">
                      {file.type}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-xs font-medium text-slate-500">{file.size}</td>
                  <td className="px-8 py-4 text-xs font-medium text-slate-500">{file.date}</td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all"><File className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 transition-all"><Trash2 className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-all"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
