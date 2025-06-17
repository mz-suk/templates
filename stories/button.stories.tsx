// components/ui/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/components/ui/Button';

const meta: Meta<typeof Button> = {
  title: 'shadcn/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '기본 버튼',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성 버튼',
    disabled: true,
  },
};
