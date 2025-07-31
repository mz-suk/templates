import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import LoginForm from '@/components/page/auth/LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Page/Auth/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: {
        loginSuccess: http.post('/api/auth', () => {
          return HttpResponse.json({ success: true, message: '로그인 성공!' });
        }),
        loginFailure: http.post('/api/auth', () => {
          return HttpResponse.json(
            { success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' },
            { status: 401 }
          );
        }),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  name: '기본 상태 (Default)',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Back Office 로그인' })).toBeInTheDocument();
    await expect(canvas.getByLabelText('아이디')).toBeInTheDocument();
    await expect(canvas.getByLabelText('비밀번호')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: '로그인' })).toBeDisabled();
  },
};

export const LoginSuccess: Story = {
  name: '로그인 성공 시나리오',
  parameters: {
    msw: {
      handlers: {
        login: http.post('/api/auth', () => {
          return HttpResponse.json({ success: true, message: '로그인 성공!' });
        }),
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const idInput = canvas.getByLabelText('아이디');
    const passwordInput = canvas.getByLabelText('비밀번호');
    const loginButton = canvas.getByRole('button', { name: '로그인' });

    await userEvent.type(idInput, 'admin');
    await userEvent.type(passwordInput, 'password123');
    
    await expect(loginButton).toBeEnabled();
    await userEvent.click(loginButton);

    await expect(canvas.getByRole('button', { name: '로그인 중...' })).toBeInTheDocument();
    // 실제로는 페이지 이동이 발생하지만, Storybook에서는 액션의 성공/실패 여부만 확인합니다.
  },
};

export const LoginFailure: Story = {
  name: '로그인 실패 시나리오',
  parameters: {
    msw: {
      handlers: {
        login: http.post('/api/auth', () => {
          return HttpResponse.json(
            { success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' },
            { status: 401 }
          );
        }),
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const idInput = canvas.getByLabelText('아이디');
    const passwordInput = canvas.getByLabelText('비밀번호');
    const loginButton = canvas.getByRole('button', { name: '로그인' });

    await userEvent.type(idInput, 'wrong-user');
    await userEvent.type(passwordInput, 'wrong-pass');
    
    await userEvent.click(loginButton);

    await expect(canvas.getByRole('button', { name: '로그인 중...' })).toBeInTheDocument();
    
    // 에러 메시지가 나타나는지 확인
    await expect(
      await canvas.findByText('아이디 또는 비밀번호가 올바르지 않습니다.')
    ).toBeInTheDocument();
    
    // 로그인 버튼이 다시 활성화되는지 확인
    await expect(canvas.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  },
};
