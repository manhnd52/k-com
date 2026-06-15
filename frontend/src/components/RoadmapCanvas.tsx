import type { RoadmapStep } from "@/data/roadmaps";
import RoadmapNode from "@/components/RoadmapNode";

type RoadmapCanvasProps = {
  steps: RoadmapStep[];
  selectedStepId?: string | number;
  onSelectStep: (stepId: string | number) => void;
};

type PositionedStep = RoadmapStep & {
  x: number;
  y: number;
};

const NODE_WIDTH = 204;
const NODE_HEIGHT = 86;
const CANVAS_PADDING = 48;

const getFallbackPosition = (index: number) => {
  const laneOffsets = [220, 110, 330];

  return {
    x: 32 + index * 256,
    y: laneOffsets[index % laneOffsets.length] ?? 220,
  };
};

const getStepKey = (id: string | number) => String(id);

export default function RoadmapCanvas({
  steps,
  selectedStepId,
  onSelectStep,
}: RoadmapCanvasProps) {
  const positionedSteps: PositionedStep[] = steps.map((step, index) => {
    const position = step.position ?? getFallbackPosition(index);

    return {
      ...step,
      x: position.x,
      y: position.y,
    };
  });

  const stepMap = new Map(
    positionedSteps.map((step) => [getStepKey(step.id), step]),
  );

  const edges = positionedSteps.flatMap((step, index) => {
    const dependencies =
      step.dependsOn && step.dependsOn.length > 0
        ? step.dependsOn
        : index > 0
          ? [positionedSteps[index - 1]!.id]
          : [];

    return dependencies
      .map((sourceId) => {
        const source = stepMap.get(getStepKey(sourceId));

        return source ? { source, target: step } : null;
      })
      .filter((edge): edge is { source: PositionedStep; target: PositionedStep } =>
        Boolean(edge),
      );
  });

  const canvasWidth =
    Math.max(...positionedSteps.map((step) => step.x + NODE_WIDTH), 640) +
    CANVAS_PADDING;
  const canvasHeight =
    Math.max(...positionedSteps.map((step) => step.y + NODE_HEIGHT), 420) +
    CANVAS_PADDING;

  if (positionedSteps.length === 0) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-[#D1D5DB] bg-white text-sm text-[#6B7280]">
        No steps available for this roadmap.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border-2 border-black bg-[#f8fafc] shadow-[4px_4px_0_0_#000]">
      <div className="flex items-center justify-between gap-3 border-b-2 border-black bg-white px-4 py-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-normal text-black">
            Roadmap Canvas
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Click any topic to inspect the learning details.
          </p>
        </div>
        <span className="rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-bold uppercase text-black">
          {steps.length} topics
        </span>
      </div>

      <div className="overflow-auto">
        <div
          className="relative"
          style={{
            width: canvasWidth,
            height: canvasHeight,
            backgroundImage: "radial-gradient(#CBD5E1 2px, transparent 2px)",
            backgroundSize: "24px 24px",
          }}
        >
          <svg
            className="pointer-events-none absolute inset-0"
            width={canvasWidth}
            height={canvasHeight}
            viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
            aria-hidden="true"
          >
            {edges.map(({ source, target }) => {
              const startX = source.x + NODE_WIDTH;
              const startY = source.y + NODE_HEIGHT / 2;
              const endX = target.x;
              const endY = target.y + NODE_HEIGHT / 2;
              
              // Calculate orthogonal path
              const midX = startX + (endX - startX) / 2;
              const d = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;

              return (
                <path
                  key={`${source.id}-${target.id}`}
                  d={d}
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="3"
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
