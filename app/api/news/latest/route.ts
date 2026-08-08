import { NextRequest, NextResponse } from 'next/server';
import { mockData } from '@/lib/mock/factory';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const latest = mockData.latestNews(limit);
    return NextResponse.json(latest);
  } catch (error: any) {
    return NextResponse.json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message || 'An unexpected error occurred during fetching latest news.',
      }
    }, { status: 500 });
  }
}
