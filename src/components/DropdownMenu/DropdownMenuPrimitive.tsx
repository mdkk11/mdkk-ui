import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  type MenuItemProps as RACMenuItemProps,
  type MenuProps as RACMenuProps,
  MenuSection as RACMenuSection,
  type MenuSectionProps as RACMenuSectionProps,
  MenuTrigger as RACMenuTrigger,
  type MenuTriggerProps as RACMenuTriggerProps,
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
  Separator as RACSeparator,
  type SeparatorProps as RACSeparatorProps,
} from 'react-aria-components';

export type DropdownMenuRootPrimitiveProps = RACMenuTriggerProps;
export type DropdownMenuTriggerPrimitiveProps = RACButtonProps;
export type DropdownMenuPopoverPrimitiveProps = RACPopoverProps;
export type DropdownMenuPrimitiveProps<T extends object> = RACMenuProps<T>;
export type DropdownMenuItemPrimitiveProps<T extends object> =
  RACMenuItemProps<T>;
export type DropdownMenuSectionPrimitiveProps<T extends object> =
  RACMenuSectionProps<T>;
export type DropdownMenuSeparatorPrimitiveProps = RACSeparatorProps;

export const DropdownMenuRootPrimitive = RACMenuTrigger;
export const DropdownMenuTriggerPrimitive = RACButton;
export const DropdownMenuPopoverPrimitive = RACPopover;
export const DropdownMenuPrimitive = RACMenu;
export const DropdownMenuItemPrimitive = RACMenuItem;
export const DropdownMenuSectionPrimitive = RACMenuSection;
export const DropdownMenuSeparatorPrimitive = RACSeparator;
