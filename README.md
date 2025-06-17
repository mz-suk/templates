# next-base

메가존 BO Next.js 프로젝트를 위한 기본 템플릿

## 📋 개요

이 프로젝트는 메가존의 Back Office용 Next.js 애플리케이션 개발을 위한 기본 템플릿입니다. 현대적인 웹 개발 스택과 최적화된 아키텍처를 제공합니다.

## 🛠 기술 스택

### 핵심 프레임워크

- **Next.js 15.3.3** - React 기반 풀스택 프레임워크 (App Router)
- **React 19.1.0** - UI 라이브러리
- **TypeScript 5.8.3** - 정적 타입 검사

### 상태 관리 & 데이터 페칭

- **TanStack Query 5.80.6** - 서버 상태 관리 및 캐싱
- **Zustand 5.0.5** - 클라이언트 상태 관리

### UI & 스타일링

- **Tailwind CSS 4.1.8** - 유틸리티 우선 CSS 프레임워크
- **shadcn/ui** - 고품질 재사용 가능한 컴포넌트
- **Radix UI** - 접근성 높은 헤드리스 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리

### 폼 & 유효성 검사

- **React Hook Form 7.57.0** - 성능 최적화된 폼 라이브러리
- **Zod 3.25.61** - 타입 안전한 스키마 유효성 검사

### 개발 도구

- **Storybook 9.0.8** - 컴포넌트 개발 환경
- **Vitest 3.2.3** - 빠른 단위 테스트 프레임워크
- **ESLint & Prettier** - 코드 품질 및 포맷팅
- **Turbopack** - 빠른 개발 서버

## 📁 프로젝트 구조

```
├── app/                          # Next.js App Router
│   ├── (private)/               # 인증이 필요한 라우트
│   │   ├── dashboard/           # 대시보드 페이지
│   │   └── layout.tsx          # 인증된 사용자 레이아웃
│   ├── (public)/               # 공개 라우트
│   │   └── (auth)/             # 인증 관련 페이지
│   │       └── login/          # 로그인 페이지
│   ├── api/                    # API 라우트
│   ├── layout.tsx              # 루트 레이아웃
│   ├── providers.tsx           # 전역 프로바이더
│   ├── page.tsx               # 홈 페이지
│   ├── loading.tsx            # 로딩 UI
│   ├── not-found.tsx          # 404 페이지
│   └── global-error.tsx       # 에러 바운더리
├── components/                # 재사용 가능한 컴포넌트
│   ├── ui/                    # shadcn/ui 컴포넌트
│   ├── common/                # 공통 컴포넌트
│   ├── page/                  # 페이지 특화 컴포넌트
│   └── test/                  # 테스트용 컴포넌트
├── lib/                       # 라이브러리 유틸리티
├── hooks/                     # 글로벌 커스텀 훅
├── types/                     # 글로벌 타입 정의
├── store/                     # 글로벌 상태 관리
├── services/                  # API 서비스 레이어
├── stories/                   # Storybook 스토리
├── styles/                    # 스타일 파일
├── .storybook/               # Storybook 설정
├── middleware.ts             # Next.js 미들웨어 (인증)
└── tailwind.config.js        # Tailwind CSS 설정
```

## 🚀 시작하기

### 필수 요구사항

- **Node.js** >= 22.0.0
- **pnpm** >= 10.0.0

### 설치 및 실행

1. **의존성 설치**

   ```bash
   pnpm install
   ```

