export type RoadmapFilterGroupId = "category" | "level";

export type RoadmapFilterOption = {
  label: string;
  value: string;
};

export type RoadmapFilterGroup = {
  id: RoadmapFilterGroupId;
  label: string;
  options: RoadmapFilterOption[];
};

export type RoadmapFilterState = Record<RoadmapFilterGroupId, string[]>;

type FilterableRoadmap = {
  tags?: string[];
  level?: string;
};

export const ROADMAP_FILTER_GROUPS: RoadmapFilterGroup[] = [
  {
    id: "category",
    label: "Category",
    options: [
      { label: "Data & AI", value: "Data & AI" },
      { label: "Web Development", value: "Web Development" },
      { label: "Mobile", value: "Mobile" },
      { label: "DevOps", value: "DevOps" },
      { label: "Security", value: "Security" },
      { label: "Cloud", value: "Cloud" },
      { label: "Backend", value: "Backend" },
      { label: "Analytics", value: "Analytics" },
    ],
  },
  {
    id: "level",
    label: "Level",
    options: [
      { label: "Beginner", value: "Beginner" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Advanced", value: "Advanced" },
    ],
  },
];

export const EMPTY_ROADMAP_FILTERS: RoadmapFilterState = {
  category: [],
  level: [],
};

export const createEmptyRoadmapFilters = (): RoadmapFilterState => ({
  category: [],
  level: [],
});

export const roadmapMatchesFilters = (
  roadmap: FilterableRoadmap,
  filters: RoadmapFilterState,
) => {
  const categoryFilters = filters.category;
  const levelFilters = filters.level;
  const tags = roadmap.tags ?? [];

  const matchesCategory =
    categoryFilters.length === 0 ||
    categoryFilters.some((category) => tags.includes(category));
  const matchesLevel =
    levelFilters.length === 0 ||
    (roadmap.level ? levelFilters.includes(roadmap.level) : false);

  return matchesCategory && matchesLevel;
};
