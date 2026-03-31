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
      className={cn(
        'relative flex w-full min-w-0 flex-col gap-1.5 px-2 py-1.5',
        className,
      )}
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
      className={cn(
        'flex h-6 shrink-0 items-center rounded-sm px-2 text-[11px] font-semibold leading-none tracking-wide text-muted-foreground outline-none ring-sidebar-ring focus-visible:ring-2',
        className,
      )}
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
      className={cn('w-full text-sm leading-5', className)}
      {...props}
    />
  );
});
SidebarGroupContent.displayName = 'SidebarGroupContent';
