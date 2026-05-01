import React from "react";
import { Link } from "react-router-dom";

type HeroProps = {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
};

export default function Hero({
  title,
  subtitle,
  primaryLabel = "Get started",
  primaryTo = "/login",
  secondaryLabel = "Learn more",
  secondaryTo = "/",
}: HeroProps) {
  return (
    <div>
      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-[#f4f4f5] sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#a1a1aa] sm:text-base">
          {subtitle}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to={primaryTo}
          className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          {primaryLabel}
        </Link>

        <Link
          to={secondaryTo}
          className="inline-flex items-center gap-2 rounded-md border border-[#3f3f46] bg-transparent px-4 py-2 text-sm font-medium text-[#a1a1aa] transition hover:border-brand hover:text-brand"
        >
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}
