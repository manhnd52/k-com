import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RoadmapFlow from "@/components/RoadmapFlow";
import StepDetail from "@/components/StepDetail";
import { getRoadmapById } from "@/services/RoadmapService";
import type { RoadmapDetail } from "@/data/roadmaps";

export default function RoadmapDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapDetail | null>(null);
  const [selectedStepId, setSelectedStepId] = useState<string | number | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getRoadmapById(id)
      .then((data) => {
        setRoadmap(data);
        setError(null);
        setLoading(false);
        if (data.steps && data.steps.length > 0) {
          setSelectedStepId(data.steps[0]!.id);
        }
      })
      .catch((err) => {
        console.error("Lỗi lấy chi tiết roadmap:", err);
        setError("Roadmap not found or server error");
        setLoading(false);
      });
  }, [id]);

  const selectedStep =
    selectedStepId && roadmap
      ? (roadmap.steps.find((s) => s.id === selectedStepId) ?? null)
      : null;

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#F3F2EF]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0A66C2] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-[#6B7280]">Loading roadmap detail...</p>
        </div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#F3F2EF]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#000000E6]">
            {error || "Roadmap not found"}
          </h2>
          <button
            onClick={() => navigate("/roadmaps")}
            className="mt-4 rounded-lg bg-[#0A66C2] px-6 py-2 text-white font-semibold hover:bg-[#004182] transition"
          >
            Back to Roadmaps
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 bg-[#F3F2EF] p-6 sm:p-8">
      {/* Header with back button and actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate("/roadmaps")}
          className="flex items-center gap-2 text-[#0A66C2] font-semibold hover:text-[#004182] transition"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span>Return</span>
        </button>

        <div className="flex items-center gap-3">
          <button className="rounded-lg bg-[#0A66C2] px-6 py-2.5 font-semibold text-white hover:bg-[#004182] transition shadow-sm hover:shadow-md">
            Start Roadmap
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`rounded-lg px-6 py-2.5 font-semibold transition ${
              isSaved
                ? "bg-[#057642] text-white hover:bg-[#045a38]"
                : "border border-[#E0E0E0] bg-white text-[#000000E6] hover:bg-[#F8F9FA]"
            }`}
          >
            {isSaved ? "✓ Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Main content card */}
      <div className="flex flex-1 flex-col gap-6 rounded-lg border border-[#E0E0E0] bg-white p-8">
        {/* Author section */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0F0] font-semibold text-[#6B7280] ring-1 ring-[#E0E0E0]">
            {roadmap.authorAvatar}
          </div>
          <span className="text-sm text-[#9CA3AF]">by {roadmap.author}</span>
        </div>

        {/* Title */}
        <div className="gap-2 flex flex-col">
          <h1 className="text-4xl font-bold text-[#000000E6]">
            {roadmap.title}
          </h1>
          <p className="text-base text-[#9CA3AF]">{roadmap.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {roadmap.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-[#E0E0E0] bg-[#F0F0F0] px-3 py-1 text-sm font-medium text-[#6B7280]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta information */}
        <div className="border-t border-[#EBEBEB] pt-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase text-[#9CA3AF]">
                Duration
              </span>
              <span className="text-lg font-semibold text-[#000000E6]">
                {roadmap.duration}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase text-[#9CA3AF]">
                Level
              </span>
              <span className="text-lg font-semibold text-[#000000E6]">
                {roadmap.level}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase text-[#9CA3AF]">
                Steps
              </span>
              <span className="text-lg font-semibold text-[#000000E6]">
                {roadmap.steps.length} steps
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Flow and Step Detail - Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Roadmap Flow */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <h2 className="text-xl font-bold text-[#000000E6]">Learning Path</h2>
          <RoadmapFlow
            steps={roadmap.steps}
            selectedStepId={selectedStepId}
            onSelectStep={setSelectedStepId}
          />
        </div>

        {/* Right: Step Detail */}
        <div className="rounded-lg border border-[#E0E0E0] bg-white p-6">
          <h2 className="mb-6 text-xl font-bold text-[#000000E6]">
            Step Detail
          </h2>
          <StepDetail step={selectedStep} />
        </div>
      </div>

      {/* Engagement stats */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-[#000000E6]">Community</h2>
        <div className="flex flex-col sm:flex-row gap-4 rounded-lg border border-[#E0E0E0] bg-white p-6">
          <div className="flex items-center gap-3">
            <svg
              className="h-5 w-5 text-[#9CA3AF]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <div>
              <div className="text-sm text-[#9CA3AF]">Views</div>
              <div className="text-xl font-semibold text-[#000000E6]">
                {roadmap.views.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="border-t border-[#EBEBEB] sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-4 flex items-center gap-3">
            <svg
              className="h-5 w-5 text-[#9CA3AF]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <div>
              <div className="text-sm text-[#9CA3AF]">Likes</div>
              <div className="text-xl font-semibold text-[#000000E6]">
                {roadmap.likes.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
