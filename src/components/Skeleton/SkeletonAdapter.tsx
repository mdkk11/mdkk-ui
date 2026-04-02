import { cva, type VariantProps } from 'cva';
import * as React from 'react';
import { cn } from '@/design-system/utils';
import {
  SkeletonPrimitive,
  type SkeletonPrimitiveProps,
} from './SkeletonPrimitive';

const skeletonVariants = cva({
  base: 'block bg-muted',
  variants: {
    shape: {
      line: 'h-4 w-full',
      circle: 'size-10 rounded-full',
      rectangle: 'h-24 w-full',
    },
    isAnimated: {
      true: 'animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    shape: 'line',
    isAnimated: true,
  },
});

export interface SkeletonAdapterProps
  extends Omit<SkeletonPrimitiveProps, 'children'>,
    VariantProps<typeof skeletonVariants> {
  children?: React.ReactNode;
}

export const SkeletonAdapter = React.forwardRef<
  HTMLDivElement,
  SkeletonAdapterProps
>(({ className, shape, isAnimated, children, ...props }, ref) => (
  <SkeletonPrimitive
    ref={ref}
    aria-hidden='true'
    className={cn(skeletonVariants({ shape, isAnimated }), className)}
    {...props}
  >
    {children}
  </SkeletonPrimitive>
));
SkeletonAdapter.displayName = 'SkeletonAdapter';
