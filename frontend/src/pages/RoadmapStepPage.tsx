import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import StepDetail from "@/components/StepDetail";
import type { RoadmapDetail, RoadmapStep } from "@/data/roadmaps";
import {
  getRoadmapProgress,
  getRoadmapStep,
  getStepStatus,
  updateStepStatus,
} from "@/services/RoadmapService";
import type { RoadmapProgress, StepStatus } from "@/services/RoadmapService";

const STATUS_OPTIONS: Array<{ value: StepStatus; label: string }> = [
  { value: "not-started", label: "Not started" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

export default function RoadmapStepPage() {
  const { id, stepId } = useParams<{ id: string; stepId: string }>();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<RoadmapDetail | null>(null);
  const [step, setStep] = useState<RoadmapStep | null>(null);
  const [progress, setProgress] = useState<RoadmapProgress>({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const roadmapId = id ? Number.parseInt(id, 10) : null;
  const currentStepId = stepId ? Number.parseInt(stepId, 10) : null;

  useEffect(() => {
    let isMounted = true;

    const loadStep = async () => {
      if (!roadmapId || !currentStepId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      try {
        const [stepResult, progressResult] = await Promise.all([
          getRoadmapStep(roadmapId, currentStepId),
          getRoadmapProgress(roadmapId),
        ]);

        if (!isMounted) {
          return;
        }

        setRoadmap(stepResult?.roadmap ?? null);
        setStep(stepResult?.step ?? null);
        setProgress(progressResult);
      } catch {
        if (isMounted) {
          setErrorMessage("Could not load step detail. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadStep();

    return () => {
      isMounted = false;
    };
  }, [roadmapId, currentStepId]);

  const stepIndex = useMemo(() => {
    if (!roadmap || !currentStepId) {
      return -1;
    }

    return roadmap.steps.findIndex((item) => item.id === currentStepId);
  }, [roadmap, currentStepId]);

  const previousStep = stepIndex > 0 ? roadmap?.steps[stepIndex - 1] : null;
  const nextStep =
    roadmap && stepIndex >= 0 && stepIndex < roadmap.steps.length - 1
      ? roadmap.steps[stepIndex + 1]
      : null;
  const activeStatus =
    currentStepId !== null ? getStepStatus(progress, currentStepId) : "not-started";

  const handleStatusChange = async (status: StepStatus) => {
    if (!roadmapId || !currentStepId) {
      return;
    }

    try {
      const nextProgress = await updateStepStatus(roadmapId, currentStepId, status);
      setProgress(nextProgress);
    } catch {
      setErrorMessage("Could not update step status. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm font-medium text-[#00000099]">Loading step...</p>
      </div>
    );
  }

  if (!roadmap || !step || !roadmapId) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#000000E6]">
            {errorMessage ?? "Step not found"}
          </h2>
          <button
            onClick={() => navigate("/roadmaps")}
            className="mt-4 rounded-lg bg-[#0A66C2] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#004182]"
          >
            Back to Roadmaps
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 bg-[#F3F2EF] p-6 sm:p-8">
      {errorMessage && (
        <div className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#991B1B]">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            to={`/roadmaps/${roadmap.id}`}
            className="text-sm font-semibold text-[#0A66C2] transition hover:text-[#004182]"
          >
            Back to roadmap
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-[#000000E6]">
            {roadmap.title}
          </h1>
          <p className="mt-1 text-sm text-[#00000099]">
            Step {stepIndex + 1} of {roadmap.steps.length}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => void handleStatusChange(option.value)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                activeStatus === option.value
                  ? "border-[#0A66C2] bg-[#0A66C2] text-white"
                  : "border-[#E0E0E0] bg-white text-[#00000099] hover:bg-[#F8F9FA]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <main className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="rounded-lg border border-[#E0E0E0] bg-white p-6 sm:p-8">
          <StepDetail step={step} />
        </article>

        <aside className="rounded-lg border border-[#E0E0E0] bg-white p-5">
          <h2 className="text-sm font-bold uppercase text-[#00000066]">Navigation</h2>
          <div className="mt-4 flex flex-col gap-3">
            {previousStep ? (
              <Link
                to={`/roadmaps/${roadmapId}/steps/${previousStep.id}`}
                className="rounded-lg border border-[#E0E0E0] bg-white px-4 py-3 text-sm font-semibold text-[#000000E6] transition hover:bg-[#F8F9FA]"
              >
                Previous: {previousStep.title}
              </Link>
            ) : (
              <div className="rounded-lg border border-[#EBEBEB] px-4 py-3 text-sm text-[#00000066]">
                First step
              </div>
            )}

            {nextStep ? (
              <Link
                to={`/roadmaps/${roadmapId}/steps/${nextStep.id}`}
                className="rounded-lg bg-[#0A66C2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#004182]"
              >
                Next: {nextStep.title}
              </Link>
            ) : (
              <div className="rounded-lg border border-[#EBEBEB] px-4 py-3 text-sm text-[#00000066]">
                Final step
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
