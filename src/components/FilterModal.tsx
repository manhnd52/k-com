import React, { useState, useEffect } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: string[];
  onApply: (filters: string[]) => void;
}

const categoriesColumn1 = [
  "Data & AI",
  "DevOps & Cloud",
  "Cybersecurity",
  "Mobile Development",
  "Game Development",
  "Web Development",
  "Embedded / IoT",
  "UI & UX Design",
  "Product / Project Management",
  "IT Support / System Admin",
];

const categoriesColumn2 = [
  "Data Engineer",
  "Data Analyst",
  "Machine Learning Engineer",
  "AI Research",
];

const FilterModal: React.FC<FilterModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedFilters, 
  onApply 
}) => {
  const [localFilters, setLocalFilters] = useState<string[]>(selectedFilters);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(selectedFilters);
    }
  }, [isOpen, selectedFilters]);

  const toggleFilter = (filter: string) => {
    setLocalFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSearch = () => {
    onApply(localFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#27272a] bg-[#18181b] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#27272a] px-6 py-4">
          <h2 className="text-xl font-bold text-[#f4f4f5]">Filter</h2>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#a1a1aa] transition hover:bg-[#27272a] hover:text-[#f4f4f5]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2">
          {/* Column 1 */}
          <div className="space-y-1">
            {categoriesColumn1.map((cat) => (
              <label 
                key={cat}
                className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-[#27272a]"
              >
                <input 
                  type="checkbox" 
                  checked={localFilters.includes(cat)}
                  onChange={() => toggleFilter(cat)}
                  className="h-4 w-4 rounded border-[#3f3f46] bg-[#111113] text-brand focus:ring-brand focus:ring-offset-0" 
                />
                <span className={`text-sm font-medium transition-colors ${localFilters.includes(cat) ? 'text-brand' : 'text-[#a1a1aa] group-hover:text-[#f4f4f5]'}`}>
                  {cat}
                </span>
              </label>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-1">
             <div className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-[#71717a]">Specializations</div>
            {categoriesColumn2.map((cat) => (
              <label 
                key={cat}
                className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-[#27272a]"
              >
                <input 
                  type="checkbox" 
                  checked={localFilters.includes(cat)}
                  onChange={() => toggleFilter(cat)}
                  className="h-4 w-4 rounded border-[#3f3f46] bg-[#111113] text-brand focus:ring-brand focus:ring-offset-0" 
                />
                <span className={`text-sm font-medium transition-colors ${localFilters.includes(cat) ? 'text-brand' : 'text-[#a1a1aa] group-hover:text-[#f4f4f5]'}`}>
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end border-t border-[#27272a] bg-[#1c1c1f] px-6 py-4">
          <button 
            onClick={handleSearch}
            className="rounded-lg bg-brand px-6 py-2 text-sm font-bold text-white transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
