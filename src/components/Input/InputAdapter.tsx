import { cva } from 'cva';
import React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import { InputPrimitive, type InputPrimitiveProps } from './InputPrimitive';

const inputStyles = cva({
  base: [
    'w-full bg-white text-black p-3 text-base',
    'rounded-none',
    'border-2 border-black',
    'outline-none',
    'placeholder:text-gray-400',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus:outline-2 focus:outline-offset-2 focus:outline-black',
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
