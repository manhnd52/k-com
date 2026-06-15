import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import logo from "@/assets/logo.png";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRoadmapsPage = location.pathname === "/roadmaps";
  const searchQuery = isRoadmapsPage ? searchParams.get("search") ?? "" : "";

  const handleSearchChange = (value: string) => {
    const nextParams = isRoadmapsPage
      ? new URLSearchParams(searchParams)
      : new URLSearchParams();
    const trimmedValue = value.trim();

    if (trimmedValue) {
      nextParams.set("search", value);
    } else {
      nextParams.delete("search");
    }

    const nextSearch = nextParams.toString();
    navigate({
      pathname: "/roadmaps",
      search: nextSearch ? `?${nextSearch}` : "",
    });
  };

  const handleClearSearch = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("search");
    const nextSearch = nextParams.toString();

    navigate({
      pathname: "/roadmaps",
      search: nextSearch ? `?${nextSearch}` : "",
    });
  };

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
          <Link to="/roadmaps" className="flex items-center gap-2.5 shrink-0">
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
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search roadmaps, topics..."
                className="block w-full rounded-lg border border-[#E0E0E0] bg-[#FFFFFF] py-2 pl-10 pr-10 text-sm text-[#000000E6] placeholder:text-[#9CA3AF] transition focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-[#9CA3AF] transition hover:text-[#111827]"
                  aria-label="Clear roadmap search"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            

            {/* Avatar moved to RoadmapHeader */}
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
              <Link to="/roadmaps" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
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
