import React from 'react';
import { cn } from '@/design-system/utils';
import {
  AspectRatioPrimitive,
  type AspectRatioPrimitiveProps,
} from './AspectRatioPrimitive';

export interface AspectRatioAdapterProps extends AspectRatioPrimitiveProps {}

export const AspectRatioAdapter = React.forwardRef<
  HTMLDivElement,
  AspectRatioAdapterProps
>(({ className, children, ...props }, ref) => {
  return (
    <AspectRatioPrimitive
      ref={ref}
      className={cn('relative w-full', className)}
      {...props}
    >
      <div className='absolute inset-0'>{children}</div>
    </AspectRatioPrimitive>
  );
});

AspectRatioAdapter.displayName = 'AspectRatioAdapter';
