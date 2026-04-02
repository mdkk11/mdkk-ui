import * as React from 'react';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
} from 'react-aria-components';

export type DrawerRootPrimitiveProps = RACDialogTriggerProps;
export type DrawerOverlayPrimitiveProps = RACModalOverlayProps;
export type DrawerContentPrimitiveProps = RACDialogProps;
export type DrawerClosePrimitiveProps = RACButtonProps;

export const DrawerRootPrimitive = RACDialogTrigger;
export const DrawerOverlayPrimitive = RACModalOverlay;
export const DrawerModalPrimitive = RACModal;
export const DrawerContentPrimitive = RACDialog;
export const DrawerClosePrimitive = RACButton;

export type DrawerSectionPrimitiveProps = React.ComponentProps<'div'>;
export type DrawerTitlePrimitiveProps = React.ComponentProps<'h2'>;

export const DrawerSectionPrimitive = React.forwardRef<
  HTMLDivElement,
  DrawerSectionPrimitiveProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));
DrawerSectionPrimitive.displayName = 'DrawerSectionPrimitive';

export const DrawerTitlePrimitive = React.forwardRef<
  HTMLHeadingElement,
  DrawerTitlePrimitiveProps
>(({ className, children, ...props }, ref) => (
  <h2 ref={ref} className={className} {...props}>
    {children}
  </h2>
));
DrawerTitlePrimitive.displayName = 'DrawerTitlePrimitive';
