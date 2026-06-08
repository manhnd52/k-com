import type { RoadmapStep } from "@/data/roadmaps";

type RoadmapFlowProps = {
  steps: RoadmapStep[];
  selectedStepId?: string | number;
  onSelectStep?: (stepId: string | number) => void;
};

export default function RoadmapFlow({
  steps,
  selectedStepId,
  onSelectStep,
}: RoadmapFlowProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-[#E0E0E0] bg-[#F8F9FA] p-8 sm:p-12">
      <div className="flex items-center gap-6 flex-wrap justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-6">
            {/* Step Box */}
            <button
              onClick={() => onSelectStep?.(step.id)}
              className={`flex flex-col items-center transition-all ${
                selectedStepId === step.id ? "scale-110" : "hover:scale-105"
              }`}
            >
              <div
                className={`flex items-center justify-center rounded-lg border-2 px-6 py-4 min-w-[140px] cursor-pointer transition-all ${
                  selectedStepId === step.id
                    ? "border-[#0A66C2] bg-[#E8F3FF] shadow-md"
                    : "border-[#0A66C2] bg-white hover:bg-[#F8F9FA]"
                }`}
              >
                <span
                  className={`text-center font-semibold transition-colors ${
                    selectedStepId === step.id
                      ? "text-[#0A66C2]"
                      : "text-[#000000E6]"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              <p className="mt-2 max-w-[140px] text-center text-xs text-[#9CA3AF]">
                {step.description}
              </p>
            </button>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <div className="hidden sm:flex items-center">
                <svg
                  className="h-6 w-6 text-[#0A66C2]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
