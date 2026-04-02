import React from 'react';
import { cn } from '@/design-system/utils';
import { BadgePrimitive, type BadgePrimitiveProps } from './BadgePrimitive';
import { type BadgeVariants, badgeVariants } from './badgeStyles';

export interface BadgeAdapterProps extends BadgePrimitiveProps, BadgeVariants {}

export const BadgeAdapter = React.forwardRef<
  HTMLSpanElement,
  BadgeAdapterProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <BadgePrimitive
      ref={ref}
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
});
BadgeAdapter.displayName = 'BadgeAdapter';
