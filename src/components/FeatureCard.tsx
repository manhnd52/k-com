import React from "react";

type FeatureCardProps = {
  title: string;
  description?: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-[#27272a] bg-[#18181b] p-4 transition hover:border-[#3f3f46]">
      <p className="text-sm font-medium text-[#f4f4f5]">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-[#71717a]">{description}</p>
      )}
    </div>
  );
}
