import { cva } from 'cva';
import * as React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import {
  TooltipContentPrimitive,
  type TooltipContentPrimitiveProps,
  TooltipRootPrimitive,
  type TooltipRootPrimitiveProps,
  TooltipTriggerPrimitive,
  type TooltipTriggerPrimitiveProps,
} from './TooltipPrimitive';

const tooltipTriggerVariants = cva({
  base: 'inline-flex items-center justify-center rounded-none border-[var(--brutal-border-subtle)] bg-outline px-2.5 py-1.5 text-xs font-medium text-outline-foreground transition-colors hover:bg-muted',
});

const tooltipContentVariants = cva({
  base: 'z-50 rounded-none border-[var(--brutal-border-subtle)] border-border bg-foreground px-2 py-1 text-xs text-background shadow-brutal-sm transition duration-150 ease-out data-[entering]:opacity-0 data-[exiting]:opacity-0',
});

export const TooltipRootAdapter = TooltipRootPrimitive;

export interface TooltipTriggerAdapterProps
  extends TooltipTriggerPrimitiveProps {}

export const TooltipTriggerAdapter = React.forwardRef<
  HTMLButtonElement,
  TooltipTriggerAdapterProps
>(({ className, ...props }, ref) => (
  <TooltipTriggerPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(tooltipTriggerVariants(), className),
    )}
    {...props}
  />
));
TooltipTriggerAdapter.displayName = 'TooltipTriggerAdapter';

export interface TooltipContentAdapterProps
  extends TooltipContentPrimitiveProps {}

export const TooltipContentAdapter = React.forwardRef<
  HTMLDivElement,
  TooltipContentAdapterProps
>(({ className, ...props }, ref) => (
  <TooltipContentPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(tooltipContentVariants(), className),
    )}
    {...props}
  />
));
TooltipContentAdapter.displayName = 'TooltipContentAdapter';

export type { TooltipRootPrimitiveProps };
