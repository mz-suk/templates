"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// shadcn/ui 컴포넌트
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  TableContainer,
  TableDataCell,
  TableHeaderCell,
  TableRow,
} from "@/components/common/table";
import Link from "next/link";

// Zod 스키마 (위에서 정의)
const formSchema = z.object({
  category1: z.string(),
  category2: z.string(),
  showRecommended: z.object({
    all: z.boolean(),
    exhibited: z.boolean(),
    notExhibited: z.boolean(),
  }),
  showLuxury: z.object({
    all: z.boolean(),
    exhibited: z.boolean(),
    notExhibited: z.boolean(),
  }),
  dateType: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  searchType: z.string(),
  searchKeyword: z.string().max(50).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductList() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category1: "all",
      category2: "all",
      showRecommended: { all: true, exhibited: true, notExhibited: true },
      showLuxury: { all: true, exhibited: true, notExhibited: false },
      dateType: "regDate",
      startDate: "2025-06-03",
      endDate: "2025-06-10",
      searchType: "none",
      searchKeyword: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data);
    // TODO: API 호출 등 데이터 처리 로직 구현
  }

  const colWidths = [
    "w-40",
    "w-[calc(50%-8rem)]",
    "w-40",
    "w-[calc(50%-8rem)]",
  ];

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <TableContainer colWidths={colWidths}>
            {/* 품목 */}
            <TableRow>
              <TableHeaderCell>품목</TableHeaderCell>
              <TableDataCell className="border-l-0">
                <FormField
                  control={form.control}
                  name="category1"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="전체" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">전체</SelectItem>
                          <SelectItem value="clothes">의류</SelectItem>
                          <SelectItem value="electronics">전자제품</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableDataCell>
              <TableHeaderCell>품목</TableHeaderCell>
              <TableDataCell>
                <FormField
                  control={form.control}
                  name="category1"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="전체" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">전체</SelectItem>
                          <SelectItem value="clothes">의류</SelectItem>
                          <SelectItem value="electronics">전자제품</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableDataCell>
            </TableRow>

            {/* 추천 브랜드 전시 여부 */}
            <TableRow>
              <TableHeaderCell>추천 브랜드 전시 여부</TableHeaderCell>
              <TableDataCell className="border-l-0" colSpan={3}>
                <div className="flex items-center space-x-4">
                  <FormField
                    control={form.control}
                    name="showRecommended.all"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">전체</FormLabel>
                      </FormItem>
                    )}
                  />
                  {/* '전시', '비전시'도 위와 같이 FormField로 구현 */}
                </div>
              </TableDataCell>
            </TableRow>

            {/* 기간 */}
            <TableRow>
              <TableHeaderCell>기간</TableHeaderCell>
              <TableDataCell className="border-l-0" colSpan={3}>
                <div className="flex gap-2 items-center flex-wrap">
                  <FormField
                    control={form.control}
                    name="dateType"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regDate">등록일</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <Input type="date" {...field} className="w-auto" />
                    )}
                  />
                  <span>~</span>
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <Input type="date" {...field} className="w-auto" />
                    )}
                  />
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {["오늘", "7일", "1개월", "3개월", "1년"].map((label) => (
                    <Button
                      key={label}
                      type="button"
                      variant={"outline"}
                      size="sm"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </TableDataCell>
            </TableRow>

            {/* 검색어 */}
            <TableRow>
              <TableHeaderCell>검색어</TableHeaderCell>
              <TableDataCell className="border-l-0" colSpan={3}>
                <div className="flex gap-2 items-center flex-wrap">
                  <FormField
                    control={form.control}
                    name="searchType"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">사용안함</SelectItem>
                          {/* 다른 옵션 추가 */}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="searchKeyword"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="최대 50개까지 입력 가능합니다."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TableDataCell>
            </TableRow>
          </TableContainer>

          <div className="flex justify-center space-x-2">
            <Button type="button" variant="outline">
              초기화
            </Button>
            <Button type="submit">검색</Button>
          </div>
        </form>
      </Form>

      <div className="flex justify-end">
        <Button>
          <Link href="/products/create">상품 등록</Link>
        </Button>
      </div>
    </div>
  );
}
