import { NextRequest } from 'next/server';
import { SortingState } from '@tanstack/react-table';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildQueryParams = (page: number, limit: number, sorting: SortingState, filter?: string) => {
  const params = new URLSearchParams();
  params.append('page', String(page));
  params.append('size', String(limit));

  if (sorting.length > 0) {
    params.append('sort', sorting[0].id);
    params.append('order', sorting[0].desc ? 'desc' : 'asc');
  }

  if (filter) {
    params.append('q', filter); // json-server의 간단한 검색을 위한 'q'
  }

  return params.toString();
};

export const getSearchParams = (request: NextRequest) => {
  const searchParams = new URLSearchParams(request.url.split('?')[1]);
  return {
    page: searchParams.get('page')?.toString() || '',
    size: searchParams.get('size')?.toString() || '',
    sorting: searchParams.get('sort')?.toString() || '',
    filter: searchParams.get('q')?.toString() || '',
  };
};
