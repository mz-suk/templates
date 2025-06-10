// src/components/common/Table/TableDataCell.tsx

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TableDataCellProps {
  /** 데이터 셀에 표시될 내용 (Input, Select 등 다양한 컴포넌트 포함 가능) */
  children: ReactNode;
  /** 추가적인 스타일을 위한 className */
  className?: string;
  /** 셀이 병합할 컬럼의 수 */
  colSpan?: number;
}

/**
 * 테이블의 데이터 셀(td) 컴포넌트입니다.
 */
export const TableDataCell = ({
  children,
  className,
  colSpan,
}: TableDataCellProps) => {
  return (
    <td
      className={cn("p-3 align-top border-l border-gray-200", className)}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};
