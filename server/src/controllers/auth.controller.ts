import { Request, Response } from "express";
import prisma from "../config/prisma";

// Đăng nhập hoặc tự động đăng ký qua Email
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, displayName } = req.body;

  if (!email) {
    res.status(400).json({
      success: false,
      message: "Email là bắt buộc",
    });
    return;
  }

  try {
    // Tìm kiếm người dùng bằng email
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Nếu chưa tồn tại thì tự động đăng ký mới
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          displayName: displayName || email.split("@")[0],
        },
      });
    }

    res.json({
      success: true,
      user,
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống",
      error: String(error),
    });
  }
};
