import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // experimental: {
  //   // React 19 지원 및 최적화
  //   reactCompiler: true,
  //   // PPR (Partial Prerendering) - Next.js 15 새 기능
  //   ppr: true,
  // },
  // 번들 분석기 개선
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 성능 최적화
  poweredByHeader: false,
  compress: true,
  // TypeScript 엄격 모드
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint 빌드 시 실행
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
