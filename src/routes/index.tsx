import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage.tsx";
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/roadmaps/:id" element={<RoadmapDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
