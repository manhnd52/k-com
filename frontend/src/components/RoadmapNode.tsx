import type { RoadmapStep } from "@/data/roadmaps";

type RoadmapNodeProps = {
  step: RoadmapStep;
  isSelected: boolean;
  onSelect: (stepId: string | number) => void;
  x: number;
  y: number;
};

export default function RoadmapNode({
  step,
  isSelected,
  onSelect,
  x,
  y,
}: RoadmapNodeProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(step.id)}
      style={{ left: x, top: y }}
      className={`absolute z-10 flex h-[64px] w-[160px] flex-col justify-center items-center rounded-lg border px-3 py-2 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${isSelected
          ? "border-[#0A66C2] bg-[#FFF6CC] shadow-lg shadow-brand/15"
          : "border-[#E0E0E0] bg-white hover:border-[#0A66C2]"
        }`}
      aria-pressed={isSelected}
    >
      <span className="line-clamp-2 text-xs font-bold leading-tight text-[#111827]">
        {step.title}
      </span>
    </button>
  );
}
