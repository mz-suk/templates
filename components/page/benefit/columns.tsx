'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { CouponData } from '@/types/benefit';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

export const columns: ColumnDef<CouponData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'couponId',
    header: '쿠폰번호',
    cell: ({ row }) => <Link href={`/benefits/detail/${row.original.couponId}`}>{row.original.couponId}</Link>,
  },
  {
    accessorKey: 'couponNameKo',
    header: '쿠폰명',
    cell: ({ row }) => <Link href={`/benefits/detail/${row.original.couponId}`}>{row.original.couponNameKo}</Link>,
  },
  { accessorKey: 'couponTypeName', header: '쿠폰유형' },
  { accessorKey: 'issuanceTypeName', header: '발급유형' },
  { accessorKey: 'discountApplicationTypeName', header: '적용유형' },
  {
    accessorKey: 'channel',
    header: '사용채널',
    cell: ({ row }) => {
      const channels = [];
      if (row.original.smartDutyFreeAppUseYn === 'Y') channels.push('스마트면세 앱');
      if (row.original.offlineStoreUseYn === 'Y') channels.push('오프라인 매장');
      return channels.join(', ');
    },
  },
  { accessorKey: 'membershipBenefitTypeName', header: '혜택유형' },
  {
    accessorKey: 'displayYn',
    header: '자산노출여부',
    cell: ({ row }) => (row.original.displayYn === 'Y' ? '노출' : '노출안함'),
  },
  {
    accessorKey: 'issuancePeriod',
    header: '발급기간',
    cell: ({ row }) => `${row.original.issuanceStart} ~ ${row.original.issuanceEnd}`,
  },
  {
    accessorKey: 'usagePeriod',
    header: '사용기간',
    cell: ({ row }) => {
      switch (row.original.usagePeriodCode) {
        case '10':
          return `${row.original.issuanceStart} ~ ${row.original.issuanceEnd}`;
        case '20':
          return `발급 후 ${row.original.validityPeriodDays}일 이내`;
        case '30':
          return row.original.usagePeriodCodeName;
        default:
          return '-';
      }
    },
  },
  {
    accessorKey: 'issueStatus',
    header: '쿠폰발행상태',
    cell: ({ row }) => (row.original.issueStatus === 'Y' ? '발행완료' : '발행전'),
  },
  { accessorKey: 'issueDate', header: '쿠폰발행일시' },
  {
    accessorKey: 'forceTerminateYn',
    header: '강제종료여부',
    cell: ({ row }) => (row.original.forceTerminateYn === 'Y' ? '강제종료' : '정상'),
  },
  { accessorKey: 'forceTerminateDt', header: '강제종료일시' },
  {
    accessorKey: 'issuanceHistory',
    header: '발급내역',
    cell: ({ row }) => <Link href={`/benefits/publish?couponId=${row.original.couponId}`}>보기</Link>,
  },
  {
    accessorKey: 'couponStatus',
    header: '쿠폰현황',
    cell: ({ row }) => (
      <Button variant="link" onClick={() => console.log('Open modal for', row.original.couponId)}>
        보기
      </Button>
    ),
  },
  { accessorKey: 'regUser', header: '등록자' },
  { accessorKey: 'regDate', header: '등록일' },
  { accessorKey: 'updUser', header: '수정자' },
  { accessorKey: 'updDate', header: '수정일' },
];
