import { useCallback, useEffect, useMemo, useState } from "react";
import FilterBar from "@/components/FilterBar";
import RoadmapCard from "@/components/RoadmapCard";
import {
  getRoadmaps,
  type RoadmapCardData,
} from "@/services/RoadmapService";

const ALL_FILTERS = [
  "Data & AI",
  "Web Development",
  "Mobile",
  "DevOps",
  "Security",
  "Design",
  "Cloud",
];

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState<RoadmapCardData[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRoadmaps = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const roadmapData = await getRoadmaps();
      setRoadmaps(Array.isArray(roadmapData) ? roadmapData : []);
    } catch {
      setError("Unable to load roadmaps. Please check the backend API.");
      setRoadmaps([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRoadmaps();
  }, [loadRoadmaps]);

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const handleOpenFilterPanel = () => {
    const next = ALL_FILTERS.find((filter) => !activeFilters.includes(filter));

    if (next) {
      setActiveFilters((prev) => [...prev, next]);
    }
  };

  const filteredRoadmaps = useMemo(() => {
    const list = Array.isArray(roadmaps) ? roadmaps : [];
    if (!activeFilters.length) {
      return list;
    }

    return list.filter((roadmap) =>
      roadmap && roadmap.tags && Array.isArray(roadmap.tags) && roadmap.tags.some((tag) => activeFilters.includes(tag)),
    );
  }, [activeFilters, roadmaps]);

  return (
    <div className="flex flex-1 flex-col">
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

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-6">
            <FilterBar
              activeFilters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
              onOpenFilterPanel={handleOpenFilterPanel}
            />
          </div>

          {isLoading && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[420px] animate-pulse overflow-hidden rounded-xl border border-[#E0E0E0] bg-white"
                >
                  <div className="aspect-[16/9] bg-[#E5E7EB]" />
                  <div className="space-y-4 p-5">
                    <div className="h-4 w-1/2 rounded bg-[#E5E7EB]" />
                    <div className="h-6 w-3/4 rounded bg-[#E5E7EB]" />
                    <div className="h-4 w-full rounded bg-[#E5E7EB]" />
                    <div className="h-4 w-5/6 rounded bg-[#E5E7EB]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] px-6 py-16 text-center">
              <p className="text-sm font-semibold text-[#B91C1C]">{error}</p>
              <button
                onClick={loadRoadmaps}
                className="mt-4 rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-hover"
              >
                Retry
              </button>
            </div>
          )}

          {!isLoading && !error && filteredRoadmaps.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredRoadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap.id} {...roadmap} />
              ))}
            </div>
          )}

          {!isLoading && !error && filteredRoadmaps.length === 0 && (
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
              <p className="text-sm font-medium text-[#6B7280]">
                No roadmaps found
              </p>
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
