import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  ComboBox as RACComboBox,
  type ComboBoxProps as RACComboBoxProps,
  FieldError as RACFieldError,
  type FieldErrorProps as RACFieldErrorProps,
  Input as RACInput,
  type InputProps as RACInputProps,
  Label as RACLabel,
  type LabelProps as RACLabelProps,
  ListBox as RACListBox,
  ListBoxItem as RACListBoxItem,
  type ListBoxItemProps as RACListBoxItemProps,
  type ListBoxProps as RACListBoxProps,
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
  Text as RACText,
  type TextProps as RACTextProps,
} from 'react-aria-components';

export type ComboboxRootPrimitiveProps = RACComboBoxProps<object>;
export type ComboboxLabelPrimitiveProps = RACLabelProps;
export type ComboboxInputPrimitiveProps = RACInputProps;
export type ComboboxTriggerPrimitiveProps = RACButtonProps;
export type ComboboxPopoverPrimitiveProps = RACPopoverProps;
export type ComboboxListPrimitiveProps = RACListBoxProps<object>;
export type ComboboxItemPrimitiveProps = RACListBoxItemProps<object>;
export type ComboboxDescriptionPrimitiveProps = RACTextProps;
export type ComboboxErrorPrimitiveProps = RACFieldErrorProps;

export const ComboboxRootPrimitive = RACComboBox;
export const ComboboxLabelPrimitive = RACLabel;
export const ComboboxInputPrimitive = RACInput;
export const ComboboxTriggerPrimitive = RACButton;
export const ComboboxPopoverPrimitive = RACPopover;
export const ComboboxListPrimitive = RACListBox;
export const ComboboxItemPrimitive = RACListBoxItem;
export const ComboboxDescriptionPrimitive = RACText;
export const ComboboxErrorPrimitive = RACFieldError;
