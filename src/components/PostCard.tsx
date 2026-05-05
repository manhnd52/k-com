import { Link } from "react-router-dom";
import type { Post } from "@/services/PostService";

type PostCardProps = {
  post: Post;
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

export default function PostCard({ post }: PostCardProps) {
  const avatar = post.authorName.charAt(0).toUpperCase();

  return (
    <Link
      to={`/posts/${post.id}`}
      className="block rounded-xl border border-[#27272a] bg-[#18181b] p-5 transition hover:border-[#3f3f46] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-[#111113]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
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

      <h2 className="mt-4 text-lg font-bold leading-snug text-white">{post.title}</h2>
      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#a1a1aa]">{post.content}</p>

      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#3f3f46] bg-[#111113] px-2.5 py-1 text-xs text-[#a1a1aa]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
