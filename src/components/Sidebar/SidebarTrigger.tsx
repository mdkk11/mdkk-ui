import * as React from 'react';
import { cn } from '@/design-system/utils';
import { useSidebar } from './SidebarProvider';

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
        className,
      )}
      {...props}
    >
      {props.children || (
        <svg
          xmlns='http://www.w-sc.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='h-4 w-4'
        >
          <title>Toggle Sidebar</title>
          <line x1='3' x2='21' y1='6' y2='6' />
          <line x1='3' x2='21' y1='12' y2='12' />
          <line x1='3' x2='21' y1='18' y2='18' />
        </svg>
      )}
      <span className='sr-only'>Toggle Sidebar</span>
    </button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      type='button'
      data-sidebar='rail'
      title='Toggle Sidebar'
      onClick={toggleSidebar}
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear sm:flex hover:w-6 hover:bg-sidebar-accent cursor-col-resize appearance-none border-none bg-transparent',
        // 'right-0' is usually applied by the parent Sidebar, but we can set defaults here based on standard
        'right-0',
        className,
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = 'SidebarRail';
