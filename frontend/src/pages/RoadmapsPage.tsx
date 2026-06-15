import { useState, useEffect, useMemo } from "react";
import RoadmapHeader from "@/components/RoadmapHeader";
import RoadmapView from "@/components/RoadmapView";
import SidebarDrawer from "@/components/SidebarDrawer";
import HomeView from "@/components/HomeView";
import { getAllRoadmaps, getRoadmapById, fetchUserProgress, updateUserProgress, type RoadmapCardData } from "@/services/RoadmapService";
import type { RoadmapNode } from "@/data/roadmapData";

type BackendResource = string | { type: string; title: string; url: string };

interface BackendStep {
  id: string;
  title: string;
  description?: string;
  content?: { bodyMarkdown?: string };
  resources?: BackendResource[];
  howTo?: string[];
}

interface BackendStage {
  id: string;
  title: string;
  steps: BackendStep[];
}

interface RoadmapDetailResponse {
  title: string;
  stages: BackendStage[];
}

const MOCK_USER_ID = "user-1"; // Assuming a default user for demonstration

export default function RoadmapsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  
  const [roadmaps, setRoadmaps] = useState<RoadmapCardData[]>([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);
  const [selectedRoadmapTitle, setSelectedRoadmapTitle] = useState<string>("");
  
  const [currentNodes, setCurrentNodes] = useState<RoadmapNode[]>([]);
  const [currentCategories, setCurrentCategories] = useState<{id: string; name: string}[]>([]);
  
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, 'not_started' | 'in_progress' | 'completed'>>({});
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  // Load available roadmaps
  useEffect(() => {
    getAllRoadmaps().then(setRoadmaps).catch(console.error);
  }, []);

  // Load roadmap detail and progress when a roadmap is selected
  useEffect(() => {
    if (!selectedRoadmapId) return;

    getRoadmapById(selectedRoadmapId).then(raw => {
      const data = raw as unknown as RoadmapDetailResponse;
      setSelectedRoadmapTitle(data.title);
      
      const cats = data.stages.map(stage => ({ id: stage.id, name: stage.title }));
      setCurrentCategories(cats);

      // Map backend data to frontend RoadmapNode format
      const nodes: RoadmapNode[] = [];
      data.stages.forEach(stage => {
        stage.steps.forEach(step => {
          nodes.push({
            id: step.id,
            category: stage.title,
            categoryVi: stage.title,
            title: step.title,
            titleVi: step.title,
            difficulty: 'Beginner',
            shortDesc: step.content?.bodyMarkdown?.substring(0, 100) || step.description || '',
            shortDescVi: step.content?.bodyMarkdown?.substring(0, 100) || step.description || '',
            description: step.content?.bodyMarkdown || 'No content provided.',
            descriptionVi: step.content?.bodyMarkdown || 'No content provided.',
            tools: (step.resources ?? []).map((r: BackendResource) => {
              // Parse backend resource format "TYPE: Title (url)"
              const parts = typeof r === 'string' ? r.split(': ') : [r.type, r.title];
              return {
                name: typeof r === 'string' ? parts[1]?.split(' (')[0] || r : r.title,
                desc: typeof r === 'string' ? r : r.url,
                descVi: typeof r === 'string' ? r : r.url,
                type: typeof r === 'string' ? parts[0] : r.type.toUpperCase()
              };
            }),
            example: step.howTo?.join('\n') || ''
          });
        });
      });
      setCurrentNodes(nodes);
    }).catch(console.error);

    fetchUserProgress(MOCK_USER_ID, selectedRoadmapId).then(setNodeStatuses).catch(console.error);
  }, [selectedRoadmapId]);

  const completedCount = useMemo(() => {
    if (!selectedRoadmapId) return 0;
    return currentNodes.filter(n => nodeStatuses[n.id] === 'completed').length;
  }, [nodeStatuses, currentNodes, selectedRoadmapId]);
  
  const learningCount = useMemo(() => {
    if (!selectedRoadmapId) return 0;
    return currentNodes.filter(n => nodeStatuses[n.id] === 'in_progress').length;
  }, [nodeStatuses, currentNodes, selectedRoadmapId]);

  const totalCount = selectedRoadmapId ? currentNodes.length : 0;

  const handleStatusChange = async (nodeId: string, status: 'not_started' | 'in_progress' | 'completed') => {
    // Optimistic UI update
    setNodeStatuses(prev => ({
      ...prev,
      [nodeId]: status
    }));

    // Persist to backend
    await updateUserProgress(MOCK_USER_ID, nodeId, status);
  };

  const handleResetAll = () => {
    // Optional: implement backend reset or just clear local state
    setNodeStatuses({});
  };

  const handleBackToHome = () => {
    setSelectedRoadmapId(null);
    setSelectedRoadmapTitle("");
    setSelectedNode(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20 relative flex flex-col">
      <RoadmapHeader
        selectedRoadmapId={selectedRoadmapId}
        selectedRoadmapTitle={selectedRoadmapTitle}
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
            roadmaps={roadmaps}
            onSelectRoadmap={(id) => {
              setSelectedRoadmapId(id);
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
