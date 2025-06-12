// app/layout.tsx
import type { Metadata } from 'next';

import { ClientProviders } from './providers';

import '@/styles/globals.css';

export const metadata: Metadata = {
  // ... metadata 설정
};

// 최상위 레이아웃은 모든 경로에 적용됩니다.
// 여기서는 공통 Provider와 <html>, <body> 구조만 정의합니다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
