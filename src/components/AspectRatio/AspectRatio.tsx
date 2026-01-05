import React from 'react';
import {
  AspectRatioAdapter,
  type AspectRatioAdapterProps,
} from './AspectRatioAdapter';

export interface AspectRatioProps extends AspectRatioAdapterProps {}

/**
 * Displays content within a desired aspect ratio.
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  (props, ref) => {
    return <AspectRatioAdapter ref={ref} {...props} />;
  },
);

AspectRatio.displayName = 'AspectRatio';
