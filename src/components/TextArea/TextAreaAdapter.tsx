import { cva } from 'cva';
import React from 'react';
import { composeRenderProps } from 'react-aria-components';
import {
  formControlFocusRingClass,
  formControlInvalidFocusRingClass,
} from '@/design-system/formControlStyles';
import { cn } from '@/design-system/utils';
import {
  TextAreaPrimitive,
  type TextAreaPrimitiveProps,
} from './TextAreaPrimitive';

const textAreaStyles = cva({
  base: [
    'w-full bg-background p-3 text-base text-foreground',
    'rounded-none',
    'border-2 border-border',
    'outline-none',
    'placeholder:text-muted-foreground',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    formControlFocusRingClass,
    'min-h-[80px]',
  ],
  variants: {
    isInvalid: {
      true: `border-destructive bg-destructive/5 ${formControlInvalidFocusRingClass}`,
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

// Backward compatibility alias for TextField composition.
export const TextAreaInputAdapter = TextAreaAdapter;
export type TextAreaInputAdapterProps = TextAreaAdapterProps;
