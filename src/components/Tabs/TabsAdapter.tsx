import { cva } from 'cva';
import * as React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import {
  TabsListPrimitive,
  type TabsListPrimitiveProps,
  TabsPanelPrimitive,
  type TabsPanelPrimitiveProps,
  TabsRootPrimitive,
  type TabsRootPrimitiveProps,
  TabsTabPrimitive,
  type TabsTabPrimitiveProps,
} from './TabsPrimitive';

const tabsRootVariants = cva({
  base: 'w-full',
});

const tabsListVariants = cva({
  base: 'inline-flex items-center rounded-none border-[var(--brutal-border-subtle)] border-border bg-muted p-1',
});

const tabsTabVariants = cva({
  base: 'rounded-none border-[var(--brutal-border-subtle)] border-transparent px-3 py-1.5 text-sm font-medium outline-none transition-colors data-[selected]:border-border data-[selected]:bg-background data-[focused]:ring-2 data-[focused]:ring-ring',
});

const tabsPanelVariants = cva({
  base: 'mt-3 rounded-none border-[var(--brutal-border-default)] border-border bg-background p-4 text-sm',
});

export interface TabsRootAdapterProps
  extends Omit<TabsRootPrimitiveProps, 'className'> {
  className?: string;
}

export const TabsRootAdapter = React.forwardRef<
  HTMLDivElement,
  TabsRootAdapterProps
>(({ className, ...props }, ref) => (
  <TabsRootPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(tabsRootVariants(), className),
    )}
    {...props}
  />
));
TabsRootAdapter.displayName = 'TabsRootAdapter';

export interface TabsListAdapterProps extends TabsListPrimitiveProps {}

export const TabsListAdapter = React.forwardRef<
  HTMLDivElement,
  TabsListAdapterProps
>(({ className, ...props }, ref) => (
  <TabsListPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(tabsListVariants(), className),
    )}
    {...props}
  />
));
TabsListAdapter.displayName = 'TabsListAdapter';

export interface TabsTabAdapterProps extends TabsTabPrimitiveProps {}

export const TabsTabAdapter = React.forwardRef<
  HTMLDivElement,
  TabsTabAdapterProps
>(({ className, ...props }, ref) => (
  <TabsTabPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(tabsTabVariants(), className),
    )}
    {...props}
  />
));
TabsTabAdapter.displayName = 'TabsTabAdapter';

export interface TabsPanelAdapterProps extends TabsPanelPrimitiveProps {}

export const TabsPanelAdapter = React.forwardRef<
  HTMLDivElement,
  TabsPanelAdapterProps
>(({ className, ...props }, ref) => (
  <TabsPanelPrimitive
    ref={ref}
    className={composeRenderProps(className, (className) =>
      cn(tabsPanelVariants(), className),
    )}
    {...props}
  />
));
TabsPanelAdapter.displayName = 'TabsPanelAdapter';
