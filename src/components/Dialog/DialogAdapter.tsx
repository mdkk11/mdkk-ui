import { cva, type VariantProps } from 'cva';
import * as React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import {
  DialogClosePrimitive,
  type DialogClosePrimitiveProps,
  DialogContentPrimitive,
  type DialogContentPrimitiveProps,
  DialogDescriptionPrimitive,
  DialogModalPrimitive,
  DialogOverlayPrimitive,
  type DialogOverlayPrimitiveProps,
  DialogRootPrimitive,
  DialogSectionPrimitive,
  DialogTitlePrimitive,
} from './DialogPrimitive';

const dialogOverlayVariants = cva({
  base: 'fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px] transition-opacity duration-200 ease-out data-[entering]:opacity-0 data-[exiting]:opacity-0',
});

const dialogModalVariants = cva({
  base: 'fixed inset-0 z-50 flex items-center justify-center p-4',
});

const dialogContentVariants = cva({
  base: 'w-full rounded-none border-[var(--brutal-border-default)] border-border bg-background text-foreground shadow-brutal-md outline-none transition duration-200 ease-out data-[entering]:scale-[0.98] data-[entering]:opacity-0 data-[exiting]:scale-[0.98] data-[exiting]:opacity-0',
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const dialogHeaderVariants = cva({
  base: 'flex flex-col gap-2 border-b-[var(--brutal-border-subtle)] px-5 py-4',
});

const dialogBodyVariants = cva({
  base: 'px-5 py-4',
});

const dialogFooterVariants = cva({
  base: 'flex items-center justify-end gap-2 border-t-[var(--brutal-border-subtle)] px-5 py-4',
});

const dialogTitleVariants = cva({
  base: 'text-base font-semibold leading-tight',
});

const dialogDescriptionVariants = cva({
  base: 'text-sm text-muted-foreground',
});

const dialogTriggerVariants = cva({
  base: 'inline-flex items-center justify-center rounded-none border-[var(--brutal-border-subtle)] bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90',
});

const dialogCloseVariants = cva({
  base: 'inline-flex items-center justify-center rounded-none border-[var(--brutal-border-subtle)] bg-outline px-3 py-2 text-sm font-medium text-outline-foreground transition-colors hover:bg-muted',
});

export interface DialogContentVariants
  extends VariantProps<typeof dialogContentVariants> {}

export const DialogRootAdapter = DialogRootPrimitive;

export interface DialogTriggerAdapterProps
  extends React.ComponentProps<typeof DialogClosePrimitive> {}

export const DialogTriggerAdapter = React.forwardRef<
  HTMLButtonElement,
  DialogTriggerAdapterProps
>(({ className, children, ...props }, ref) => (
  <DialogClosePrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(dialogTriggerVariants(), className),
    )}
    {...props}
  >
    {children}
  </DialogClosePrimitive>
));
DialogTriggerAdapter.displayName = 'DialogTriggerAdapter';

export interface DialogOverlayAdapterProps
  extends Omit<DialogOverlayPrimitiveProps, 'children'> {
  children: React.ReactNode;
}

export const DialogOverlayAdapter = React.forwardRef<
  HTMLDivElement,
  DialogOverlayAdapterProps
>(({ className, children, ...props }, ref) => (
  <DialogOverlayPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(dialogOverlayVariants(), className),
    )}
    {...props}
  >
    {children}
  </DialogOverlayPrimitive>
));
DialogOverlayAdapter.displayName = 'DialogOverlayAdapter';

export interface DialogContentAdapterProps
  extends Omit<DialogContentPrimitiveProps, 'className'>,
    DialogContentVariants {
  className?: string;
}

export const DialogContentAdapter = React.forwardRef<
  HTMLElement,
  DialogContentAdapterProps
>(({ className, size, children, ...props }, ref) => (
  <DialogModalPrimitive className={dialogModalVariants()}>
    <DialogContentPrimitive
      ref={ref}
      className={cn(dialogContentVariants({ size }), className)}
      {...props}
    >
      {children}
    </DialogContentPrimitive>
  </DialogModalPrimitive>
));
DialogContentAdapter.displayName = 'DialogContentAdapter';

export const DialogHeaderAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DialogSectionPrimitive>
>(({ className, ...props }, ref) => (
  <DialogSectionPrimitive
    ref={ref}
    className={cn(dialogHeaderVariants(), className)}
    {...props}
  />
));
DialogHeaderAdapter.displayName = 'DialogHeaderAdapter';

export const DialogBodyAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DialogSectionPrimitive>
>(({ className, ...props }, ref) => (
  <DialogSectionPrimitive
    ref={ref}
    className={cn(dialogBodyVariants(), className)}
    {...props}
  />
));
DialogBodyAdapter.displayName = 'DialogBodyAdapter';

export const DialogFooterAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DialogSectionPrimitive>
>(({ className, ...props }, ref) => (
  <DialogSectionPrimitive
    ref={ref}
    className={cn(dialogFooterVariants(), className)}
    {...props}
  />
));
DialogFooterAdapter.displayName = 'DialogFooterAdapter';

export const DialogTitleAdapter = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof DialogTitlePrimitive>
>(({ className, ...props }, ref) => (
  <DialogTitlePrimitive
    ref={ref}
    className={cn(dialogTitleVariants(), className)}
    {...props}
  />
));
DialogTitleAdapter.displayName = 'DialogTitleAdapter';

export const DialogDescriptionAdapter = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof DialogDescriptionPrimitive>
>(({ className, ...props }, ref) => (
  <DialogDescriptionPrimitive
    ref={ref}
    className={cn(dialogDescriptionVariants(), className)}
    {...props}
  />
));
DialogDescriptionAdapter.displayName = 'DialogDescriptionAdapter';

export interface DialogCloseAdapterProps extends DialogClosePrimitiveProps {}

export const DialogCloseAdapter = React.forwardRef<
  HTMLButtonElement,
  DialogCloseAdapterProps
>(({ className, children, ...props }, ref) => (
  <DialogClosePrimitive
    ref={ref}
    slot='close'
    className={composeRenderProps(className, (className) =>
      cn(dialogCloseVariants(), className),
    )}
    {...props}
  >
    {children}
  </DialogClosePrimitive>
));
DialogCloseAdapter.displayName = 'DialogCloseAdapter';
