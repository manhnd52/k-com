import { Link, useParams } from "react-router-dom";
import mockPosts from "@/data/posts.json";
import { getPostById, type Post } from "@/services/PostService";

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const post = postId ? getPostById(postId, mockPosts as Post[]) : undefined;

  if (!post) {
    return (
      <main className="min-h-screen w-full bg-[#111113] text-[#f4f4f5]">
        <section className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-8 text-center">
            <p className="text-sm font-semibold text-white">Post not found</p>
            <p className="mt-2 text-sm text-[#71717a]">
              This post may have been removed or is not available in this browser.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex items-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-hover"
            >
              Back to feed
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const avatar = post.authorName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen w-full bg-[#111113] text-[#f4f4f5]">
      <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#a1a1aa] transition hover:text-brand"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to feed
        </Link>

        <article className="mt-5 rounded-xl border border-[#27272a] bg-[#18181b] p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-base font-bold text-white">
                {avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{post.authorName}</p>
                <p className="text-xs text-[#71717a]">
                  {post.category} · {formatDate(post.createdAt)}
                </p>
              </div>
            </div>

            <span className="rounded-full border border-[#3f3f46] bg-[#27272a] px-2.5 py-1 text-xs text-[#a1a1aa]">
              {post.visibility}
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-6 border-t border-[#27272a] pt-6">
            <p className="whitespace-pre-line text-base leading-8 text-[#d4d4d8]">{post.content}</p>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#3f3f46] bg-[#111113] px-3 py-1.5 text-xs text-[#a1a1aa]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
