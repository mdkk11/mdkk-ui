import * as React from 'react';
import { cn } from '@/design-system/utils';
import { SidebarTriggerPrimitive } from '../SidebarPrimitive';
import { sidebarTriggerVariants } from '../sidebarStyles';

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
