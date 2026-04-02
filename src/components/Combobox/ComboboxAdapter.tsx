import { cva } from 'cva';
import * as React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import {
  ComboboxDescriptionPrimitive,
  type ComboboxDescriptionPrimitiveProps,
  ComboboxErrorPrimitive,
  type ComboboxErrorPrimitiveProps,
  ComboboxInputPrimitive,
  type ComboboxInputPrimitiveProps,
  ComboboxItemPrimitive,
  type ComboboxItemPrimitiveProps,
  ComboboxLabelPrimitive,
  type ComboboxLabelPrimitiveProps,
  ComboboxListPrimitive,
  type ComboboxListPrimitiveProps,
  ComboboxPopoverPrimitive,
  type ComboboxPopoverPrimitiveProps,
  ComboboxRootPrimitive,
  type ComboboxRootPrimitiveProps,
  ComboboxTriggerPrimitive,
  type ComboboxTriggerPrimitiveProps,
} from './ComboboxPrimitive';

const comboboxRootVariants = cva({
  base: 'flex w-full flex-col gap-1.5',
});

const comboboxLabelVariants = cva({
  base: 'text-sm font-bold uppercase tracking-brutal-label text-foreground',
});

const comboboxFieldVariants = cva({
  base: 'flex w-full items-stretch rounded-none border-2 border-border bg-background text-foreground focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring',
});

const comboboxInputVariants = cva({
  base: 'min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
});

const comboboxTriggerVariants = cva({
  base: 'inline-flex items-center justify-center border-l-2 border-border px-3 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50',
});

const comboboxPopoverVariants = cva({
  base: 'z-50 min-w-[var(--trigger-width)] rounded-none border-2 border-border bg-popover p-1 text-popover-foreground shadow-brutal-sm data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0',
});

const comboboxListVariants = cva({
  base: 'outline-none',
});

const comboboxItemVariants = cva({
  base: 'cursor-default border border-transparent px-2 py-2 text-sm outline-none transition-colors data-[focused]:border-border data-[focused]:bg-muted data-[selected]:font-semibold data-[disabled]:opacity-50',
});

const comboboxDescriptionVariants = cva({
  base: 'text-xs text-muted-foreground',
});

const comboboxErrorVariants = cva({
  base: 'text-xs text-destructive',
});

export interface ComboboxRootAdapterProps
  extends Omit<ComboboxRootPrimitiveProps, 'className'> {
  className?: string;
}

export const ComboboxRootAdapter = React.forwardRef<
  HTMLDivElement,
  ComboboxRootAdapterProps
>(({ className, ...props }, ref) => (
  <ComboboxRootPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(comboboxRootVariants(), className),
    )}
    {...props}
  />
));
ComboboxRootAdapter.displayName = 'ComboboxRootAdapter';

export interface ComboboxLabelAdapterProps
  extends ComboboxLabelPrimitiveProps {}

export const ComboboxLabelAdapter = React.forwardRef<
  HTMLLabelElement,
  ComboboxLabelAdapterProps
>(({ className, ...props }, ref) => (
  <ComboboxLabelPrimitive
    ref={ref}
    className={cn(comboboxLabelVariants(), className)}
    {...props}
  />
));
ComboboxLabelAdapter.displayName = 'ComboboxLabelAdapter';

export interface ComboboxFieldAdapterProps
  extends React.ComponentProps<'div'> {}

export const ComboboxFieldAdapter = React.forwardRef<
  HTMLDivElement,
  ComboboxFieldAdapterProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(comboboxFieldVariants(), className)}
    {...props}
  />
));
ComboboxFieldAdapter.displayName = 'ComboboxFieldAdapter';

export interface ComboboxInputAdapterProps
  extends ComboboxInputPrimitiveProps {}

export const ComboboxInputAdapter = React.forwardRef<
  HTMLInputElement,
  ComboboxInputAdapterProps
>(({ className, ...props }, ref) => (
  <ComboboxInputPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(comboboxInputVariants(), className),
    )}
    {...props}
  />
));
ComboboxInputAdapter.displayName = 'ComboboxInputAdapter';

export interface ComboboxTriggerAdapterProps
  extends ComboboxTriggerPrimitiveProps {}

export const ComboboxTriggerAdapter = React.forwardRef<
  HTMLButtonElement,
  ComboboxTriggerAdapterProps
>(({ className, ...props }, ref) => (
  <ComboboxTriggerPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(comboboxTriggerVariants(), className),
    )}
    {...props}
  />
));
ComboboxTriggerAdapter.displayName = 'ComboboxTriggerAdapter';

export interface ComboboxPopoverAdapterProps
  extends ComboboxPopoverPrimitiveProps {}

export const ComboboxPopoverAdapter = React.forwardRef<
  HTMLElement,
  ComboboxPopoverAdapterProps
>(({ className, ...props }, ref) => (
  <ComboboxPopoverPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(comboboxPopoverVariants(), className),
    )}
    {...props}
  />
));
ComboboxPopoverAdapter.displayName = 'ComboboxPopoverAdapter';

export interface ComboboxListAdapterProps extends ComboboxListPrimitiveProps {}

export const ComboboxListAdapter = React.forwardRef<
  HTMLDivElement,
  ComboboxListAdapterProps
>(({ className, ...props }, ref) => (
  <ComboboxListPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(comboboxListVariants(), className),
    )}
    {...props}
  />
));
ComboboxListAdapter.displayName = 'ComboboxListAdapter';

export interface ComboboxItemAdapterProps extends ComboboxItemPrimitiveProps {}

export const ComboboxItemAdapter = React.forwardRef<
  HTMLDivElement,
  ComboboxItemAdapterProps
>(({ className, ...props }, ref) => (
  <ComboboxItemPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(comboboxItemVariants(), className),
    )}
    {...props}
  />
));
ComboboxItemAdapter.displayName = 'ComboboxItemAdapter';

export interface ComboboxDescriptionAdapterProps
  extends ComboboxDescriptionPrimitiveProps {}

export const ComboboxDescriptionAdapter = React.forwardRef<
  HTMLElement,
  ComboboxDescriptionAdapterProps
>(({ className, ...props }, ref) => (
  <ComboboxDescriptionPrimitive
    ref={ref}
    slot='description'
    className={cn(comboboxDescriptionVariants(), className)}
    {...props}
  />
));
ComboboxDescriptionAdapter.displayName = 'ComboboxDescriptionAdapter';

export interface ComboboxErrorAdapterProps
  extends ComboboxErrorPrimitiveProps {}

export const ComboboxErrorAdapter = React.forwardRef<
  HTMLElement,
  ComboboxErrorAdapterProps
>(({ className, ...props }, ref) => (
  <ComboboxErrorPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(comboboxErrorVariants(), className),
    )}
    {...props}
  />
));
ComboboxErrorAdapter.displayName = 'ComboboxErrorAdapter';
