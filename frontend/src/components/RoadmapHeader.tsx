import { Search, Trophy, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo.png';

interface HeaderProps {
  selectedRoadmapId: string | null;
  selectedRoadmapTitle?: string;
  onBackToHome: () => void;
  completedCount: number;
  totalCount: number;
  learningCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (d: string) => void;
  onResetAll: () => void;
}

export default function RoadmapHeader({
  selectedRoadmapId,
  selectedRoadmapTitle,
  onBackToHome,
  completedCount,
  totalCount,
  learningCount,
  searchQuery,
  setSearchQuery,
  difficultyFilter,
  setDifficultyFilter,
  onResetAll
}: HeaderProps) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const displayTitle = selectedRoadmapTitle || 'K-COM';
  const displaySub = selectedRoadmapId 
    ? 'Interactive study tracks with production-ready command configurations' 
    : 'Learning paths & command configurations';

  return (
    <header className="border-b-2 border-slate-900 bg-white sticky top-0 z-40 px-6 py-4 shadow-sm" id="app-header">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Title Group */}
        <div className="flex items-center gap-3">
          {selectedRoadmapId ? (
            <button
              onClick={onBackToHome}
              className="p-1.5 hover:bg-slate-100 rounded-xl shrink-0 cursor-pointer flex items-center justify-center transition-all"
              title="Back to Home"
            >
              <img src={logoUrl} alt="K-COM Logo" className="w-10 h-10 object-contain" />
            </button>
          ) : (
            <div className="p-1.5 shrink-0 flex items-center justify-center">
              <img src={logoUrl} alt="K-COM Logo" className="w-10 h-10 object-contain" />
            </div>
          )}
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black font-sans tracking-tight text-blue-600 flex items-center gap-2">
                {displayTitle}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-300 font-mono">
                {selectedRoadmapId ? 'Interactive' : 'Learning Hub'}
              </span>
              {selectedRoadmapId && (
                <button
                  onClick={onBackToHome}
                  className="hidden md:flex items-center gap-1 text-[10px] bg-slate-100 border border-slate-300 rounded px-2 py-0.5 font-bold hover:bg-slate-200 transition-all cursor-pointer"
                >
                  ← Back to list
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {displaySub}
            </p>
          </div>
        </div>

        {/* Global Control Widgets */}
        <div className="flex items-center flex-wrap gap-3 w-full md:w-auto">
          {selectedRoadmapId && (
            <div className="relative flex-1 md:flex-none md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search nodes, tools..."
                className="w-full bg-white border-2 border-slate-900 text-slate-900 placeholder-slate-450 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all font-sans shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              />
            </div>
          )}

          {/* User Profile Avatar */}
          <Link
            to="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F0F0] text-sm font-medium text-[#6B7280] ring-2 ring-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
            aria-label="User profile"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </Link>

          {selectedRoadmapId && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all progress?')) {
                  onResetAll();
                }
              }}
              className="flex items-center gap-2 bg-white border-2 border-slate-900 text-slate-700 hover:text-rose-600 hover:border-rose-650 rounded-md p-2 text-sm transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
              title="Reset Progress"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {selectedRoadmapId && (
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="flex justify-between items-center mb-1.5 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 font-sans font-bold text-slate-700">
                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                Learning Progress
              </span>
              <span className="text-slate-800 font-extrabold">{completedCount}/{totalCount} Done ({percent}%)</span>
            </div>
            <div className="w-full bg-white h-3.5 rounded-md overflow-hidden border-2 border-slate-900 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
              <div
                className="h-full bg-blue-600 transition-all duration-550 ease-out border-r border-slate-900"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono bg-white px-3 py-2 rounded-md border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900"></span>
              <span className="text-slate-650 font-bold">Completed:</span>
              <span className="text-emerald-700 font-black">{completedCount}</span>
              <span className="text-slate-400">|</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-900"></span>
              <span className="text-slate-650 font-bold">In Progress:</span>
              <span className="text-amber-600 font-black">{learningCount}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-md border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] text-xs">
              <span className="text-slate-700 font-sans font-bold pl-1">Difficulty:</span>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="bg-transparent border-none text-slate-800 focus:outline-none focus:ring-0 cursor-pointer font-sans py-0.5 text-xs font-black"
              >
                <option value="all" className="bg-white text-slate-900 font-bold">All</option>
                <option value="Beginner" className="bg-white text-emerald-600 font-bold">Beginner</option>
                <option value="Intermediate" className="bg-white text-amber-600 font-bold">Intermediate</option>
                <option value="Advanced" className="bg-white text-rose-600 font-bold">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
