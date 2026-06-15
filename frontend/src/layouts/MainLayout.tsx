import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col font-sans antialiased bg-white text-slate-900">
      <main className="flex-1 flex flex-col w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
