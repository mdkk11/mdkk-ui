import { cva } from 'cva';
import * as React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import {
  DropdownMenuItemPrimitive,
  type DropdownMenuItemPrimitiveProps,
  DropdownMenuPopoverPrimitive,
  type DropdownMenuPopoverPrimitiveProps,
  DropdownMenuPrimitive,
  type DropdownMenuPrimitiveProps,
  DropdownMenuRootPrimitive,
  type DropdownMenuRootPrimitiveProps,
  DropdownMenuSectionPrimitive,
  type DropdownMenuSectionPrimitiveProps,
  DropdownMenuSeparatorPrimitive,
  type DropdownMenuSeparatorPrimitiveProps,
  DropdownMenuTriggerPrimitive,
  type DropdownMenuTriggerPrimitiveProps,
} from './DropdownMenuPrimitive';

const dropdownTriggerVariants = cva({
  base: 'inline-flex items-center justify-center rounded-none border-[var(--brutal-border-subtle)] bg-outline px-3 py-2 text-sm font-medium text-outline-foreground transition-colors hover:bg-muted',
});

const dropdownPopoverVariants = cva({
  base: 'z-50 overflow-hidden rounded-none border-[var(--brutal-border-subtle)] border-border bg-popover p-1 text-popover-foreground data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0',
});

const dropdownMenuVariants = cva({
  base: 'min-w-[180px] outline-none',
});

const dropdownItemVariants = cva({
  base: 'flex cursor-default items-center gap-2 rounded-none px-2.5 py-2 text-sm leading-5 outline-none transition-colors data-[focused]:bg-muted/70 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  variants: {
    tone: {
      default: 'text-foreground',
      destructive: 'text-destructive data-[focused]:bg-destructive/10',
    },
  },
  defaultVariants: {
    tone: 'default',
  },
});

const dropdownSectionVariants = cva({
  base: 'p-1',
});

const dropdownSeparatorVariants = cva({
  base: 'my-1 border-b-[var(--brutal-border-subtle)] border-border',
});

export const DropdownMenuRootAdapter = DropdownMenuRootPrimitive;

export interface DropdownMenuTriggerAdapterProps
  extends DropdownMenuTriggerPrimitiveProps {}

export const DropdownMenuTriggerAdapter = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerAdapterProps
>(({ className, children, ...props }, ref) => (
  <DropdownMenuTriggerPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(dropdownTriggerVariants(), className),
    )}
    {...props}
  >
    {children}
  </DropdownMenuTriggerPrimitive>
));
DropdownMenuTriggerAdapter.displayName = 'DropdownMenuTriggerAdapter';

export interface DropdownMenuContentAdapterProps
  extends Omit<DropdownMenuPrimitiveProps<object>, 'className' | 'children'> {
  children: React.ReactNode;
  className?: string;
  popoverProps?: Omit<DropdownMenuPopoverPrimitiveProps, 'children'>;
}

export const DropdownMenuContentAdapter = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentAdapterProps
>(({ className, children, popoverProps, ...props }, ref) => (
  <DropdownMenuPopoverPrimitive
    {...popoverProps}
    className={composeRenderProps(popoverProps?.className, (popoverClassName) =>
      cn(dropdownPopoverVariants(), popoverClassName),
    )}
  >
    <DropdownMenuPrimitive
      ref={ref}
      className={composeRenderProps(className, (className) =>
        cn(dropdownMenuVariants(), className),
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive>
  </DropdownMenuPopoverPrimitive>
));
DropdownMenuContentAdapter.displayName = 'DropdownMenuContentAdapter';

export interface DropdownMenuItemAdapterProps
  extends DropdownMenuItemPrimitiveProps<object> {
  isDestructive?: boolean;
}

export const DropdownMenuItemAdapter = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemAdapterProps
>(({ className, isDestructive, ...props }, ref) => (
  <DropdownMenuItemPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(
        dropdownItemVariants({
          tone: isDestructive ? 'destructive' : 'default',
        }),
        className,
      ),
    )}
    {...props}
  />
));
DropdownMenuItemAdapter.displayName = 'DropdownMenuItemAdapter';

export interface DropdownMenuSectionAdapterProps
  extends DropdownMenuSectionPrimitiveProps<object> {}

export const DropdownMenuSectionAdapter = React.forwardRef<
  HTMLElement,
  DropdownMenuSectionAdapterProps
>(({ className, ...props }, ref) => (
  <DropdownMenuSectionPrimitive
    ref={ref}
    className={cn(dropdownSectionVariants(), className)}
    {...props}
  />
));
DropdownMenuSectionAdapter.displayName = 'DropdownMenuSectionAdapter';

export interface DropdownMenuSeparatorAdapterProps
  extends DropdownMenuSeparatorPrimitiveProps {}

export const DropdownMenuSeparatorAdapter = React.forwardRef<
  HTMLElement,
  DropdownMenuSeparatorAdapterProps
>(({ className, ...props }, ref) => (
  <DropdownMenuSeparatorPrimitive
    ref={ref}
    className={cn(dropdownSeparatorVariants(), className)}
    {...props}
  />
));
DropdownMenuSeparatorAdapter.displayName = 'DropdownMenuSeparatorAdapter';

export type { DropdownMenuRootPrimitiveProps };
