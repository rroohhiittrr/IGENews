'use client';

type SortVal = 'relevance' | 'newest' | 'most_viewed' | 'most_followed' | 'verified_first';

interface SortSelectProps {
  value: SortVal;
  onChange: (sort: SortVal) => void;
}

const SORT_OPTIONS: { value: SortVal; label: string }[] = [
  { value: 'relevance', label: 'Relevance / Recommended' },
  { value: 'newest', label: 'Completion Rank' },
  { value: 'most_viewed', label: 'Most Viewed (30d)' },
  { value: 'most_followed', label: 'Most Followed' },
  { value: 'verified_first', label: 'Verified Tiers First' },
];

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Sort By:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortVal)}
        className="text-xs font-bold text-gray-600 dark:text-gray-200 bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F4A024] cursor-pointer"
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
