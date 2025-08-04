# next-base

메가존 BO Next.js 프로젝트 템플릿

## 🛠 기술 스택

### 프레임워크

- **Next.js 15.3.3** - React 기반 풀스택 프레임워크 (App Router)
- **React 19.1.0** - UI 라이브러리
- **TypeScript 5.8.3** - 정적 타입 검사

### 상태 관리 & 데이터 페칭

- **TanStack Query 5.80.6** - 서버 상태 관리 및 캐싱
- **Zustand 5.0.5** - 클라이언트 상태 관리

### UI

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
src/
├── app/                    # Next.js App Router
│   ├── (private)/         # 인증 필요 라우트
│   ├── (public)/          # 공개 라우트
│   ├── api/               # API 라우트
│   └── actions/           # 서버 액션
├── components/            # 재사용 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   └── page/             # 페이지별 컴포넌트
├── lib/                  # 유틸리티 (httpClient, utils 등)
├── services/             # API 서비스 레이어
├── store/                # Zustand 상태 관리
├── types/                # 타입 정의
├── hooks/                # 커스텀 훅
└── styles/               # 글로벌 스타일
```

## 🤖 Cursor Project Rules

```
.cursor/
rules/
├── index.mdc                # 메인 프로젝트 규칙 (항상 적용)
├── nextjs-react.mdc         # Next.js & React 개발 패턴
├── ui-components.mdc        # shadcn/ui & Tailwind CSS 스타일링
├── api-services.mdc         # TanStack Query & Zustand 패턴
└── testing-storybook.mdc    # Vitest & Storybook 테스팅
```

### 사용법

- **자동 적용**: AI가 컨텍스트에 따라 관련 규칙 자동 선택
- **수동 참조**: `@nextjs-react 규칙을 따라서 Server Component를 만들어줘`
- **규칙 확인**: Cursor IDE에서 `Cmd+Shift+P` → "Cursor: Open Rules"

## 🚀 시작하기

### 설치 및 실행

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

### 개발 도구

```bash
pnpm storybook    # http://localhost:6006
pnpm test         # Vitest 테스트
pnpm lint         # ESLint 검사
pnpm format       # Prettier 포맷팅
pnpm type         # TypeScript 타입 검사
```

## 📦 핵심 개발 패턴

### Next.js App Router

```tsx
// Server Component (기본)
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`/api/products/${params.id}`).then((res) => res.json());
  return <ProductDetail product={product} />;
}

// Client Component (필요시만)
('use client');
export const InteractiveButton = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>클릭: {count}</button>;
};
```

### API 서비스 레이어 (3계층 아키텍처)

```tsx
// 1. httpClient (lib/httpClient.ts)
const users = await httpClient.get<User[]>('/api/users');

// 2. 서비스 레이어 (services/user/user.ts)
export const userService = {
  getUsers: async () => httpClient.get<User[]>('/api/users'),
  createUser: async (data) => httpClient.post<User>('/api/users', data),
};

// 3. TanStack Query 훅 (hooks/useUsers.ts)
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
    staleTime: 5 * 60 * 1000, // 5분 캐싱
  });
};
```

**TanStack Query 선택 이유**:

- 선언적 데이터 페칭으로 복잡한 useEffect 로직 제거
- 강력한 캐싱 전략 (stale-while-revalidate)
- 자동 동기화 및 재시도 기능
- 서버/클라이언트 상태 명확한 분리

### Zustand 상태 관리 (클라이언트 전용)

```tsx
// store/userStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null }),
    }),
    { name: 'user-store' }
  )
);

// 셀렉터 패턴 (렌더링 최적화)
export const useCurrentUser = () => useUserStore((state) => state.currentUser);
```

**Zustand 선택 이유**:

- 최소한의 API로 간단한 설정 (Provider 불필요)
- Redux 대비 적은 보일러플레이트 코드
- 자동 렌더링 최적화 (특정 상태만 구독)
- 가벼운 번들 크기

### shadcn/ui + 폼 처리 ('레시피' 방식)

```tsx
// 컴포넌트 생성 (프로젝트에 직접 복사)
npx shadcn-ui@latest add button

// 폼 컴포넌트 패턴
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
});

type UserFormData = z.infer<typeof userSchema>;

export const UserForm = () => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="이름 입력" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">등록</Button>
      </form>
    </Form>
  );
};
```

**shadcn/ui 선택 이유**:

- npm 라이브러리가 아닌 '레시피' 방식으로 완전한 코드 소유권
- Tailwind CSS 기반으로 프로젝트 스타일과 일관성
- Radix UI 기반으로 접근성(a11y) 자동 지원
- 자유로운 커스터마이징 가능

### TanStack Query 뮤테이션

```tsx
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: '성공', description: '사용자가 생성되었습니다.' });
    },
    onError: () => {
      toast({ title: '오류', description: '생성에 실패했습니다.', variant: 'destructive' });
    },
  });
};
```

## 🎨 Tailwind CSS 클래스 순서

1. 레이아웃 (flex, grid, block)
2. 위치 (relative, absolute)
3. 크기 (w-, h-)
4. 간격 (m-, p-)
5. 타이포그래피 (text-, font-)
6. 색상 (bg-, text-, border-)
7. 기타 스타일 (rounded-, shadow-)
8. 반응형 (sm:, md:, lg:)
9. 상태 (hover:, focus:)

```tsx
// 좋은 예
<div className="flex flex-col w-full max-w-md p-6 text-sm bg-white border rounded-lg shadow-md hover:shadow-lg md:p-8">
```

## 🧪 테스트 & Storybook

### Vitest 테스트

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('Button 컴포넌트', () => {
  it('기본 버튼이 렌더링된다', () => {
    render(<Button>클릭하세요</Button>);
    expect(screen.getByRole('button', { name: '클릭하세요' })).toBeInTheDocument();
  });
});
```

### Storybook 스토리

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '기본 버튼' },
};
```

## 🔧 코딩 컨벤션

### TypeScript

- `any` 타입 사용 금지
- interface보다 type 사용 권장
- 명시적 타입 정의 필수

### React

- 함수형 컴포넌트만 사용
- Named exports 사용 (default export 지양)
- Server Components 우선, Client Components는 'use client' 명시

### 파일 명명

- 컴포넌트: `PascalCase.tsx`
- 디렉토리: `kebab-case`
- 훅: `camelCase` (use 접두사)
- 함수: `camelCase`
- 이벤트 핸들러: `handle` 접두사
- Boolean 변수: `is/has/can` 접두사

## 🤝 AI 개발 워크플로우

### 1. 컴포넌트 생성

```
사용자 프로필 카드 컴포넌트를 만들어줘.
avatar, name, email을 표시하고 default와 highlighted variant를 구현해줘.
```

### 2. API 서비스 생성

```
@api-services 규칙으로 사용자 CRUD를 위한 서비스와 TanStack Query 훅을 만들어줘.
```

### 3. 테스트 생성

```
@testing-storybook 규칙에 맞게 UserCard 컴포넌트의 Vitest 테스트와 Storybook 스토리를 만들어줘.
```

### 4. AI 생성 예시 결과

AI가 Project Rules를 참조하여 자동 생성하는 항목들:

- 표준화된 서비스 레이어 구조
- 적절한 쿼리 키 생성
- 에러 핸들링 및 토스트 알림
- 캐시 무효화 패턴
- TypeScript 타입 안전성
- shadcn/ui 기반 컴포넌트 구조
- Tailwind CSS 클래스 순서 준수
