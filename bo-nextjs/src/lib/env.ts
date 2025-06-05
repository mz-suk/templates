import { z } from 'zod';

/**
 * 환경변수 스키마 정의
 * 런타임에 환경변수의 유효성을 검사합니다.
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url().optional(),

  // Authentication
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // External APIs
  API_BASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .transform((val: string) => val === 'true')
    .optional(),

  // App Configuration
  NEXT_PUBLIC_APP_NAME: z.string().default('Next.js Boilerplate'),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().default('Modern Next.js boilerplate template'),

  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * 환경변수 파싱 및 검증
 */
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw new Error('Environment variable validation failed');
  }
};

/**
 * 타입 안전한 환경변수 객체
 */
export const env = parseEnv();

/**
 * 환경변수 타입
 */
export type Env = z.infer<typeof envSchema>; 