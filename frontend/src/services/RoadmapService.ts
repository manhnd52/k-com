import axios from "axios";
import type { RoadmapDetail } from "@/data/roadmaps";

const API_BASE_URL = "http://localhost:3000/api/roadmaps";

// Định nghĩa kiểu dữ liệu cho Roadmap rút gọn hiển thị ở Card
export interface RoadmapCardData {
  id: string | number;
  author: string;
  authorAvatar: string;
  title: string;
  tags: string[];
  duration: string;
  level: string;
  steps: number;
  description: string;
  views: number;
  likes: number;
}

export const getAllRoadmaps = async (): Promise<RoadmapCardData[]> => {
  const response = await axios.get<RoadmapCardData[]>(`${API_BASE_URL}/getAllRoadmap`);
  return response.data;
};

export const getRoadmapById = async (id: string): Promise<RoadmapDetail> => {
  const response = await axios.get<RoadmapDetail>(`${API_BASE_URL}/${id}`);
  return response.data;
};
