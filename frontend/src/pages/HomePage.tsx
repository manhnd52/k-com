import { useState } from "react";
import FeedCard from "../components/FeedCard";
import FilterModal from "../components/FilterModal";
import { FEED_POSTS } from "@/data/feeds";

function Home() {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(["Data & AI"]);

  const filteredFeeds = activeFilters.length > 0
    ? FEED_POSTS.filter((feed) =>
        feed.tags.some((tag) => activeFilters.includes(tag))
      )
    : FEED_POSTS;

  const handleApplyFilters = (filters: string[]) => {
    setActiveFilters(filters);
  };

  return (
    <div className="flex flex-col p-6 lg:p-10">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#000000E6]">
            New Feeds
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#9CA3AF]">
              {activeFilters.length > 0 ? "Filtered by:" : "Showing all feeds"}
            </span>
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="flex items-center gap-1 rounded bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand ring-1 ring-brand/30"
              >
                {filter}
                <button
                  onClick={() => setActiveFilters(prev => prev.filter(f => f !== filter))}
                  className="ml-1 hover:text-white"
                >
                  <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="text-[10px] font-medium text-[#9CA3AF] hover:text-[#000000E6] underline underline-offset-2"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <button
          onClick={() => setFilterModalOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[#E0E0E0] bg-[#FFFFFF] px-4 py-2 text-sm font-semibold text-[#000000E6] transition hover:bg-[#F0F0F0] hover:border-[#D1D5DB]"
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
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
          Filter
          {activeFilters.length > 0 && (
             <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
               {activeFilters.length}
             </span>
          )}
        </button>
      </div>

      {/* Feeds List */}
      <div className="flex flex-col gap-6">
        {filteredFeeds.length > 0 ? (
          filteredFeeds.map((feed) => (
            <FeedCard key={feed.id} {...feed} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg className="h-16 w-16 text-[#E0E0E0]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <h3 className="mt-4 text-lg font-bold text-[#000000E6]">No results found</h3>
            <p className="text-sm text-[#9CA3AF]">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        selectedFilters={activeFilters}
        onApply={handleApplyFilters}
      />
    </div>
  );
}

export default Home;
