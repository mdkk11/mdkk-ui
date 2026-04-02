import { cva } from 'cva';
import React from 'react';
import { composeRenderProps } from 'react-aria-components';
import {
  CheckboxPrimitive,
  type CheckboxPrimitiveProps,
} from './CheckboxPrimitive';
import { CheckIcon, MinusIcon } from './icons';

const checkboxStyles = cva({
  base: 'flex gap-2 items-center group font-medium text-sm transition relative [-webkit-tap-highlight-color:transparent] text-foreground',
  variants: {
    isDisabled: {
      false: '',
      true: 'opacity-50 cursor-not-allowed',
    },
  },
});

const boxStyles = cva({
  base: 'peer flex size-5 shrink-0 items-center justify-center rounded-none border-2 border-border text-current transition-colors duration-100',
  variants: {
    isSelected: {
      true: 'bg-primary text-primary-foreground',
    },
    isIndeterminate: {
      true: 'bg-primary text-primary-foreground',
    },
    isFocusVisible: {
      true: 'outline-2 outline-offset-2 outline-ring',
    },
    isInvalid: {
      true: 'border-destructive bg-destructive/10',
    },
    isDisabled: {
      true: 'cursor-not-allowed opacity-50',
    },
  },
});

const iconStyles = 'size-4';

export const CheckboxAdapter = React.forwardRef<
  HTMLLabelElement,
  CheckboxPrimitiveProps
>(({ ...props }, ref) => {
  return (
    <CheckboxPrimitive
      {...props}
      ref={ref}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { isSelected, isIndeterminate, ...renderProps }) => (
          <>
            <div
              data-slot='checkbox'
              className={boxStyles({
                isSelected: isSelected || isIndeterminate,
                isIndeterminate,
                ...renderProps,
              })}
            >
              {isIndeterminate ? (
                <MinusIcon aria-hidden className={iconStyles} />
              ) : (
                <CheckIcon
                  aria-hidden
                  className={`${iconStyles} ${isSelected ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                />
              )}
            </div>
            {children}
          </>
        ),
      )}
    </CheckboxPrimitive>
  );
});
CheckboxAdapter.displayName = 'CheckboxAdapter';
