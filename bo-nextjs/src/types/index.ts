/**
 * 공통 타입 정의
 */

// 기본 엔티티 타입
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// 사용자 타입
export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  isActive: boolean;
}

// API 응답 타입
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

// 페이지네이션 타입
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// 검색 파라미터 타입
export interface SearchParams extends PaginationParams {
  q?: string;
  filters?: Record<string, unknown>;
}

// 폼 상태 타입
export interface FormState<T = Record<string, unknown>> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// 모달 상태 타입
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// 알림 타입
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// 테마 타입
export type Theme = 'light' | 'dark' | 'system';

// 언어 타입
export type Locale = 'ko' | 'en';

// 환경 타입
export type Environment = 'development' | 'production' | 'test';

// 유틸리티 타입들
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
