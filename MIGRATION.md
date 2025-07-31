# Cursor Project Rules 마이그레이션 가이드

이 프로젝트는 기존 `.cursorrules` (legacy) 시스템에서 새로운 Cursor IDE Project Rules 시스템으로 마이그레이션되었습니다. [Cursor 공식 문서](https://docs.cursor.com/ko/context/rules)의 모범사례를 따라 500줄 이하의 간결하고 실행 가능한 규칙으로 재구성하였습니다.

## 새로운 규칙 시스템

### 구조

```
.cursor/
├── index.mdc           # 메인 프로젝트 규칙 (Always 적용)
└── rules/             # 컨텍스트별 특화 규칙들
    ├── nextjs-react.mdc      # Next.js & React 개발 패턴
    ├── ui-components.mdc     # UI 컴포넌트 & 스타일링
    ├── api-services.mdc      # API 서비스 & 상태 관리
    └── testing-storybook.mdc # 테스팅 & Storybook
```

### 규칙 유형

1. **Always 규칙** (`.cursor/index.mdc`)

   - 모든 작업에 항상 적용되는 기본 규칙
   - 프로젝트 개요, 기술 스택, 기본 컨벤션

2. **Agent Requested 규칙** (`.cursor/rules/*.mdc`)
   - AI가 필요에 따라 자동으로 선택하는 규칙
   - 특정 작업이나 컨텍스트에서만 활성화
   - 토큰 효율성 향상

## 주요 개선 사항

### 1. 토큰 효율성

- 전체 규칙이 항상 로드되지 않음
- 관련 규칙만 선택적으로 적용
- AI 응답 품질 향상

### 2. 모듈화

- 기능별로 분리된 규칙 파일
- 유지보수 용이성
- 재사용성 향상

### 3. 팀 협업

- 버전 관리를 통한 규칙 공유
- 표준화된 개발 패턴
- 일관된 코드 품질

### 4. 모범사례 준수

- 모든 규칙 파일이 500줄 이하로 제한
- 명확하고 실행 가능한 지침
- 구체적인 예시와 참조 파일 포함
- 모호한 지침 제거, 명확한 내부 문서 스타일

## 규칙별 활용 가이드

### `.cursor/index.mdc` - 메인 프로젝트 규칙

**언제 적용**: 모든 작업에 항상 적용

**포함 내용**:

- 프로젝트 개요 및 기술 스택
- 기본 코딩 컨벤션
- 파일 명명 규칙
- 프로젝트 구조 가이드

### `.cursor/rules/nextjs-react.mdc` - Next.js & React 개발

**언제 적용**: Next.js, React 컴포넌트, App Router 작업 시

**포함 내용**:

- App Router 디렉토리 구조
- Server/Client Components 패턴
- 데이터 페칭 방법
- 에러 처리 및 성능 최적화

### `.cursor/rules/ui-components.mdc` - UI 컴포넌트 & 스타일링

**언제 적용**: UI 컴포넌트, 스타일링, 폼 작업 시

**포함 내용**:

- shadcn/ui 컴포넌트 사용법
- Tailwind CSS 스타일링 규칙
- React Hook Form + Zod 폼 처리
- 반응형 디자인 패턴

### `.cursor/rules/api-services.mdc` - API 서비스 & 상태 관리

**언제 적용**: API 통신, 상태 관리, 데이터 페칭 작업 시

**포함 내용**:

- httpClient 사용 패턴
- TanStack Query 구현
- Zustand 상태 관리
- 에러 처리 전략

### `.cursor/rules/testing-storybook.mdc` - 테스팅 & Storybook

**언제 적용**: 테스트 작성, Storybook 스토리 작업 시

**포함 내용**:

- Vitest 테스트 패턴
- React Testing Library 사용법
- Storybook 스토리 작성
- Mock 데이터 및 유틸리티

## 사용법

### Cursor IDE에서 확인

1. Cursor IDE에서 `Cmd+Shift+P` (또는 `Ctrl+Shift+P`)
2. "Cursor: Open Rules" 검색
3. 활성화된 규칙들 확인 가능

### 수동으로 규칙 참조

특정 규칙을 명시적으로 참조하려면:

```
@nextjs-react 규칙을 따라서 Server Component를 만들어줘
```

## 기존 .cursorrules 파일

기존 `.cursorrules` 파일은 여전히 지원되지만 더 이상 권장되지 않습니다:

- 토큰 효율성이 낮음
- 모든 규칙이 항상 로드됨
- 모듈화되지 않은 구조

새로운 시스템으로 완전히 마이그레이션 완료 후 `.cursorrules` 파일을 삭제할 수 있습니다.

## 추가 정보

- [Cursor 공식 문서 - Rules](https://docs.cursor.com/context/rules)
- [프로젝트 README](./README.md)
- [기술 스택 문서](./GEMINI.md)
