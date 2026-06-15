import { useState, useMemo } from "react";
import RoadmapHeader from "@/components/RoadmapHeader";
import RoadmapView from "@/components/RoadmapView";
import SidebarDrawer from "@/components/SidebarDrawer";
import HomeView from "@/components/HomeView";
import { ROADMAP_NODES, CATEGORIES } from "@/data/roadmapData";
import { DEVOPS_NODES, DEVOPS_CATEGORIES } from "@/data/devopsData";
import type { RoadmapNode } from "@/data/roadmapData";

export default function RoadmapDetailPage() {
  
  // State for the new UI features
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<'devsecops' | 'devops' | null>(null);
  
  // Roadmap states
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, 'not_started' | 'in_progress' | 'completed'>>({});
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  const currentNodes = selectedRoadmapId === 'devops' ? DEVOPS_NODES : ROADMAP_NODES;
  const currentCategories = selectedRoadmapId === 'devops' ? DEVOPS_CATEGORIES : CATEGORIES;

  // Derived counts for the Header
  const completedCount = useMemo(() => {
    if (!selectedRoadmapId) return 0;
    return currentNodes.filter(n => nodeStatuses[n.id] === 'completed').length;
  }, [nodeStatuses, currentNodes, selectedRoadmapId]);
  
  const learningCount = useMemo(() => {
    if (!selectedRoadmapId) return 0;
    return currentNodes.filter(n => nodeStatuses[n.id] === 'in_progress').length;
  }, [nodeStatuses, currentNodes, selectedRoadmapId]);

  const totalCount = selectedRoadmapId ? currentNodes.length : 0;

  const handleStatusChange = (nodeId: string, status: 'not_started' | 'in_progress' | 'completed') => {
    setNodeStatuses(prev => ({
      ...prev,
      [nodeId]: status
    }));
  };



  const handleResetAll = () => {
    setNodeStatuses({});
  };

  const handleBackToHome = () => {
    setSelectedRoadmapId(null);
    setSelectedNode(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20 relative flex flex-col">
      <RoadmapHeader
        selectedRoadmapId={selectedRoadmapId}
        onBackToHome={handleBackToHome}
        completedCount={completedCount}
        totalCount={totalCount}
        learningCount={learningCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        onResetAll={handleResetAll}
      />

      <div className="flex-1 bg-slate-50">
        {!selectedRoadmapId ? (
          <HomeView
            roadmaps={[]}
            onSelectRoadmap={(id) => {
              if (id === 'devops' || id === 'devsecops') {
                setSelectedRoadmapId(id);
              }
            }}
          />
        ) : (
          <RoadmapView
            nodes={currentNodes}
            categories={currentCategories}
            selectedNodeId={selectedNode?.id || null}
            onSelectNode={setSelectedNode}
            nodeStatuses={nodeStatuses}
            searchQuery={searchQuery}
            difficultyFilter={difficultyFilter}
          />
        )}
      </div>

      {selectedNode && (
        <SidebarDrawer
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          status={nodeStatuses[selectedNode.id] || 'not_started'}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
