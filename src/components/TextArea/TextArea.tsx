import React from 'react';
import { TextAreaAdapter } from './TextAreaAdapter';

type TextAreaDOMProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'className'
  | 'defaultValue'
  | 'disabled'
  | 'onChange'
  | 'readOnly'
  | 'required'
  | 'value'
>;

export interface TextAreaProps extends TextAreaDOMProps {
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
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * The name of the input element, used when submitting a form.
   */
  name?: string;
  /**
   * Whether the input is disabled.
   */
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
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
   * Whether the input value is invalid.
   */
  isInvalid?: boolean;
  /**
   * Whether to automatically focus the input.
   */
  autoFocus?: boolean;
  /**
   * Additional CSS classes to apply to the textarea.
   */
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

/**
 * TextArea allows users to input multi-line text.
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      <TextAreaAdapter
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
TextArea.displayName = 'TextArea';
