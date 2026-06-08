import type { RoadmapStep } from "@/data/roadmaps";

type RoadmapDetailPanelProps = {
  step: RoadmapStep | null;
  roadmapLevel: string;
};

const statusLabels = {
  done: "Done",
  learning: "Learning",
  pending: "Pending",
};

const statusClasses = {
  done: "border-[#057642] bg-[#F0FFF7] text-[#057642]",
  learning: "border-[#0A66C2] bg-[#E8F3FF] text-[#0A66C2]",
  pending: "border-[#E0E0E0] bg-[#F8F9FA] text-[#6B7280]",
};

export default function RoadmapDetailPanel({
  step,
  roadmapLevel,
}: RoadmapDetailPanelProps) {
  if (!step) {
    return (
      <aside className="rounded-lg border border-[#E0E0E0] bg-white p-6">
        <p className="text-sm text-[#6B7280]">
          Select a topic in the roadmap to view details.
        </p>
      </aside>
    );
  }

  const status = step.status ?? "pending";
  const resources =
    step.resources && step.resources.length > 0
      ? step.resources
      : ["No curated resources yet. Use this topic as a checkpoint and add resources later."];

  return (
    <aside className="rounded-lg border border-[#BFD7FF] bg-white p-6 shadow-sm xl:sticky xl:top-20">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[#BFD7FF] bg-[#E8F3FF] px-3 py-1 text-xs font-bold uppercase tracking-normal text-[#0A66C2]">
          {step.stage ?? roadmapLevel}
        </span>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-normal ${statusClasses[status]}`}
        >
          {statusLabels[status]}
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[#111827]">
        {step.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-[#4B5563]">
        {step.description ??
          "This topic is part of the roadmap. Select nearby topics to understand what comes before and after it."}
      </p>

      {step.content && (
        <section className="mt-6 border-t border-[#EBEBEB] pt-5">
          <h3 className="text-xs font-bold uppercase tracking-normal text-[#6B7280]">
            Overview
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#374151]">{step.content}</p>
        </section>
      )}

      <section className="mt-6 border-t border-[#EBEBEB] pt-5">
        <h3 className="text-xs font-bold uppercase tracking-normal text-[#6B7280]">
          Resources
        </h3>
        <ul className="mt-3 space-y-2">
          {resources.map((resource, index) => (
            <li
              key={`${resource}-${index}`}
              className="flex gap-3 text-sm leading-5 text-[#374151]"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A66C2]" />
              <span>{resource}</span>
            </li>
          ))}
        </ul>
      </section>

      {step.howTo && step.howTo.length > 0 && (
        <section className="mt-6 border-t border-[#EBEBEB] pt-5">
          <h3 className="text-xs font-bold uppercase tracking-normal text-[#6B7280]">
            Practice
          </h3>
          <ul className="mt-3 space-y-2">
            {step.howTo.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex gap-3 text-sm leading-5 text-[#374151]"
              >
                <span className="mt-0.5 font-bold text-[#0A66C2]">
                  {index + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}
