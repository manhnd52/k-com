import FeatureCard from "./FeatureCard";

type AsidePanelProps = {
  focusTitle?: string;
  focusDesc?: string;
  features?: { title: string; description?: string }[];
};

export default function AsidePanel({
  focusTitle = "Current focus",
  focusDesc = "",
  features = [],
}: AsidePanelProps) {
  return (
    <aside className="rounded-xl border border-[#27272a] bg-[#18181b] p-5">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#71717a]">
            {focusTitle}
          </p>
          {focusDesc && (
            <p className="mt-2 text-sm text-[#a1a1aa]">{focusDesc}</p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((f, i) => (
            <FeatureCard key={i} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </aside>
  );
}
