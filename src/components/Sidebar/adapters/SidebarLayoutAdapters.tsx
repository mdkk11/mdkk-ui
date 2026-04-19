import * as React from 'react';
import { cn } from '@/design-system/utils';
import {
  SidebarPanelPrimitive,
  SidebarRootPrimitive,
  SidebarSectionPrimitive,
} from '../SidebarPrimitive';
import {
  type SidebarPanelVariants,
  type SidebarShellVariants,
  sidebarPanelVariants,
  sidebarShellVariants,
} from '../sidebarStyles';

export interface SidebarShellAdapterProps
  extends Omit<React.ComponentProps<'div'>, 'children'>,
    SidebarShellVariants {
  children: React.ReactNode;
}

export const SidebarShellAdapter = React.forwardRef<
  HTMLDivElement,
  SidebarShellAdapterProps
>(({ side = 'left', className, children, ...props }, ref) => (
  <SidebarRootPrimitive
    ref={ref}
    className={cn(sidebarShellVariants({ side }), className)}
    {...props}
  >
    {children}
  </SidebarRootPrimitive>
));
SidebarShellAdapter.displayName = 'SidebarShellAdapter';

export interface SidebarPanelAdapterProps
  extends Omit<React.ComponentProps<'aside'>, 'children'>,
    SidebarPanelVariants {
  children: React.ReactNode;
  width: number;
}

export const SidebarPanelAdapter = React.forwardRef<
  HTMLElement,
  SidebarPanelAdapterProps
>(
  (
    {
      side = 'left',
      tone = 'subtle',
      state = 'expanded',
      className,
      width,
      children,
      style,
      ...props
    },
    ref,
  ) => (
    <SidebarPanelPrimitive
      ref={ref}
      className={cn(sidebarPanelVariants({ side, tone, state }), className)}
      style={{
        width: `${width}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
        flexBasis: `${width}px`,
        ...(style ?? {}),
      }}
      data-state={state}
      data-side={side}
      {...props}
    >
      {children}
    </SidebarPanelPrimitive>
  ),
);
SidebarPanelAdapter.displayName = 'SidebarPanelAdapter';

export const SidebarSectionAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <SidebarSectionPrimitive
    ref={ref}
    className={cn('flex shrink-0 flex-col', className)}
    {...props}
  />
));
SidebarSectionAdapter.displayName = 'SidebarSectionAdapter';

export const SidebarHeaderAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <SidebarSectionPrimitive
    ref={ref}
    className={cn('brutal-section-divider p-3', className)}
    {...props}
  />
));
SidebarHeaderAdapter.displayName = 'SidebarHeaderAdapter';

export const SidebarFooterAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <SidebarSectionPrimitive
    ref={ref}
    className={cn('brutal-footer-divider p-3', className)}
    {...props}
  />
));
SidebarFooterAdapter.displayName = 'SidebarFooterAdapter';

export const SidebarContentAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <SidebarSectionPrimitive
    ref={ref}
    className={cn('min-h-0 flex-1 overflow-auto p-3', className)}
    {...props}
  />
));
SidebarContentAdapter.displayName = 'SidebarContentAdapter';
