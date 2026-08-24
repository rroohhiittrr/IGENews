import { NextRequest, NextResponse } from 'next/server';
import { mockData } from '@/lib/mock/factory';
import { CompanyTier } from '@/types/company';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '8', 10);
    const tierParams = searchParams.get('tier')?.split(',').filter(Boolean) as CompanyTier[] || ['verified', 'top'];

    const featuredList = mockData.featured(limit, tierParams);
    return NextResponse.json(featuredList);
  } catch (error: any) {
    return NextResponse.json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message || 'An unexpected error occurred during fetching featured companies.',
      }
    }, { status: 500 });
  }
}
