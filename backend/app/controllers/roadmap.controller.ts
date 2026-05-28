import type { Request, Response } from "express";
import { prisma } from "@/config/prisma.js";

// Lấy danh sách toàn bộ Roadmap
export const getAllRoadmaps = async (req: Request, res: Response): Promise<void> => {
  try {
    const roadmaps = await prisma.roadmap.findMany({
      include: {
        category: {
          select: {
            name: true,
            iconUrl: true,
          },
        },
        stages: {
          orderBy: {
            orderIndex: "asc",
          },
          include: {
            steps: {
              orderBy: {
                orderIndex: "asc",
              },
            },
          },
        },
      },
    });

    res.json(roadmaps);
  } catch (error: any) {
    console.error("Lỗi lấy danh sách roadmap:", error);
    res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách roadmap",
      error: error.message || String(error),
    });
  }
};
