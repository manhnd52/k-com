import axios from "axios";

export type ThumbnailTone =
  | "ai"
  | "frontend"
  | "devops"
  | "data"
  | "security"
  | "mobile";

type ApiRoadmap = {
  id: number;
  author: string;
  authorAvatar: string;
  thumbnailLabel: string;
  thumbnailTone: ThumbnailTone;
  title: string;
  tags: string[];
  duration: string;
  level: string;
  steps: number;
  description: string;
  views: number;
  likes: number;
};

type RoadmapsResponse = {
  data: ApiRoadmap[];
};

export type RoadmapCardData = {
  id: number;
  author: string;
  authorAvatar: string;
  thumbnailLabel: string;
  thumbnailTone: ThumbnailTone;
  title: string;
  tags: string[];
  duration: string;
  level: string;
  steps: number;
  description: string;
  views: number;
  likes: number;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ""),
});

const mapRoadmapToCardData = (roadmap: ApiRoadmap): RoadmapCardData => ({
  id: roadmap.id,
  author: roadmap.author,
  authorAvatar: roadmap.authorAvatar,
  thumbnailLabel: roadmap.thumbnailLabel,
  thumbnailTone: roadmap.thumbnailTone,
  title: roadmap.title,
  tags: roadmap.tags,
  duration: roadmap.duration,
  level: roadmap.level,
  steps: roadmap.steps,
  description: roadmap.description,
  views: roadmap.views,
  likes: roadmap.likes,
});

export const getRoadmaps = async (): Promise<RoadmapCardData[]> => {
  const response = await api.get<RoadmapsResponse>("/roadmaps");
  return response.data.data.map(mapRoadmapToCardData);
};
