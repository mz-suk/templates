/**
 * API 응답의 공통 래퍼(wrapper) 인터페이스
 * - T: 실제 데이터의 타입
 */
export interface ApiResponse<T> {
  resultCode: string;
  resultMessage: string;
  data?: T;
  result: T;
}

/**
 * API 요청 실패 시 throw할 커스텀 에러 클래스
 */
export class ApiError extends Error {
  status: number;
  data: ApiResponse<null> | null;

  constructor(message: string, status: number, data: ApiResponse<null> | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}
