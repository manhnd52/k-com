import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import logo from "@/assets/logo.png";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E0E0E0] bg-[#FFFFFF]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFFFFF]/80">
        <div className="mx-auto flex h-14 w-full max-w-screen-xl items-center gap-8 px-4 sm:px-6">
          {/* Mobile burger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#6B7280] transition-colors hover:bg-[#F0F0F0] hover:text-[#000000E6] lg:hidden"
            aria-label="Open sidebar"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src={logo} alt="KCOM Logo" className="h-8 w-8" />
            <span className="text-base font-bold text-brand">K-COM</span>
          </Link>

          {/* Search bar */}
          <div className="hidden flex-1 sm:block">
            <div className="relative mx-auto w-full max-w-xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-4 w-4 text-[#9CA3AF]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search roadmaps, topics..."
                className="block w-full rounded-lg border border-[#E0E0E0] bg-[#FFFFFF] py-2 pl-10 pr-4 text-sm text-[#000000E6] placeholder:text-[#9CA3AF] transition focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 rounded-lg border border-[#E0E0E0] bg-[#F2F2F2] px-3 py-1.5 text-sm font-medium text-[#000000E6] transition hover:bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <svg className="h-5 w-5 text-brand" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              <span className="hidden sm:inline">Post</span>
            </button>

            {/* Avatar */}
            <Link
              to="/profile"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F0F0] text-sm font-medium text-[#6B7280] ring-1 ring-[#E0E0E0] transition hover:ring-brand hover:text-brand"
              aria-label="User profile"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
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
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-[#FFFFFF] border-r border-[#E0E0E0] shadow-2xl lg:hidden">
            <div className="flex items-center justify-between border-b border-[#E0E0E0] px-4 h-14">
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
                <img src={logo} alt="KCOM Logo" className="h-8 w-8" />
                <span className="text-base font-bold text-brand">K-COM</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition hover:bg-[#F0F0F0] hover:text-[#000000E6]"
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
