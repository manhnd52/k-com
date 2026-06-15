import axios from "axios";

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
    return unwrapRoadmaps(response.data);
  } catch (error) {
    console.error("Failed to fetch roadmaps from DB:", error);
    return [];
  }
};

export const getAllRoadmaps = getRoadmaps;

export const getRoadmapById = async (id: string): Promise<Record<string, unknown>> => {
  const response = await api.get(`/roadmaps/${id}`);
  return response.data;
};

export const fetchUserProgress = async (userId: string, roadmapId: string): Promise<Record<string, 'not_started' | 'in_progress' | 'completed'>> => {
  try {
    const response = await api.get(`/users/${userId}/progress/${roadmapId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user progress:", error);
    return {};
  }
};

export const updateUserProgress = async (userId: string, stepId: string, status: 'not_started' | 'in_progress' | 'completed'): Promise<boolean> => {
  try {
    await api.put(`/users/${userId}/progress/${stepId}`, { status });
    return true;
  } catch (error) {
    console.error("Failed to update user progress:", error);
    return false;
  }
};

