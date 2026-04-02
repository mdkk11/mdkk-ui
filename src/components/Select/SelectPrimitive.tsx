import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  FieldError as RACFieldError,
  type FieldErrorProps as RACFieldErrorProps,
  Label as RACLabel,
  type LabelProps as RACLabelProps,
  ListBox as RACListBox,
  ListBoxItem as RACListBoxItem,
  type ListBoxItemProps as RACListBoxItemProps,
  type ListBoxProps as RACListBoxProps,
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  SelectValue as RACSelectValue,
  type SelectValueProps as RACSelectValueProps,
  Text as RACText,
  type TextProps as RACTextProps,
} from 'react-aria-components';

export type SelectRootPrimitiveProps = RACSelectProps<object>;
export type SelectLabelPrimitiveProps = RACLabelProps;
export type SelectTriggerPrimitiveProps = RACButtonProps;
export type SelectValuePrimitiveProps = RACSelectValueProps<object>;
export type SelectPopoverPrimitiveProps = RACPopoverProps;
export type SelectListPrimitiveProps = RACListBoxProps<object>;
export type SelectItemPrimitiveProps = RACListBoxItemProps<object>;
export type SelectDescriptionPrimitiveProps = RACTextProps;
export type SelectErrorPrimitiveProps = RACFieldErrorProps;

export const SelectRootPrimitive = RACSelect;
export const SelectLabelPrimitive = RACLabel;
export const SelectTriggerPrimitive = RACButton;
export const SelectValuePrimitive = RACSelectValue;
export const SelectPopoverPrimitive = RACPopover;
export const SelectListPrimitive = RACListBox;
export const SelectItemPrimitive = RACListBoxItem;
export const SelectDescriptionPrimitive = RACText;
export const SelectErrorPrimitive = RACFieldError;
