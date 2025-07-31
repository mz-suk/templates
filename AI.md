# Cursor AI를 활용한 팀 코드 표준화 및 모듈화 가이드

팀의 개발 생산성과 코드 품질을 동시에 높이기 위해, 생성형 AI를 '팀의 규칙을 잘 따르는 숙련된 페어 프로그래머'로 만드는 체계적인 가이드입니다. 이 문서는 AI 개발 워크플로우를 `정의`, `생성`, `검증`의 3단계로 나누어 설명합니다.

---

## 🚀 Phase 1: 정의 (Foundation) - AI에게 '우리 팀의 규칙' 가르치기

코드를 생성하기 전에, AI가 따라야 할 명확한 기준과 템플릿, 즉 "단일 진실 공급원(Single Source of Truth)"을 마련합니다.

### 1. 핵심 디자인 토큰(Design Tokens) 파일 명시

AI가 일관된 스타일을 사용하도록 팀의 시각적 정의가 담긴 설정 파일을 참조시킵니다.

- **핵심 파일:** `tailwind.config.js`
- **역할:** 컴포넌트 생성 시 `bg-primary`, `text-lg` 와 같이 설정된 테마 값을 사용하도록 강제하여 디자인 일관성을 유지합니다.
- **활용:** 프롬프트에 `@tailwind.config.js`를 포함하여 AI에게 컨텍스트를 제공합니다.

### 2. 표준 컴포넌트 템플릿(Component Template) 정립

팀에서 합의된 "이상적인 컴포넌트 구조"를 담은 템플릿 파일을 만들어 AI의 결과물을 표준화합니다.

- **파일 예시:** `.github/COMPONENT_TEMPLATE.md`
- **역할:** 새로운 컴포넌트 생성 시, 명시적인 지침(폴더 구조, 파일명, 코드 스타일, Storybook 연동 등)을 제공합니다.
- **템플릿 내용 예시:**

  ```markdown
  # Component Generation Template

  ## 1. Directory and File Structure

  - Create components under `src/components/ui/ComponentName`.
  - Main component file: `index.tsx`.
  - Storybook file: `ComponentName.stories.tsx`.

  ## 2. Component Code (`index.tsx`)

  - Use React 19 and TypeScript.
  - Props should be defined in an `interface` named `ComponentNameProps`.
  - Use `cva` (Class Variance Authority) for styling variants.
  - Use Radix UI primitives for accessibility if applicable.
  - Export the component at the end.

  ## 3. Storybook Story Code (`ComponentName.stories.tsx`)

  - Create a story file that covers the primary state and all variants.
  - Use TypeScript for args.
  - The story title should be `UI/ComponentName`.
  ```

### 3. 코딩 컨벤션(Coding Conventions) 명시

ESLint, Prettier 설정 및 팀 내 네이밍 규칙을 AI가 인지하고 준수하도록 합니다.

- **핵심 파일:** `.eslintrc.json`, `prettier.config.js`
- **역할:** 생성 코드의 포맷팅과 문법을 팀 규칙에 맞게 자동 교정하고, 코드의 일관성을 유지합니다.

---

## 💻 Phase 2: 생성 (Execution) - Cursor AI를 활용한 '규격화된' 개발

정의된 자산들을 Cursor의 `@` 기능을 통해 AI의 컨텍스트에 주입하여 코드를 생성합니다.

### 1. '컨텍스트 기반' 컴포넌트 생성

막연한 요청 대신, 준비된 자산을 `@`로 참조하여 구체적으로 요청합니다.

- **나쁜 프롬프트 ❌:**

  > "카드 UI를 만들어줘."

- **좋은 프롬프트 ✅:**
  > "새로운 카드 컴포넌트를 생성해줘.
  >
  > 1.  `@.github/COMPONENT_TEMPLATE.md` 파일의 규칙을 반드시 따라줘.
  > 2.  스타일은 `@tailwind.config.js` 에 정의된 토큰을 사용해야 해.
  > 3.  `title`, `description`을 props로 받고, `cva`를 사용해서 'default'와 'highlighted' variant를 구현해줘.
  > 4.  `ComponentName.stories.tsx` 파일도 함께 생성해줘."

### 2. 기존 컴포넌트 '지능적' 재사용 및 확장

새 컴포넌트 생성 전, AI를 이용해 기존 코드를 재사용하거나 확장합니다.

- **프롬프트 예시:**
  > "@src/components/ui/Button/index.tsx 이 버튼 컴포넌트를 기반으로, `isLoading` prop을 추가해줘. `isLoading`이 true일 때 스피너를 보여주고 버튼을 disabled 상태로 만들어줘."

### 3. 공통 로직 모듈화 (Custom Hooks, Utils)

반복되는 로직을 발견하면 즉시 AI에게 모듈화를 요청합니다.

- **프롬프트 예시 (로직 블록 선택 후):**
  > "선택된 데이터 fetching 로직을 `useCustomData` 라는 커스텀 훅으로 추출해줘. `@/hooks` 폴더에 `useCustomData.ts` 파일을 생성하고, `react-query`를 사용해줘."

---

## ✅ Phase 3: 검증 (Validation) & 개선 (Refinement)

AI 생성물을 검증하고, 그 과정에서 얻은 노하우를 다시 `정의` 단계에 반영하여 선순환 구조를 만듭니다.

### 1. Storybook을 통한 시각적 검증

AI가 생성한 컴포넌트가 디자인 명세와 일치하는지 시각적으로 빠르게 확인합니다. 이는 디자이너, 기획자와의 협업을 원활하게 합니다.

### 2. 코드 리뷰(PR)와 정적 분석

- **원칙:** AI가 생성한 코드는 "유능하지만 우리 팀 문화는 모르는 신입의 코드"로 간주합니다.
- **정적 분석:** ESLint, Prettier가 1차 방어선 역할을 합니다.
- **동료 리뷰:** 시니어 개발자는 아키텍처, 비즈니스 로직, 확장성 등 더 높은 차원의 맥락을 검토합니다.

### 3. 성공적인 패턴의 '재학습'

- **방법:** 잘 만들어진 컴포넌트나 훅을 팀의 "골든 패턴"으로 삼고, 문서나 별도 폴더에 정리합니다.
- **효과:** 다음 개발 시 이 성공 사례를 `@`로 참조하여, 팀의 우수한 코딩 패턴이 자연스럽게 전파되도록 합니다.

---

### 결론

AI를 활용한 코드 표준화는 **팀의 개발 표준을 명확히 `정의`하고, AI에 컨텍스트를 주입하여 `생성`하며, 동료와 함께 `검증`하는 체계적인 워크플로우**를 구축하는 과정입니다. 이를 통해 AI는 단순한 코드 생성 도구를 넘어, 팀의 개발 표준을 학습하고 전파하는 강력한 시스템으로 기능하게 됩니다.
