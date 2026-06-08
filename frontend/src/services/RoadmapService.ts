import axios from "axios";
import {
  getMockRoadmapById,
  getMockRoadmapCards,
  type RoadmapDetail,
} from "@/data/roadmaps";

export type ThumbnailTone =
  | "ai"
  | "frontend"
  | "devops"
  | "data"
  | "security"
  | "mobile";

export type RoadmapCardData = {
  id: string | number;
  author: string;
  authorAvatar: string;
  thumbnailLabel?: string;
  thumbnailTone?: ThumbnailTone;
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

type RoadmapsApiResponse =
  | RoadmapCardData[]
  | {
      data?: RoadmapCardData[];
    };

const unwrapRoadmaps = (response: RoadmapsApiResponse): RoadmapCardData[] => {
  if (Array.isArray(response)) {
    return response;
  }
  if (response && Array.isArray(response.data)) {
    return response.data;
  }
  return [];
};

export const getRoadmaps = async (): Promise<RoadmapCardData[]> => {
  try {
    const response = await api.get<RoadmapsApiResponse>("/roadmaps");
    const roadmaps = unwrapRoadmaps(response.data);

    return roadmaps.length > 0 ? roadmaps : getMockRoadmapCards();
  } catch {
    return getMockRoadmapCards();
  }
};

export const getAllRoadmaps = getRoadmaps;

export const getRoadmapById = async (id: string): Promise<RoadmapDetail> => {
  const localRoadmap = getMockRoadmapById(id);

  if (localRoadmap) {
    return localRoadmap;
  }

  const response = await api.get<RoadmapDetail>(`/roadmaps/${id}`);
  return response.data;
};
