import { NextRequest, NextResponse } from 'next/server';
import { mockData } from '@/lib/mock/factory';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const variant = searchParams.get('variant') || 'most-viewed';
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const trending = mockData.trendingNews(variant, limit);
    return NextResponse.json(trending);
  } catch (error: any) {
    return NextResponse.json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message || 'An unexpected error occurred during fetching trending news.',
      }
    }, { status: 500 });
  }
}
