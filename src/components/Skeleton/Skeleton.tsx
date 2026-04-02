import * as React from 'react';
import { SkeletonAdapter, type SkeletonAdapterProps } from './SkeletonAdapter';

export interface SkeletonProps extends SkeletonAdapterProps {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => <SkeletonAdapter {...props} ref={ref} />,
);
Skeleton.displayName = 'Skeleton';
