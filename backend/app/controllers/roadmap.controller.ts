import type { Request, Response } from "express";
import { prisma } from "@/config/prisma.js";

type ThumbnailTone = "ai" | "frontend" | "devops" | "data" | "security" | "mobile";

type RouteParam = string | string[] | undefined;

type RoadmapCategory = {
  name: string;
  iconUrl: string | null;
};

type StepResource = {
  id: string;
  type: string;
  title: string;
  url: string;
  orderIndex: number;
};

type RoadmapStep = {
  id: string;
  stageId: string;
  title: string;
  orderIndex: number;
  estimatedMinutes: number | null;
  content?: {
    bodyMarkdown: string;
  } | null;
  resources: StepResource[];
};

type RoadmapStage = {
  id: string;
  roadmapId: string;
  title: string;
  description: string | null;
  orderIndex: number;
  steps: RoadmapStep[];
};

type RoadmapListItem = {
  id: string;
  title: string;
  description: string | null;
  difficultyLevel: string;
  estimatedHours: number;
  category: RoadmapCategory | null;
  stages: Array<{
    steps: Array<{ id: string }>;
  }>;
};

type RoadmapDetailItem = Omit<RoadmapListItem, "stages"> & {
  stages: RoadmapStage[];
};

type StageListItem = {
  id: string;
  roadmapId: string;
  title: string;
  description: string | null;
  orderIndex: number;
  steps: Array<{ id: string }>;
};

const getParam = (value: RouteParam) => (Array.isArray(value) ? value[0] : value);

const getThumbnailTone = (categoryName?: string | null): ThumbnailTone => {
  const normalized = (categoryName ?? "").toLowerCase();

  if (normalized.includes("web") || normalized.includes("frontend")) return "frontend";
  if (normalized.includes("devops") || normalized.includes("cloud")) return "devops";
  if (normalized.includes("data") || normalized.includes("ai")) return "data";
  if (normalized.includes("security")) return "security";
  if (normalized.includes("mobile")) return "mobile";
  return "ai";
};

const formatDuration = (estimatedHours: number) => {
  const days = Math.max(1, Math.round(estimatedHours / 8));
  return `${days} days`;
};

const formatLevel = (level: string) =>
  level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();

export const getAllRoadmaps = async (_req: Request, res: Response): Promise<void> => {
  try {
    const roadmaps = (await prisma.roadmap.findMany({
      include: {
        category: {
          select: {
            name: true,
            iconUrl: true,
          },
        },
        stages: {
          include: {
            steps: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })) as RoadmapListItem[];

    const formattedRoadmaps = roadmaps.map((roadmap) => {
      const totalSteps = roadmap.stages.reduce(
        (total, stage) => total + stage.steps.length,
        0,
      );

      return {
        id: roadmap.id,
        author: "System",
        authorAvatar: "S",
        thumbnailLabel: roadmap.title.slice(0, 2).toUpperCase(),
        thumbnailTone: getThumbnailTone(roadmap.category?.name),
        title: roadmap.title,
        tags: roadmap.category ? [roadmap.category.name] : [],
        duration: formatDuration(roadmap.estimatedHours),
        level: formatLevel(roadmap.difficultyLevel),
        steps: totalSteps,
        description: roadmap.description || "",
        views: 0,
        likes: 0,
      };
    });

    res.json(formattedRoadmaps);
  } catch (error: any) {
    console.error("Failed to load roadmaps:", error);
    res.status(500).json({
      success: false,
      message: "Unable to load roadmaps",
      error: error.message || String(error),
    });
  }
};

export const getRoadmaps = getAllRoadmaps;

export const getRoadmapById = async (req: Request, res: Response): Promise<void> => {
  const id = getParam(req.params.id);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Roadmap ID is required",
    });
    return;
  }

  try {
    const roadmap = (await prisma.roadmap.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            name: true,
            iconUrl: true,
          },
        },
        stages: {
          orderBy: {
            orderIndex: "asc",
          },
          include: {
            steps: {
              orderBy: {
                orderIndex: "asc",
              },
              include: {
                content: true,
                resources: {
                  orderBy: {
                    orderIndex: "asc",
                  },
                },
              },
            },
          },
        },
      },
    })) as RoadmapDetailItem | null;

    if (!roadmap) {
      res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
      return;
    }

    const steps = roadmap.stages.flatMap((stage) =>
      stage.steps.map((step) => ({
        id: step.id,
        title: step.title,
        description: stage.title,
        content: step.content?.bodyMarkdown || "No detailed content available.",
        resources: step.resources.map(
          (resource) => `${resource.type.toUpperCase()}: ${resource.title} (${resource.url})`,
        ),
        howTo: [
          `Learn the core ideas behind ${step.title}`,
          "Practice with small examples",
          "Review notes and supporting resources",
        ],
        rule: "Study consistently and review your progress.",
      })),
    );

    res.json({
      id: roadmap.id,
      author: "System",
      authorAvatar: "S",
      title: roadmap.title,
      tags: roadmap.category ? [roadmap.category.name] : [],
      duration: formatDuration(roadmap.estimatedHours),
      level: formatLevel(roadmap.difficultyLevel),
      description: roadmap.description || "",
      views: 0,
      likes: 0,
      steps,
      stages: roadmap.stages,
    });
  } catch (error: any) {
    console.error("Failed to load roadmap detail:", error);
    res.status(500).json({
      success: false,
      message: "System error",
      error: error.message || String(error),
    });
  }
};

