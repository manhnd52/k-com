import type { Request, Response } from "express";
import { prisma } from "@/config/prisma.js";

// Lấy danh sách toàn bộ Roadmap (Dạng gọn để hiển thị Card)
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
          include: {
            steps: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    // Định dạng lại dữ liệu trả về giống định dạng Card frontend cần
    const formattedRoadmaps = roadmaps.map((r) => {
      // Đếm tổng số step của tất cả stages
      const totalSteps = r.stages.reduce((acc, stage) => acc + stage.steps.length, 0);
      
      return {
        id: r.id,
        author: "System",
        authorAvatar: "S",
        title: r.title,
        tags: r.category ? [r.category.name] : [],
        duration: `${Math.round(r.estimatedHours / 8)} days`, // chuyển từ estimated hours sang days
        level: r.difficultyLevel,
        steps: totalSteps,
        description: r.description || "",
        views: 0,
        likes: 0,
      };
    });

    res.json(formattedRoadmaps);
  } catch (error: any) {
    console.error("Lỗi lấy danh sách roadmap:", error);
    res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách roadmap",
      error: error.message || String(error),
    });
  }
};

// Lấy chi tiết của một Roadmap kèm theo Stages, Steps, Content & Resources
export const getRoadmapById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      success: false,
      message: "ID lộ trình là bắt buộc",
    });
    return;
  }

  try {
    const roadmap = await prisma.roadmap.findUnique({
      where: { id: id as string },
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
              include: {
                content: true,
                resources: {
                  orderBy: {
                    orderIndex: "asc",
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!roadmap) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy lộ trình học tập",
      });
      return;
    }

    // Định dạng lại dữ liệu chi tiết của roadmap để tương thích cấu trúc hiển thị của frontend
    // Gom tất cả các step của các stage thành một mảng phẳng nếu frontend cần hoặc trả nguyên cấu trúc
    const stepsList: any[] = [];
    roadmap.stages.forEach((stage) => {
      stage.steps.forEach((step) => {
        // Trích xuất list howTo từ bodyMarkdown hoặc hardcode hướng dẫn học
        const howTo = [
          `Tìm hiểu → Khám phá lý thuyết về ${step.title}`,
          `Thực hành → Làm bài tập liên quan đến chủ đề này`,
          `Xem lại → Ôn tập các tài liệu bổ trợ`,
        ];

        stepsList.push({
          id: step.id,
          title: step.title,
          description: `Giai đoạn: ${stage.title}`,
          content: step.content?.bodyMarkdown || "Chưa có nội dung chi tiết cho bước học này.",
          resources: step.resources.map((res) => `${res.type.toUpperCase()}: ${res.title} (${res.url})`),
          howTo,
          rule: "Hãy học tập đều đặn mỗi ngày.",
        });
      });
    });

    const formattedDetail = {
      id: roadmap.id,
      author: "System",
      authorAvatar: "S",
      title: roadmap.title,
      tags: roadmap.category ? [roadmap.category.name] : [],
      duration: `${Math.round(roadmap.estimatedHours / 8)} days`,
      level: roadmap.difficultyLevel,
      description: roadmap.description || "",
      views: 0,
      likes: 0,
      steps: stepsList, // Trả danh sách bước phẳng cho RoadmapFlow component
      stages: roadmap.stages, // Trả cấu trúc phân tầng gốc phòng hờ
    };

    res.json(formattedDetail);
  } catch (error: any) {
    console.error("Lỗi lấy chi tiết roadmap:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống",
      error: error.message || String(error),
    });
  }
};

// Lấy danh sách Stages theo Roadmap ID
export const getStagesByRoadmapId = async (req: Request, res: Response): Promise<void> => {
  const { roadmapId } = req.params;

  if (!roadmapId) {
    res.status(400).json({
      success: false,
      message: "ID lộ trình là bắt buộc",
    });
    return;
  }

  try {
    // Kiểm tra roadmap tồn tại
    const roadmap = await prisma.roadmap.findUnique({
      where: { id: roadmapId },
    });

    if (!roadmap) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy lộ trình học tập",
      });
      return;
    }

    // Lấy tất cả stages của roadmap
    const stages = await prisma.stage.findMany({
      where: { roadmapId },
      include: {
        steps: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        orderIndex: "asc",
      },
    });

    // Format response
    const formattedStages = stages.map((stage) => ({
      id: stage.id,
      roadmapId: stage.roadmapId,
      title: stage.title,
      description: stage.description || "",
      orderIndex: stage.orderIndex,
      stepsCount: stage.steps.length,
    }));

    res.json({
      success: true,
      roadmapId,
      roadmapTitle: roadmap.title,
      stagesCount: formattedStages.length,
      stages: formattedStages,
    });
  } catch (error: any) {
    console.error("Lỗi lấy danh sách stage:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống",
      error: error.message || String(error),
    });
  }
};

// Lấy danh sách Steps theo Stage ID
export const getStepsByStageId = async (req: Request, res: Response): Promise<void> => {
  const { stageId } = req.params;

  if (!stageId) {
    res.status(400).json({
      success: false,
      message: "ID giai đoạn là bắt buộc",
    });
    return;
  }

  try {
    // Kiểm tra stage tồn tại
    const stage = await prisma.stage.findUnique({
      where: { id: stageId },
    });

    if (!stage) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy giai đoạn học tập",
      });
      return;
    }

    // Lấy tất cả steps của stage kèm content và resources
    const steps = await prisma.step.findMany({
      where: { stageId },
      include: {
        content: true,
        resources: {
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
      orderBy: {
        orderIndex: "asc",
      },
    });

    // Format response
    const formattedSteps = steps.map((step) => ({
      id: step.id,
      stageId: step.stageId,
      title: step.title,
      orderIndex: step.orderIndex,
      estimatedMinutes: step.estimatedMinutes || 0,
      content: step.content?.bodyMarkdown || "Chưa có nội dung chi tiết",
      resourcesCount: step.resources.length,
      resources: step.resources.map((res) => ({
        id: res.id,
        type: res.type,
        title: res.title,
        url: res.url,
        orderIndex: res.orderIndex,
      })),
    }));

    res.json({
      success: true,
      stageId,
      stageTitle: stage.title,
      stepsCount: formattedSteps.length,
      steps: formattedSteps,
    });
  } catch (error: any) {
    console.error("Lỗi lấy danh sách step:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống",
      error: error.message || String(error),
    });
  }
};


