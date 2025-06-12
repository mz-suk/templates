'use client';

import { useEffect, useState, useTransition } from 'react';
import { loginAction } from '@/app/(public)/(auth)/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginFormValues, loginSchema } from '@/lib/schema/auth';

const LoginForm = () => {
  // 1. 서버 액션 처리 상태 관리를 위한 useTransition
  const [isPending, startTransition] = useTransition();
  // 2. 서버로부터 받은 에러 메시지 상태
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: '',
      password: '',
      saveId: false,
    },
  });

  // 3. 컴포넌트 마운트 시 localStorage에서 저장된 아이디 불러오기
  useEffect(() => {
    const savedId = localStorage.getItem('savedId');
    if (savedId) {
      form.setValue('userName', savedId);
      form.setValue('saveId', true);
    }
  }, [form]);

  const [showPassword, setShowPassword] = useState(false);

  // 4. 폼 제출 시 실행될 함수
  const onSubmit = (data: LoginFormValues) => {
    setErrorMessage(null); // 이전 에러 메시지 초기화

    // 아이디 저장 로직 처리
    if (data.saveId) {
      localStorage.setItem('savedId', data.userName);
    } else {
      localStorage.removeItem('savedId');
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('userName', data.userName);
    formData.append('password', data.password);

    // 5. 서버 액션 실행 (startTransition으로 래핑)
    startTransition(async () => {
      const result = await loginAction(null, formData);
      if (!result.success) {
        setErrorMessage(result.message);
      }
      // 성공 시에는 loginAction 내부에서 redirect 되므로 별도 처리 불필요
    });
  };

  return (
    <div className="flex min-h-[100%] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-[var(--color-white)] p-10 shadow-md">
        <h1 className="mb-3 text-3xl font-bold text-[var(--color-gray-900)]">Back Office 로그인</h1>
        <p className="mb-8 text-sm text-[var(--color-gray-600)]">관리자 계정으로 로그인하세요.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 아이디 */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-[var(--color-gray-700)]">아이디</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="아이디를 입력해 주세요."
                      className="rounded-md border border-[var(--color-gray-300)] bg-[var(--color-gray-50)] px-4 py-3 shadow-sm transition focus:ring-2 focus:ring-[var(--color-gray-500)] focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-red-500" />
                </FormItem>
              )}
            />

            {/* 비밀번호 */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-[var(--color-gray-700)]">비밀번호</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호를 입력해 주세요."
                        className="rounded-md border border-[var(--color-gray-300)] bg-[var(--color-gray-50)] px-4 py-3 pr-10 shadow-sm transition focus:ring-2 focus:ring-[var(--color-gray-500)] focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)]"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="비밀번호 보기 토글"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <FormMessage className="mt-1 text-red-500" />
                </FormItem>
              )}
            />

            {/* 아이디 저장 */}
            <FormField
              control={form.control}
              name="saveId"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      id="saveId"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                    />
                  </FormControl>
                  <FormLabel htmlFor="saveId" className="text-sm font-normal text-[var(--color-gray-700)]">
                    아이디 저장
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* 6. 서버 에러 메시지 표시 */}
            {errorMessage && <p className="text-sm font-medium text-red-500">{errorMessage}</p>}

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-lg bg-[var(--color-button-bg)] font-semibold text-black transition-all hover:bg-[var(--color-button-hover-bg)]"
              disabled={isPending} // 7. 처리 중일 때 버튼 비활성화
            >
              {isPending ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </Form>

        {/* 비밀번호 재설정 링크 */}
        <p className="mt-6 text-center text-sm text-[var(--color-gray-600)]">
          비밀번호를 잊으셨나요?{' '}
          <a href="#" className="text-[var(--color-gray-700)] underline transition hover:text-[var(--color-gray-900)]">
            재설정하기
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
