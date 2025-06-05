'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 글로벌 쿼리 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5분간 캐시 유지
      staleTime: 1000 * 60 * 5,
      // 백그라운드에서 자동 refetch 방지
      refetchOnWindowFocus: false,
      // 네트워크 재연결 시 refetch 방지
      refetchOnReconnect: false,
      // 에러 재시도 설정
      retry: (failureCount, error) => {
        // 404 에러는 재시도하지 않음
        if (error instanceof Error && error.message.includes('404')) {
          return false;
        }
        // 최대 3번 재시도
        return failureCount < 3;
      },
    },
    mutations: {
      // 뮤테이션 에러 재시도 방지
      retry: false,
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
} 