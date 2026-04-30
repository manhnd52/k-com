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
      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{subtitle}</p>}

      <div className="mt-6 flex gap-3">
        <Link
          to={primaryTo}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          {primaryLabel}
        </Link>

        <Link to={secondaryTo} className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}
