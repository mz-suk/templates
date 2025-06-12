// /services/auth/login.ts
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/app/(public)/(auth)/actions';
import { useUserStore } from '@/store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ApiError } from '@/types/api';
import { httpClient } from '@/lib/httpClient';

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginRequest {
  userName: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// 1. 클라이언트 사이드 로그인 (React Query 사용)
export function useLogin() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationFn: async (credentials) => {
      return httpClient.post<LoginResponse>('/auth/token', {
        userName: credentials.userName,
        password: credentials.password,
      });
    },
    onSuccess: (data) => {
      // 사용자 정보를 스토어에 저장
      setUser(data.user);

      // 사용자 정보를 React Query 캐시에도 저장
      queryClient.setQueryData(['me'], data.user);

      // 대시보드로 리다이렉트
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('로그인 실패:', error.message);
    },
  });
}

// 2. 현재 사용자 정보 조회
export function useUser() {
  const { setUser } = useUserStore();

  const query = useQuery<User, ApiError>({
    queryKey: ['me'],
    queryFn: () => httpClient.get('/users/me'),
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5분
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    }
    if (query.isError) {
      setUser(null);
    }
  }, [query.isSuccess, query.isError, query.data, setUser]);

  return query;
}

// 3. 로그아웃
export function useLogout() {
  const queryClient = useQueryClient();
  const { clearUser } = useUserStore();

  return useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      clearUser();
      queryClient.clear();
    },
  });
}

// 4. 토큰 갱신 (선택사항)
export function useRefreshToken() {
  return useMutation<LoginResponse, ApiError>({
    mutationFn: () => httpClient.post<LoginResponse>('/auth/refresh', {}),
    onSuccess: (data) => {
      // 새로운 토큰으로 사용자 정보 업데이트
      const { setUser } = useUserStore.getState();
      setUser(data.user);
    },
  });
}
