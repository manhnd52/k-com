import Hero from "../components/Hero";
import AsidePanel from "../components/AsidePanel";

function Home() {
  const features = [
    { title: "Local data", description: "Driven by JSON fixtures." },
    { title: "Login flow", description: "Simple and direct." },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:px-10 lg:py-10">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                MVP workspace
              </div>

              <Hero
                title={"A clean, focused product home."}
                subtitle={"Neutral backgrounds, clear hierarchy, and subtle blue accents — a compact LinkedIn-like experience for MVPs."}
              />
            </div>

            <AsidePanel focusTitle="Current focus" focusDesc="Local data, auth, and MVP screens." features={features} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
