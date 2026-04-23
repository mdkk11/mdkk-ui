import * as React from 'react';
import { iconRegistry } from './generated';
import type { IconName } from './Icon.types';

export interface IconPrimitiveProps extends React.SVGProps<SVGSVGElement> {
  type: IconName;
}

export const IconPrimitive = React.forwardRef<
  SVGSVGElement,
  IconPrimitiveProps
>(({ type, ...props }, ref) => {
  const IconComponent = iconRegistry[type];
  return <IconComponent ref={ref} {...props} />;
});
IconPrimitive.displayName = 'IconPrimitive';
