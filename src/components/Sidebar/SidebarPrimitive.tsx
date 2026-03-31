import * as React from 'react';

export type SidebarRootPrimitiveProps = React.ComponentProps<'div'>;
export type SidebarPanelPrimitiveProps = React.ComponentProps<'aside'>;
export type SidebarTriggerPrimitiveProps = React.ComponentProps<'button'>;
export type SidebarNavPrimitiveProps = React.ComponentProps<'nav'>;
export type SidebarListPrimitiveProps = React.ComponentProps<'ul'>;
export type SidebarListItemPrimitiveProps = React.ComponentProps<'li'>;
export type SidebarSectionPrimitiveProps = React.ComponentProps<'div'>;

export const SidebarRootPrimitive = React.forwardRef<
  HTMLDivElement,
  SidebarRootPrimitiveProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));
SidebarRootPrimitive.displayName = 'SidebarRootPrimitive';

export const SidebarPanelPrimitive = React.forwardRef<
  HTMLElement,
  SidebarPanelPrimitiveProps
>(({ className, children, ...props }, ref) => (
  <aside ref={ref} className={className} {...props}>
    {children}
  </aside>
));
SidebarPanelPrimitive.displayName = 'SidebarPanelPrimitive';

export const SidebarTriggerPrimitive = React.forwardRef<
  HTMLButtonElement,
  SidebarTriggerPrimitiveProps
>(({ className, children, ...props }, ref) => (
  <button ref={ref} className={className} {...props}>
    {children}
  </button>
));
SidebarTriggerPrimitive.displayName = 'SidebarTriggerPrimitive';

export const SidebarSectionPrimitive = React.forwardRef<
  HTMLDivElement,
  SidebarSectionPrimitiveProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));
SidebarSectionPrimitive.displayName = 'SidebarSectionPrimitive';

export const SidebarNavPrimitive = React.forwardRef<
  HTMLElement,
  SidebarNavPrimitiveProps
>(({ className, children, ...props }, ref) => (
  <nav ref={ref} className={className} {...props}>
    {children}
  </nav>
));
SidebarNavPrimitive.displayName = 'SidebarNavPrimitive';

export const SidebarListPrimitive = React.forwardRef<
  HTMLUListElement,
  SidebarListPrimitiveProps
>(({ className, children, ...props }, ref) => (
  <ul ref={ref} className={className} {...props}>
    {children}
  </ul>
));
SidebarListPrimitive.displayName = 'SidebarListPrimitive';

export const SidebarListItemPrimitive = React.forwardRef<
  HTMLLIElement,
  SidebarListItemPrimitiveProps
>(({ className, children, ...props }, ref) => (
  <li ref={ref} className={className} {...props}>
    {children}
  </li>
));
SidebarListItemPrimitive.displayName = 'SidebarListItemPrimitive';
