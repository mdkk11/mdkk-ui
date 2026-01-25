import { cva } from 'cva';
// import { composeRenderProps } from 'react-aria-components'; // Removed unused import
import { cn } from '@/design-system/utils';
import { LabelPrimitive, type LabelPrimitiveProps } from './LabelPrimitive';

const labelStyles = cva({
  base: 'font-bold text-sm uppercase tracking-wider text-black',
});

export interface LabelAdapterProps extends LabelPrimitiveProps {}

import React from 'react';

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
