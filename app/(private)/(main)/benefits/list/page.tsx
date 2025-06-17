'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useBenefitList } from '@/services/benefit/list';
import { OnChangeFn, SortingState } from '@tanstack/react-table';
import { getCookie } from 'cookies-next'; // 서버/클라이언트 쿠키 처리를 위한 유틸리티
import { useForm } from 'react-hook-form';

import { DataTable } from '@/components/common/data-table/DataTable';
import SkeletonTable from '@/components/common/data-table/SkeletonTable';
import { TableContainer, TableDataCell, TableHeaderCell, TableRow } from '@/components/common/table';
import { columns } from '@/components/page/benefit/Columns';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
// import { DatePicker } from '@/components/ui/date-picker';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

// 상수 정의
const COUPON_DATE_OPTIONS = [
  { value: 'regDate', label: '등록일' },
  { value: 'issuanceDate', label: '발급일' },
  { value: 'usageDate', label: '사용일' },
];

const COUPON_USE_DATE_OPTIONS = [
  { value: '10', label: '10일' },
  { value: '20', label: '20일' },
  { value: '30', label: '30일' },
];

const COUPON_CHANNEL_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'app', label: '스마트면세 앱' },
  { value: 'store', label: '오프라인 매장' },
];

const COUPON_TYPE_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'discount', label: '할인' },
  { value: 'gift', label: '사은품' },
];

const COUPON_STATUS_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'Y', label: '발행완료' },
  { value: 'N', label: '발행전' },
];

type FormValues = {
  periodType: string;
  issuanceStart: string;
  issuanceEnd: string;
  usagePeriodCode: string;
  usageStart: string;
  usageEnd: string;
  validityPeriodDays: string;
  channelType: string[];
  couponType: string;
  issuanceType: string;
  discountApplicationType: string;
  issueType: string;
  forceTerminateType: string;
  issuanceCycle: string;
  displayType: string;
  searchKeywordType: string;
  searchKeyword: string;
};

const LIMIT = 10;
const TOTAL_COUNT = 200;

export default function CouponList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [usagePeriodCode, setUsagePeriodCode] = useState('10');

  const form = useForm<FormValues>({
    defaultValues: {
      periodType: 'regDate',
      issuanceStart: '',
      issuanceEnd: '',
      usagePeriodCode: '',
      usageStart: '',
      usageEnd: '',
      validityPeriodDays: '',
      channelType: ['all'],
      couponType: 'all',
      issuanceType: 'all',
      discountApplicationType: 'all',
      issueType: 'all',
      forceTerminateType: 'all',
      issuanceCycle: 'all',
      displayType: 'all',
      searchKeywordType: 'none',
      searchKeyword: '',
    },
  });

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
    setSorting(newSorting);
  };

  const { data, isLoading, isError, isFetching } = useBenefitList({
    page: currentPage,
    limit: LIMIT,
    sorting,
  });

  function onSubmit(data: FormValues) {
    console.log('Form submitted:', data);
    // TODO: API 호출 등 데이터 처리 로직 구현
  }

  const colWidths = ['w-40', 'w-[calc(50%-8rem)]', 'w-40', 'w-[calc(50%-8rem)]'];
  console.log('getCookie', getCookie('accessToken'));
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <TableContainer colWidths={colWidths}>
            {/* 기간 */}
            <TableRow>
              <TableHeaderCell>기간</TableHeaderCell>
              <TableDataCell className="border-l-0" colSpan={3}>
                <div className="flex flex-wrap items-center gap-2">
                  <FormField
                    control={form.control}
                    name="periodType"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {COUPON_DATE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="issuanceStart"
                    render={({ field }) => <DatePicker {...field} />}
                  />
                  <span>~</span>
                  <FormField
                    control={form.control}
                    name="issuanceEnd"
                    render={({ field }) => <DatePicker {...field} />}
                  /> */}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['오늘', '7일', '1개월', '3개월', '1년'].map((label) => (
                    <Button key={label} type="button" variant="outline" size="sm">
                      {label}
                    </Button>
                  ))}
                </div>
              </TableDataCell>
            </TableRow>

            {/* 사용기간 */}
            <TableRow>
              <TableHeaderCell>사용기간</TableHeaderCell>
              <TableDataCell className="border-l-0" colSpan={3}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <FormField
                      control={form.control}
                      name="usagePeriodCode"
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setUsagePeriodCode('10');
                          }}
                          defaultValue={field.value}
                          className="flex items-center space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="" id="all" />
                            <FormLabel htmlFor="all">전체</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="20" id="period" />
                            <FormLabel htmlFor="period">기간설정</FormLabel>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>

                  {form.watch('usagePeriodCode') === '20' && (
                    <div className="flex items-center space-x-4">
                      <Select value={usagePeriodCode} onValueChange={setUsagePeriodCode}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {COUPON_USE_DATE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-center space-x-4">
                        {/* <FormField
                          control={form.control}
                          name="usageStart"
                          render={({ field }) => <DatePicker {...field} />}
                        />
                        <span>~</span>
                        <FormField
                          control={form.control}
                          name="usageEnd"
                          render={({ field }) => <DatePicker {...field} />}
                        /> */}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <FormField
                      control={form.control}
                      name="usagePeriodCode"
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setUsagePeriodCode('10');
                          }}
                          defaultValue={field.value}
                          className="flex items-center space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="30" id="issuance" />
                            <FormLabel htmlFor="issuance">발급일 기준</FormLabel>
                          </div>
                        </RadioGroup>
                      )}
                    />
                    {form.watch('usagePeriodCode') === '30' && (
                      <div className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name="validityPeriodDays"
                          render={({ field }) => <Input {...field} className="w-[100px]" />}
                        />
                        <span>일 이내</span>
                      </div>
                    )}
                  </div>
                </div>
              </TableDataCell>
            </TableRow>

            {/* 사용채널 */}
            <TableRow>
              <TableHeaderCell>사용채널</TableHeaderCell>
              <TableDataCell className="border-l-0" colSpan={3}>
                <FormField
                  control={form.control}
                  name="channelType"
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-4">
                      {COUPON_CHANNEL_OPTIONS.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value.includes(option.value)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, option.value]
                                : field.value.filter((v) => v !== option.value);
                              field.onChange(newValue);
                            }}
                          />
                          <FormLabel>{option.label}</FormLabel>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </TableDataCell>
            </TableRow>

            {/* 쿠폰 유형 */}
            <TableRow>
              <TableHeaderCell>쿠폰 유형</TableHeaderCell>
              <TableDataCell className="border-l-0" colSpan={3}>
                <FormField
                  control={form.control}
                  name="couponType"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUPON_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </TableDataCell>
            </TableRow>

            {/* 검색어 */}
            <TableRow>
              <TableHeaderCell>검색어</TableHeaderCell>
              <TableDataCell className="border-l-0" colSpan={3}>
                <div className="flex flex-wrap items-center gap-2">
                  <FormField
                    control={form.control}
                    name="searchKeywordType"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">사용안함</SelectItem>
                          <SelectItem value="couponId">쿠폰번호</SelectItem>
                          <SelectItem value="couponName">쿠폰명</SelectItem>
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
                          <Input placeholder="최대 50개까지 입력 가능합니다." {...field} />
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
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              초기화
            </Button>
            <Button type="submit">검색</Button>
          </div>
        </form>
      </Form>

      <div className="flex justify-end">
        <Button>
          <Link href="/benefits/create">쿠폰 등록</Link>
        </Button>
      </div>

      {isLoading || isFetching ? (
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
