import React from 'react';
import { InputAdapter, type InputAdapterProps } from './InputAdapter';

export interface InputProps extends Omit<InputAdapterProps, 'onChange'> {
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
   * Whether the input value is invalid.
   */
  isInvalid?: boolean;
  /**
   * Whether the input is strictly read only.
   */
  isReadOnly?: boolean;
  /**
   * Whether user input is required on the input before form submission.
   */
  isRequired?: boolean;
}

/**
 * An Input allows a user to enter a plain text value with a keyboard.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <InputAdapter {...props} ref={ref} />;
  },
);
Input.displayName = 'Input';
