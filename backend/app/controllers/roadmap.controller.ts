import type { Request, Response } from 'express';
import { roadmaps } from '@/data/roadmaps.js';

export const getRoadmaps = (_req: Request, res: Response) => {
  return res.json({
    data: roadmaps,
  });
};
