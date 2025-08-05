import { useQuery } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';

import { PaginatedResponse } from '@/types/api';
import { CouponData } from '@/types/benefit';
// import { ProductDataTableModel } from '@/types/product';
// import { httpClient } from '@/lib/httpClient';
import { buildQueryParams } from '@/lib/utils';

interface UsePostsOptions {
  page: number;
  limit: number;
  sorting: SortingState;
  filter?: string;
}

export const useBenefitList = ({ page, limit, sorting, filter }: UsePostsOptions) =>
  useQuery<PaginatedResponse<CouponData>>({
    queryKey: ['posts', page, sorting, filter],
    queryFn: () => {
      const query = buildQueryParams(page, limit, sorting, filter);
      return fetch(`/api/benefit/list?${query}`).then((res) => res.json());
    },
    placeholderData: (prev) => prev,
  });
