import { cva } from 'cva';
import * as React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { formControlFocusRingClass } from '@/design-system/formControlStyles';
import { cn } from '@/design-system/utils';
import {
  SelectDescriptionPrimitive,
  type SelectDescriptionPrimitiveProps,
  SelectErrorPrimitive,
  type SelectErrorPrimitiveProps,
  SelectItemPrimitive,
  type SelectItemPrimitiveProps,
  SelectLabelPrimitive,
  type SelectLabelPrimitiveProps,
  SelectListPrimitive,
  type SelectListPrimitiveProps,
  SelectPopoverPrimitive,
  type SelectPopoverPrimitiveProps,
  SelectRootPrimitive,
  type SelectRootPrimitiveProps,
  SelectTriggerPrimitive,
  type SelectTriggerPrimitiveProps,
  SelectValuePrimitive,
  type SelectValuePrimitiveProps,
} from './SelectPrimitive';

const selectRootVariants = cva({
  base: 'flex w-full flex-col gap-1.5',
});

const selectLabelVariants = cva({
  base: 'text-sm font-bold uppercase tracking-brutal-label text-foreground',
});

const selectTriggerVariants = cva({
  base: `group flex w-full items-center gap-2 rounded-none border-2 border-border bg-background px-3 py-3 text-base text-foreground outline-none transition-colors hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-50 ${formControlFocusRingClass} aria-invalid:border-destructive aria-invalid:bg-destructive/5 aria-invalid:focus:outline-destructive aria-invalid:focus-within:outline-destructive [&>[data-slot='select-value']]:min-w-0 [&>[data-slot='select-value']]:flex-1 [&>[data-slot='select-value']]:truncate [&>[data-slot='select-value']]:text-left`,
});

const selectValueVariants = cva({
  base: 'min-w-0 flex-1 truncate text-left data-[placeholder]:font-normal data-[placeholder]:text-muted-foreground',
});

const selectPopoverVariants = cva({
  base: 'z-50 w-[var(--trigger-width)] rounded-none border-2 border-border bg-popover p-1 text-popover-foreground data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0',
});

const selectListVariants = cva({
  base: 'outline-none',
});

const selectItemVariants = cva({
  base: 'cursor-default truncate border border-transparent px-2 py-2 text-sm outline-none transition-colors data-[focused]:border-border data-[focused]:bg-muted data-[selected]:font-semibold data-[disabled]:opacity-50',
});

const selectDescriptionVariants = cva({
  base: 'text-xs text-muted-foreground',
});

const selectErrorVariants = cva({
  base: 'text-xs text-destructive',
});

export interface SelectRootAdapterProps
  extends Omit<SelectRootPrimitiveProps, 'className'> {
  className?: string;
}

export const SelectRootAdapter = React.forwardRef<
  HTMLDivElement,
  SelectRootAdapterProps
>(({ className, ...props }, ref) => (
  <SelectRootPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(selectRootVariants(), className),
    )}
    {...props}
  />
));
SelectRootAdapter.displayName = 'SelectRootAdapter';

export interface SelectLabelAdapterProps extends SelectLabelPrimitiveProps {}

export const SelectLabelAdapter = React.forwardRef<
  HTMLLabelElement,
  SelectLabelAdapterProps
>(({ className, ...props }, ref) => (
  <SelectLabelPrimitive
    ref={ref}
    className={cn(selectLabelVariants(), className)}
    {...props}
  />
));
SelectLabelAdapter.displayName = 'SelectLabelAdapter';

export interface SelectTriggerAdapterProps
  extends SelectTriggerPrimitiveProps {}

export const SelectTriggerAdapter = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerAdapterProps
>(({ className, ...props }, ref) => (
  <SelectTriggerPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(selectTriggerVariants(), className),
    )}
    {...props}
  />
));
SelectTriggerAdapter.displayName = 'SelectTriggerAdapter';

export interface SelectValueAdapterProps extends SelectValuePrimitiveProps {}

export const SelectValueAdapter = React.forwardRef<
  HTMLSpanElement,
  SelectValueAdapterProps
>(({ className, ...props }, ref) => (
  <SelectValuePrimitive
    data-slot='select-value'
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(selectValueVariants(), className),
    )}
    {...props}
  />
));
SelectValueAdapter.displayName = 'SelectValueAdapter';

export interface SelectPopoverAdapterProps
  extends SelectPopoverPrimitiveProps {}

export const SelectPopoverAdapter = React.forwardRef<
  HTMLElement,
  SelectPopoverAdapterProps
>(({ className, ...props }, ref) => (
  <SelectPopoverPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(selectPopoverVariants(), className),
    )}
    {...props}
  />
));
SelectPopoverAdapter.displayName = 'SelectPopoverAdapter';

export interface SelectListAdapterProps extends SelectListPrimitiveProps {}

export const SelectListAdapter = React.forwardRef<
  HTMLDivElement,
  SelectListAdapterProps
>(({ className, ...props }, ref) => (
  <SelectListPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(selectListVariants(), className),
    )}
    {...props}
  />
));
SelectListAdapter.displayName = 'SelectListAdapter';

export interface SelectItemAdapterProps extends SelectItemPrimitiveProps {}

export const SelectItemAdapter = React.forwardRef<
  HTMLDivElement,
  SelectItemAdapterProps
>(({ className, ...props }, ref) => (
  <SelectItemPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(selectItemVariants(), className),
    )}
    {...props}
  />
));
SelectItemAdapter.displayName = 'SelectItemAdapter';

export interface SelectDescriptionAdapterProps
  extends SelectDescriptionPrimitiveProps {}

export const SelectDescriptionAdapter = React.forwardRef<
  HTMLElement,
  SelectDescriptionAdapterProps
>(({ className, ...props }, ref) => (
  <SelectDescriptionPrimitive
    ref={ref}
    slot='description'
    className={cn(selectDescriptionVariants(), className)}
    {...props}
  />
));
SelectDescriptionAdapter.displayName = 'SelectDescriptionAdapter';

export interface SelectErrorAdapterProps extends SelectErrorPrimitiveProps {}

export const SelectErrorAdapter = React.forwardRef<
  HTMLElement,
  SelectErrorAdapterProps
>(({ className, ...props }, ref) => (
  <SelectErrorPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(selectErrorVariants(), className),
    )}
    {...props}
  />
));
SelectErrorAdapter.displayName = 'SelectErrorAdapter';
