import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111113] font-sans antialiased text-[#f4f4f5]">
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-brand/50" />

      <Header />

      <div className="mx-auto flex w-full max-w-screen-xl flex-1 items-start">
        {/* Desktop Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-[#27272a] py-6 lg:block">
          <Sidebar />
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Footer accent */}
      <div className="h-[1px] w-full bg-[#27272a]" />
    </div>
  );
}
