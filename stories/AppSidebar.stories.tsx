import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebar } from '@/components/common/sidebar/AppSidebar';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const meta: Meta<typeof AppSidebar> = {
  title: 'Common/AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen', // 전체 화면 레이아웃을 사용하여 사이드바를 제대로 표시합니다.
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/dashboard', // 기본 경로를 설정합니다.
      },
    },
  },
  decorators: [
    (Story, context) => {
      const pathname = usePathname();
      useEffect(() => {
        // Storybook의 args가 변경될 때마다 next/navigation의 pathname을 업데이트합니다.
        // 이는 context.args.pathname을 통해 제어됩니다.
      }, [context.args.pathname]);

      return (
        <div style={{ height: '100vh' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  name: '기본 상태 (Default)',
  args: {},
};

export const Collapsed: Story = {
  name: '접힌 상태 (Collapsed)',
  args: {
    defaultCollapsible: 'icon',
  },
};

export const ActivePath: Story = {
  name: '특정 경로 활성화 (Active Path)',
  args: {},
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/products/list',
      },
    },
  },
};
