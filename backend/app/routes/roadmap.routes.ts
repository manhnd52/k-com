import { Router } from "express";
import { getAllRoadmaps, getRoadmapById } from "@/controllers/roadmap.controller.js";

export const roadmapRouter = Router();

roadmapRouter.get("/", getAllRoadmaps);
roadmapRouter.get("/getAllRoadmap", getAllRoadmaps);
roadmapRouter.get("/:id", getRoadmapById);
