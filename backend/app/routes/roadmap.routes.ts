import { Router } from "express";
import { getAllRoadmaps } from "@/controllers/roadmap.controller.js";

export const roadmapRouter = Router();

roadmapRouter.get("/", getAllRoadmaps);
