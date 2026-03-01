import { cva, type VariantProps } from 'cva';
import React from 'react';
import { cn } from '@/design-system/utils';
import { BadgePrimitive, type BadgePrimitiveProps } from './BadgePrimitive';

export const badgeVariants = cva({
  base: 'inline-flex items-center border-2 font-mono transition-colors',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground border-primary',
      secondary: 'bg-secondary text-secondary-foreground border-transparent',
      accent: 'bg-accent text-accent-foreground border-accent',
      destructive: 'bg-transparent text-destructive border-destructive',
      outline: 'bg-outline text-outline-foreground border-outline-border',
    },
    size: {
      sm: 'px-1.5 py-0.5 text-[10px] leading-tight',
      md: 'px-2 py-0.5 text-xs leading-tight',
      lg: 'px-2.5 py-1 text-sm leading-tight',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;

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
