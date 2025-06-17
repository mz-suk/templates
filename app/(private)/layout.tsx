import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppSidebar } from '@/components/common/sidebar/AppSidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';
import { Separator } from '@/components/ui/Separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';

// 이 레이아웃에 접근하기 전에 인증 상태를 확인하는 로직을 추가할 수 있습니다.
async function checkAuth() {
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get('accessToken')?.value;
  if (!authToken) {
    redirect('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
  }
}

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await checkAuth(); // 인증 확인

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* 공통 헤더 */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* 각 페이지 컨텐츠 */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
