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

export type DialogRootPrimitiveProps = RACDialogTriggerProps;
export type DialogOverlayPrimitiveProps = RACModalOverlayProps;
export type DialogContentPrimitiveProps = RACDialogProps;
export type DialogClosePrimitiveProps = RACButtonProps;

export const DialogRootPrimitive = RACDialogTrigger;
export const DialogOverlayPrimitive = RACModalOverlay;
export const DialogModalPrimitive = RACModal;
export const DialogContentPrimitive = RACDialog;
export const DialogClosePrimitive = RACButton;

export type DialogSectionPrimitiveProps = React.ComponentProps<'div'>;
export type DialogTitlePrimitiveProps = React.ComponentProps<'h2'>;
export type DialogDescriptionPrimitiveProps = React.ComponentProps<'p'>;

export const DialogSectionPrimitive = React.forwardRef<
  HTMLDivElement,
  DialogSectionPrimitiveProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));
DialogSectionPrimitive.displayName = 'DialogSectionPrimitive';

export const DialogTitlePrimitive = React.forwardRef<
  HTMLHeadingElement,
  DialogTitlePrimitiveProps
>(({ className, children, ...props }, ref) => (
  <h2 ref={ref} className={className} {...props}>
    {children}
  </h2>
));
DialogTitlePrimitive.displayName = 'DialogTitlePrimitive';

export const DialogDescriptionPrimitive = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionPrimitiveProps
>(({ className, children, ...props }, ref) => (
  <p ref={ref} className={className} {...props}>
    {children}
  </p>
));
DialogDescriptionPrimitive.displayName = 'DialogDescriptionPrimitive';
