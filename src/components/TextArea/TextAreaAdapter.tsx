import { cva } from 'cva';
import React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import {
  TextAreaPrimitive,
  type TextAreaPrimitiveProps,
} from './TextAreaPrimitive';

const textAreaStyles = cva({
  base: [
    'w-full bg-white text-black p-3 text-base',
    'rounded-none',
    'border-2 border-black',
    'outline-none',
    'placeholder:text-gray-400',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus:outline-2 focus:outline-offset-2 focus:outline-black',
    'min-h-[80px]', // Default min-height for textarea
  ],
  variants: {
    isInvalid: {
      true: 'border-destructive bg-destructive/5 focus:outline-destructive',
    },
  },
});

export interface TextAreaAdapterProps extends TextAreaPrimitiveProps {
  isInvalid?: boolean;
}

export const TextAreaAdapter = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaAdapterProps
>(({ className, isInvalid, ...props }, ref) => {
  return (
    <TextAreaPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        cn(textAreaStyles({ ...renderProps, className, isInvalid })),
      )}
    />
  );
});
TextAreaAdapter.displayName = 'TextAreaAdapter';

// Backward compatibility or for use in TextField if needed specifically by name
export const TextAreaInputAdapter = TextAreaAdapter;
export type TextAreaInputAdapterProps = TextAreaAdapterProps;
