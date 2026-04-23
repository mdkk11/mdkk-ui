import * as React from 'react';
import type { IconProps } from './Icon.types';
import { IconAdapter } from './IconAdapter';

/**
 * Renders an icon from the design system registry.
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconAdapter {...props} ref={ref} />
));
Icon.displayName = 'Icon';

export type { IconName, IconProps, IconSize } from './Icon.types';
