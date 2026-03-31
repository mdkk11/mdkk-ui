import * as React from 'react';
import { cn } from '@/design-system/utils';
import {
  SidebarListItemPrimitive,
  SidebarListPrimitive,
  SidebarNavPrimitive,
  SidebarPanelPrimitive,
  SidebarRootPrimitive,
  SidebarSectionPrimitive,
  SidebarTriggerPrimitive,
} from './SidebarPrimitive';
import {
  type SidebarPanelVariants,
  type SidebarShellVariants,
  sidebarItemButtonVariants,
  sidebarPanelVariants,
  sidebarShellVariants,
  sidebarTriggerVariants,
} from './sidebarStyles';

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
>(({ side = 'left', tone = 'subtle', state = 'expanded', className, width, children, ...props }, ref) => (
  <SidebarPanelPrimitive
    ref={ref}
    className={cn(sidebarPanelVariants({ side, tone, state }), className)}
    style={{ width: `${width}px`, ...(props.style ?? {}) }}
    data-state={state}
    data-side={side}
    {...props}
  >
    {children}
  </SidebarPanelPrimitive>
));
SidebarPanelAdapter.displayName = 'SidebarPanelAdapter';

export const SidebarSectionAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <SidebarSectionPrimitive ref={ref} className={cn('p-3', className)} {...props} />
));
SidebarSectionAdapter.displayName = 'SidebarSectionAdapter';

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

export const SidebarTriggerAdapter = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { size?: 'sm' | 'md' }
>(({ className, size = 'md', ...props }, ref) => (
  <SidebarTriggerPrimitive
    ref={ref}
    type='button'
    className={cn(sidebarTriggerVariants({ size }), className)}
    {...props}
  />
));
SidebarTriggerAdapter.displayName = 'SidebarTriggerAdapter';

export const SidebarNavAdapter = React.forwardRef<
  HTMLElement,
  React.ComponentProps<'nav'>
>(({ className, ...props }, ref) => (
  <SidebarNavPrimitive
    ref={ref}
    className={cn('flex flex-col gap-1', className)}
    {...props}
  />
));
SidebarNavAdapter.displayName = 'SidebarNavAdapter';

export const SidebarListAdapter = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <SidebarListPrimitive
    ref={ref}
    className={cn('flex flex-col gap-1', className)}
    {...props}
  />
));
SidebarListAdapter.displayName = 'SidebarListAdapter';

export const SidebarListItemAdapter = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <SidebarListItemPrimitive ref={ref} className={cn('list-none', className)} {...props} />
));
SidebarListItemAdapter.displayName = 'SidebarListItemAdapter';

export interface SidebarItemButtonAdapterProps
  extends Omit<React.ComponentProps<'button'>, 'onClick'> {
  isActive?: boolean;
  onPress?: () => void;
}

export const SidebarItemButtonAdapter = React.forwardRef<
  HTMLButtonElement,
  SidebarItemButtonAdapterProps
>(({ className, isActive = false, onPress, ...props }, ref) => (
  <SidebarTriggerPrimitive
    ref={ref}
    type='button'
    className={cn(sidebarItemButtonVariants({ isActive }), className)}
    onClick={onPress}
    {...props}
  />
));
SidebarItemButtonAdapter.displayName = 'SidebarItemButtonAdapter';
