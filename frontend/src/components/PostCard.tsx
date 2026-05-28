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
      className="block rounded-xl border border-[#E0E0E0] bg-white p-5 transition hover:border-[#D1D5DB] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-[#F3F2EF]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
            {avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#000000E6]">{post.authorName}</p>
            <p className="text-xs text-[#6B7280]">
              {post.category} · {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        <span className="rounded-full border border-[#E0E0E0] bg-[#F0F0F0] px-2.5 py-1 text-xs text-[#6B7280]">
          {post.visibility}
        </span>
      </div>

      <h2 className="mt-4 text-lg font-bold leading-snug text-[#000000E6]">{post.title}</h2>
      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#6B7280]">{post.content}</p>

      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#E0E0E0] bg-[#F8F9FA] px-2.5 py-1 text-xs text-[#6B7280]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
