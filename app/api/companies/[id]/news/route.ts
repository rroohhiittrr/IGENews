import { NextRequest, NextResponse } from 'next/server';
import { mockData } from '@/lib/mock/factory';

export async function GET(
  request: NextRequest,
  { params }: { params: any }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = Math.min(100, parseInt(searchParams.get('pageSize') || '10', 10));

    // Get the company detailed metadata to link
    const company = mockData.companyById(id);
    
    // Generate deterministic news feed cards for this company
    const total = 18; // Fixed count for pagination demo
    const totalPages = Math.ceil(total / pageSize);
    
    const feed = Array.from({ length: total }, (_, idx) => {
      // Setup deterministic parameters
      const category = ['Product Launch', 'Deal Announcement', 'Financial Update', 'Milestone', 'Partnership', 'Investment', 'ESG', 'Announcement'][idx % 8];
      const publishedAt = new Date(Date.now() - idx * 2 * 86400000).toISOString();
      return {
        id: `news-${id}-${idx}`,
        title: `${company.name} Update #${idx + 1}: Strategic news on ${category.toLowerCase()}`,
        summary: `This is a sample summary details regarding the milestone updates and bilateral trade implications.`,
        thumbnailUrl: idx % 2 === 0 ? `https://picsum.photos/seed/n-${company.id}-${idx}/400/250` : null,
        company: {
          id: company.id,
          name: company.name,
          logoUrl: company.logoUrl,
          tier: company.tier,
        },
        industry: company.industry,
        publishedAt,
        readingTimeMinutes: 3 + (idx % 4),
        viewCount: 1200 + idx * 250,
        shareCount: 45 + idx * 5,
        commentCount: 12 + idx,
        isBookmarked: false,
        isSponsored: company.tier === 'top' && idx === 0,
        category: category as any,
        trendingVariant: null,
      };
    });

    const start = (page - 1) * pageSize;
    const paginatedNews = feed.slice(start, start + pageSize);

    return NextResponse.json({
      data: paginatedNews,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message || 'An unexpected error occurred during company news fetch.',
      }
    }, { status: 500 });
  }
}
