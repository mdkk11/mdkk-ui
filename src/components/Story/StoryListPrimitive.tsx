import type React from 'react';
import { cn } from '@/design-system/utils';

interface StoryListPrimitiveProps {
  children: React.ReactNode;
  className?: string;
}

export const StoryListPrimitive = ({
  children,
  className,
}: StoryListPrimitiveProps) => {
  return (
    <div
      className={cn(
        'grid w-full gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        className,
      )}
    >
      {children}
    </div>
  );
};
