import { Router } from "express";
import { 
  getAllRoadmaps, 
  getRoadmapById, 
  getStagesByRoadmapId, 
  getStepsByStageId 
} from "@/controllers/roadmap.controller.js";

export const roadmapRouter = Router();

roadmapRouter.get("/", getAllRoadmaps);
roadmapRouter.get("/getAllRoadmap", getAllRoadmaps);
roadmapRouter.get("/:id", getRoadmapById);
roadmapRouter.get("/:roadmapId/stages", getStagesByRoadmapId);
roadmapRouter.get("/stages/:stageId/steps", getStepsByStageId);
