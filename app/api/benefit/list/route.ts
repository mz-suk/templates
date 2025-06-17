import { NextRequest, NextResponse } from 'next/server';

import { PaginatedResponse } from '@/types/api';
import { CouponData } from '@/types/benefit';
import { httpClient } from '@/lib/httpClient';
import { getSearchParams } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  const res = await httpClient.get<PaginatedResponse<CouponData>>('/coupons', {
    token: accessToken,
    params: getSearchParams(request),
  });

  return NextResponse.json(res);
}
