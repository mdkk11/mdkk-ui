import { cva, type VariantProps } from 'cva';
import * as React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import {
  DrawerClosePrimitive,
  type DrawerClosePrimitiveProps,
  DrawerContentPrimitive,
  type DrawerContentPrimitiveProps,
  DrawerModalPrimitive,
  DrawerOverlayPrimitive,
  type DrawerOverlayPrimitiveProps,
  DrawerRootPrimitive,
  DrawerSectionPrimitive,
  DrawerTitlePrimitive,
} from './DrawerPrimitive';

const drawerOverlayVariants = cva({
  base: 'fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 ease-out data-[entering]:opacity-0 data-[exiting]:opacity-0',
});

const drawerModalVariants = cva({
  base: 'fixed inset-0 z-50',
});

const drawerContentVariants = cva({
  base: 'fixed rounded-none border-[var(--brutal-border-default)] border-border bg-background text-foreground shadow-brutal-md outline-none transition duration-200 ease-out',
  variants: {
    side: {
      left: 'inset-y-0 left-0 w-[min(90vw,420px)] border-r-[var(--brutal-border-default)] data-[entering]:-translate-x-full data-[exiting]:-translate-x-full',
      right:
        'inset-y-0 right-0 w-[min(90vw,420px)] border-l-[var(--brutal-border-default)] data-[entering]:translate-x-full data-[exiting]:translate-x-full',
      top: 'inset-x-0 top-0 h-[min(80vh,420px)] border-b-[var(--brutal-border-default)] data-[entering]:-translate-y-full data-[exiting]:-translate-y-full',
      bottom:
        'inset-x-0 bottom-0 h-[min(80vh,420px)] border-t-[var(--brutal-border-default)] data-[entering]:translate-y-full data-[exiting]:translate-y-full',
    },
  },
  defaultVariants: {
    side: 'right',
  },
});

const drawerHeaderVariants = cva({
  base: 'flex items-center justify-between border-b-[var(--brutal-border-subtle)] px-4 py-3',
});

const drawerBodyVariants = cva({
  base: 'h-full overflow-auto p-4',
});

const drawerFooterVariants = cva({
  base: 'flex items-center justify-end gap-2 border-t-[var(--brutal-border-subtle)] px-4 py-3',
});

const drawerTriggerVariants = cva({
  base: 'inline-flex items-center justify-center rounded-none border-[var(--brutal-border-subtle)] bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90',
});

const drawerCloseVariants = cva({
  base: 'inline-flex items-center justify-center rounded-none border-[var(--brutal-border-subtle)] bg-outline px-3 py-2 text-sm font-medium text-outline-foreground transition-colors hover:bg-muted',
});

const drawerTitleVariants = cva({
  base: 'text-base font-semibold leading-tight',
});

export interface DrawerContentVariants
  extends VariantProps<typeof drawerContentVariants> {}

export const DrawerRootAdapter = DrawerRootPrimitive;

export interface DrawerTriggerAdapterProps
  extends React.ComponentProps<typeof DrawerClosePrimitive> {}

export const DrawerTriggerAdapter = React.forwardRef<
  HTMLButtonElement,
  DrawerTriggerAdapterProps
>(({ className, children, ...props }, ref) => (
  <DrawerClosePrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(drawerTriggerVariants(), className),
    )}
    {...props}
  >
    {children}
  </DrawerClosePrimitive>
));
DrawerTriggerAdapter.displayName = 'DrawerTriggerAdapter';

export interface DrawerOverlayAdapterProps
  extends Omit<DrawerOverlayPrimitiveProps, 'children'> {
  children: React.ReactNode;
}

export const DrawerOverlayAdapter = React.forwardRef<
  HTMLDivElement,
  DrawerOverlayAdapterProps
>(({ className, children, ...props }, ref) => (
  <DrawerOverlayPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(drawerOverlayVariants(), className),
    )}
    {...props}
  >
    {children}
  </DrawerOverlayPrimitive>
));
DrawerOverlayAdapter.displayName = 'DrawerOverlayAdapter';

export interface DrawerContentAdapterProps
  extends Omit<DrawerContentPrimitiveProps, 'className'>,
    DrawerContentVariants {
  className?: string;
}

export const DrawerContentAdapter = React.forwardRef<
  HTMLElement,
  DrawerContentAdapterProps
>(({ className, side, children, ...props }, ref) => (
  <DrawerModalPrimitive className={drawerModalVariants()}>
    <DrawerContentPrimitive
      ref={ref}
      className={cn(drawerContentVariants({ side }), className)}
      {...props}
    >
      {children}
    </DrawerContentPrimitive>
  </DrawerModalPrimitive>
));
DrawerContentAdapter.displayName = 'DrawerContentAdapter';

export const DrawerHeaderAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DrawerSectionPrimitive>
>(({ className, ...props }, ref) => (
  <DrawerSectionPrimitive
    ref={ref}
    className={cn(drawerHeaderVariants(), className)}
    {...props}
  />
));
DrawerHeaderAdapter.displayName = 'DrawerHeaderAdapter';

export const DrawerBodyAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DrawerSectionPrimitive>
>(({ className, ...props }, ref) => (
  <DrawerSectionPrimitive
    ref={ref}
    className={cn(drawerBodyVariants(), className)}
    {...props}
  />
));
DrawerBodyAdapter.displayName = 'DrawerBodyAdapter';

export const DrawerFooterAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DrawerSectionPrimitive>
>(({ className, ...props }, ref) => (
  <DrawerSectionPrimitive
    ref={ref}
    className={cn(drawerFooterVariants(), className)}
    {...props}
  />
));
DrawerFooterAdapter.displayName = 'DrawerFooterAdapter';

export const DrawerTitleAdapter = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof DrawerTitlePrimitive>
>(({ className, ...props }, ref) => (
  <DrawerTitlePrimitive
    ref={ref}
    className={cn(drawerTitleVariants(), className)}
    {...props}
  />
));
DrawerTitleAdapter.displayName = 'DrawerTitleAdapter';

export interface DrawerCloseAdapterProps extends DrawerClosePrimitiveProps {}

export const DrawerCloseAdapter = React.forwardRef<
  HTMLButtonElement,
  DrawerCloseAdapterProps
>(({ className, children, ...props }, ref) => (
  <DrawerClosePrimitive
    ref={ref}
    slot='close'
    className={composeRenderProps(className, (className) =>
      cn(drawerCloseVariants(), className),
    )}
    {...props}
  >
    {children}
  </DrawerClosePrimitive>
));
DrawerCloseAdapter.displayName = 'DrawerCloseAdapter';
