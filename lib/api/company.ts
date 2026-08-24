import { CompanyCard, CompanyDetail, NewsCard, Pagination, SearchFacets, FilterMeta, Sector, Country } from '@/types/company';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    next: { revalidate: 60 }, // ISR caching
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return json.data ?? json; // Handle both wrapped and unwrapped outputs
}

export const companyApi = {
  search: (params: URLSearchParams) => 
    fetchJson<{ data: CompanyCard[]; pagination: Pagination; facets: SearchFacets }>(
      `${API_BASE}/companies/search?${params.toString()}`
    ),
  
  featured: (tier: string[], limit: number) =>
    fetchJson<CompanyCard[]>(
      `${API_BASE}/companies/featured?tier=${tier.join(',')}&limit=${limit}`
    ),
  
  detail: (id: string) =>
    fetchJson<{ data: CompanyDetail }>(`${API_BASE}/companies/${id}`),
  
  news: (id: string, page: number, pageSize: number) =>
    fetchJson<{ data: NewsCard[]; pagination: Pagination }>(
      `${API_BASE}/companies/${id}/news?page=${page}&pageSize=${pageSize}`
    ),
  
  latestNews: (limit: number, industry?: string) =>
    fetchJson<NewsCard[]>(
      `${API_BASE}/news/latest?limit=${limit}${industry ? `&industry=${industry}` : ''}`
    ),
  
  trendingNews: (variant: string, limit: number) =>
    fetchJson<NewsCard[]>(
      `${API_BASE}/news/trending?variant=${variant}&limit=${limit}`
    ),
  
  sectors: () => fetchJson<Sector[]>(`${API_BASE}/sectors`),
  
  sectorCompanies: (sectorId: string, params: URLSearchParams) =>
    fetchJson<{ data: CompanyCard[]; pagination: Pagination }>(
      `${API_BASE}/sectors/${sectorId}/companies?${params.toString()}`
    ),
  
  countries: () => fetchJson<Country[]>(`${API_BASE}/countries`),
  
  filterMeta: () => fetchJson<FilterMeta>(`${API_BASE}/filters/meta`),
  
  follow: (id: string) =>
    fetch(`${API_BASE}/companies/${id}/follow`, { method: 'POST', credentials: 'include' })
      .then(r => r.json()),
  
  bookmark: (id: string) =>
    fetch(`${API_BASE}/news/${id}/bookmark`, { method: 'POST', credentials: 'include' })
      .then(r => r.json()),
  
  userTier: () =>
    fetchJson<{ tier: 'registered' | 'verified' | 'top' | 'none'; companyId: string | null }>(
      `${API_BASE}/user/tier`
    ),
};
