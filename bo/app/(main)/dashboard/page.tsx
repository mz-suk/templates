"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/common/data-table/data-table";
import { ColumnDef, SortingState, OnChangeFn } from "@tanstack/react-table";
import SkeletonTable from "@/components/common/data-table/skeleton-table";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const columns: ColumnDef<Post>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "title", header: "제목" },
  { accessorKey: "body", header: "내용" },
  { accessorKey: "userId", header: "사용자 ID" },
];

const LIMIT = 10;
const TOTAL_COUNT = 200;

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);

  // 정렬 파라미터 변환 함수
  const getSortParams = () => {
    if (sorting.length === 0) return "";
    const sort = sorting[0];
    const order = sort.desc ? "desc" : "asc";
    return `&_sort=${sort.id}&_order=${order}`;
  };

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    const newSorting =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting)
        : updaterOrValue;
    setSorting(newSorting);
  };

  const { data, isLoading, isError, isFetching } = useQuery<Post[]>({
    queryKey: ["posts", currentPage, sorting],
    queryFn: async () => {
      const sortParams = getSortParams();
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${LIMIT}${sortParams}`
      );
      return res.json();
    },
    placeholderData: (prev) => prev,
  });

  if (isError) return <div>데이터 로딩 오류</div>;
  const showSkeleton = isLoading || (!data && isFetching);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">게시물 목록</h1>
      {showSkeleton ? (
        <SkeletonTable />
      ) : (
        <DataTable
          columns={columns}
          data={data ?? []}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalCount={TOTAL_COUNT}
          pageSize={LIMIT}
          sorting={sorting}
          onSortingChange={handleSortingChange}
          showGlobalFilter
          showPagination
          isLoading={isLoading || isFetching}
        />
      )}
    </div>
  );
}
