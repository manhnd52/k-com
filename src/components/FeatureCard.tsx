import React from "react";

type FeatureCardProps = {
  title: string;
  description?: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-[#E0E0E0] bg-[#FFFFFF] p-4 transition hover:border-[#D1D5DB]">
      <p className="text-sm font-medium text-[#000000E6]">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-[#9CA3AF]">{description}</p>
      )}
    </div>
  );
}
