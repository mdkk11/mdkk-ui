import React from 'react';

export interface AspectRatioPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The aspect ratio of the container.
   * Default is 1 (square).
   */
  ratio?: number;
}

export const AspectRatioPrimitive = React.forwardRef<
  HTMLDivElement,
  AspectRatioPrimitiveProps
>(({ ratio = 1, style, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        aspectRatio: ratio,
        ...style,
      }}
      className={className}
      {...props}
    />
  );
});

AspectRatioPrimitive.displayName = 'AspectRatioPrimitive';
