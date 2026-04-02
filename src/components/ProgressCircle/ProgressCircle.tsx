import type { VariantProps } from 'cva';
import React from 'react';
import { ProgressCircleAdapter } from './ProgressCircleAdapter';
import type { progressCircleVariants } from './ProgressCircleAdapter';

export interface ProgressCircleProps
  extends React.ComponentProps<typeof ProgressCircleAdapter>,
    VariantProps<typeof progressCircleVariants> {}

/**
 * ProgressCircle component
 */
export const ProgressCircle = React.forwardRef<
  HTMLDivElement,
  ProgressCircleProps
>((props, ref) => {
  return <ProgressCircleAdapter ref={ref} {...props} />;
});
ProgressCircle.displayName = 'ProgressCircle';
