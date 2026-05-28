import { useEffect, useState } from "react";
import FilterBar from "@/components/FilterBar";
import RoadmapCard from "@/components/RoadmapCard";
import type { RoadmapDetail } from "@/data/roadmaps";
import { getRoadmaps } from "@/services/RoadmapService";

export default function RoadmapsPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["Data & AI"]);
  const [roadmaps, setRoadmaps] = useState<RoadmapDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadRoadmaps = async () => {
      const result = await getRoadmaps();

      if (isMounted) {
        setRoadmaps(result);
        setIsLoading(false);
      }
    };

    void loadRoadmaps();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const handleOpenFilterPanel = () => {
    // Mock filter panel — cycles through available categories
    const allFilters = ["Data & AI", "Web Development", "Mobile", "DevOps", "Security", "Design", "Cloud"];
    const next = allFilters[Math.floor(Math.random() * allFilters.length)];
    if (!activeFilters.includes(next)) {
      setActiveFilters((prev) => [...prev, next]);
    }
  };

  const filteredRoadmaps = activeFilters.length
    ? roadmaps.filter((r) => r.tags.some((t) => activeFilters.includes(t)))
    : roadmaps;

  return (
    <div className="flex flex-1 flex-col">
        {/* Page header */}
        <div className="border-b border-[#E0E0E0] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-screen-xl">
            <h1 className="text-3xl font-bold tracking-tight text-[#000000E6] sm:text-4xl">
              Roadmap List
            </h1>
            <p className="mt-2 text-sm text-[#9CA3AF] sm:text-base">
              Explore career paths and learning journeys
            </p>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-screen-xl">
            {/* Filter bar */}
            <div className="mb-6">
              <FilterBar
                activeFilters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
                onOpenFilterPanel={handleOpenFilterPanel}
              />
            </div>

            {/* Roadmap grid */}
            {isLoading ? (
              <div className="py-20 text-center text-sm font-medium text-[#00000099]">
                Loading roadmaps...
              </div>
            ) : filteredRoadmaps.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredRoadmaps.map((roadmap) => (
                  <RoadmapCard
                    key={roadmap.id}
                    {...roadmap}
                    steps={roadmap.steps.length}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg
                  className="mb-4 h-12 w-12 text-[#D1D5DB]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p className="text-sm font-medium text-[#6B7280]">No roadmaps found</p>
                <p className="mt-1 text-xs text-[#9CA3AF]">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
