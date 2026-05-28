import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { RoadmapStep } from "@/data/roadmaps";
import { getStepStatus } from "@/services/RoadmapService";
import type { RoadmapProgress, StepStatus } from "@/services/RoadmapService";

type RoadmapHierarchyProps = {
  roadmapId: number;
  steps: RoadmapStep[];
  activeStepId?: number;
  progress: RoadmapProgress;
  onSelectStep?: (stepId: number) => void;
};

const STATUS_LABELS: Record<StepStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  completed: "Completed",
};

const STATUS_CLASSES: Record<StepStatus, string> = {
  "not-started": "border-[#E0E0E0] bg-white text-[#00000099]",
  "in-progress": "border-[#0A66C2] bg-[#E8F3FF] text-[#0A66C2]",
  completed: "border-[#057642] bg-[#ECFDF3] text-[#057642]",
};

export default function RoadmapHierarchy({
  roadmapId,
  steps,
  activeStepId,
  progress,
  onSelectStep,
}: RoadmapHierarchyProps) {
  const groups = useMemo(
    () =>
      steps.reduce<Record<string, RoadmapStep[]>>((acc, step) => {
        const stage = step.stage ?? step.phase ?? "Core";
        acc[stage] = [...(acc[stage] ?? []), step];
        return acc;
      }, {}),
    [steps],
  );
  const [collapsedStages, setCollapsedStages] = useState<Record<string, boolean>>(
    {},
  );

  const toggleStage = (stage: string) => {
    setCollapsedStages((current) => ({
      ...current,
      [stage]: !current[stage],
    }));
  };

  return (
    <div className="rounded-lg border border-[#E0E0E0] bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-6">
        {Object.entries(groups).map(([stage, stageSteps], stageIndex) => {
          const isCollapsed = collapsedStages[stage] ?? false;
          const completedCount = stageSteps.filter(
            (step) => getStepStatus(progress, step.id) === "completed",
          ).length;

          return (
          <section key={stage} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A66C2] text-sm font-bold text-white">
                {stageIndex + 1}
              </div>
              <div className="mt-3 h-full w-px bg-[#E0E0E0]" />
            </div>

            <div className="min-w-0 flex-1 pb-3">
              <button
                type="button"
                onClick={() => toggleStage(stage)}
                className="mb-3 flex w-full flex-wrap items-center justify-between gap-2 rounded-lg border border-[#EBEBEB] bg-[#F8F9FA] px-4 py-3 text-left transition hover:border-[#D1D5DB]"
                aria-expanded={!isCollapsed}
              >
                <div>
                  <h3 className="text-base font-bold text-[#000000E6]">{stage}</h3>
                  <p className="mt-1 text-xs font-medium text-[#00000066]">
                    {completedCount}/{stageSteps.length} completed
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[#00000066]">
                    {stageSteps.length} steps
                  </span>
                  <svg
                    className={`h-4 w-4 text-[#6B7280] transition ${
                      isCollapsed ? "" : "rotate-180"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              {!isCollapsed && (
                <div className="grid gap-3">
                {stageSteps.map((step) => {
                  const status = getStepStatus(progress, step.id);
                  const isActive = activeStepId === step.id;

                  return (
                    <article
                      key={step.id}
                      className={`rounded-lg border p-4 transition ${
                        isActive
                          ? "border-[#0A66C2] bg-[#F8FBFF] shadow-sm"
                          : "border-[#EBEBEB] bg-[#FFFFFF] hover:border-[#D1D5DB]"
                      }`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <button
                          type="button"
                          onClick={() => onSelectStep?.(step.id)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3F2EF] text-xs font-bold text-[#00000099]">
                              {step.id}
                            </span>
                            <h4 className="truncate text-sm font-bold text-[#000000E6]">
                              {step.title}
                            </h4>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-[#00000099]">
                            {step.description}
                          </p>
                        </button>

                        <div className="flex shrink-0 items-center gap-2">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_CLASSES[status]}`}
                          >
                            {STATUS_LABELS[status]}
                          </span>
                          <Link
                            to={`/roadmaps/${roadmapId}/steps/${step.id}`}
                            className="rounded-lg bg-[#0A66C2] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#004182]"
                          >
                            Open
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              )}
            </div>
          </section>
          );
        })}
      </div>
    </div>
  );
}
