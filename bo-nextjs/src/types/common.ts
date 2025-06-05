/**
 * 기본 엔티티 타입
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 페이지네이션 메타데이터
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * 페이지네이션된 응답
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * 정렬 옵션
 */
export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

/**
 * 필터 옵션
 */
export interface FilterOption {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in';
  value: unknown;
}

/**
 * 쿼리 파라미터
 */
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: SortOption[];
  filters?: FilterOption[];
  search?: string;
}

/**
 * 선택 옵션
 */
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * 파일 업로드 타입
 */
export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

/**
 * 사용자 정보
 */
export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user';
  isActive: boolean;
}

/**
 * 인증 상태
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * 에러 타입
 */
export interface AppError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * 로딩 상태
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * 테마 타입
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * 언어 타입
 */
export type Language = 'ko' | 'en';

/**
 * 환경 타입
 */
export type Environment = 'development' | 'production' | 'test'; 