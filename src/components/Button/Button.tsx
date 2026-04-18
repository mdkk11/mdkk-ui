import React from 'react';
import { ButtonAdapter } from './ButtonAdapter';
import type { ButtonVariants } from './buttonStyles';

export interface ButtonPressEvent {
  target: EventTarget | null;
  pointerType?: string;
  [key: string]: unknown;
}

type ButtonDOMProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled' | 'type'
>;

export interface ButtonProps extends ButtonVariants, ButtonDOMProps {
  /**
   * The content to display in the button.
   */
  children: React.ReactNode;
  /**
   * Handler that is called when the press is released over the target.
   */
  onPress?: (event: ButtonPressEvent) => void;
  /**
   * Whether the button is disabled.
   */
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  /**
   * Whether the button is strictly read only.
   */
  isReadOnly?: boolean;
  /**
   * Whether the button is in a pending state.
   */
  isPending?: boolean;
  /**
   * The type of button to render.
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Additional CSS classes to apply to the button.
   */
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

/**
 * Button component for user actions
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { isDisabled, disabled, isPending, onPress, UNSAFE_rootProps, ...domProps },
    ref,
  ) => {
    return (
      <ButtonAdapter
        ref={ref}
        {...UNSAFE_rootProps}
        {...(domProps as Record<string, unknown>)}
        onPress={onPress as ((event: unknown) => void) | undefined}
        isDisabled={isDisabled ?? disabled}
        isPending={isPending}
      />
    );
  },
);
Button.displayName = 'Button';