export const getStagesByRoadmapId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const roadmapId = getParam(req.params.roadmapId);

  if (!roadmapId) {
    res.status(400).json({
      success: false,
      message: "Roadmap ID is required",
    });
    return;
  }

  try {
    const roadmap = await prisma.roadmap.findUnique({
      where: { id: roadmapId },
    });

    if (!roadmap) {
      res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
      return;
    }

    const stages = (await prisma.stage.findMany({
      where: { roadmapId },
      include: {
        steps: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        orderIndex: "asc",
      },
    })) as StageListItem[];

    const formattedStages = stages.map((stage) => ({
      id: stage.id,
      roadmapId: stage.roadmapId,
      title: stage.title,
      description: stage.description || "",
      orderIndex: stage.orderIndex,
      stepsCount: stage.steps.length,
    }));

    res.json({
      success: true,
      roadmapId,
      roadmapTitle: roadmap.title,
      stagesCount: formattedStages.length,
      stages: formattedStages,
    });
  } catch (error: any) {
    console.error("Failed to load roadmap stages:", error);
    res.status(500).json({
      success: false,
      message: "System error",
      error: error.message || String(error),
    });
  }
};

export const getStepsByStageId = async (req: Request, res: Response): Promise<void> => {
  const stageId = getParam(req.params.stageId);

  if (!stageId) {
    res.status(400).json({
      success: false,
      message: "Stage ID is required",
    });
    return;
  }

  try {
    const stage = await prisma.stage.findUnique({
      where: { id: stageId },
    });

    if (!stage) {
      res.status(404).json({
        success: false,
        message: "Stage not found",
      });
      return;
    }

    const steps = (await prisma.step.findMany({
      where: { stageId },
      include: {
        content: true,
        resources: {
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
      orderBy: {
        orderIndex: "asc",
      },
    })) as RoadmapStep[];

    const formattedSteps = steps.map((step) => ({
      id: step.id,
      stageId: step.stageId,
      title: step.title,
      orderIndex: step.orderIndex,
      estimatedMinutes: step.estimatedMinutes || 0,
      content: step.content?.bodyMarkdown || "No detailed content available.",
      resourcesCount: step.resources.length,
      resources: step.resources.map((resource) => ({
        id: resource.id,
        type: resource.type,
        title: resource.title,
        url: resource.url,
        orderIndex: resource.orderIndex,
      })),
    }));

    res.json({
      success: true,
      stageId,
      stageTitle: stage.title,
      stepsCount: formattedSteps.length,
      steps: formattedSteps,
    });
  } catch (error: any) {
    console.error("Failed to load stage steps:", error);
    res.status(500).json({
      success: false,
      message: "System error",
      error: error.message || String(error),
    });
  }
};
