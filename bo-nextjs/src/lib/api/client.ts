/**
 * API 클라이언트 설정
 * 타입 안전한 API 호출과 에러 처리를 제공합니다.
 */

export class ApiError extends Error {
  public status: number;
  public data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

interface ApiRequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchConfig } = config;

    // URL 구성
    const url = new URL(endpoint, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    // 기본 헤더 설정
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchConfig.headers,
    };

    try {
      const response = await fetch(url.toString(), {
        ...fetchConfig,
        headers,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new ApiError(
          responseData.message || 'API 요청이 실패했습니다.',
          response.status,
          responseData
        );
      }

      return responseData;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        0
      );
    }
  }

  async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// API 클라이언트 인스턴스 생성
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
export const apiClient = new ApiClient(baseURL);

// 편의 함수들
export const api = {
  get: <T>(endpoint: string, config?: ApiRequestConfig) => 
    apiClient.get<T>(endpoint, config),
  post: <T>(endpoint: string, data?: unknown, config?: ApiRequestConfig) => 
    apiClient.post<T>(endpoint, data, config),
  put: <T>(endpoint: string, data?: unknown, config?: ApiRequestConfig) => 
    apiClient.put<T>(endpoint, data, config),
  patch: <T>(endpoint: string, data?: unknown, config?: ApiRequestConfig) => 
    apiClient.patch<T>(endpoint, data, config),
  delete: <T>(endpoint: string, config?: ApiRequestConfig) => 
    apiClient.delete<T>(endpoint, config),
}; 