import * as React from 'react';

export type SkeletonPrimitiveProps = React.ComponentProps<'div'>;

export const SkeletonPrimitive = React.forwardRef<
  HTMLDivElement,
  SkeletonPrimitiveProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));
SkeletonPrimitive.displayName = 'SkeletonPrimitive';
