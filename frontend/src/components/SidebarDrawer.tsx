import { useState } from 'react';
import { X, CheckCircle2, Circle, Clock, Copy, Check, Sparkles, BookOpen, Layers, Terminal } from 'lucide-react';
import type { RoadmapNode } from '../data/roadmapData';

interface SidebarDrawerProps {
  node: RoadmapNode | null;
  onClose: () => void;
  status: 'not_started' | 'in_progress' | 'completed';
  onStatusChange: (nodeId: string, status: 'not_started' | 'in_progress' | 'completed') => void;
}

export default function SidebarDrawer({
  node,
  onClose,
  status,
  onStatusChange,
}: SidebarDrawerProps) {
  const [copied, setCopied] = useState(false);

  if (!node) return null;

  const handleCopyCode = async () => {
    const code = node.example;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden transition-all duration-300"
        onClick={onClose}
      />

      <aside
        className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-white border-l-4 border-slate-900 shadow-[-10px_0px_30px_rgba(0,0,0,0.15)] z-50 flex flex-col transition-all duration-300 ease-out translate-x-0 overflow-hidden"
        id="sidebar-drawer-container"
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b-2 border-slate-900 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] tracking-wider font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-300">
                {node.category}
              </span>
              <span className={`text-[10px] tracking-wider font-extrabold uppercase px-2 py-0.5 rounded border-2 ${
                node.difficulty === 'Beginner' 
                  ? 'bg-emerald-100 text-emerald-850 border-emerald-400' 
                  : node.difficulty === 'Intermediate' 
                  ? 'bg-amber-100 text-amber-850 border-amber-400' 
                  : 'bg-rose-100 text-rose-850 border-rose-400'
              }`}>
                {node.difficulty}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              {node.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-700 hover:text-slate-950 border-2 border-slate-900 bg-white hover:bg-slate-100 shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md transition-all cursor-pointer"
            aria-label="Close sidebar"
            id="close-sidebar-button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic scrollable body content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f9fafb]">
          
          {/* Status Switcher Board */}
          <div className="bg-yellow-50 rounded-lg p-5 border-2 border-slate-900 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            <h4 className="text-xs font-mono font-black tracking-wider text-slate-800 uppercase mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-900" />
              Your Progress Status
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => onStatusChange(node.id, 'not_started')}
                className={`py-2 px-3 rounded border-2 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  status === 'not_started'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-slate-500 border-slate-300 hover:text-slate-800 hover:border-slate-400'
                }`}
                id="status-not-started-button"
              >
                <Circle className="w-3.5 h-3.5 animate-pulse" />
                Unstarted
              </button>

              <button
                onClick={() => onStatusChange(node.id, 'in_progress')}
                className={`py-2 px-3 rounded border-2 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  status === 'in_progress'
                    ? 'bg-amber-300 text-amber-950 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-slate-500 border-slate-300 hover:text-amber-700 hover:border-amber-450'
                }`}
                id="status-learning-button"
              >
                <Clock className="w-3.5 h-3.5" />
                In Progress
              </button>

              <button
                onClick={() => onStatusChange(node.id, 'completed')}
                className={`py-2 px-3 rounded border-2 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  status === 'completed'
                    ? 'bg-emerald-400 text-emerald-950 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-slate-500 border-slate-300 hover:text-emerald-700 hover:border-emerald-450'
                }`}
                id="status-completed-button"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </button>
            </div>
          </div>

          {/* Core Concept Overview Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-black tracking-wider text-slate-700 uppercase flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-900" />
              Concept Overview
            </h4>
            <div className="bg-white rounded-lg p-5 border-2 border-slate-900 text-slate-800 text-sm leading-relaxed whitespace-pre-line font-medium shadow-[2px_2px_0px_rgba(0,0,0,1)]" id="concept-overview-content">
              {node.description}
            </div>
          </div>

          {/* Recommended tools and technologies */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-black tracking-wider text-slate-700 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
              Key Tools & Technologies
            </h4>
            <div className="grid gap-4" id="tools-list-container">
              {node.tools.map((tool, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border-2 border-slate-900 hover:bg-yellow-50/20 transition-all flex items-start shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  <div className="flex-1 mr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-black text-sm text-slate-900 font-sans">{tool.name}</span>
                      <span className={`text-[10px] px-2.5 py-0.5 border-2 rounded font-black font-mono ${
                        tool.type === 'Free/OSS' 
                          ? 'bg-emerald-105 text-emerald-800 border-emerald-400' 
                          : tool.type === 'Freemium'
                          ? 'bg-blue-105 text-blue-800 border-blue-400'
                          : 'bg-indigo-105 text-indigo-800 border-indigo-400'
                      }`}>
                        {tool.type}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-600 leading-normal font-sans">
                      {tool.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Example Block */}
          {node.example && (
            <div className="space-y-3 pb-8">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-black tracking-wider text-slate-700 uppercase flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-900" />
                  Hands-on Example
                </h4>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 text-xs text-slate-800 hover:text-slate-950 transition-all font-black bg-white hover:bg-slate-50 border-2 border-slate-900 px-3 py-1.5 rounded-md shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                  id="copy-code-button"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative rounded-lg overflow-hidden border-2 border-slate-900 bg-slate-950 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="absolute top-0 left-0 right-0 h-9 bg-slate-900 border-b border-slate-850 px-4 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">demo-setup-guide</span>
                </div>
                <pre className="p-4 pt-12 overflow-x-auto text-[11px] md:text-xs font-mono text-cyan-400 leading-relaxed max-h-[300px]" id="terminal-code-block">
                  <code>{node.example}</code>
                </pre>
              </div>
            </div>
          )}

        </div>
      </aside>
    </>
  );
}
