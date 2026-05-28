import { Router } from 'express';
import { getRoadmaps } from '@/controllers/roadmap.controller.js';

export const roadmapRouter = Router();

roadmapRouter.get('/', getRoadmaps);
