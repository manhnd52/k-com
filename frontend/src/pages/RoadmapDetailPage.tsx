import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoadmapCanvas from "@/components/RoadmapCanvas";
import RoadmapDetailPanel from "@/components/RoadmapDetailPanel";
import { getRoadmapById } from "@/services/RoadmapService";
import type { RoadmapDetail } from "@/data/roadmaps";

export default function RoadmapDetailPage() {
  const { id, roadmapId } = useParams<{ id?: string; roadmapId?: string }>();
  const navigate = useNavigate();
  const currentRoadmapId = roadmapId ?? id;
  const [isSaved, setIsSaved] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapDetail | null>(null);
  const [selectedStepId, setSelectedStepId] = useState<string | number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentRoadmapId) {
      return;
    }

    // Scroll to the top when roadmap ID changes
    window.scrollTo(0, 0);

    let ignore = false;
    const timer = window.setTimeout(() => {
      setLoading(true);
      getRoadmapById(currentRoadmapId)
        .then((data) => {
          if (ignore) return;
          setRoadmap(data);
          setError(null);
        })
        .catch((err) => {
          if (ignore) return;
          console.error("Unable to load roadmap detail:", err);
          setRoadmap(null);
          setError(`No learning path found for "${currentRoadmapId}".`);
        })
        .finally(() => {
          if (ignore) return;
          setLoading(false);
        });
    }, 0);

    return () => {
      ignore = true;
      window.clearTimeout(timer);
    };
  }, [currentRoadmapId]);

  const selectedStep =
    selectedStepId && roadmap
      ? (roadmap.steps.find((step) => step.id === selectedStepId) ?? null)
      : null;

  if (!currentRoadmapId) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-1 items-center justify-center bg-[#F3F2EF] px-6">
        <div className="max-w-md rounded-lg border border-[#E0E0E0] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#111827]">
            Learning path not found
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#6B7280]">
            Roadmap id is missing.
          </p>
          <button
            type="button"
            onClick={() => navigate("/roadmaps")}
            className="mt-6 rounded-lg bg-[#0A66C2] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#004182]"
          >
            Back to Roadmaps
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-1 items-center justify-center bg-[#F3F2EF]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#0A66C2] border-t-transparent" />
          <p className="mt-4 text-sm text-[#6B7280]">
            Loading roadmap detail...
          </p>
        </div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-1 items-center justify-center bg-[#F3F2EF] px-6">
        <div className="max-w-md rounded-lg border border-[#E0E0E0] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#111827]">
            Learning path not found
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#6B7280]">
            {error ?? "This roadmap does not exist or is no longer available."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/roadmaps")}
            className="mt-6 rounded-lg bg-[#0A66C2] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#004182]"
          >
            Back to Roadmaps
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 bg-[#F3F2EF] p-4 sm:p-6 lg:p-8 w-full min-w-0">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm font-semibold text-[#0A66C2] transition hover:border-[#0A66C2] hover:bg-[#E8F3FF]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Return
        </button>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004182]">
            Start Roadmap
          </button>
          <button
            type="button"
            onClick={() => setIsSaved((prev) => !prev)}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${isSaved
                ? "bg-[#057642] text-white hover:bg-[#045a38]"
                : "border border-[#D1D5DB] bg-white text-[#111827] hover:border-[#0A66C2]"
              }`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <section className="rounded-lg border border-[#E0E0E0] bg-white p-5 shadow-sm sm:p-6 flex flex-col gap-5">
        {/* Header content: Author, Title, Description */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0F0] font-semibold text-[#6B7280] ring-1 ring-[#E0E0E0]">
              {roadmap.authorAvatar}
            </div>
            <span className="text-sm text-[#6B7280]">by {roadmap.author}</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
            {roadmap.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#4B5563] sm:text-base">
            {roadmap.description}
          </p>
        </div>

        {/* Tags list */}
        <div className="flex flex-wrap gap-2">
          {roadmap.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-[#D1D5DB] bg-[#F8F9FA] px-3 py-1 text-xs font-semibold text-[#4B5563]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Thin divider line */}
        <div className="border-t border-[#E0E0E0]/60 pt-1" />

        {/* Consolidated stats grid spanning the full width */}
        <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3 md:grid-cols-5 w-full">
          <div className="rounded-lg border border-[#E0E0E0] bg-[#F8F9FA] px-3 py-3">
            <p className="text-xs font-bold uppercase tracking-normal text-[#6B7280]">
              Level
            </p>
            <p className="mt-1 text-sm font-bold text-[#111827]">
              {roadmap.level}
            </p>
          </div>
          <div className="rounded-lg border border-[#E0E0E0] bg-[#F8F9FA] px-3 py-3">
            <p className="text-xs font-bold uppercase tracking-normal text-[#6B7280]">
              Steps
            </p>
            <p className="mt-1 text-sm font-bold text-[#111827]">
              {roadmap.steps.length}
            </p>
          </div>
          <div className="rounded-lg border border-[#E0E0E0] bg-[#F8F9FA] px-3 py-3">
            <p className="text-xs font-bold uppercase tracking-normal text-[#6B7280]">
              Duration
            </p>
            <p className="mt-1 text-sm font-bold text-[#111827]">
              {roadmap.duration}
            </p>
          </div>
          <div className="rounded-lg border border-[#E0E0E0] bg-[#F8F9FA] px-3 py-3">
            <p className="text-xs font-bold uppercase tracking-normal text-[#6B7280]">
              Views
            </p>
            <p className="mt-1 text-sm font-bold text-[#111827]">
              {roadmap.views.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border border-[#E0E0E0] bg-[#F8F9FA] px-3 py-3">
            <p className="text-xs font-bold uppercase tracking-normal text-[#6B7280]">
              Likes
            </p>
            <p className="mt-1 text-sm font-bold text-[#111827]">
              {roadmap.likes.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full min-w-0">
        <RoadmapCanvas
          steps={roadmap.steps}
          selectedStepId={selectedStepId}
          onSelectStep={setSelectedStepId}
        />
        <RoadmapDetailPanel
          step={selectedStep}
          roadmapLevel={roadmap.level}
          onClose={() => setSelectedStepId(undefined)}
        />
      </section>

    </div>
  );
}
