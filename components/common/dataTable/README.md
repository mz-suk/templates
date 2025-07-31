# DataTable 컴포넌트 가이드

## 📁 프로젝트 구조

```
/app/(private)/
└── /products/list/
    ├── columns.tsx                    # 컬럼 정의
    ├── dataTable-row-actions.tsx     # 행(row)별 액션 메뉴
    └── page.tsx                       # 실제 페이지 컴포넌트

/components/common/dataTable/
├── DataTable.tsx                      # 공통 데이터 테이블
├── SkeletonTable.tsx                  # 로딩 스켈레톤
└── README.md                          # 이 가이드 문서

/components/ui/
├── DataTableColumnHeader.tsx          # 컬럼 헤더 (shadcn/ui)
├── Table.tsx                          # 테이블 기본 컴포넌트
└── ...                               # 기타 UI 컴포넌트들
```

## 🤖 Cursor Project Rules와 DataTable

이 DataTable 컴포넌트는 Cursor IDE Project Rules 시스템과 통합되어 AI 지원 개발이 최적화되어 있습니다.

### AI 활용 예시

```
상품 목록을 위한 DataTable을 만들어줘.
컬럼: 이름, 가격, 카테고리, 상태, 액션
상태는 뱃지로 표시하고, 액션에는 수정/삭제 버튼을 포함해줘.
```

AI가 자동으로 다음을 생성합니다:

- shadcn/ui 기반의 표준화된 컬럼 정의
- TanStack Query를 활용한 데이터 페칭
- Tailwind CSS 스타일링 패턴
- TypeScript 타입 안전성

## 📄 컬럼 정의 (columns.tsx)의 역할과 사용법

API 등에서 가져온 원본 데이터(raw data) 배열을 DataTable 컴포넌트에 전달했을 때, 이 설계도를 참고하여 테이블의 각 열(column)과 행(row)을 어떻게 그려낼지 결정합니다. 원본 데이터를 기반으로 실제 화면에 표시될 HTML 또는 React 컴포넌트를 생성하는 작업을 이곳에서 담당합니다.

### 핵심 역할

columns.tsx 파일의 columns 배열은 ColumnDef 객체들의 리스트입니다. 각 객체는 테이블의 한 열을 정의하며, 주로 다음과 같은 속성을 가집니다.

#### 1. 데이터 연결 (accessorKey)

테이블의 특정 열과 데이터 객체의 어떤 key를 연결할지 지정합니다.

예시: `accessorKey: 'title'`이라고 설정하면, 해당 열은 data 배열에 있는 각 객체의 title 프로퍼티 값을 표시하게 됩니다.

#### 2. 헤더 스타일링 및 기능 (header)

열의 제목(헤더) 부분을 어떻게 렌더링할지 정의합니다.

단순 텍스트로 표시할 수도 있고, 정렬(sorting) 기능이 포함된 별도의 DataTableColumnHeader 같은 React 컴포넌트를 사용하여 렌더링할 수도 있습니다.

#### 3. 셀 데이터 커스터마이징 (cell)

가장 중요한 부분으로, 각 셀(cell)의 내용을 어떻게 보여줄지 자유롭게 커스터마이징할 수 있습니다.

cell 함수는 row 정보를 인자로 받아, 원본 데이터 값(`row.getValue('key')` 또는 `row.original`)에 접근할 수 있습니다. 이 값을 사용하여 단순 텍스트가 아닌, 특정 조건에 따라 다른 색상의 뱃지(Badge), 버튼, 이미지, 체크박스 등 원하는 React 컴포넌트를 반환할 수 있습니다.

예를 들어, status 값이 'done'이면 초록색 뱃지를, 'pending'이면 노란색 뱃지를 보여주는 로직을 이 곳에서 구현합니다.

#### 4. 액션 컬럼 정의 (id & cell)

데이터 객체와 직접적인 관련은 없지만, '수정', '삭제' 버튼처럼 각 행에 대한 특정 액션을 수행하는 열을 추가할 때 사용됩니다. `accessorKey` 대신 고유한 id를 부여합니다. cell 함수 안에서 DataTableRowActions 와 같은 컴포넌트를 렌더링하여 드롭다운 메뉴나 버튼 그룹을 표시합니다.

