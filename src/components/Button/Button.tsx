import React from 'react';
import type { PressEvent } from 'react-aria-components';
import type { ButtonVariants } from '@/design-system/buttonStyles';
import { ButtonAdapter } from './ButtonAdapter';

export interface ButtonProps extends ButtonVariants {
  /**
   * The content to display in the button.
   */
  children: React.ReactNode;
  /**
   * Handler that is called when the press is released over the target.
   */
  onPress?: (e: PressEvent) => void;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the button is strictly read only.
   */
  readonly?: boolean;
  /**
   * Whether the button is in a pending state.
   */
  pending?: boolean;
  /**
   * The type of button to render.
   */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button component for user actions.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, pending, ...props }, ref) => {
    return (
      <ButtonAdapter
        ref={ref}
        isDisabled={disabled}
        isPending={pending}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