2. **개발 서버 실행**

   ```bash
   pnpm dev
   ```

   애플리케이션이 [http://localhost:5050](http://localhost:5050)에서 실행됩니다.

3. **프로덕션 빌드**
   ```bash
   pnpm build
   pnpm start
   ```

## 🧪 개발 도구

### Storybook

컴포넌트 개발 및 테스트:

```bash
pnpm storybook
```

[http://localhost:6006](http://localhost:6006)에서 확인 가능

### 코드 품질

```bash
pnpm lint          # ESLint 검사
pnpm lint:fix      # ESLint 자동 수정
pnpm format        # Prettier 포맷팅
pnpm format:check  # 포맷팅 검사
pnpm type          # TypeScript 타입 검사
pnpm type:watch    # 타입 검사 감시 모드
```

### Git 유틸리티

```bash
pnpm gf            # 원격에서 삭제된 브랜치 정리
pnpm gfl           # 로컬 브랜치 일괄 삭제
```

## 🔐 인증 시스템

프로젝트는 쿠키 기반 인증 시스템을 사용합니다:

- **미들웨어**: `middleware.ts`에서 라우트 보호
- **공개 라우트**: `/login`, `/signup` 등
- **보호된 라우트**: `/dashboard` 등 인증 필요
- **자동 리다이렉션**: 로그인 상태에 따른 페이지 전환

## 🎨 UI 컴포넌트

### shadcn/ui 컴포넌트

프로젝트는 shadcn/ui를 기반으로 한 고품질 컴포넌트를 제공합니다:

- **버튼, 입력, 폼** - 기본 UI 요소
- **데이터 테이블** - 정렬, 필터링, 페이지네이션 지원
- **네비게이션** - 사이드바, 브레드크럼
- **피드백** - 툴팁, 알림, 로딩 상태
- **레이아웃** - 시트, 대화상자, 구분선

### 컴포넌트 추가

```bash
npx shadcn-ui@latest add [component-name]
```

## 📡 API 통신

### HTTP 클라이언트

- **httpClient.ts**: 기본 HTTP 요청 처리
- **apiClient.ts**: API 엔드포인트 래퍼
- **TanStack Query**: 서버 상태 관리 및 캐싱

### 사용 예시

```typescript
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

function UserList() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.get('/users'),
  });

  // ...
}
```

## 🎯 라우팅 아키텍처

### Route Groups

- **(private)**: 인증이 필요한 페이지
- **(public)**: 누구나 접근 가능한 페이지
- **(auth)**: 인증 관련 페이지

### 레이아웃 계층

1. **Root Layout** (`app/layout.tsx`): 전역 설정
2. **Public Layout** (`app/(public)/layout.tsx`): 공개 페이지용
3. **Private Layout** (`app/(private)/layout.tsx`): 인증된 사용자용

## 🔧 설정

### Path Aliases

```typescript
"@/*": ["./*"]  // 프로젝트 루트 기준
```

### Tailwind CSS

- **Base Color**: neutral
- **CSS Variables**: 활성화
- **Import Sorting**: 자동 정렬 적용

### ESLint & Prettier

- **Next.js** 최적화된 규칙
- **자동 import 정렬**
- **Tailwind CSS** 클래스 정렬

## 📦 배포

### 환경 변수

`.env.local` 파일에 필요한 환경 변수를 설정하세요:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

### 빌드 최적화

- **Turbopack**: 개발 시 빠른 빌드
- **Code Splitting**: 자동 코드 분할
- **Image Optimization**: 자동 이미지 최적화

## 🤝 기여하기

1. **브랜치 생성**: `git checkout -b feature/your-feature`
2. **커밋**: `git commit -m 'Add some feature'`
3. **푸시**: `git push origin feature/your-feature`
4. **Pull Request** 생성

### 코드 스타일

- **TypeScript** 엄격 모드 사용
- **ESLint** 규칙 준수
- **Prettier** 포맷팅 적용
- **컴포넌트 단위** 개발 및 테스트

## 📚 추가 자료

- [Next.js 문서](https://nextjs.org/docs)
- [TanStack Query 문서](https://tanstack.com/query/latest)
- [shadcn/ui 문서](https://ui.shadcn.com)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [React Hook Form 문서](https://react-hook-form.com)

## 📄 라이선스

이 프로젝트는 이제 제껍니다.

TODO: 프로젝트 구조 정리

```plaintext
📁 루트 디렉토리
├── .env.example                # 환경 변수 예시 파일
├── .eslintrc.json              # ESLint 설정
├── .gitignore                  # Git 무시 파일 목록
├── .prettierrc.json            # Prettier 설정 (선택사항, package.json에 통합 가능)
├── next.config.mjs             # Next.js 설정 파일
├── package.json                # 프로젝트 의존성 및 스크립트
├── tsconfig.json               # TypeScript 설정
├── README.md                   # 프로젝트 설명 및 가이드

📁 public/                      # 정적 에셋 (이미지, 폰트 등)
├── fonts/
└── images/

📁 app/                         # Next.js App Router 핵심 디렉토리
├── (auth)/                    # 인증 관련 라우트 그룹 (예: 로그인, 회원가입)
│   ├── login/
│   │   └── page.tsx
│   └── layout.tsx             # 인증 페이지용 레이아웃
├── (main)/                    # 주요 애플리케이션 라우트 그룹
│   ├── dashboard/
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── layout.tsx         # 대시보드 특정 레이아웃
│   │   └── page.tsx
│   ├── layout.tsx             # 메인 애플리케이션 레이아웃
│   └── page.tsx               # 홈페이지 (루트 페이지)
|
├── actions/                   # Server Actions 정의 (Next.js 서버 컴포넌트 액션)
│   └── login.ts               # 로그인/로그아웃 관련 서버 액션 (토큰 발급, 쿠키 설정 등)
|
├── api/                       # API Route Handlers
│   └── hello/
│       └── route.ts           # 예시 API 엔드포인트
├── global-error.tsx           # 전역 에러 처리 (프로덕션)
├── layout.tsx                 # 루트 레이아웃 (필수)
├── loading.tsx                # 루트 로딩 UI
├── not-found.tsx              # 404 페이지
└── template.tsx               # 루트 템플릿 (필요시)

📁 components/                 # 재사용 가능한 컴포넌트
├── ui/                        # 기본적인 UI 요소 (Button, Input, Card 등)
│   └── Button.tsx
├── common/                    # 여러 UI 요소를 조합한 공통 컴포넌트 (Navbar 등)
│   └── Navbar.tsx
└── page/                      # 도메인 종속 컴포넌트
    └── user/
        └── UserProfile.tsx

📁 contexts/                   # React Context API (전역 상태 관리)
└── ThemeContext.tsx

📁 hooks/                      # 커스텀 React Hooks
└── useDebounce.ts

📁 lib/                        # 유틸리티, 상수, 외부 라이브러리 설정
├── httpClient.ts              # API 클라이언트 (fetch/axios 등)
├── constants.ts              # 전역 상수
├── utils.ts                  # 일반 유틸리티 함수
└── schema.ts                 # 유효성 검사 스키마 (예: Zod)

📁 services/ (또는 lib/apiService/) # API 호출 추상화 로직
└── userService.ts            # getUser, updateUser 등

📁 store/                      # 전역 상태 관리 (Zustand, Redux 등)
├── userSlice.ts              # Redux Toolkit 예시
└── index.ts

📁 styles/                     # 전역 스타일, 테마 관련
├── globals.css               # 전역 CSS (Tailwind 포함)
└── theme.ts                  # 테마 정의 (CSS-in-JS 등)

📁 types/ (또는 interfaces/)  # 타입 정의
├── index.ts                  # 공통 타입
├── api.ts                    # API 관련 타입
└── entities.ts               # 주요 데이터 모델 타입

📁 tests/                      # 테스트 코드 (Jest, RTL 등)
├── __mocks__/
└── components/
    └── Button.test.tsx
```
