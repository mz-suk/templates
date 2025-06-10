"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { LoginFormValues, loginSchema } from "@/lib/schema/auth";

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
      saveId: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form Submitted:", data);
    // localStorage.setItem("savedId", data.saveId ? data.userName : "");
  };

  return (
    <div className="min-h-[100%] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[var(--color-white)] p-10 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold text-[var(--color-gray-900)] mb-3">
          Back Office 로그인
        </h1>
        <p className="text-[var(--color-gray-600)] mb-8 text-sm">
          관리자 계정으로 로그인하세요.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 아이디 */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--color-gray-700)] font-medium">
                    아이디
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="아이디를 입력해 주세요."
                      className="bg-[var(--color-gray-50)] border border-[var(--color-gray-300)] rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gray-500)] transition"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />

            {/* 비밀번호 */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--color-gray-700)] font-medium">
                    비밀번호
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력해 주세요."
                        className="bg-[var(--color-gray-50)] border border-[var(--color-gray-300)] rounded-md px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gray-500)] transition"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)]"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="비밀번호 보기 토글"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage className="text-red-500 mt-1" />
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
                  <FormLabel
                    htmlFor="saveId"
                    className="text-sm font-normal text-[var(--color-gray-700)]"
                  >
                    아이디 저장
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-[var(--color-button-bg)] hover:bg-[var(--color-button-hover-bg)] text-black font-semibold rounded-lg transition-all"
            >
              로그인
            </Button>
          </form>
        </Form>

        {/* 비밀번호 재설정 링크 */}
        <p className="text-center text-[var(--color-gray-600)] mt-6 text-sm">
          비밀번호를 잊으셨나요?{" "}
          <a
            href="#"
            className="text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)] underline transition"
          >
            재설정하기
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
