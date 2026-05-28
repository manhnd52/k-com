import { Router } from "express";
import { getAllRoadmaps } from "../controllers/roadmap.controller";

const router = Router();

router.get("/", getAllRoadmaps);

export default router;
