// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // 1. 보호가 필요 없는 공개 경로 정의
  const publicPaths = ['/login', '/signup']; // 기타 공개 페이지 추가 가능

  // 현재 경로가 공개 경로인지 확인
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // 2. 로그인되어 있고, 공개 경로(로그인 페이지 등)에 접근하려 할 때
  if (sessionToken && isPublicPath) {
    // 메인 대시보드 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. 로그인되어 있지 않고, 보호된 경로에 접근하려 할 때
  if (!sessionToken && !isPublicPath) {
    // 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 그 외의 경우는 요청을 그대로 통과
  return NextResponse.next();
}

export const config = {
  /*
   * 아래 경로를 제외한 모든 경로에서 미들웨어를 실행합니다:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
