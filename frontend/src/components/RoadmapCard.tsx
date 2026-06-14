import { Link } from "react-router-dom";

type ThumbnailTone =
  | "ai"
  | "frontend"
  | "devops"
  | "data"
  | "security"
  | "mobile";

type RoadmapCardProps = {
  id: string | number;
  author: string;
  authorAvatar: string;
  thumbnailLabel?: string;
  thumbnailTone?: ThumbnailTone;
  title: string;
  tags: string[];
  duration: string;
  level: string;
  steps: number;
  description: string;
  views: number;
  likes: number;
};

const thumbnailToneClasses: Record<ThumbnailTone, string> = {
  ai: "from-[#0A66C2] via-[#14B8A6] to-[#8B5CF6]",
  frontend: "from-[#2563EB] via-[#38BDF8] to-[#22C55E]",
  devops: "from-[#111827] via-[#475569] to-[#F59E0B]",
  data: "from-[#047857] via-[#84CC16] to-[#0EA5E9]",
  security: "from-[#7F1D1D] via-[#DC2626] to-[#F97316]",
  mobile: "from-[#6D28D9] via-[#EC4899] to-[#F59E0B]",
};

export default function RoadmapCard({
  id,
  author,
  authorAvatar,
  thumbnailLabel,
  thumbnailTone = "ai",
  title,
  tags,
  duration,
  level,
  steps,
  description,
  views,
  likes,
}: RoadmapCardProps) {
  return (
    <Link
      to={`/learning-path/${id}`}
      aria-label={`View ${title} roadmap`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E0E0E0] bg-[#FFFFFF] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D1D5DB] hover:shadow-lg hover:shadow-brand/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <div
        className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${thumbnailToneClasses[thumbnailTone]}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.22),transparent_26%)]" />
        <div className="relative flex h-full items-end justify-between p-5 text-white">
          <span className="text-4xl font-bold tracking-normal">
            {thumbnailLabel ?? title.slice(0, 2).toUpperCase()}
          </span>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
            {level}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F0F0F0] text-xs font-semibold text-[#6B7280] ring-1 ring-[#E0E0E0]">
            {authorAvatar}
          </div>
          <span className="text-xs font-medium text-[#9CA3AF]">
            by {author}
          </span>
        </div>

        <h3 className="text-lg font-bold leading-snug text-[#000000E6] transition-colors group-hover:text-brand">
          {title}
        </h3>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-[#E0E0E0] bg-[#F0F0F0] px-2.5 py-0.5 text-xs font-medium text-[#6B7280]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#9CA3AF]">
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
            {level}
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
            {steps} steps
          </span>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-[#9CA3AF]">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-[#E0E0E0] px-5 py-3.5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <span>{views}</span>
          </span>

          <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span>{likes}</span>
          </span>
        </div>

        <span className="text-xs font-semibold text-brand transition group-hover:text-brand-hover">
          View details
        </span>
      </div>
    </Link>
  );
}
