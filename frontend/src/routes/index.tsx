import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "../pages/LoginPage.tsx";
import Roadmaps from "../pages/RoadmapsPage.tsx";
import RoadmapDetail from "../pages/RoadmapDetailPage.tsx";
import Profile from "../pages/ProfilePage.tsx";
import MainLayout from "../layouts/MainLayout.tsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/roadmaps" replace />} />
          <Route path="/newfeeds" element={<Navigate to="/roadmaps" replace />} />
          <Route path="/feeds" element={<Navigate to="/roadmaps" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/roadmaps/:id" element={<RoadmapDetail />} />
          <Route path="/learning-path/:roadmapId" element={<RoadmapDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
