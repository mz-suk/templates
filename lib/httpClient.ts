// lib/httpClient.ts

import { ApiError, type ApiResponse } from '@/types/api';

const API_HOST = process.env.NEXT_PUBLIC_API_BASE_URL;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  params?: Record<string, string | number | boolean>;
  isExternal?: boolean;
  token?: string;
}

async function http<T>(
  method: HttpMethod,
  endpoint: string,
  body?: Record<string, unknown> | FormData,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers: customHeaders, isExternal = false, token, ...restOptions } = options;
  console.log('@@@@@@@token', token);

  let url = isExternal ? endpoint : `${API_HOST}${endpoint}`;
  if (params && method === 'GET') {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  const headers = new Headers(customHeaders);

  if (!headers.has('Accept-Language')) {
    headers.set('Accept-Language', 'ko');
  }
  if (!headers.has('Authorization') && token) {
    console.log('33232', token);
    headers.set('Authorization', `Bearer ${token}`);
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

  if (response.status === 204) {
    return null as T;
  }

  const responseData: ApiResponse<T> = await response.json();
  return responseData.result ?? responseData?.data ?? (responseData as T);
}

export const httpClient = {
  get: <T>(endpoint: string, options?: RequestOptions) => http<T>('GET', endpoint, undefined, options),
  post: <T>(endpoint: string, body: Record<string, unknown> | FormData, options?: RequestOptions) =>
    http<T>('POST', endpoint, body, options),
  put: <T>(endpoint: string, body: Record<string, unknown>, options?: RequestOptions) =>
    http<T>('PUT', endpoint, body, options),
  delete: <T>(endpoint: string, options?: RequestOptions) => http<T>('DELETE', endpoint, undefined, options),
};
