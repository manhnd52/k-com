import { useState } from "react";
import type {
  RoadmapFilterGroup,
  RoadmapFilterGroupId,
  RoadmapFilterState,
} from "@/data/roadmapFilters";

type FilterBarProps = {
  filterGroups: RoadmapFilterGroup[];
  activeFilters: RoadmapFilterState;
  onToggleFilter: (groupId: RoadmapFilterGroupId, value: string) => void;
  onClearFilter: (groupId: RoadmapFilterGroupId, value: string) => void;
  onClearAllFilters: () => void;
};

export default function FilterBar({
  filterGroups,
  activeFilters,
  onToggleFilter,
  onClearFilter,
  onClearAllFilters,
}: FilterBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const selectedFilters = filterGroups.flatMap((group) =>
    activeFilters[group.id].map((value) => ({
      groupId: group.id,
      groupLabel: group.label,
      value,
      label:
        group.options.find((option) => option.value === value)?.label ?? value,
    })),
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-[#6B7280]">Filtered by:</span>

      {selectedFilters.length > 0 ? (
        selectedFilters.map((filter) => (
          <button
            key={`${filter.groupId}-${filter.value}`}
            type="button"
            onClick={() => onClearFilter(filter.groupId, filter.value)}
            className="group inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand transition hover:border-brand hover:bg-brand/20"
          >
            <span className="text-brand/70">{filter.groupLabel}:</span>
            {filter.label}
            <svg
              className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ))
      ) : (
        <span className="text-xs text-[#9CA3AF]">All</span>
      )}

      {selectedFilters.length > 0 && (
        <button
          type="button"
          onClick={onClearAllFilters}
          className="text-xs font-medium text-[#6B7280] underline underline-offset-2 transition hover:text-[#111827]"
        >
          Clear filters
        </button>
      )}

      <div className="relative ml-auto">
        <button
          type="button"
          onClick={() => setShowSuggestions((prev) => !prev)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E0E0E0] bg-[#FFFFFF] px-3 py-1.5 text-xs font-medium text-[#6B7280] transition hover:border-brand hover:text-brand"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          Filter
          {selectedFilters.length > 0 && (
            <span className="rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">
              {selectedFilters.length}
            </span>
          )}
        </button>

        {showSuggestions && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowSuggestions(false)}
            />
            <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-[#E0E0E0] bg-[#FFFFFF] p-3 shadow-xl">
              <div className="space-y-4">
                {filterGroups.map((group) => (
                  <div key={group.id}>
                    <p className="px-2 text-xs font-bold uppercase tracking-normal text-[#9CA3AF]">
                      {group.label}
                    </p>
                    <div className="mt-2 grid gap-1">
                      {group.options.map((option) => {
                        const isSelected = activeFilters[group.id].includes(
                          option.value,
                        );

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => onToggleFilter(group.id, option.value)}
                            className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-xs transition ${
                              isSelected
                                ? "bg-brand/10 font-semibold text-brand"
                                : "text-[#6B7280] hover:bg-[#F0F0F0] hover:text-[#111827]"
                            }`}
                          >
                            <span>{option.label}</span>
                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded border ${
                                isSelected
                                  ? "border-brand bg-brand text-white"
                                  : "border-[#D1D5DB] bg-white"
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  className="h-3 w-3"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
