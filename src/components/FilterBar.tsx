import { useState } from "react";

type FilterBarProps = {
  activeFilters: string[];
  onRemoveFilter: (filter: string) => void;
  onOpenFilterPanel: () => void;
};

const AVAILABLE_FILTERS = [
  "Data & AI",
  "Web Development",
  "Mobile",
  "DevOps",
  "Security",
  "Design",
  "Cloud",
];

export default function FilterBar({
  activeFilters,
  onRemoveFilter,
  onOpenFilterPanel,
}: FilterBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-[#a1a1aa]">Filtered by:</span>

      {activeFilters.map((f) => (
        <button
          key={f}
          onClick={() => onRemoveFilter(f)}
          className="group inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand transition hover:border-brand hover:bg-brand/20"
        >
          {f}
          <svg
            className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ))}

      {activeFilters.length === 0 && (
        <span className="text-xs text-[#71717a]">All</span>
      )}

      {/* Filter suggestions dropdown */}
      <div className="relative ml-auto">
        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#3f3f46] bg-[#18181b] px-3 py-1.5 text-xs font-medium text-[#a1a1aa] transition hover:border-brand hover:text-brand"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          Filter
        </button>

        {showSuggestions && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowSuggestions(false)}
            />
            <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-[#3f3f46] bg-[#18181b] p-2 shadow-xl">
              {AVAILABLE_FILTERS.filter((f) => !activeFilters.includes(f)).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    onOpenFilterPanel();
                    setShowSuggestions(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#a1a1aa] transition hover:bg-[#27272a] hover:text-[#f4f4f5]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3f3f46]" />
                  {f}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
