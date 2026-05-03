import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import FilterBar from "@/components/FilterBar";
import RoadmapCard from "@/components/RoadmapCard";

const ROADMAPS = [
  {
    id: 1,
    author: "Nguyen Duc Manh",
    authorAvatar: "N",
    title: "ML Engineer Roadmap",
    tags: ["Data & AI", "Data Engineering"],
    duration: "6 months",
    level: "Intermediate",
    steps: 12,
    description:
      "A comprehensive learning path covering mathematics, machine learning algorithms, deep learning frameworks, MLOps practices, and production deployment strategies.",
    views: 1420,
    likes: 234,
  },
  {
    id: 2,
    author: "Tran Thi Huong",
    authorAvatar: "T",
    title: "Frontend Developer",
    tags: ["Web Development", "UI/UX"],
    duration: "4 months",
    level: "Beginner",
    steps: 9,
    description:
      "Master HTML, CSS, JavaScript, and modern frameworks like React and Vue. Learn responsive design, accessibility, performance optimization, and testing strategies.",
    views: 3890,
    likes: 567,
  },
  {
    id: 3,
    author: "Le Van Minh",
    authorAvatar: "L",
    title: "DevOps Engineer",
    tags: ["DevOps", "Cloud"],
    duration: "5 months",
    level: "Intermediate",
    steps: 10,
    description:
      "From CI/CD pipelines to container orchestration with Kubernetes. Covers infrastructure as code, monitoring, logging, and incident response workflows.",
    views: 2150,
    likes: 312,
  },
  {
    id: 4,
    author: "Pham Quang Hung",
    authorAvatar: "P",
    title: "Data Analyst",
    tags: ["Data & AI", "Analytics"],
    duration: "3 months",
    level: "Beginner",
    steps: 8,
    description:
      "Learn SQL, Excel, Python for data analysis, data visualization with Tableau and Power BI, statistical reasoning, and storytelling with data.",
    views: 960,
    likes: 178,
  },
  {
    id: 5,
    author: "Hoang Thi Mai",
    authorAvatar: "H",
    title: "Cybersecurity Specialist",
    tags: ["Security", "DevOps"],
    duration: "7 months",
    level: "Advanced",
    steps: 14,
    description:
      "Network security fundamentals, ethical hacking, threat modeling, cryptography, incident handling, and compliance frameworks like ISO 27001 and NIST.",
    views: 1890,
    likes: 421,
  },
  {
    id: 6,
    author: "Dao Anh Tuan",
    authorAvatar: "D",
    title: "Mobile Developer (React Native)",
    tags: ["Mobile", "Web Development"],
    duration: "5 months",
    level: "Intermediate",
    steps: 11,
    description:
      "Build cross-platform mobile apps with React Native. Covers navigation, state management, native modules, app store deployment, and offline-first architecture.",
    views: 1320,
    likes: 290,
  },
];

export default function RoadmapsPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["Data & AI"]);

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const handleOpenFilterPanel = () => {
    // Mock filter panel — cycles through available categories
    const allFilters = ["Data & AI", "Web Development", "Mobile", "DevOps", "Security", "Design", "Cloud"];
    const next = allFilters[Math.floor(Math.random() * allFilters.length)];
    if (!activeFilters.includes(next)) {
      setActiveFilters((prev) => [...prev, next]);
    }
  };

  const filteredRoadmaps = activeFilters.length
    ? ROADMAPS.filter((r) => r.tags.some((t) => activeFilters.includes(t)))
    : ROADMAPS;

  return (
    <div className="flex flex-1 flex-col">
        {/* Page header */}
        <div className="border-b border-[#27272a] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-screen-xl">
            <h1 className="text-3xl font-bold tracking-tight text-[#f4f4f5] sm:text-4xl">
              Roadmap List
            </h1>
            <p className="mt-2 text-sm text-[#71717a] sm:text-base">
              Explore career paths and learning journeys
            </p>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-screen-xl">
            {/* Filter bar */}
            <div className="mb-6">
              <FilterBar
                activeFilters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
                onOpenFilterPanel={handleOpenFilterPanel}
              />
            </div>

            {/* Roadmap grid */}
            {filteredRoadmaps.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredRoadmaps.map((roadmap) => (
                  <RoadmapCard key={roadmap.id} {...roadmap} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg
                  className="mb-4 h-12 w-12 text-[#3f3f46]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p className="text-sm font-medium text-[#a1a1aa]">No roadmaps found</p>
                <p className="mt-1 text-xs text-[#71717a]">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
