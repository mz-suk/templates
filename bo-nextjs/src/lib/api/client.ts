import { env } from '@/lib/env';

/**
 * API 응답 타입
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * API 에러 타입
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * API 클라이언트 설정
 */
const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * 기본 fetch 래퍼
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // 네트워크 에러 등
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      0
    );
  }
}

/**
 * API 클라이언트 메서드들
 */
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
};

/**
 * 인증이 필요한 API 호출을 위한 헬퍼
 */
export function createAuthenticatedClient(getToken: () => string | null) {
  return {
    get: <T>(endpoint: string, options?: RequestInit) => {
      const token = getToken();
      return apiClient.get<T>(endpoint, {
        ...options,
        headers: {
          ...options?.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
    },

    post: <T>(endpoint: string, data?: unknown, options?: RequestInit) => {
      const token = getToken();
      return apiClient.post<T>(endpoint, data, {
        ...options,
        headers: {
          ...options?.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
    },

    put: <T>(endpoint: string, data?: unknown, options?: RequestInit) => {
      const token = getToken();
      return apiClient.put<T>(endpoint, data, {
        ...options,
        headers: {
          ...options?.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
    },

    patch: <T>(endpoint: string, data?: unknown, options?: RequestInit) => {
      const token = getToken();
      return apiClient.patch<T>(endpoint, data, {
        ...options,
        headers: {
          ...options?.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
    },

    delete: <T>(endpoint: string, options?: RequestInit) => {
      const token = getToken();
      return apiClient.delete<T>(endpoint, {
        ...options,
        headers: {
          ...options?.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
    },
  };
}
