# Next.js TypeScript 보일러플레이트

> 🚀 Next.js 15 + React 19 + TypeScript + Tailwind CSS 4.1 기반의 현대적인 웹 애플리케이션 보일러플레이트

## ✨ 주요 기능

- **⚡ Next.js 15** - 최신 App Router와 Server Components
- **⚛️ React 19** - 최신 React 기능과 성능 개선
- **🔷 TypeScript** - 완전한 타입 안전성
- **🎨 Tailwind CSS 4.1** - 최신 유틸리티 우선 CSS 프레임워크
- **🗄️ Zustand** - 간단하고 확장 가능한 상태 관리
- **🔄 TanStack Query** - 강력한 서버 상태 관리
- **🧩 Radix UI** - 접근성이 뛰어난 헤드리스 UI 컴포넌트
- **🎭 Lucide React** - 아름다운 아이콘 라이브러리
- **🧪 Vitest** - 빠른 단위 테스트 프레임워크
- **📏 ESLint + Prettier** - 코드 품질과 일관성
- **🐕 Husky + lint-staged** - Git 훅을 통한 자동 코드 검사

## 🏗️ 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/             # 재사용 가능한 컴포넌트
│   ├── ui/                # 기본 UI 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   └── common/            # 공통 컴포넌트
├── hooks/                 # 커스텀 훅
├── lib/                   # 유틸리티 및 설정
│   ├── api/              # API 클라이언트
│   ├── utils.ts          # 유틸리티 함수
│   ├── env.ts            # 환경변수 검증
│   └── providers.tsx     # React 프로바이더
├── stores/                # 상태 관리 (Zustand)
├── types/                 # TypeScript 타입 정의
├── constants/             # 상수 정의
└── test/                  # 테스트 설정
```

## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/your-org/nextjs-boilerplate.git
cd nextjs-boilerplate
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경변수 설정

```bash
cp env.example .env.local
```

`.env.local` 파일을 편집하여 필요한 환경변수를 설정하세요.

### 4. 개발 서버 실행

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 📜 사용 가능한 스크립트

```bash
# 개발 서버 실행 (Turbopack 사용)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린팅 검사
pnpm lint

# 린팅 자동 수정
pnpm lint:fix

# 코드 포맷팅
pnpm format

# 코드 포맷팅 검사
pnpm format:check

# 타입 검사
pnpm type-check

# 테스트 실행
pnpm test

# 테스트 UI 실행
pnpm test:ui

# 테스트 커버리지
pnpm test:coverage
```

## 🛠️ 개발 가이드

### 컴포넌트 작성

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick 
}: ButtonProps) {
  return (
    <button 
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size])} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### API 호출

```typescript
import { api } from '@/lib/api/client';
import { useQuery } from '@tanstack/react-query';

function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.get<User[]>('/users'),
  });
}
```

### 상태 관리

```typescript
import { useAppStore } from '@/stores/useAppStore';

function MyComponent() {
  const { user, setUser, isAuthenticated } = useAppStore();
  
  // 컴포넌트 로직...
}
```

## 🎨 스타일링

이 프로젝트는 Tailwind CSS 4.1을 사용합니다. 색상 토큰과 디자인 시스템이 미리 설정되어 있습니다.

```typescript
// 조건부 스타일링
import { cn } from '@/lib/utils';

<div className={cn(
  'base-styles',
  isActive && 'active-styles',
  variant === 'primary' && 'primary-styles'
)} />
```

## 🧪 테스팅

Vitest와 Testing Library를 사용한 테스트 예시:

```typescript
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Button from '@/components/ui/Button';

test('Button renders correctly', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

## 📦 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Docker

```dockerfile
# Dockerfile 예시
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'feat: add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - React 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [Radix UI](https://www.radix-ui.com/) - 헤드리스 UI 컴포넌트
- [Zustand](https://github.com/pmndrs/zustand) - 상태 관리
- [TanStack Query](https://tanstack.com/query) - 서버 상태 관리

---

**Happy coding! 🎉**
