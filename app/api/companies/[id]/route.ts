import { NextRequest, NextResponse } from 'next/server';
import { mockData } from '@/lib/mock/factory';

export async function GET(
  request: NextRequest,
  { params }: { params: any }
) {
  try {
    const { id } = await params;
    const detail = mockData.companyById(id);
    return NextResponse.json({ data: detail });
  } catch (error: any) {
    return NextResponse.json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message || 'An unexpected error occurred during company detail fetch.',
      }
    }, { status: 500 });
  }
}
