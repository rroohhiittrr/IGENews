'use client';

import { FilterMeta } from '@/types/company';
import { ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  meta: FilterMeta | null;
  selectedSectors: string[];
  selectedCountries: string[];
  selectedTiers: string[];
  onChange: (type: 'sector' | 'country' | 'tier', value: string, checked: boolean) => void;
}

export function FilterSidebar({
  meta,
  selectedSectors,
  selectedCountries,
  selectedTiers,
  onChange,
}: FilterSidebarProps) {
  const [secOpen, setSecOpen] = useState(true);
  const [couOpen, setCouOpen] = useState(true);
  const [tieOpen, setTieOpen] = useState(true);

  if (!meta) {
    return (
      <div className="bg-white dark:bg-[#122238] rounded-3xl p-5 border border-gray-100 dark:border-white/5 space-y-6">
        <div className="h-6 bg-gray-200 dark:bg-slate-700 animate-pulse w-1/2 rounded" />
        <div className="h-[200px] bg-gray-200 dark:bg-slate-700 animate-pulse w-full rounded" />
      </div>
    );
  }

  const SectionHeader = ({ title, isOpen, onToggle }: { title: string; isOpen: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full text-xs font-bold text-[#1D1D46] dark:text-white uppercase tracking-wider mb-3 cursor-pointer"
    >
      <span className="flex items-center gap-1">
        <Filter className="w-3.5 h-3.5 text-gray-400" />
        {title}
      </span>
      {isOpen ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
    </button>
  );

  return (
    <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
      {/* Tiers Section */}
      <div>
        <SectionHeader title="Membership Tiers" isOpen={tieOpen} onToggle={() => setTieOpen(!tieOpen)} />
        {tieOpen && (
          <div className="space-y-2.5 transition-all">
            {meta.tiers.map(t => (
              <label key={t.value} className="flex items-center gap-3 text-xs font-semibold text-gray-600 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTiers.includes(t.value)}
                  onChange={(e) => onChange('tier', t.value, e.target.checked)}
                  className="rounded border-gray-300 text-[#1D1D46] focus:ring-[#1D1D46] w-4 h-4 cursor-pointer"
                />
                <span>{t.label}</span>
                <span className="ml-auto text-[10px] text-gray-400 bg-gray-50 dark:bg-white/5 px-1.5 py-0.5 rounded">
                  {t.companyCount}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="border-gray-100 dark:border-white/5" />

      {/* Sectors Section */}
      <div>
        <SectionHeader title="Target Industries" isOpen={secOpen} onToggle={() => setSecOpen(!secOpen)} />
        {secOpen && (
          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {meta.industries.map(s => (
              <label key={s.id} className="flex items-center gap-3 text-xs font-semibold text-gray-600 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSectors.includes(s.id)}
                  onChange={(e) => onChange('sector', s.id, e.target.checked)}
                  className="rounded border-gray-300 text-[#1D1D46] focus:ring-[#1D1D46] w-4 h-4 cursor-pointer"
                />
                <span className="line-clamp-1">{s.name}</span>
                <span className="ml-auto text-[10px] text-gray-400 bg-gray-50 dark:bg-white/5 px-1.5 py-0.5 rounded">
                  {s.companyCount}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="border-gray-100 dark:border-white/5" />

      {/* Countries Section */}
      <div>
        <SectionHeader title="Countries" isOpen={couOpen} onToggle={() => setCouOpen(!couOpen)} />
        {couOpen && (
          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {meta.countries.map(c => (
              <label key={c.code} className="flex items-center gap-3 text-xs font-semibold text-gray-600 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(c.code)}
                  onChange={(e) => onChange('country', c.code, e.target.checked)}
                  className="rounded border-gray-300 text-[#1D1D46] focus:ring-[#1D1D46] w-4 h-4 cursor-pointer"
                />
                <span>{c.name}</span>
                <span className="ml-auto text-[10px] text-gray-400 bg-gray-50 dark:bg-white/5 px-1.5 py-0.5 rounded">
                  {c.companyCount}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
