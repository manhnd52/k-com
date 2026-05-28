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

// Lấy lộ trình theo ID cùng danh sách các stage (sắp xếp theo orderIndex)
export const getRoadmapById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "ID lộ trình là bắt buộc",
      });
      return;
    }

    // Bước 1: Lấy thông tin cơ bản của roadmap
    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            iconUrl: true,
          },
        },
      },
    });

    if (!roadmap) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy lộ trình",
      });
      return;
    }

    // Bước 2: Lấy danh sách các stage thuộc roadmap (sắp xếp theo orderIndex)
    const stages = await prisma.stage.findMany({
      where: { roadmapId: id },
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
    });

    res.json({
      success: true,
      data: {
        roadmap,
        stages,
      },
    });
  } catch (error: any) {
    console.error("Lỗi lấy chi tiết roadmap:", error);
    res.status(500).json({
      success: false,
      message: "Không thể lấy chi tiết lộ trình",
      error: error.message || String(error),
    });
  }
};
