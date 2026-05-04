import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#27272a] bg-[#111113]/95 backdrop-blur supports-[backdrop-filter]:bg-[#111113]/80">
        <div className="mx-auto flex h-14 w-full max-w-screen-xl items-center gap-4 px-4 sm:px-6">
          {/* Mobile burger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#a1a1aa] transition-colors hover:bg-[#27272a] hover:text-[#f4f4f5] lg:hidden"
            aria-label="Open sidebar"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-sm font-bold text-white ring-1 ring-brand/30">
              K
            </span>
            <span className="hidden text-base font-semibold tracking-tight text-[#f4f4f5] sm:block">KCOM</span>
          </Link>

          {/* Search bar */}
          <div className="flex-1">
            <div className="relative max-w-md">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717a]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="search"
                placeholder="Search roadmaps, topics..."
                className="w-full rounded-lg border border-[#3f3f46] bg-[#18181b] py-2 pl-9 pr-4 text-sm text-[#f4f4f5] placeholder:text-[#71717a] transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <Link
              to="/profile"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#27272a] text-sm font-medium text-[#a1a1aa] ring-1 ring-[#3f3f46] transition hover:ring-brand hover:text-brand"
              aria-label="User profile"
            >
              U
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-[#111113] border-r border-[#27272a] shadow-2xl lg:hidden">
            <div className="flex items-center justify-between border-b border-[#27272a] px-4 h-14">
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-sm font-bold text-white">K</span>
                <span className="text-base font-semibold tracking-tight text-[#f4f4f5]">KCOM</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#a1a1aa] transition hover:bg-[#27272a] hover:text-[#f4f4f5]"
                aria-label="Close sidebar"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar />
          </div>
        </>
      )}
    </>
  );
}
