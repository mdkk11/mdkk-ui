import { CheckboxAdapter } from './CheckboxAdapter';

export interface CheckboxProps {
  /**
   * The content to display next to the checkbox.
   */
  children?: React.ReactNode;
  /**
   * Whether the checkbox is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is selected (controlled).
   */
  selected?: boolean;
  /**
   * Whether the checkbox is selected by default (uncontrolled).
   */
  defaultSelected?: boolean;
  /**
   * Whether the checkbox is in an indeterminate state.
   */
  indeterminate?: boolean;
  /**
   * Whether the checkbox is read-only.
   */
  readonly?: boolean;
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
export const Checkbox = ({
  children,
  disabled,
  selected,
  defaultSelected,
  indeterminate,
  readonly,
  name,
  value,
  onChange,
}: CheckboxProps) => {
  return (
    <CheckboxAdapter
      isDisabled={disabled}
      isSelected={selected}
      defaultSelected={defaultSelected}
      isIndeterminate={indeterminate}
      isReadOnly={readonly}
      name={name}
      value={value}
      onChange={onChange}
    >
      {children}
    </CheckboxAdapter>
  );
};
