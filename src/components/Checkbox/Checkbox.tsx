import React from 'react';
import { CheckboxAdapter } from './CheckboxAdapter';

export interface CheckboxProps {
  /**
   * The content to display next to the checkbox.
   */
  children?: React.ReactNode;
  /**
   * Whether the checkbox is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the checkbox is selected (controlled).
   */
  isSelected?: boolean;
  /**
   * Whether the checkbox is selected by default (uncontrolled).
   */
  defaultIsSelected?: boolean;
  /**
   * Whether the checkbox is in an indeterminate state.
   */
  isIndeterminate?: boolean;
  /**
   * Whether the checkbox is read-only.
   */
  isReadOnly?: boolean;
  /**
   * The name of the input element, used when submitting a form.
   */
  name?: string;
  /**
   * The value of the input element, used when submitting a form.
   */
  value?: string;
  /**
   * Handler that is called when the checkbox's selection state changes.
   */
  onChange?: (isSelected: boolean) => void;
}

/**
 * Checkbox component for selecting one or more options.
 */
export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      children,
      isDisabled,
      isSelected,
      defaultIsSelected,
      isIndeterminate,
      isReadOnly,
      name,
      value,
      onChange,
    },
    ref,
  ) => {
    return (
      <CheckboxAdapter
        ref={ref}
        isDisabled={isDisabled}
        isSelected={isSelected}
        defaultSelected={defaultIsSelected}
        isIndeterminate={isIndeterminate}
        isReadOnly={isReadOnly}
        name={name}
        value={value}
        onChange={onChange}
      >
        {children}
      </CheckboxAdapter>
    );
  },
);
Checkbox.displayName = 'Checkbox';
