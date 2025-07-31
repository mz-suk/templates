import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '@/components/common/dataTable/DataTable';
import { Columns as ProductColumns } from '@/components/page/product/Columns';
import { ProductDataTableModel } from '@/types/product';

const meta: Meta<typeof DataTable> = {
  title: 'Common/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: '테이블의 컬럼 정의입니다. `ColumnDef` 타입의 배열입니다.',
      control: false, // 복잡한 객체이므로 컨트롤을 비활성화합니다.
    },
    data: {
      description: '테이블에 표시될 데이터 배열입니다.',
    },
    currentPage: {
      description: '현재 페이지 번호입니다.',
      control: { type: 'number' },
    },
    totalCount: {
      description: '전체 아이템 개수입니다.',
      control: { type: 'number' },
    },
    pageSize: {
      description: '한 페이지에 보여줄 아이템 개수입니다.',
      control: { type: 'number' },
    },
    showGlobalFilter: {
      description: '전체 검색 필터 표시 여부입니다.',
      control: { type: 'boolean' },
    },
    showPagination: {
      description: '페이지네이션 컨트롤 표시 여부입니다.',
      control: { type: 'boolean' },
    },
    isLoading: {
      description: '데이터 로딩 상태 여부입니다.',
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<ProductDataTableModel, unknown>>;

const mockProducts: ProductDataTableModel[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `상품 제목 ${i + 1}`,
  body: `이것은 상품 ${i + 1}에 대한 상세 설명입니다. 내용은 길어질 수 있습니다.`,
  userId: (i % 5) + 1,
}));

export const Default: Story = {
  name: '기본 상태 (Default)',
  args: {
    columns: ProductColumns,
    data: mockProducts.slice(0, 10),
    currentPage: 1,
    totalCount: mockProducts.length,
    pageSize: 10,
    showGlobalFilter: true,
    showPagination: true,
    isLoading: false,
  },
};

export const Loading: Story = {
  name: '로딩 상태 (Loading)',
  args: {
    ...Default.args,
    data: [], // 로딩 중에는 데이터가 비어있을 수 있습니다.
    isLoading: true,
  },
};

export const NoData: Story = {
  name: '데이터 없음 (No Data)',
  args: {
    ...Default.args,
    data: [],
    totalCount: 0,
  },
};

export const WithoutPagination: Story = {
  name: '페이지네이션 없음',
  args: {
    ...Default.args,
    showPagination: false,
  },
};

export const WithoutGlobalFilter: Story = {
  name: '전체 검색 없음',
  args: {
    ...Default.args,
    showGlobalFilter: false,
  },
};
