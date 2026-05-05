import { useState } from "react";
import FeedCard from "../components/FeedCard";
import FilterModal from "../components/FilterModal";

const MOCK_FEEDS = [
  {
    id: 1,
    author: "Nguyen Duc Manh",
    title: "Mastering Data Engineering in 2026",
    subheading: "A comprehensive guide to modern data pipelines, cloud architecture, and real-time processing.",
    tags: ["Data & AI", "Data Engineering"],
    date: "March 28",
    views: 1200,
    likes: 450,
  },
  {
    id: 2,
    author: "Tran Thi B",
    title: "The Future of Web Development with React 20",
    subheading: "Exploring the latest features in React and how they change the way we build applications.",
    tags: ["Web Development", "React"],
    date: "April 02",
    views: 850,
    likes: 210,
  },
  {
    id: 3,
    author: "Le Van C",
    title: "Cybersecurity Essentials for Cloud Native",
    subheading: "Protecting your infrastructure from modern threats in a serverless and containerized world.",
    tags: ["Cybersecurity", "Cloud"],
    date: "April 05",
    views: 2400,
    likes: 890,
  },
  {
    id: 4,
    author: "Pham Duc D",
    title: "Introduction to Machine Learning Ops",
    subheading: "Bridging the gap between data science and production systems with MLOps best practices.",
    tags: ["Data & AI", "ML Engineer"],
    date: "April 10",
    views: 1500,
    likes: 320,
  },
];

function Home() {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(["Data & AI"]);

  const filteredFeeds = activeFilters.length > 0
    ? MOCK_FEEDS.filter((feed) =>
        feed.tags.some((tag) => activeFilters.includes(tag))
      )
    : MOCK_FEEDS;

  const handleApplyFilters = (filters: string[]) => {
    setActiveFilters(filters);
  };

  return (
    <div className="flex flex-col p-6 lg:p-10">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#f4f4f5]">
            New Feeds
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#71717a]">
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
                className="text-[10px] font-medium text-[#71717a] hover:text-[#f4f4f5] underline underline-offset-2"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <button
          onClick={() => setFilterModalOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[#3f3f46] bg-[#18181b] px-4 py-2 text-sm font-semibold text-[#f4f4f5] transition hover:bg-[#27272a] hover:border-[#52525b]"
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
            <svg className="h-16 w-16 text-[#27272a]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <h3 className="mt-4 text-lg font-bold text-[#f4f4f5]">No results found</h3>
            <p className="text-sm text-[#71717a]">Try adjusting your filters to find what you're looking for.</p>
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
