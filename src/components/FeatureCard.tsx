import React from "react";

type FeatureCardProps = {
  title: string;
  description?: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-sm font-medium text-slate-900">{title}</p>
      {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
    </div>
  );
}
