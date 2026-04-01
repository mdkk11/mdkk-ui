import * as React from 'react';
import { cn } from '@/design-system/utils';

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar='group'
      className={cn('relative flex w-full min-w-0 flex-col', className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = 'SidebarGroup';

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar='group-label'
      className={cn('flex shrink-0 items-center', className)}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar='group-content'
      className={cn('w-full', className)}
      {...props}
    />
  );
});
SidebarGroupContent.displayName = 'SidebarGroupContent';
