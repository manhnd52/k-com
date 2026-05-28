import { Link } from "react-router-dom";
import PostCard from "@/components/PostCard";
import mockPosts from "@/data/posts.json";
import { getAllPosts, type Post } from "@/services/PostService";

function Home() {
  const posts = getAllPosts(mockPosts as Post[]).filter(
    (post) => post.visibility === "public"
  );

  return (
    <main className="min-h-screen w-full bg-[#F3F2EF] text-[#000000E6]">
      <section className="mx-auto grid w-full max-w-screen-xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 lg:py-10">
        <div className="space-y-5">
          <div className="rounded-xl border border-[#E0E0E0] bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-brand">New Feeds</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#000000E6]">
                  Posts from everyone
                </h1>
                <p className="mt-2 text-sm text-[#6B7280]">
                  Public posts include sample community posts and posts created in this browser.
                </p>
              </div>
            </div>
          </div>

          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#E0E0E0] bg-white p-8 text-center">
              <p className="text-sm font-semibold text-[#000000E6]">No public posts yet</p>
              <p className="mt-1 text-sm text-[#6B7280]">Create the first post to start the feed.</p>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-[#E0E0E0] bg-white p-5">
          <p className="text-sm font-semibold text-[#000000E6]">Explore</p>
          <div className="mt-4 space-y-3">
            <Link
              to="/posts/create"
              className="flex items-center justify-between rounded-lg border border-[#E0E0E0] bg-white px-3 py-2.5 text-sm text-[#6B7280] transition hover:border-brand hover:text-brand"
            >
              Create a new post
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              to="/roadmaps"
              className="flex items-center justify-between rounded-lg border border-[#E0E0E0] bg-white px-3 py-2.5 text-sm text-[#6B7280] transition hover:border-brand hover:text-brand"
            >
              Browse roadmaps
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-between rounded-lg border border-[#E0E0E0] bg-white px-3 py-2.5 text-sm text-[#6B7280] transition hover:border-brand hover:text-brand"
            >
              Sign in
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="mt-5 rounded-lg border border-[#E0E0E0] bg-[#F8F9FA] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6B7280]">
              Feed source
            </p>
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              This MVP combines sample posts with local posts saved from Create Post.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Home;
