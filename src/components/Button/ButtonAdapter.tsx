import React from 'react';
import { composeRenderProps } from 'react-aria-components';
import {
  type ButtonVariants,
  buttonVariants,
} from '@/design-system/buttonStyles';
import { cn } from '@/design-system/utils';
import { ProgressCircle } from '../ProgressCircle';
import { ButtonPrimitive, type ButtonPrimitiveProps } from './ButtonPrimitive';

export interface ButtonAdapterProps
  extends ButtonPrimitiveProps,
    ButtonVariants {}

export const ButtonAdapter = React.forwardRef<
  HTMLButtonElement,
  ButtonAdapterProps
>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      shadow,
      interactive,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <ButtonPrimitive
        ref={ref}
        className={composeRenderProps(className, (className) =>
          cn(
            buttonVariants({
              variant,
              size,
              fullWidth,
              shadow,
              interactive,
              className,
            }),
          ),
        )}
        {...props}
      >
        {composeRenderProps(children, (children, { isPending }) => (
          <>
            <span
              className={cn(
                'flex items-center justify-center gap-2',
                isPending && 'invisible',
              )}
            >
              {children}
            </span>
            {isPending && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <ProgressCircle
                  size='sm'
                  aria-label='Loading...'
                  isIndeterminate
                />
              </div>
            )}
          </>
        ))}
      </ButtonPrimitive>
    );
  },
);
ButtonAdapter.displayName = 'ButtonAdapter';
