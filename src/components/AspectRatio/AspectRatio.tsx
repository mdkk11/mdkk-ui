import React from 'react';
import { AspectRatioAdapter } from './AspectRatioAdapter';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

/**
 * Displays content within a desired aspect ratio.
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ UNSAFE_rootProps, ...props }, ref) => {
    return (
      <AspectRatioAdapter
        ref={ref}
        {...UNSAFE_rootProps}
        {...(props as Record<string, unknown>)}
      />
    );
  },
);

AspectRatio.displayName = 'AspectRatio';
