'use client';

import React from 'react';

import { Button } from '@/components/ui/Button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  resetError: () => void;
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-destructive">오류가 발생했습니다</h1>
          <p className="mt-2 text-muted-foreground">
            예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-4 rounded-md border p-4 text-left">
            <summary className="cursor-pointer font-medium">오류 상세 정보</summary>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button onClick={resetError} variant="default">
            다시 시도
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline">
            페이지 새로고침
          </Button>
        </div>
      </div>
    </div>
  );
}
