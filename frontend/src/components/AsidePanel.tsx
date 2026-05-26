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
    <aside className="rounded-xl border border-[#E0E0E0] bg-[#FFFFFF] p-5">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9CA3AF]">
            {focusTitle}
          </p>
          {focusDesc && (
            <p className="mt-2 text-sm text-[#6B7280]\">{focusDesc}</p>
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
