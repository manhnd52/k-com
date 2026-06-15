import { Router } from 'express';
import { createUser, getUserById } from '@/controllers/user.controller.js';
import { getUserProgress, upsertUserProgress } from '@/controllers/progress.controller.js';

export const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/:id', getUserById);
userRouter.get('/:userId/progress/:roadmapId', getUserProgress);
userRouter.put('/:userId/progress/:stepId', upsertUserProgress);
