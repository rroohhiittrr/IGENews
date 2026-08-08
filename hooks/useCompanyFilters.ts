'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { CompanyTier } from '../types/company';

export interface CompanyFilters {
  q: string;
  sector: string[];      // sector IDs
  country: string[];     // ISO country codes
  tier: CompanyTier[];   // registered | verified | top
  sort: 'relevance' | 'newest' | 'most_viewed' | 'most_followed' | 'verified_first';
  page: number;
  pageSize: number;
}

export function useCompanyFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse URL queries into filter state parameters
  const filters = useMemo((): CompanyFilters => {
    return {
      q: searchParams.get('q') || '',
      sector: searchParams.get('sector')?.split(',').filter(Boolean) || [],
      country: searchParams.get('country')?.split(',').filter(Boolean) || [],
      tier: (searchParams.get('tier')?.split(',').filter(Boolean) as CompanyTier[]) || [],
      sort: (searchParams.get('sort') as CompanyFilters['sort']) || 'relevance',
      page: parseInt(searchParams.get('page') || '1', 10),
      pageSize: parseInt(searchParams.get('pageSize') || '24', 10),
    };
  }, [searchParams]);

  // Update URL parameters (using replace to avoid history stack bloat)
  const setFilters = useCallback((updates: Partial<CompanyFilters>) => {
    const params = new URLSearchParams(searchParams.toString());
    const merged = { ...filters, ...updates };

    Object.entries(merged).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(','));
        } else {
          params.delete(key);
        }
      } else if (value !== undefined && value !== '') {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    // Reset pagination to page 1 on filter changes (unless it's an explicit pagination update)
    const isFilterChange = 
      updates.q !== undefined || 
      updates.sector !== undefined || 
      updates.country !== undefined || 
      updates.tier !== undefined || 
      updates.sort !== undefined;

    if (updates.page === undefined && isFilterChange) {
      params.set('page', '1');
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, filters, router, pathname]);

  return { filters, setFilters };
}
