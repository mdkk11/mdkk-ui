import * as React from 'react';
import { cn } from '@/design-system/utils';
import {
  SidebarListItemPrimitive,
  SidebarListPrimitive,
  SidebarNavPrimitive,
  SidebarTriggerPrimitive,
} from '../SidebarPrimitive';
import { sidebarItemButtonVariants } from '../sidebarStyles';

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
  <SidebarListItemPrimitive
    ref={ref}
    className={cn('list-none', className)}
    {...props}
  />
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
    className={cn(
      'brutal-chip w-full px-2 py-1.5 text-left text-xs transition-colors',
      sidebarItemButtonVariants({ isActive }),
      className,
    )}
    onClick={onPress}
    {...props}
  />
));
SidebarItemButtonAdapter.displayName = 'SidebarItemButtonAdapter';
