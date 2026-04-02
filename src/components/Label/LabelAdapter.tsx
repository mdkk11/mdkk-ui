import { cva } from 'cva';
import React from 'react';
import { cn } from '@/design-system/utils';
import { LabelPrimitive, type LabelPrimitiveProps } from './LabelPrimitive';

const labelStyles = cva({
  base: 'text-sm font-bold uppercase tracking-brutal-label text-foreground',
});

export interface LabelAdapterProps extends LabelPrimitiveProps {}

export const LabelAdapter = React.forwardRef<
  HTMLLabelElement,
  LabelAdapterProps
>(({ className, ...props }, ref) => {
  return (
    <LabelPrimitive
      {...props}
      ref={ref}
      className={cn(labelStyles(), className)}
    />
  );
});
LabelAdapter.displayName = 'LabelAdapter';
