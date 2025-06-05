import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const loadingVariants = cva('animate-spin rounded-full border-2 border-current', {
  variants: {
    size: {
      sm: 'h-4 w-4 border-[1px]',
      md: 'h-6 w-6',
      lg: 'h-8 w-8 border-[3px]',
      xl: 'h-12 w-12 border-[3px]',
    },
    variant: {
      default: 'border-primary border-t-transparent',
      secondary: 'border-secondary border-t-transparent',
      muted: 'border-muted-foreground border-t-transparent',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

interface LoadingProps extends VariantProps<typeof loadingVariants> {
  className?: string;
}

export function Loading({ size, variant, className }: LoadingProps) {
  return <div className={cn(loadingVariants({ size, variant }), className)} />;
}

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

export function LoadingScreen({ message = '로딩 중...', className }: LoadingScreenProps) {
  return (
    <div className={cn('flex min-h-screen flex-col items-center justify-center p-4', className)}>
      <Loading size="xl" />
      <p className="text-muted-foreground mt-4">{message}</p>
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return <Loading size={size} className={className} />;
}
