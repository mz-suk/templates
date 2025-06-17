import { NextRequest, NextResponse } from 'next/server';

import { PaginatedResponse } from '@/types/api';
import { CouponData } from '@/types/benefit';
import { httpClient } from '@/lib/httpClient';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  const res = await httpClient.get<PaginatedResponse<CouponData>>('/coupons', {
    token: accessToken,
  });

  return NextResponse.json(res);
}
