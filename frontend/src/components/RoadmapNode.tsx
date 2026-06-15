import type { RoadmapStep } from "@/data/roadmaps";

type RoadmapNodeProps = {
  step: RoadmapStep;
  isSelected: boolean;
  onSelect: (stepId: string | number) => void;
  x: number;
  y: number;
};

const getNodeClasses = (status: string, isSelected: boolean) => {
  const base =
    "absolute z-10 flex h-[86px] w-[204px] flex-col justify-between rounded-md border-2 border-black px-4 py-3 text-left shadow-[4px_4px_0_0_#000] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] focus:outline-none";
  const selectedClass = isSelected ? "ring-4 ring-blue-500 ring-offset-2" : "";

  switch (status) {
    case "done":
      return `${base} bg-[#86efac] text-black ${selectedClass}`; // Green
    case "learning":
      return `${base} bg-[#fde047] text-black ${selectedClass}`; // Yellow
    case "pending":
    default:
      return `${base} bg-white text-black ${selectedClass}`; // White
  }
};

const pillClasses = {
  done: "border-black bg-white text-black",
  learning: "border-black bg-white text-black",
  pending: "border-gray-400 bg-gray-100 text-gray-500",
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
      className={getNodeClasses(status, isSelected)}
      aria-pressed={isSelected}
    >
      <span className="line-clamp-2 text-sm font-bold leading-snug">
        {step.title}
      </span>
      <span className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-semibold opacity-80">
          {step.stage ?? "Topic"}
        </span>
        <span
          className={`shrink-0 rounded-full border-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-normal ${
            pillClasses[status as keyof typeof pillClasses] ||
            pillClasses.pending
          }`}
        >
          {status}
        </span>
      </span>
    </button>
  );
}
