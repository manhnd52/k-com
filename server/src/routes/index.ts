import { Router } from "express";
import authRoutes from "./auth.routes";
import roadmapRoutes from "./roadmap.routes";

const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ status: "OK", database: "connected" });
});

// Dang nhap / dang ky
router.use("/auth", authRoutes);

// Lo trinh hoc tap
router.use("/roadmaps", roadmapRoutes);

export default router;
