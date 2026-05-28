import { ROADMAP_DETAILS } from "@/data/roadmaps";
import type { RoadmapDetail, RoadmapStep } from "@/data/roadmaps";

export type StepStatus = "not-started" | "in-progress" | "completed";

export type RoadmapProgress = Record<number, StepStatus>;

const PROGRESS_STORAGE_KEY = "kcom_roadmap_progress";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export class RoadmapApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RoadmapApiError";
  }
}

const delay = async () => {
  await new Promise((resolve) => window.setTimeout(resolve, 120));
};

const apiUrl = (path: string) => {
  if (!API_BASE_URL) {
    return null;
  }

  return `${API_BASE_URL.replace(/\/$/, "")}${path}`;
};

const fetchJson = async <T>(path: string): Promise<T | null> => {
  const url = apiUrl(path);

  if (!url) {
    return null;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new RoadmapApiError(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

const readProgressStore = (): Record<string, RoadmapProgress> => {
  const rawValue = localStorage.getItem(PROGRESS_STORAGE_KEY);

  if (!rawValue) {
    return {};
  }

  try {
    return JSON.parse(rawValue) as Record<string, RoadmapProgress>;
  } catch {
    return {};
  }
};

const writeProgressStore = (store: Record<string, RoadmapProgress>) => {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(store));
};

export const getRoadmaps = async (): Promise<RoadmapDetail[]> => {
  const apiResult = await fetchJson<RoadmapDetail[]>("/api/roadmaps");

  if (apiResult) {
    return apiResult;
  }

  await delay();
  return Object.values(ROADMAP_DETAILS);
};

export const getRoadmapById = async (
  roadmapId: number,
): Promise<RoadmapDetail | null> => {
  const apiResult = await fetchJson<RoadmapDetail | null>(
    `/api/roadmaps/${roadmapId}`,
  );

  if (apiResult) {
    return apiResult;
  }

  await delay();
  return ROADMAP_DETAILS[roadmapId] ?? null;
};

export const getRoadmapStep = async (
  roadmapId: number,
  stepId: number,
): Promise<{ roadmap: RoadmapDetail; step: RoadmapStep } | null> => {
  const apiResult = await fetchJson<{ roadmap: RoadmapDetail; step: RoadmapStep } | null>(
    `/api/roadmaps/${roadmapId}/steps/${stepId}`,
  );

  if (apiResult) {
    return apiResult;
  }

  const roadmap = await getRoadmapById(roadmapId);
  const step = roadmap?.steps.find((item) => item.id === stepId);

  if (!roadmap || !step) {
    return null;
  }

  return { roadmap, step };
};

export const getRoadmapProgress = async (
  roadmapId: number,
): Promise<RoadmapProgress> => {
  await delay();
  return readProgressStore()[String(roadmapId)] ?? {};
};

export const updateStepStatus = async (
  roadmapId: number,
  stepId: number,
  status: StepStatus,
): Promise<RoadmapProgress> => {
  await delay();

  const store = readProgressStore();
  const roadmapProgress = store[String(roadmapId)] ?? {};
  const nextProgress = {
    ...roadmapProgress,
    [stepId]: status,
  };

  store[String(roadmapId)] = nextProgress;
  writeProgressStore(store);

  return nextProgress;
};

export const getStepStatus = (
  progress: RoadmapProgress,
  stepId: number,
): StepStatus => progress[stepId] ?? "not-started";
