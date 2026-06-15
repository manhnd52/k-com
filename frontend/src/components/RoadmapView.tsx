import type { RoadmapNode } from '../data/roadmapData';
import { CheckCircle2, Circle, Clock, ChevronRight } from 'lucide-react';

interface RoadmapViewProps {
  nodes: RoadmapNode[];
  categories: { id: string; name: string }[];
  selectedNodeId: string | null;
  onSelectNode: (node: RoadmapNode) => void;
  nodeStatuses: Record<string, 'not_started' | 'in_progress' | 'completed'>;
  searchQuery: string;
  difficultyFilter: string;
}

export default function RoadmapView({
  nodes,
  categories,
  selectedNodeId,
  onSelectNode,
  nodeStatuses,
  searchQuery,
  difficultyFilter,
}: RoadmapViewProps) {
  
  // Filter nodes based on search & difficulty
  const getFilteredNodes = (categoryName: string) => {
    return nodes.filter(node => {
      // Must match category
      if (node.category !== categoryName) return false;

      // Filter by difficulty
      if (difficultyFilter !== 'all' && node.difficulty !== difficultyFilter) return false;

      // Filter by search query (checks title, tools, shortDescs)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = node.title.toLowerCase().includes(q);
        const matchesDesc = node.shortDesc.toLowerCase().includes(q) || node.description.toLowerCase().includes(q);
        const matchesTools = node.tools.some(t => t.name.toLowerCase().includes(q));
        const matchesCategory = node.category.toLowerCase().includes(q);
        
        return matchesTitle || matchesDesc || matchesTools || matchesCategory;
      }

      return true;
    });
  };

  const getStatusStyle = (status: 'not_started' | 'in_progress' | 'completed', isSelected: boolean) => {
    let border = 'border-2 border-slate-900 bg-white hover:bg-slate-50';
    let text = 'text-slate-900';
    let iconColor = 'text-slate-500';
    let glow = 'shadow-[4px_4px_0px_rgba(0,0,0,1)]';

    if (status === 'completed') {
      border = 'border-2 border-slate-900 bg-emerald-50 hover:bg-emerald-100/80';
      text = 'text-emerald-950';
      iconColor = 'text-emerald-600';
      glow = 'shadow-[4px_4px_0px_rgba(0,0,0,1)]';
    } else if (status === 'in_progress') {
      border = 'border-2 border-slate-900 bg-amber-50 hover:bg-amber-100/80';
      text = 'text-amber-950';
      iconColor = 'text-amber-600';
      glow = 'shadow-[4px_4px_0px_rgba(0,0,0,1)]';
    }

    if (isSelected) {
      border = 'border-4 border-slate-900 bg-yellow-100 hover:bg-yellow-100';
      glow = 'shadow-[6px_6px_0px_rgba(0,0,0,1)] scale-[1.02]';
    }

    return { border, text, iconColor, glow };
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner': 
        return <span className="text-[10px] text-emerald-800 font-mono bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300 font-bold">Beginner</span>;
      case 'Intermediate': 
        return <span className="text-[10px] text-amber-800 font-mono bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 font-bold">Intermediate</span>;
      case 'Advanced': 
        return <span className="text-[10px] text-rose-800 font-mono bg-rose-100 px-1.5 py-0.5 rounded border border-rose-300 font-bold">Advanced</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8" id="roadmap-flowchart-view">
      
      {/* Intro Text info card */}
      <div className="mb-12 text-center">
        <h3 className="text-xl md:text-2xl font-black font-sans text-slate-900 tracking-tight flex items-center justify-center gap-2">
          Interactive Flowchart
        </h3>
        <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2 font-sans font-medium">
          Click on any topic node below to study best practices, view tools, and read practical scripts.
        </p>
      </div>

      <div className="space-y-12 relative" id="roadmap-nodes-timeline">
        {/* Continuous background vertical connecting wire */}
        <div className="absolute left-6 md:left-1/2 top-10 bottom-10 w-1 bg-slate-900 -translate-x-1/2 hidden md:block" />

        {categories.map((cat, catIdx) => {
          const categoryNodes = getFilteredNodes(cat.name);
          const hasVisibleNodes = categoryNodes.length > 0;

          // If filtering active and category has no items, hide category
          if (!hasVisibleNodes && searchQuery) return null;

          return (
            <div key={cat.id} className="relative group/section" id={`category-${cat.id}`}>
              
              {/* Category Header Box */}
              <div className="flex select-none items-center md:justify-center mb-8 relative z-10 transition-transform">
                <div className="bg-slate-900 border-2 border-slate-900 px-5 py-2.5 rounded-md shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-2 max-w-full">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-slate-900 animate-pulse" />
                  <span className="text-xs font-mono font-black tracking-widest text-yellow-400 uppercase">
                    STAGE {catIdx + 1}:
                  </span>
                  <h3 className="text-sm font-black text-white tracking-tight font-sans">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Grid Layout of Nodes inside this category */}
              {hasVisibleNodes ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto relative z-10">
                  {categoryNodes.map((node) => {
                    const status = nodeStatuses[node.id] || 'not_started';
                    const isSelected = selectedNodeId === node.id;
                    const { border, text, iconColor, glow } = getStatusStyle(status, isSelected);

                    return (
                      <div
                        key={node.id}
                        onClick={() => onSelectNode(node)}
                        className={`p-5 rounded-lg border cursor-pointer select-none transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between h-36 ${border} ${glow}`}
                        id={`node-${node.id}`}
                      >
                        {/* Card Top */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            {getDifficultyBadge(node.difficulty)}
                            
                            {/* Short Status Badge */}
                            <div className="flex items-center gap-1.5">
                              {status === 'completed' && (
                                <CheckCircle2 className={`w-4 h-4 ${iconColor}`} />
                              )}
                              {status === 'in_progress' && (
                                <Clock className={`w-4 h-4 ${iconColor} animate-spin [animation-duration:4s]`} />
                              )}
                              {status === 'not_started' && (
                                <Circle className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                          </div>

                          <h4 className={`font-black text-sm leading-snug font-sans ${text} mb-1.5`}>
                            {node.title}
                          </h4>
                        </div>

                        {/* Card Bottom / Small Tool Snippet */}
                        <div className="flex items-center justify-between border-t border-slate-200 pt-2.5 mt-auto">
                          <span className="text-[10px] text-slate-500 font-mono font-bold max-w-[190px] truncate">
                            {node.shortDesc}
                          </span>
                          <span className="flex items-center text-[10px] text-blue-600 hover:text-blue-800 font-sans font-black">
                            Details
                            <ChevronRight className="w-3 h-3 ml-0.5" />
                          </span>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 bg-white rounded-lg border-2 border-dashed border-slate-400 max-w-md mx-auto">
                  <p className="text-xs text-slate-500 font-bold">
                    No items match your filters for this stage.
                  </p>
                </div>
              )}

              {/* Connecting line spacer */}
              {catIdx < categories.length - 1 && (
                <div className="h-10 hidden md:block" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
