import React from 'react';
import { InputAdapter } from './InputAdapter';

type InputDOMProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'className'
  | 'defaultValue'
  | 'disabled'
  | 'onChange'
  | 'readOnly'
  | 'required'
  | 'value'
>;

export interface InputProps extends InputDOMProps {
  /**
   * The current value (controlled).
   */
  value?: string;
  /**
   * The default value (uncontrolled).
   */
  defaultValue?: string;
  /**
   * Handler that is called when the value changes.
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Whether the input is disabled.
   */
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  /**
   * Whether the input value is invalid.
   */
  isInvalid?: boolean;
  /**
   * Whether the input is strictly read only.
   */
  isReadOnly?: boolean;
  /**
   * @deprecated Use `isReadOnly` instead.
   */
  readOnly?: boolean;
  /**
   * Whether user input is required on the input before form submission.
   */
  isRequired?: boolean;
  /**
   * @deprecated Use `isRequired` instead.
   */
  required?: boolean;
  /**
   * Additional CSS classes to apply to the input.
   */
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

/**
 * An Input allows a user to enter a plain text value with a keyboard.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      isDisabled,
      disabled,
      isReadOnly,
      readOnly,
      isRequired,
      required,
      UNSAFE_rootProps,
      ...props
    },
    ref,
  ) => {
    return (
      <InputAdapter
        {...UNSAFE_rootProps}
        {...props}
        disabled={isDisabled ?? disabled}
        readOnly={isReadOnly ?? readOnly}
        required={isRequired ?? required}
        ref={ref}
      />
    );
  },
);
Input.displayName = 'Input';
