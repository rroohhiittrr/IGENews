import { NextRequest, NextResponse } from 'next/server';
import { mockData } from '@/lib/mock/factory';

export async function GET(request: NextRequest) {
  try {
    const list = mockData.countries();
    return NextResponse.json(list);
  } catch (error: any) {
    return NextResponse.json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message || 'An unexpected error occurred during country fetch.',
      }
    }, { status: 500 });
  }
}