## 🎯 Project Rules 기반 구현 예시

### 기본 컬럼 정의 (AI 생성)

```tsx
// columns.tsx
import { ColumnDef } from '@tanstack/react-table';

import { Product } from '@/types/product';
import { Badge } from '@/components/ui/Badge';
import { DataTableColumnHeader } from '@/components/ui/DataTableColumnHeader';

import { DataTableRowActions } from './DataTableRowActions';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="상품명" />,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="가격" />,
    cell: ({ row }) => {
      const price = parseInt(row.getValue('price'));
      const formatted = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="상태" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as string;

      return (
        <Badge variant={status === 'active' ? 'default' : status === 'pending' ? 'secondary' : 'destructive'}>
          {status === 'active' ? '활성' : status === 'pending' ? '대기' : '비활성'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
```

### 페이지 구현 (AI 생성)

```tsx
// page.tsx
import { DataTable } from '@/components/common/dataTable/DataTable';
import { SkeletonTable } from '@/components/common/dataTable/SkeletonTable';
import { useProducts } from '@/hooks/useProducts';

import { columns } from './columns';

export default function ProductListPage() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={products || []} />
    </div>
  );
}
```

## 🔗 TanStack Query 통합

DataTable은 TanStack Query와 원활하게 통합되어 있습니다:

### 데이터 페칭 패턴

```tsx
// hooks/useProducts.ts (AI가 자동 생성)
import { productService } from '@/services/product/product';
import { useQuery } from '@tanstack/react-query';

export const useProducts = (params?: { page?: number; search?: string; status?: string }) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5분
  });
};
```

### 뮤테이션 예시

```tsx
// DataTableRowActions.tsx에서 사용
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: '상품이 삭제되었습니다.' });
    },
  });
};
```

## 🎨 Tailwind CSS 스타일링

Project Rules에 정의된 스타일링 패턴이 자동으로 적용됩니다:

### 클래스 순서 (자동 적용)

1. 레이아웃 (flex, grid)
2. 위치 (relative, absolute)
3. 크기 (w-, h-)
4. 간격 (m-, p-)
5. 타이포그래피 (text-, font-)
6. 색상 (bg-, text-, border-)
7. 기타 스타일 (rounded-, shadow-)
8. 반응형 (sm:, md:, lg:)
9. 상태 (hover:, focus:)

### 컴포넌트별 스타일링

```tsx
// 테이블 셀 스타일링 예시
<div className="flex items-center justify-between p-4 text-sm bg-white border rounded-lg shadow-sm hover:shadow-md">
```

## 📝 AI 활용 가이드

### 컬럼 추가/수정

```
products 테이블에 카테고리 컬럼을 추가해줘.
카테고리는 뱃지로 표시하고, 각 카테고리별로 다른 색상을 사용해줘.
```

### 액션 버튼 추가

```
DataTableRowActions에 복제 기능을 추가해줘.
복제 버튼을 클릭하면 해당 상품을 복사하는 뮤테이션을 실행해줘.
```

### 필터링 기능

```
상품 테이블에 상태별 필터링 기능을 추가해줘.
드롭다운으로 전체/활성/대기/비활성을 선택할 수 있게 해줘.
```

## 🧪 테스트 & Storybook

Project Rules의 테스팅 가이드라인에 따라 테스트와 Storybook 스토리를 생성할 수 있습니다:

### AI 활용 예시

```
ProductList DataTable의 Vitest 테스트와 Storybook 스토리를 만들어줘.
다양한 상태의 mock 데이터를 포함해줘.
```

## 📚 관련 문서

- [Cursor Project Rules - UI Components](../../../.cursor/rules/ui-components.mdc): shadcn/ui 및 스타일링 패턴
- [Cursor Project Rules - API Services](../../../.cursor/rules/api-services.mdc): TanStack Query 패턴
- [Cursor Project Rules - Testing](../../../.cursor/rules/testing-storybook.mdc): 테스트 및 Storybook 패턴
- [프로젝트 README](../../../README.md): 전체 기술 스택 개요
- [AI 개발 가이드](../../../AI.md): Cursor AI 활용법
