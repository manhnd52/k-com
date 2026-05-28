import type { RoadmapStep } from "@/data/roadmaps";

type StepDetailProps = {
  step: RoadmapStep | null;
};

export default function StepDetail({ step }: StepDetailProps) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#9CA3AF] text-center">Select a step to view details</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Step Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-[#000000E6]">{step.title}</h2>
        <p className="text-sm text-[#9CA3AF]">{step.description}</p>
      </div>

      {/* Content */}
      {step.content && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold uppercase text-[#9CA3AF]">Overview</h3>
          <p className="text-sm leading-relaxed text-[#000000E6]">{step.content}</p>
        </div>
      )}

      {/* Resources */}
      {step.resources && step.resources.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase text-[#9CA3AF]">Resource</h3>
          <ul className="space-y-2">
            {step.resources.map((resource, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-[#000000E6]"
              >
                <span className="text-[#0A66C2] font-semibold flex-shrink-0 mt-0.5">•</span>
                <span>{resource}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* How To */}
      {step.howTo && step.howTo.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase text-[#9CA3AF]">How to</h3>
          <ul className="space-y-2">
            {step.howTo.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-[#000000E6]"
              >
                <span className="text-[#0A66C2] font-semibold flex-shrink-0 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rule */}
      {step.rule && (
        <div className="rounded-lg border-l-4 border-[#0A66C2] bg-[#E8F3FF] px-4 py-3">
          <p className="text-sm font-semibold text-[#000000E6]">
            Rule: {step.rule}
          </p>
        </div>
      )}
    </div>
  );
}
