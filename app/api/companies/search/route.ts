import { NextRequest, NextResponse } from 'next/server';
import { mockData } from '@/lib/mock/factory';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.toLowerCase() || '';
    const sectorFilter = searchParams.get('sector')?.split(',').filter(Boolean) || [];
    const countryFilter = searchParams.get('country')?.split(',').filter(Boolean) || [];
    const tierFilter = searchParams.get('tier')?.split(',').filter(Boolean) || [];
    const sort = searchParams.get('sort') || 'relevance';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = Math.min(100, parseInt(searchParams.get('pageSize') || '24', 10));

    // Get seeded company cards list
    let list = mockData.companies(300);

    // Apply text search
    if (q) {
      list = list.filter(c => 
        c.name.toLowerCase().includes(q) || 
        (c.tagline && c.tagline.toLowerCase().includes(q)) || 
        c.industry.toLowerCase().includes(q) || 
        c.location.toLowerCase().includes(q)
      );
    }

    // Apply Sector filters
    if (sectorFilter.length > 0) {
      list = list.filter(c => sectorFilter.includes(c.industryId));
    }

    // Apply Country filters
    if (countryFilter.length > 0) {
      list = list.filter(c => countryFilter.includes(c.countryCode));
    }

    // Apply Tier filters
    if (tierFilter.length > 0) {
      list = list.filter(c => tierFilter.includes(c.tier));
    }

    // Facet counts before sorting and paginating, but after text search
    const facets = {
      industries: mockData.sectors().map(s => {
        const count = list.filter(c => c.industryId === s.id).length;
        return { id: s.id, name: s.name, count };
      }).filter(f => f.count > 0),
      countries: mockData.countries().map(cnt => {
        const count = list.filter(c => c.countryCode === cnt.code).length;
        return { code: cnt.code, name: cnt.name, count };
      }).filter(f => f.count > 0),
      tiers: [
        { value: 'registered', count: list.filter(c => c.tier === 'registered').length },
        { value: 'verified', count: list.filter(c => c.tier === 'verified').length },
        { value: 'top', count: list.filter(c => c.tier === 'top').length },
      ],
    };

    // Apply Sorting
    if (sort === 'newest') {
      // Top tiers first, then verified, then registered
      list.sort((a, b) => b.profileCompletion - a.profileCompletion);
    } else if (sort === 'most_viewed') {
      list.sort((a, b) => b.viewCount30d - a.viewCount30d);
    } else if (sort === 'most_followed') {
      list.sort((a, b) => b.followerCount - a.followerCount);
    } else if (sort === 'verified_first') {
      const tierRank = { top: 3, verified: 2, registered: 1 };
      list.sort((a, b) => tierRank[b.tier] - tierRank[a.tier]);
    } else {
      // Relevance / Default: Weighted rank based on tier searchRankBoost + completion
      const getWeight = (c: any) => {
        const boost = c.tier === 'top' ? 2.0 : c.tier === 'verified' ? 1.5 : 1.0;
        return c.followerCount * boost + c.viewCount30d;
      };
      list.sort((a, b) => getWeight(b) - getWeight(a));
    }

    // Paginate
    const total = list.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const paginatedData = list.slice(start, start + pageSize);

    const response = {
      data: paginatedData,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      facets,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message || 'An unexpected error occurred during company search.',
      }
    }, { status: 500 });
  }
}
