import { cva } from 'cva';
import * as React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import {
  TooltipArrowPrimitive,
  type TooltipArrowPrimitiveProps,
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
  base: 'z-50 rounded-none border-[var(--brutal-border-subtle)] border-border bg-foreground px-2 py-1 text-xs text-background transition duration-150 ease-out data-[entering]:opacity-0 data-[exiting]:opacity-0',
});

const tooltipArrowVariants = cva({
  base: 'block size-2 rotate-45 border-t border-l border-border bg-foreground',
});

export const TooltipRootAdapter = ({
  delay = 1500,
  closeDelay = 500,
  ...props
}: TooltipRootPrimitiveProps) => (
  <TooltipRootPrimitive delay={delay} closeDelay={closeDelay} {...props} />
);

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

export interface TooltipArrowAdapterProps extends TooltipArrowPrimitiveProps {}

export const TooltipArrowAdapter = React.forwardRef<
  HTMLDivElement,
  TooltipArrowAdapterProps
>(({ className, children, ...props }, ref) => (
  <TooltipArrowPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(tooltipArrowVariants(), className),
    )}
    {...props}
  >
    {children}
  </TooltipArrowPrimitive>
));
TooltipArrowAdapter.displayName = 'TooltipArrowAdapter';

export type { TooltipRootPrimitiveProps };
