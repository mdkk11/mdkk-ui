'use client';

import type React from 'react';
import { cn } from '@/design-system/utils';

interface StoryListProps {
  children: React.ReactNode;
  className?: string;
}

export const StoryList = ({ children, className }: StoryListProps) => {
  return (
    <div
      className={cn(
        'grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4',
        className,
      )}
    >
      {children}
    </div>
  );
};
