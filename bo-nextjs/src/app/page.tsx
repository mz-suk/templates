import Link from 'next/link';
import { ArrowRight, Code, Palette, Shield, Users, Zap } from 'lucide-react';

import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const features = [
  {
    icon: Code,
    title: 'TypeScript 우선',
    description: '타입 안전성과 개발자 경험을 위한 완전한 TypeScript 지원',
  },
  {
    icon: Palette,
    title: 'Tailwind CSS 4.1',
    description: '최신 Tailwind CSS로 빠르고 일관된 스타일링',
  },
  {
    icon: Zap,
    title: '성능 최적화',
    description: 'Next.js 15의 최신 기능과 최적화된 번들링',
  },
  {
    icon: Shield,
    title: '타입 안전한 API',
    description: 'Zod 스키마와 TanStack Query로 안전한 데이터 페칭',
  },
  {
    icon: Users,
    title: '팀 개발 최적화',
    description: 'ESLint, Prettier, Husky로 일관된 코드 품질 관리',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Next.js 보일러플레이트</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Next.js 15, React 19, TypeScript, Tailwind CSS 4.1로 구성된 현대적이고 확장 가능한 웹
            애플리케이션 템플릿
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                시작하기 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/your-org/nextjs-boilerplate" target="_blank">
                GitHub에서 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">주요 기능</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            현대적인 웹 개발을 위한 모든 도구와 설정이 포함되어 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <feature.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">기술 스택</h2>
          <p className="text-muted-foreground">검증된 최신 기술들로 구성된 강력한 개발 환경</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            'Next.js 15',
            'React 19',
            'TypeScript',
            'Tailwind CSS 4.1',
            'Zustand',
            'TanStack Query',
            'Radix UI',
            'Vitest',
          ].map((tech) => (
            <div key={tech} className="p-4 rounded-lg border bg-card">
              <p className="font-medium">{tech}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle className="text-2xl">지금 시작해보세요</CardTitle>
            <CardDescription>
              몇 분 안에 프로덕션 준비가 완료된 애플리케이션을 만들어보세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 justify-center flex-col sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/dashboard">대시보드 보기</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/components">컴포넌트 예시</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
