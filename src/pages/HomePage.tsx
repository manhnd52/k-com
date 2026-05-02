import Hero from "../components/Hero";
import AsidePanel from "../components/AsidePanel";
import { Link } from "react-router-dom";

function Home() {
  const features = [
    { title: "Local data", description: "Driven by JSON fixtures." },
    { title: "Login flow", description: "Simple and direct." },
    { title: "Roadmap explorer", description: "Browse curated learning paths." },
  ];

  return (
    <main className="min-h-screen bg-[#111113] text-[#f4f4f5]">
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] shadow-sm shadow-brand/5">
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:px-10 lg:py-10">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                MVP workspace
              </div>

              <Hero
                title={"A clean, focused product home."}
                subtitle={
                  "Neutral backgrounds, clear hierarchy, and subtle blue accents — a compact LinkedIn-like experience for MVPs."
                }
              />

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/roadmaps"
                  className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand/40"
                >
                  Explore Roadmaps
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-md border border-[#3f3f46] bg-[#18181b] px-4 py-2 text-sm font-medium text-[#a1a1aa] transition hover:border-brand hover:text-brand"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <AsidePanel
              focusTitle="Current focus"
              focusDesc="Local data, auth, and MVP screens."
              features={features}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
