'use client';

import { X } from 'lucide-react';

interface FilterChipsProps {
  selectedSectors: string[];
  selectedCountries: string[];
  selectedTiers: string[];
  sectorMap: Record<string, string>;
  countryMap: Record<string, string>;
  onRemove: (type: 'sector' | 'country' | 'tier', value: string) => void;
  onClearAll: () => void;
}

export function FilterChips({
  selectedSectors,
  selectedCountries,
  selectedTiers,
  sectorMap,
  countryMap,
  onRemove,
  onClearAll,
}: FilterChipsProps) {
  const hasFilters = selectedSectors.length > 0 || selectedCountries.length > 0 || selectedTiers.length > 0;
  if (!hasFilters) return null;

  const tierMap: Record<string, string> = {
    registered: 'Registered',
    verified: 'Verified',
    top: 'Enterprise',
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-4">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Active Filters:</span>
      
      {/* Sectors */}
      {selectedSectors.map(id => (
        <span
          key={id}
          className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#1D1D46]/10 text-[#1D1D46] dark:bg-white/5 dark:text-white px-3 py-1 rounded-full border border-[#1D1D46]/20 dark:border-white/10"
        >
          {sectorMap[id] || id}
          <button onClick={() => onRemove('sector', id)} className="hover:text-red-500 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}

      {/* Countries */}
      {selectedCountries.map(code => (
        <span
          key={code}
          className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:bg-white/5 dark:text-white px-3 py-1 rounded-full border border-emerald-500/20 dark:border-white/10"
        >
          {countryMap[code] || code}
          <button onClick={() => onRemove('country', code)} className="hover:text-red-500 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}

      {/* Tiers */}
      {selectedTiers.map(val => (
        <span
          key={val}
          className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-500/10 text-amber-600 dark:bg-white/5 dark:text-white px-3 py-1 rounded-full border border-amber-500/20 dark:border-white/10"
        >
          {tierMap[val] || val}
          <button onClick={() => onRemove('tier', val)} className="hover:text-red-500 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}

      <button
        onClick={onClearAll}
        className="text-xs font-bold text-[#F0652E] hover:text-[#1D1D46] dark:hover:text-white underline cursor-pointer transition-colors ml-2"
      >
        Clear All
      </button>
    </div>
  );
}
