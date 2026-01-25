import { cva } from 'cva';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import {
  FieldErrorPrimitive,
  type FieldErrorPrimitiveProps,
} from './FieldErrorPrimitive';

const errorStyles = cva({
  base: 'text-xs font-bold text-destructive',
});

export interface FieldErrorAdapterProps extends FieldErrorPrimitiveProps {}

import React from 'react';

export const FieldErrorAdapter = React.forwardRef<
  HTMLParagraphElement,
  FieldErrorAdapterProps
>(({ className, ...props }, ref) => {
  return (
    <FieldErrorPrimitive
      {...props}
      ref={ref}
      className={composeRenderProps(className, (className, renderProps) =>
        cn(errorStyles({ ...renderProps, className })),
      )}
    />
  );
});
FieldErrorAdapter.displayName = 'FieldErrorAdapter';
