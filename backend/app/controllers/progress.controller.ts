import type { Request, Response } from 'express';
import { prisma } from '@/config/prisma.js';
import { ProgressStatus } from '@/generated/prisma/index.js';

export const getUserProgress = async (req: Request, res: Response) => {
  const userId = String(req.params.userId);
  const roadmapId = String(req.params.roadmapId);

  if (!userId || !roadmapId) {
    return res.status(400).json({ error: 'User ID and Roadmap ID are required' });
  }

  try {
    // Find all steps belonging to this roadmap
    const steps = await prisma.step.findMany({
      where: {
        stage: {
          roadmapId: roadmapId
        }
      },
      select: {
        id: true
      }
    });
    
    const stepIds = steps.map(s => s.id);

    // Get user progress for these steps
    const progress = await prisma.userStepProgress.findMany({
      where: {
        userId,
        stepId: {
          in: stepIds
        }
      }
    });

    // Format as a map: { [stepId]: "in_progress" | "completed" }
    const progressMap: Record<string, string> = {};
    for (const p of progress) {
      progressMap[p.stepId] = p.status;
    }

    return res.json(progressMap);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error fetching progress:", error);
    return res.status(500).json({ error: message });
  }
};

export const upsertUserProgress = async (req: Request, res: Response) => {
  const userId = String(req.params.userId);
  const stepId = String(req.params.stepId);
  const { status } = req.body; // should be 'in_progress', 'completed', or 'not_started'

  if (!userId || !stepId || !status) {
    return res.status(400).json({ error: 'User ID, Step ID, and status are required' });
  }

  try {
    if (status === 'not_started') {
      // Delete the record if it exists
      await prisma.userStepProgress.deleteMany({
        where: {
          userId,
          stepId
        }
      });
      return res.json({ success: true, status: 'not_started' });
    }

    // Must be a valid Prisma enum value
    const prismaStatus = status === 'completed' ? ProgressStatus.completed : ProgressStatus.in_progress;
    const completedAt = status === 'completed' ? new Date() : null;

    const progress = await prisma.userStepProgress.upsert({
      where: {
        userId_stepId: {
          userId,
          stepId
        }
      },
      update: {
        status: prismaStatus,
        completedAt
      },
      create: {
        userId,
        stepId,
        status: prismaStatus,
        completedAt
      }
    });

    return res.json({ success: true, progress });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error upserting progress:", error);
    return res.status(500).json({ error: message });
  }
};
