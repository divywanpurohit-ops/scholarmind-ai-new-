"use client";

import { useState, useRef } from "react";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { 
  FileSpreadsheet, Upload, Table as TableIcon, BarChart3, 
  Settings2, Download, Trash2, ChevronRight, Calculator,
  TrendingUp, PieChart as PieIcon, LineChart as LineIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DataAnalyzer() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedX, setSelectedX] = useState("");
  const [selectedY, setSelectedY] = useState("");
  const [chartType, setChartType] = useState<"bar" | "line" | "pie" | "area">("bar");
  const [stats, setStats] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b", "#10b981", "#06b6d4"];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          processData(results.data);
        }
      });
    } else {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const parsedData = XLSX.utils.sheet_to_json(ws);
        processData(parsedData);
      };
      reader.readAsBinaryString(file);
    }
  };

  const processData = (rawData: any[]) => {
    if (rawData.length === 0) return;
    setData(rawData);
    const keys = Object.keys(rawData[0]);
    setHeaders(keys);
    setSelectedX(keys[0]);
    
    // Auto-select a numeric Y
    const numericKey = keys.find(k => typeof rawData[0][k] === "number") || keys[1];
    setSelectedY(numericKey);
    
    calculateStats(rawData, numericKey);
  };

  const calculateStats = (rawData: any[], yKey: string) => {
    const values = rawData.map(d => d[yKey]).filter(v => typeof v === "number");
    if (values.length === 0) {
      setStats(null);
      return;
    }
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    const sorted = [...values].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    setStats({ mean, median, min, max, count: values.length });
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BarChart3 className="text-white w-7 h-7" />
          </div>
          Advanced Data Analyzer
        </h1>
        <p className="text-slate-500 mt-2 ml-15">Upload research data, analyze variables, and generate statistical insights.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar Controls */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-6 sticky top-8">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Import Data</label>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".csv, .xlsx, .xls"
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-200 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group"
              >
                <Upload className="w-8 h-8 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                <span className="text-xs font-bold text-slate-500 group-hover:text-indigo-600">Upload CSV / Excel</span>
              </button>
            </div>

            {headers.length > 0 && (
              <>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Variable Mapping</label>
                  <div>
                    <span className="text-[10px] font-bold text-indigo-500 block mb-1">X-Axis (Variable 1)</span>
                    <select 
                      value={selectedX} 
                      onChange={(e) => setSelectedX(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500/20"
                    >
                      {headers.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-indigo-500 block mb-1">Y-Axis (Variable 2)</span>
                    <select 
                      value={selectedY} 
                      onChange={(e) => {
                        setSelectedY(e.target.value);
                        calculateStats(data, e.target.value);
                      }}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500/20"
                    >
                      {headers.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Visualization Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "bar", icon: BarChart3, label: "Bar" },
                      { id: "line", icon: LineIcon, label: "Line" },
                      { id: "pie", icon: PieIcon, label: "Pie" },
                      { id: "area", icon: TrendingUp, label: "Area" }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setChartType(type.id as any)}
                        className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                          chartType === type.id 
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-indigo-400"
                        }`}
                      >
                        <type.icon className="w-4 h-4" />
                        <span className="text-[10px] font-bold">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          {data.length > 0 ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats && [
                  { label: "Mean (Avg)", value: stats.mean.toFixed(2), icon: Calculator, color: "bg-indigo-500" },
                  { label: "Median", value: stats.median, icon: Settings2, color: "bg-purple-500" },
                  { label: "Range (Max)", value: stats.max, icon: TrendingUp, color: "bg-emerald-500" },
                  { label: "Total Samples", value: stats.count, icon: TableIcon, color: "bg-amber-500" }
                ].map((s) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={s.label} 
                    className="glass-panel p-5 rounded-2xl flex items-center gap-4"
                  >
                    <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-white`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                      <p className="text-lg font-bold text-slate-900">{s.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chart */}
              <div className="glass-panel p-8 rounded-[2.5rem] min-h-[500px] flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Dynamic Relationship</h2>
                    <p className="text-xs text-slate-500 font-medium">{selectedX} vs {selectedY}</p>
                  </div>
                  <button className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white transition-all">
                    <Download className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
                
                <div className="flex-1 w-full min-h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "bar" ? (
                      <BarChart data={data.slice(0, 50)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey={selectedX} fontSize={10} fontWeight={700} stroke="#64748b" />
                        <YAxis fontSize={10} fontWeight={700} stroke="#64748b" />
                        <Tooltip contentStyle={{ borderRadius: "1rem", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                        <Legend />
                        <Bar dataKey={selectedY} fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    ) : chartType === "line" ? (
                      <LineChart data={data.slice(0, 50)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey={selectedX} fontSize={10} stroke="#64748b" />
                        <YAxis fontSize={10} stroke="#64748b" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={selectedY} stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    ) : chartType === "area" ? (
                      <AreaChart data={data.slice(0, 50)}>
                        <defs>
                          <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey={selectedX} fontSize={10} stroke="#64748b" />
                        <YAxis fontSize={10} stroke="#64748b" />
                        <Tooltip />
                        <Area type="monotone" dataKey={selectedY} stroke="#6366f1" fillOpacity={1} fill="url(#colorY)" strokeWidth={3} />
                      </AreaChart>
                    ) : (
                      <PieChart>
                        <Pie
                          data={data.slice(0, 10)}
                          dataKey={selectedY}
                          nameKey={selectedX}
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          label
                        >
                          {data.slice(0, 10).map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Table Preview */}
              <div className="glass-panel p-6 rounded-3xl overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">Data Preview (First 10 Rows)</h3>
                  <span className="text-[10px] font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">Total Rows: {data.length}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {headers.map(h => (
                          <th key={h} className="py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.slice(0, 10).map((row, i) => (
                        <tr key={i} className="border-b border-slate-50 last:border-none hover:bg-slate-50 transition-colors">
                          {headers.map(h => (
                            <td key={h} className="py-3 px-4 text-xs font-bold text-slate-600">{row[h]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <FileSpreadsheet className="w-12 h-12 text-slate-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">No Data Loaded</h2>
              <p className="text-slate-500 mt-2 max-w-sm">Upload an Excel or CSV file to start analyzing your research variables and generating statistical insights.</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="mt-8 px-8 py-4 premium-gradient text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all"
              >
                Upload Dataset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
