import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage.tsx";
import Login from "../pages/LoginPage.tsx";
import Roadmaps from "../pages/RoadmapsPage.tsx";
import RoadmapDetail from "../pages/RoadmapDetailPage.tsx";
import RoadmapStep from "../pages/RoadmapStepPage.tsx";
import Profile from "../pages/ProfilePage.tsx";
import CreatePost from "../pages/CreatePostPage.tsx";
import PostDetail from "../pages/PostDetailPage.tsx";
import MainLayout from "../layouts/MainLayout.tsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/roadmaps/:id" element={<RoadmapDetail />} />
          <Route path="/roadmaps/:id/steps/:stepId" element={<RoadmapStep />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
