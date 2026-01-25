import React from 'react';
import { TextAreaAdapter, type TextAreaAdapterProps } from './TextAreaAdapter';

export interface TextAreaProps extends Omit<TextAreaAdapterProps, 'onChange'> {
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
   * Whether the input is strictly read only.
   */
  isReadOnly?: boolean;
  /**
   * Whether user input is required on the input before form submission.
   */
  isRequired?: boolean;
  /**
   * Whether the input value is invalid.
   */
  isInvalid?: boolean;
  /**
   * Whether to automatically focus the input.
   */
  autoFocus?: boolean;
}

/**
 * TextArea allows users to input multi-line text.
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    return <TextAreaAdapter {...props} ref={ref} />;
  },
);
TextArea.displayName = 'TextArea';
