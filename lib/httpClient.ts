// /lib/httpClient.ts

import { getCookie } from 'cookies-next'; // 서버/클라이언트 쿠키 처리를 위한 유틸리티

import { ApiError, type ApiResponse } from '@/types/api';

const API_HOST = process.env.NEXT_PUBLIC_API_BASE_URL;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  params?: Record<string, string | number | boolean>;
  isExternal?: boolean;
}

async function http<T>(
  method: HttpMethod,
  endpoint: string,
  body?: Record<string, unknown> | FormData,
  options: RequestOptions = {},
  // Server Action에서 headers 객체를 직접 전달받기 위한 인자
  headersOverride?: HeadersInit
): Promise<T> {
  const { params, headers: customHeaders, isExternal = false, ...restOptions } = options;

  let url = isExternal ? endpoint : `${API_HOST}${endpoint}`;
  if (params && method === 'GET') {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  const headers = new Headers(customHeaders);
  if (headersOverride) {
    new Headers(headersOverride).forEach((value, key) => headers.set(key, value));
  }

  if (!headers.has('Accept-Language')) headers.set('Accept-Language', 'ko');

  // 인증 토큰 추가 (서버/클라이언트 호환)
  if (!headers.has('Authorization')) {
    // getCookie는 서버 컴포넌트/액션에서는 { cookies }를, 클라이언트에서는 document.cookie를 사용해 동작합니다.
    const accessToken = getCookie('accessToken'); // Server Action에서는 { cookies } import가 필요
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  let requestBody: BodyInit | null = null;
  if (body) {
    if (body instanceof FormData) {
      requestBody = body;
    } else {
      requestBody = JSON.stringify(body);
      headers.set('Content-Type', 'application/json');
    }
  }

  const response = await fetch(url, {
    method,
    headers,
    body: requestBody,
    ...restOptions,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new ApiError(errorData?.resultMessage || 'API 요청 실패', response.status, errorData);
  }

  // No Content 응답 처리
  if (response.status === 204) {
    return null as T;
  }

  const responseData: ApiResponse<T> = await response.json();

  // 예외 처리
  // if (responseData.resultCode !== '0000' && responseData.resultCode !== '200') {
  //   throw new ApiError(responseData.resultMessage, response.status, responseData as unknown as ApiResponse<null>);
  // }

  return responseData.result ?? responseData?.data ?? (responseData as T);
}

export const httpClient = {
  get: <T>(endpoint: string, options?: RequestOptions, headersOverride?: HeadersInit) =>
    http<T>('GET', endpoint, undefined, options, headersOverride),
  post: <T>(
    endpoint: string,
    body: Record<string, unknown> | FormData,
    options?: RequestOptions,
    headersOverride?: HeadersInit
  ) => http<T>('POST', endpoint, body, options, headersOverride),
  put: <T>(endpoint: string, body: Record<string, unknown>, options?: RequestOptions, headersOverride?: HeadersInit) =>
    http<T>('PUT', endpoint, body, options, headersOverride),
  delete: <T>(endpoint: string, options?: RequestOptions, headersOverride?: HeadersInit) =>
    http<T>('DELETE', endpoint, undefined, options, headersOverride),
};
