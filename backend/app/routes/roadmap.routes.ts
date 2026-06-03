import { Router } from "express";
import {
  getAllRoadmaps,
  getRoadmapById,
  getStagesByRoadmapId,
  getStepsByStageId,
} from "@/controllers/roadmap.controller.js";

export const roadmapRouter = Router();

roadmapRouter.get("/", getAllRoadmaps);
roadmapRouter.get("/getAllRoadmap", getAllRoadmaps);
roadmapRouter.get("/stages/:stageId/steps", getStepsByStageId);
roadmapRouter.get("/:roadmapId/stages", getStagesByRoadmapId);
roadmapRouter.get("/:id", getRoadmapById);
