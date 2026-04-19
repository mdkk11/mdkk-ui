import type { VariantProps } from 'cva';
import React from 'react';
import type { progressCircleVariants } from './ProgressCircleAdapter';
import { ProgressCircleAdapter } from './ProgressCircleAdapter';

export interface ProgressCircleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof progressCircleVariants> {
  value?: number;
  minValue?: number;
  maxValue?: number;
  valueLabel?: string;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
}

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
