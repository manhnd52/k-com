import type { Request, Response } from 'express';
import { prisma } from '@/config/prisma.js';

export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await prisma.user.create({
      data: { 
        email, 
        displayName: name || email.split("@")[0]
      },
    });
    return res.status(201).json(user);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: id as string },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
