import { cva } from 'cva';
import React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import { InputPrimitive, type InputPrimitiveProps } from './InputPrimitive';

const inputStyles = cva({
  base: [
    'w-full bg-background p-3 text-base text-foreground',
    'rounded-none',
    'border-2 border-border',
    'outline-none',
    'placeholder:text-muted-foreground',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus:outline-2 focus:outline-offset-2 focus:outline-ring',
  ],
  variants: {
    isInvalid: {
      true: 'border-destructive bg-destructive/5 focus:outline-destructive',
    },
  },
});

export interface InputAdapterProps extends InputPrimitiveProps {
  isInvalid?: boolean;
}

export const InputAdapter = React.forwardRef<
  HTMLInputElement,
  InputAdapterProps
>(({ className, isInvalid, ...props }, ref) => {
  return (
    <InputPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        cn(inputStyles({ ...renderProps, className, isInvalid })),
      )}
    />
  );
});
InputAdapter.displayName = 'InputAdapter';
