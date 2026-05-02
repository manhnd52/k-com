import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111113] font-sans antialiased">
      {/* Top accent line */}
      <div className="h-[3px] w-full bg-brand" />

      <Header />

      <main className="flex flex-1">
        <Outlet />
      </main>

      {/* Bottom accent line */}
      <div className="h-[3px] w-full bg-brand" />
    </div>
  );
}
