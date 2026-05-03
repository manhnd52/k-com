import React from "react";

interface FeedCardProps {
  author: string;
  title: string;
  subheading: string;
  tags: string[];
  date: string;
  views: number;
  likes: number;
  imageUrl?: string;
}

const FeedCard: React.FC<FeedCardProps> = ({
  author,
  title,
  subheading,
  tags,
  date,
  views,
  likes,
  imageUrl,
}) => {
  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-[#27272a] bg-[#18181b] p-5 transition-all hover:border-brand/40 hover:bg-[#1c1c1f] sm:flex-row sm:items-start lg:gap-6">
      <div className="flex flex-1 flex-col gap-3">
        {/* Author Info */}
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#27272a] text-[10px] font-bold text-[#a1a1aa] ring-1 ring-[#3f3f46]">
            {author.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs font-medium text-[#a1a1aa]">{author}</span>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold leading-tight text-[#f4f4f5] group-hover:text-brand transition-colors">
            {title}
          </h3>
          <div className="flex flex-wrap gap-2 py-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[#27272a] px-2 py-0.5 text-[10px] font-medium text-[#a1a1aa]"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="line-clamp-2 text-sm text-[#a1a1aa]">
            {subheading}
          </p>
        </div>

        {/* Metadata */}
        <div className="mt-2 flex items-center gap-4 text-xs text-[#71717a]">
          <span>{date}</span>
          <div className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.644m17.642.644a1.012 1.012 0 0 1 0-.644M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            {views}
          </div>
          <div className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            {likes}
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="aspect-video w-full shrink-0 overflow-hidden rounded-lg border border-[#27272a] bg-[#27272a]/30 sm:w-40 lg:w-48">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover transition group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
             <svg className="h-8 w-8 text-[#3f3f46]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
             </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedCard;
