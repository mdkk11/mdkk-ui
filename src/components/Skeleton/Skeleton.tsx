import * as React from 'react';
import { SkeletonAdapter } from './SkeletonAdapter';

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: React.ReactNode;
  shape?: 'line' | 'circle' | 'rectangle';
  isAnimated?: boolean;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ UNSAFE_rootProps, ...props }, ref) => (
    <SkeletonAdapter
      {...UNSAFE_rootProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
Skeleton.displayName = 'Skeleton';
