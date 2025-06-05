'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/stores/useAppStore';

export default function Header() {
  const { sidebarCollapsed, toggleSidebar, user, isAuthenticated } = useAppStore();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Next.js Boilerplate</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link href="/dashboard" className="hover:text-foreground/80 text-foreground/60 transition-colors">
              Dashboard
            </Link>
            <Link href="/components" className="hover:text-foreground/80 text-foreground/60 transition-colors">
              Components
            </Link>
            <Link href="/examples" className="hover:text-foreground/80 text-foreground/60 transition-colors">
              Examples
            </Link>
          </nav>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={toggleSidebar}
        >
          {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">{/* 검색 컴포넌트가 들어갈 자리 */}</div>
          <nav className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">안녕하세요, {user?.name}님</span>
                <Button variant="outline" size="sm">
                  로그아웃
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">로그인</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">회원가입</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
