import React from 'react';

export type BadgePrimitiveProps = React.HTMLAttributes<HTMLSpanElement>;

export const BadgePrimitive = React.forwardRef<
  HTMLSpanElement,
  BadgePrimitiveProps
>(({ children, ...props }, ref) => {
  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  );
});
BadgePrimitive.displayName = 'BadgePrimitive';
