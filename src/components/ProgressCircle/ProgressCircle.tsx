import type { VariantProps } from 'cva';
import React from 'react';
import type { progressCircleVariants } from '@/design-system/progressCircleStyles';
import { ProgressCircleAdapter } from './ProgressCircleAdapter';

export interface ProgressCircleProps
  extends React.ComponentProps<typeof ProgressCircleAdapter>,
    VariantProps<typeof progressCircleVariants> {}

export const ProgressCircle = React.forwardRef<
  HTMLDivElement,
  ProgressCircleProps
>((props, ref) => {
  return <ProgressCircleAdapter ref={ref} {...props} />;
});
ProgressCircle.displayName = 'ProgressCircle';
