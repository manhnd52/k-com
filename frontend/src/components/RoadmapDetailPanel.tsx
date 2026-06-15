import { useState, useEffect } from "react";
import type { RoadmapStep } from "@/data/roadmaps";

type RoadmapDetailPanelProps = {
  step: RoadmapStep | null;
  roadmapLevel: string;
  onClose?: () => void;
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

type ParsedResource = {
  type: string;
  title: string;
  url?: string;
};

const parseResource = (resourceStr: string): ParsedResource => {
  // Matches "TYPE: Title (URL)"
  const match = resourceStr.match(/^([A-Z_]+):\s*(.+?)\s*\((https?:\/\/[^\)]+)\)$/);
  if (match) {
    return {
      type: match[1].toLowerCase(),
      title: match[2],
      url: match[3],
    };
  }

  // Handle mockup prefix concatenation if any exists, e.g. "coursePython basics" -> type: "course", title: "Python basics"
  const prefixes = ["roadmap", "course", "official", "article", "feed", "video", "docs", "exercise"];
  for (const prefix of prefixes) {
    if (resourceStr.toLowerCase().startsWith(prefix)) {
      const title = resourceStr.slice(prefix.length).trim();
      return {
        type: prefix,
        title: title || resourceStr,
      };
    }
  }

  // Fallback default
  return {
    type: "docs",
    title: resourceStr,
  };
};

const typeClasses: Record<string, string> = {
  video: "bg-indigo-50 text-indigo-700 border-indigo-200",
  course: "bg-indigo-50 text-indigo-700 border-indigo-200",
  docs: "bg-emerald-50 text-emerald-700 border-emerald-200",
  official: "bg-emerald-50 text-emerald-700 border-emerald-200",
  article: "bg-purple-50 text-purple-700 border-purple-200",
  exercise: "bg-amber-50 text-amber-700 border-amber-200",
  practice: "bg-amber-50 text-amber-700 border-amber-200",
  roadmap: "bg-sky-50 text-sky-700 border-sky-200",
  feed: "bg-pink-50 text-pink-700 border-pink-200",
  default: "bg-slate-50 text-slate-700 border-slate-200",
};

const renderIcon = (type: string) => {
  switch (type) {
    case "video":
    case "course":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12L7.5 20V4L21 12z" />
        </svg>
      );
    case "docs":
    case "official":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    case "article":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      );
    case "exercise":
    case "practice":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      );
    case "roadmap":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75h12m-12 5.25h12m-12 5.25h12M3 6.75h.008v.008H3V6.75zm0 5.25h.008v.008H3V12zm0 5.25h.008v.008H3v-.008z" />
        </svg>
      );
    case "feed":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742h.016v.016h-.016v-.016zm3.42 0h.016v.016h-.016v-.016zm3.42 0h.016v.016h-.016v-.016zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      );
  }
};

export default function RoadmapDetailPanel({
  step,
  roadmapLevel,
  onClose,
}: RoadmapDetailPanelProps) {
  const [activeStep, setActiveStep] = useState<RoadmapStep | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (step) {
      setActiveStep(step);
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
      const timer = setTimeout(() => {
        setActiveStep(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (!activeStep) {
    return null;
  }

  const status = activeStep.status ?? "pending";
  const resources = activeStep.resources ?? [];

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 top-14 bg-black/40 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className={`fixed top-14 right-0 bottom-0 z-40 w-full sm:w-[450px] bg-white border-l border-[#E0E0E0] shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-[#E0E0E0] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2] hover:text-[#004182] transition group"
          >
            <svg
              className="h-4 w-4 transform transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Return
          </button>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#BFD7FF] bg-[#E8F3FF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0A66C2]">
              {activeStep.stage ?? roadmapLevel}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusClasses[status]}`}
            >
              {statusLabels[status]}
            </span>
          </div>
        </div>

        {/* Panel Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Title and Description */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-[#111827]">
              {activeStep.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
              {activeStep.description ??
                "This topic is part of the roadmap. Select nearby topics to understand what comes before and after it."}
            </p>
          </div>

          {/* Overview */}
          {activeStep.content && (
            <section className="border-t border-[#EBEBEB] pt-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">
                Overview
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#374151] whitespace-pre-line">
                {activeStep.content}
              </p>
            </section>
          )}

          {/* Resources */}
          <section className="border-t border-[#EBEBEB] pt-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-3">
              Resources
            </h3>
            {resources.length > 0 ? (
              <div className="grid gap-3">
                {resources.map((resourceStr, index) => {
                  const parsed = parseResource(resourceStr);
                  const isLink = !!parsed.url;
                  const Element = isLink ? "a" : "div";
                  const elementProps = isLink
                    ? {
                        href: parsed.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {};

                  return (
                    <Element
                      key={`${resourceStr}-${index}`}
                      {...elementProps}
                      className={`flex items-center justify-between p-3.5 rounded-lg border border-[#EBEBEB] transition-all duration-200 ${
                        isLink
                          ? "hover:border-[#0A66C2] hover:bg-[#F8FBFF] hover:shadow-sm cursor-pointer group"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${
                            typeClasses[parsed.type] ?? typeClasses.default
                          }`}
                        >
                          {renderIcon(parsed.type)}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                            {parsed.type}
                          </span>
                          <span
                            className={`text-sm font-semibold text-[#111827] line-clamp-1 ${
                              isLink ? "group-hover:text-[#0A66C2] transition-colors" : ""
                            }`}
                          >
                            {parsed.title}
                          </span>
                        </div>
                      </div>
                      {isLink && (
                        <svg
                          className="h-4 w-4 text-[#9CA3AF] group-hover:text-[#0A66C2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      )}
                    </Element>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-[#6B7280] italic">
                No curated resources yet. Use this topic as a checkpoint and add resources later.
              </p>
            )}
          </section>

          {/* Practice (How To) */}
          {activeStep.howTo && activeStep.howTo.length > 0 && (
            <section className="border-t border-[#EBEBEB] pt-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-3">
                Practice
              </h3>
              <ul className="space-y-3">
                {activeStep.howTo.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex gap-3 text-sm leading-relaxed text-[#374151]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F3FF] text-[11px] font-bold text-[#0A66C2] mt-0.5">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Rule */}
          {activeStep.rule && (
            <section className="border-t border-[#EBEBEB] pt-5 pb-4">
              <div className="rounded-lg border-l-4 border-[#0A66C2] bg-[#E8F3FF] p-4 shadow-sm">
                <p className="text-sm font-semibold text-[#004182]">
                  Rule: {activeStep.rule}
                </p>
              </div>
            </section>
          )}
        </div>
      </aside>
    </>
  );
}
