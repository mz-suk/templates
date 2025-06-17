// app/(public)/layout.tsx

// 이 레이아웃은 로그인, 회원가입 등 사이드바가 필요 없는 페이지에 적용됩니다.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    // 로그인 폼이 중앙에 오도록 스타일링 등을 적용할 수 있습니다.
    <div className="flex min-h-screen items-center justify-center bg-gray-50">{children}</div>
  );
}
