'use client';

import { useState, useEffect } from 'react';
import { CompanyCard as CompanyCardType, FilterMeta, Pagination as PaginationType } from '@/types/company';
import { useCompanyFilters } from '@/hooks/useCompanyFilters';
import { companyApi } from '@/lib/api/company';
import { CompanyCard } from './ui/CompanyCard';
import { FilterChips } from './ui/FilterChips';
import { FilterSidebar } from './ui/FilterSidebar';
import { Pagination } from './ui/Pagination';
import { SortSelect } from './ui/SortSelect';
import { ViewToggle } from './ui/ViewToggle';
import { CompanyCardSkeleton } from './skeletons';
import { Filter, SlidersHorizontal, LayoutGrid, X } from 'lucide-react';
import { useParams } from 'next/navigation';

export function CompanyDirectory() {
  const { filters, setFilters } = useCompanyFilters();
  const [list, setList] = useState<CompanyCardType[]>([]);
  const [meta, setMeta] = useState<FilterMeta | null>(null);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    pageSize: 24,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Load static filter counts metadata once on mount
  useEffect(() => {
    async function loadMeta() {
      try {
        const res = await companyApi.filterMeta();
        setMeta(res);
      } catch (e) {
        console.error(e);
      }
    }
    loadMeta();
  }, []);

  // Query search list whenever query parameters/filters change
  useEffect(() => {
    async function query() {
      setLoading(true);
      try {
        const urlParams = new URLSearchParams();
        if (filters.q) urlParams.set('q', filters.q);
        if (filters.sector.length) urlParams.set('sector', filters.sector.join(','));
        if (filters.country.length) urlParams.set('country', filters.country.join(','));
        if (filters.tier.length) urlParams.set('tier', filters.tier.join(','));
        urlParams.set('sort', filters.sort);
        urlParams.set('page', String(filters.page));
        urlParams.set('pageSize', String(filters.pageSize));

        const res = await companyApi.search(urlParams);
        setList(res.data);
        setPagination(res.pagination);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    query();
  }, [filters]);

  const handleFilterChange = (type: 'sector' | 'country' | 'tier', value: string, checked: boolean) => {
    const list = [...(filters[type] as string[])];
    const updated = checked ? [...list, value] : list.filter(v => v !== value);
    setFilters({ [type]: updated, page: 1 });
  };

  const handleRemoveChip = (type: 'sector' | 'country' | 'tier', value: string) => {
    handleFilterChange(type, value, false);
  };

  const handleClearAll = () => {
    setFilters({ sector: [], country: [], tier: [], q: '', page: 1 });
  };

  // Helper maps for active filter labels
  const sectorMap = meta?.industries.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {} as Record<string, string>) || {};
  const countryMap = meta?.countries.reduce((acc, curr) => ({ ...acc, [curr.code]: curr.name }), {} as Record<string, string>) || {};

  return (
    <div id="filter-panel" className="max-w-7xl mx-auto px-4 lg:px-6 py-12 space-y-6">
      {/* Top action header toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.01)]">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-100 dark:border-white/5 rounded-xl text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            Filters
          </button>
          <span className="text-xs font-bold text-gray-500">
            {loading ? 'Searching...' : `${pagination.total} registered companies`}
          </span>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <SortSelect value={filters.sort} onChange={(sort) => setFilters({ sort, page: 1 })} />
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>

      {/* Filter chips strip */}
      <FilterChips
        selectedSectors={filters.sector}
        selectedCountries={filters.country}
        selectedTiers={filters.tier}
        sectorMap={sectorMap}
        countryMap={countryMap}
        onRemove={handleRemoveChip}
        onClearAll={handleClearAll}
      />

      {/* Main split grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left filter sidebar panel (Desktop only) */}
        <div className="col-span-12 lg:col-span-3 hidden lg:block">
          <FilterSidebar
            meta={meta}
            selectedSectors={filters.sector}
            selectedCountries={filters.country}
            selectedTiers={filters.tier}
            onChange={handleFilterChange}
          />
        </div>

        {/* Right list cards grid */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CompanyCardSkeleton key={i} />
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-[32px] p-6">
              <SlidersHorizontal className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-xs font-bold text-gray-400">No companies found matching these query filters.</p>
              <button
                onClick={handleClearAll}
                className="mt-4 px-5 py-2.5 bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className={view === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" 
              : "flex flex-col gap-4"
            }>
              {list.map(c => (
                <CompanyCard key={c.id} company={c} locale={locale} />
              ))}
            </div>
          )}

          {/* Paginated selector */}
          <Pagination
            pagination={pagination}
            onPageChange={(page) => setFilters({ page })}
          />
        </div>
      </div>

      {/* Mobile Drawer filter panel */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-[#0c1829]/60 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative w-80 bg-white dark:bg-[#122238] h-full p-6 shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-gray-100 dark:border-white/10">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-black text-[#1E3A5F] dark:text-white uppercase tracking-wider">Search Filters</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-7 h-7 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <FilterSidebar
                meta={meta}
                selectedSectors={filters.sector}
                selectedCountries={filters.country}
                selectedTiers={filters.tier}
                onChange={handleFilterChange}
              />
            </div>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="mt-6 w-full py-3.5 bg-[#1E3A5F] text-white text-center font-bold text-xs rounded-2xl cursor-pointer"
            >
              Apply Filter Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
