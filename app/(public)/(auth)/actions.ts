'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ApiError } from '@/types/api';
import { httpClient } from '@/lib/httpClient';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}

export async function loginAction(
  prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    // 1. 디버깅을 위한 시작 로그

    const userName = formData.get('userName')?.toString();
    const password = formData.get('password')?.toString();

    const res = await httpClient.post<LoginResponse>('/auth/token', { userName, password, sessionToken: 'test' });

    // 2. API 응답 직후 로그 (가장 중요)

    const cookiesStore = await cookies();
    cookiesStore.set('accessToken', res.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    cookiesStore.set('refreshToken', res.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
  } catch (error) {
    // 4. 에러 발생 시 터미널에 반드시 로그 출력

    if (error instanceof ApiError) {
      // API 서버가 보낸 에러 메시지를 반환하는 것이 더 좋습니다.
      return { success: false, message: error.message };
    }
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }

  // 5. 모든 try 블록이 성공했을 때만 리다이렉트 실행
  redirect('/dashboard');
}

export async function logoutAction() {
  const cookiesStore = await cookies();
  cookiesStore.delete('accessToken');
  cookiesStore.delete('refreshToken');
  redirect('/login');
}
