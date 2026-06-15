import { Shield, ArrowRight, Layers, BookOpen } from 'lucide-react';
import type { RoadmapCardData } from '../services/RoadmapService';

interface HomeViewProps {
  roadmaps: RoadmapCardData[];
  onSelectRoadmap: (roadmapId: string) => void;
}

export default function HomeView({ roadmaps, onSelectRoadmap }: HomeViewProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10" id="home-view-container">
      {/* Hero Welcome banner */}
      <div className="bg-white border-4 border-slate-900 rounded-lg p-8 mb-10 shadow-[6px_6px_0px_rgba(0,0,0,1)] text-center md:text-left relative overflow-hidden" id="home-hero-banner">
        {/* Abstract design elements */}
        <div className="absolute right-[-20px] top-[-20px] w-40 h-40 rounded-full bg-yellow-400 opacity-20 border-4 border-dashed border-slate-900 pointer-events-none hidden md:block" />
        <div className="absolute right-20 bottom-[-30px] w-24 h-24 bg-blue-400 opacity-20 border-4 border-slate-900 pointer-events-none transform rotate-12 hidden md:block" />

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="p-4 bg-yellow-400 text-slate-900 rounded-2xl border-4 border-slate-900 shadow-[4px_4px_0px_rgba(31,41,55,1)] shrink-0">
            <Shield className="w-14 h-14 animate-[pulse_3s_infinite]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-blue-600 text-white rounded border-2 border-slate-900 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                Learning Framework
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-emerald-400 text-slate-950 rounded border-2 border-slate-900 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                v2026.1
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-none">
              Interactive Study Roadmaps
            </h2>
            <p className="text-sm md:text-base text-slate-700 font-medium mt-3 max-w-2xl leading-relaxed">
              Welcome to the Ultimate IT Learning Platform. Choose an interactive roadmap catalog path below to explore, track completion progress, and find production-ready command templates.
            </p>
          </div>
        </div>
      </div>

      {/* Pathways Deck */}
      <div id="pathways-deck-section">
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-slate-900" />
          Select an active roadmap pathway
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {roadmaps.map((roadmap) => (
            <div 
              key={roadmap.id}
              onClick={() => onSelectRoadmap(String(roadmap.id))}
              className="group cursor-pointer bg-white border-4 border-slate-900 rounded-lg p-6 hover:-translate-y-1 transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] relative flex flex-col justify-between"
            >
              <div>
                {/* Card top flags */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border-2 border-amber-400">
                    {roadmap.level}
                  </span>
                </div>

                <h4 className="text-2xl font-black text-slate-900 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                  {roadmap.title}
                </h4>
                <p className="text-xs text-slate-500 font-bold font-mono mt-1">
                  {roadmap.tags.join(" • ")}
                </p>

                <p className="text-sm text-slate-650 font-medium mt-3 leading-relaxed">
                  {roadmap.description || "Explore this roadmap to gain skills and complete challenges step by step."}
                </p>

                {/* Statistics elements */}
                <div className="grid grid-cols-2 gap-3 my-6 bg-slate-50 border-2 border-slate-900 p-3 rounded">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Key Nodes</span>
                    <span className="text-lg font-black text-slate-900">{roadmap.steps} Topics</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Duration</span>
                    <span className="text-lg font-black text-slate-900">{roadmap.duration}</span>
                  </div>
                </div>
              </div>

              {/* Bottom action bar */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-dashed border-slate-200">
                <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5 font-mono">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  View Track
                </span>
                <div className="flex items-center gap-1.5 bg-yellow-400 border-2 border-slate-900 px-3 py-1.5 rounded-md font-black text-xs text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:bg-yellow-300">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}

          {roadmaps.length === 0 && (
            <div className="col-span-full py-12 text-center border-4 border-dashed border-slate-300 rounded-lg">
              <p className="text-slate-500 font-bold text-lg">No roadmaps available yet.</p>
              <p className="text-sm text-slate-400">Please seed the database with roadmap data.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
