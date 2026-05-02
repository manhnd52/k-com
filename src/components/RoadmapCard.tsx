type RoadmapCardProps = {
  author: string;
  authorAvatar: string;
  title: string;
  tags: string[];
  duration: string;
  level: string;
  steps: number;
  description: string;
  views: number;
  likes: number;
};

export default function RoadmapCard({
  author,
  authorAvatar,
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
    <article className="group flex flex-col rounded-xl border border-[#27272a] bg-[#18181b] transition-all duration-200 hover:border-[#3f3f46] hover:shadow-lg hover:shadow-brand/5">
      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Author header */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#27272a] text-xs font-semibold text-[#a1a1aa] ring-1 ring-[#3f3f46]">
            {authorAvatar}
          </div>
          <span className="text-xs font-medium text-[#71717a]">by {author}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold leading-snug text-[#f4f4f5] group-hover:text-brand transition-colors">
          {title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-[#3f3f46] bg-[#27272a] px-2.5 py-0.5 text-xs font-medium text-[#a1a1aa]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#71717a]">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
            {level}
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
            {steps} steps
          </span>
        </div>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-[#71717a]">{description}</p>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between border-t border-[#27272a] px-5 py-3.5">
        {/* Social icons */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-xs text-[#71717a] transition hover:text-[#f4f4f5]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span>{views}</span>
          </button>

          <button className="flex items-center gap-1.5 text-xs text-[#71717a] transition hover:text-[#f4f4f5]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span>{likes}</span>
          </button>
        </div>

        {/* View button */}
        <button className="rounded-lg bg-brand px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-hover hover:shadow-md hover:shadow-brand/30">
          View
        </button>
      </div>
    </article>
  );
}
