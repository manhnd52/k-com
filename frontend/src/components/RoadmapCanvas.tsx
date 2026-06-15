import type { RoadmapStep } from "@/data/roadmaps";
import RoadmapNode from "@/components/RoadmapNode";
import RoadmapEdge from "@/components/RoadmapEdge";

type RoadmapCanvasProps = {
  steps: RoadmapStep[];
  selectedStepId?: string | number;
  onSelectStep: (stepId: string | number) => void;
};

type PositionedStep = RoadmapStep & {
  x: number;
  y: number;
};

const NODE_WIDTH = 160;
const NODE_HEIGHT = 64;
const CANVAS_PADDING = 48;

const getStepKey = (id: string | number) => String(id);

const getDependencies = (
  step: RoadmapStep,
  index: number,
  stepsList: RoadmapStep[],
): Array<string | number> => {
  if (step.dependsOn && step.dependsOn.length > 0) {
    return step.dependsOn;
  }
  if (index > 0 && stepsList[index - 1]) {
    return [stepsList[index - 1].id];
  }
  return [];
};

export default function RoadmapCanvas({
  steps,
  selectedStepId,
  onSelectStep,
}: RoadmapCanvasProps) {
  // 1. Calculate ranks based on dependencies
  const ranks = new Map<string, number>();
  const visited = new Set<string>();

  const getRank = (stepId: string | number): number => {
    const key = String(stepId);
    if (ranks.has(key)) return ranks.get(key)!;
    if (visited.has(key)) return 0; // Prevent infinite cycle loops

    const stepIndex = steps.findIndex((s) => getStepKey(s.id) === key);
    if (stepIndex === -1) return 0;
    const step = steps[stepIndex];

    visited.add(key);
    const deps = getDependencies(step, stepIndex, steps);

    let maxDepRank = -1;
    for (const depId of deps) {
      maxDepRank = Math.max(maxDepRank, getRank(depId));
    }

    visited.delete(key);

    const rank = maxDepRank + 1;
    ranks.set(key, rank);
    return rank;
  };

  // Compute rank for all steps
  steps.forEach((step) => getRank(step.id));

  // Group steps by rank
  const rankGroups: Record<number, RoadmapStep[]> = {};
  steps.forEach((step) => {
    const rank = ranks.get(getStepKey(step.id)) ?? 0;
    if (!rankGroups[rank]) {
      rankGroups[rank] = [];
    }
    rankGroups[rank].push(step);
  });

  const maxRank = Math.max(...Object.keys(rankGroups).map(Number), 0);
  const maxGroupSize = Math.max(
    ...Object.values(rankGroups).map((g) => g.length),
    1,
  );

  // Spacing configurations
  const HORIZONTAL_SPACING = 210; // Width (160) + gap (50)
  const VERTICAL_SPACING = 120; // Height (64) + gap (56)

  const canvasWidth = Math.max(
    maxGroupSize * HORIZONTAL_SPACING + CANVAS_PADDING * 2,
    700,
  );
  const canvasHeight = (maxRank + 1) * VERTICAL_SPACING + CANVAS_PADDING * 2;
  const canvasCenter = canvasWidth / 2;

  const positionedSteps: PositionedStep[] = steps.map((step) => {
    const key = getStepKey(step.id);
    const rank = ranks.get(key) ?? 0;
    const group = rankGroups[rank] ?? [];
    const indexInGroup = group.findIndex((s) => getStepKey(s.id) === key);
    const N = group.length;

    // Calculate centered x coordinate
    const x =
      canvasCenter -
      ((N - 1) * HORIZONTAL_SPACING) / 2 +
      indexInGroup * HORIZONTAL_SPACING -
      NODE_WIDTH / 2;

    // Calculate vertical y coordinate
    const y = CANVAS_PADDING + rank * VERTICAL_SPACING;

    return {
      ...step,
      x,
      y,
    };
  });

  const stepMap = new Map(
    positionedSteps.map((step) => [getStepKey(step.id), step]),
  );

  const edges = positionedSteps.flatMap((step, index) => {
    const deps = getDependencies(step, index, steps);

    return deps
      .map((sourceId) => {
        const source = stepMap.get(getStepKey(sourceId));
        return source ? { source, target: step } : null;
      })
      .filter((edge): edge is { source: PositionedStep; target: PositionedStep } =>
        Boolean(edge),
      );
  });

  if (positionedSteps.length === 0) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-[#D1D5DB] bg-white text-sm text-[#6B7280]">
        No steps available for this roadmap.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[#C7D2FE] bg-[#F8FBFF]">
      <div className="flex items-center justify-between gap-3 border-b border-[#DCEBFF] bg-white px-4 py-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-normal text-[#111827]">
            Roadmap Canvas
          </h2>
          <p className="mt-1 text-xs text-[#6B7280]">
            Click any topic to inspect the learning details.
          </p>
        </div>
        <span className="rounded-full border border-[#BFD7FF] bg-[#E8F3FF] px-3 py-1 text-xs font-semibold text-[#0A66C2]">
          {steps.length} topics
        </span>
      </div>

      <div
        className="overflow-auto w-full"
        style={{
          backgroundImage:
            "linear-gradient(#E5EEF9 1px, transparent 1px), linear-gradient(90deg, #E5EEF9 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            width: canvasWidth,
            height: canvasHeight,
          }}
        >
          <svg
            className="pointer-events-none absolute inset-0"
            width={canvasWidth}
            height={canvasHeight}
            viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
            aria-hidden="true"
          >
            <defs>
              {/* Soft Slate arrowhead for standard lines */}
              <marker
                id="roadmap-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M 0 1 L 6 4 L 0 7 z" fill="#94A3B8" />
              </marker>
              {/* Highlighted blue arrowhead for active lines */}
              <marker
                id="roadmap-arrow-active"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M 0 1 L 6 4 L 0 7 z" fill="#0A66C2" />
              </marker>
            </defs>

            {edges.map(({ source, target }) => {
              const startX = source.x + NODE_WIDTH / 2;
              const startY = source.y + NODE_HEIGHT;
              const endX = target.x + NODE_WIDTH / 2;
              const endY = target.y; // Connect exactly to the node top edge

              const isActive =
                selectedStepId === source.id || selectedStepId === target.id;

              return (
                <RoadmapEdge
                  key={`${source.id}-${target.id}`}
                  startX={startX}
                  startY={startY}
                  endX={endX}
                  endY={endY}
                  isActive={isActive}
                />
              );
            })}
          </svg>

          {positionedSteps.map((step) => (
            <RoadmapNode
              key={step.id}
              step={step}
              x={step.x}
              y={step.y}
              isSelected={selectedStepId === step.id}
              onSelect={onSelectStep}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
