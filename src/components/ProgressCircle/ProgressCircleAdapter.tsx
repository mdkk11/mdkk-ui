import type { VariantProps } from 'cva';
import React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { progressCircleVariants } from '../../design-system/progressCircleStyles';
import { cn } from '../../design-system/utils';
import {
  ProgressCirclePrimitive,
  type ProgressCirclePrimitiveProps,
} from './ProgressCirclePrimitive';

export interface ProgressCircleAdapterProps
  extends ProgressCirclePrimitiveProps,
    VariantProps<typeof progressCircleVariants> {}

export const ProgressCircleAdapter = React.forwardRef<
  HTMLDivElement,
  ProgressCircleAdapterProps
>(({ className, size, ...props }, ref) => {
  const strokeWidth = 4; // Constant stroke width for simplicity, could vary by size if needed
  const radius = `calc(50% - ${strokeWidth / 2}px)`;

  return (
    <ProgressCirclePrimitive
      ref={ref}
      className={composeRenderProps(className, (className) =>
        cn(progressCircleVariants({ size, className })),
      )}
      {...props}
    >
      {({ percentage, isIndeterminate }) => (
        <svg fill='none' width='100%' height='100%' viewBox='0 0 32 32'>
          <title>circle-progress</title>
          <circle
            cx='50%'
            cy='50%'
            r={radius}
            stroke='currentColor'
            strokeOpacity='0.25'
            strokeWidth={strokeWidth}
          />
          <circle
            cx='50%'
            cy='50%'
            r={radius}
            stroke='currentColor'
            strokeWidth={strokeWidth}
            pathLength='100'
            strokeDasharray='100 200'
            strokeDashoffset={
              100 - (isIndeterminate || percentage == null ? 25 : percentage)
            }
            strokeLinecap='round'
            style={{
              rotate: '-90deg',
              transformOrigin: 'center center',
            }}
          >
            {isIndeterminate && (
              <animateTransform
                attributeName='transform'
                type='rotate'
                dur='0.75s'
                values='0;360'
                repeatCount='indefinite'
              />
            )}
          </circle>
        </svg>
      )}
    </ProgressCirclePrimitive>
  );
});
ProgressCircleAdapter.displayName = 'ProgressCircleAdapter';
