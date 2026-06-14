import type { RoadmapStep } from "@/data/roadmaps";

type RoadmapNodeProps = {
  step: RoadmapStep;
  isSelected: boolean;
  onSelect: (stepId: string | number) => void;
  x: number;
  y: number;
};

const statusClasses = {
  done: "border-[#057642] bg-[#F0FFF7] text-[#057642]",
  learning: "border-[#0A66C2] bg-[#E8F3FF] text-[#0A66C2]",
  pending: "border-[#9CA3AF] bg-[#F8F9FA] text-[#6B7280]",
};

export default function RoadmapNode({
  step,
  isSelected,
  onSelect,
  x,
  y,
}: RoadmapNodeProps) {
  const status = step.status ?? "pending";

  return (
    <button
      type="button"
      onClick={() => onSelect(step.id)}
      style={{ left: x, top: y }}
      className={`absolute z-10 flex h-[86px] w-[204px] flex-col justify-between rounded-lg border-2 px-4 py-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
        isSelected
          ? "border-[#0A66C2] bg-[#FFF6CC] shadow-lg shadow-brand/15"
          : "border-[#1F2937] bg-white hover:border-[#0A66C2]"
      }`}
      aria-pressed={isSelected}
    >
      <span className="line-clamp-2 text-sm font-bold leading-snug text-[#111827]">
        {step.title}
      </span>
      <span className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium text-[#6B7280]">
          {step.stage ?? "Topic"}
        </span>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-normal ${statusClasses[status]}`}
        >
          {status}
        </span>
      </span>
    </button>
  );
}
