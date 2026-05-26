import { Router } from 'express';
import { createUser, getUserById } from '@/controllers/user.controller.js';

export const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/:id', getUserById);
