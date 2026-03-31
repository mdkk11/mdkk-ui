import * as React from 'react';
import { cn } from '@/design-system/utils';
import {
  SidebarContentAdapter,
  SidebarItemButtonAdapter,
  SidebarListAdapter,
  SidebarListItemAdapter,
  SidebarNavAdapter,
  SidebarPanelAdapter,
  SidebarSectionAdapter,
  SidebarShellAdapter,
  SidebarTriggerAdapter,
} from './SidebarAdapter';

type SidebarSide = 'left' | 'right';

type SidebarRootContextValue = {
  isCollapsed: boolean;
  setCollapsed: (next: boolean) => void;
  toggle: () => void;
  width: number;
  setWidth: (next: number) => void;
  collapsedWidth: number;
  side: SidebarSide;
  isResizable: boolean;
  minWidth: number;
  maxWidth: number;
};

const SidebarRootContext = React.createContext<SidebarRootContextValue | null>(
  null,
);

const useSidebarRootContext = () => {
  const context = React.useContext(SidebarRootContext);
  if (!context) {
    throw new Error(
      'Sidebar compound components must be used inside Sidebar.Root.',
    );
  }
  return context;
};

export interface SidebarRootProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  side?: SidebarSide;
  isCollapsed?: boolean;
  defaultIsCollapsed?: boolean;
  onCollapsedChange?: (isCollapsed: boolean) => void;
  defaultWidth?: number;
  collapsedWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  isResizable?: boolean;
  onWidthChange?: (width: number) => void;
}

const SidebarRoot = React.forwardRef<HTMLDivElement, SidebarRootProps>(
  (
    {
      children,
      id,
      className,
      style,
      side = 'left',
      isCollapsed,
      defaultIsCollapsed = false,
      onCollapsedChange,
      defaultWidth = 280,
      collapsedWidth = 0,
      minWidth = 220,
      maxWidth = 420,
      isResizable = true,
      onWidthChange,
    },
    ref,
  ) => {
    const [internalCollapsed, setInternalCollapsed] =
      React.useState(defaultIsCollapsed);
    const [width, setWidthState] = React.useState(defaultWidth);
    const collapsed = isCollapsed ?? internalCollapsed;

    const setCollapsed = React.useCallback(
      (next: boolean) => {
        if (isCollapsed === undefined) {
          setInternalCollapsed(next);
        }
        onCollapsedChange?.(next);
      },
      [isCollapsed, onCollapsedChange],
    );

    const setWidth = React.useCallback(
      (next: number) => {
        const clamped = Math.min(maxWidth, Math.max(minWidth, next));
        setWidthState(clamped);
        onWidthChange?.(clamped);
      },
      [maxWidth, minWidth, onWidthChange],
    );

    const toggle = React.useCallback(() => {
      setCollapsed(!collapsed);
    }, [collapsed, setCollapsed]);

    const contextValue = React.useMemo<SidebarRootContextValue>(
      () => ({
        isCollapsed: collapsed,
        setCollapsed,
        toggle,
        width,
        setWidth,
        collapsedWidth,
        side,
        isResizable,
        minWidth,
        maxWidth,
      }),
      [
        collapsed,
        setCollapsed,
        toggle,
        width,
        setWidth,
        collapsedWidth,
        side,
        isResizable,
        minWidth,
        maxWidth,
      ],
    );

    return (
      <SidebarRootContext.Provider value={contextValue}>
        <SidebarShellAdapter
          ref={ref}
          id={id}
          side={side}
          className={className}
          style={style}
        >
          {children}
        </SidebarShellAdapter>
      </SidebarRootContext.Provider>
    );
  },
);
SidebarRoot.displayName = 'Sidebar.Root';

export interface SidebarPanelProps {
  children: React.ReactNode;
  className?: string;
  tone?: 'subtle' | 'solid';
}

const SidebarPanel = React.forwardRef<HTMLElement, SidebarPanelProps>(
  ({ children, className, tone = 'subtle' }, ref) => {
    const { isCollapsed, width, collapsedWidth, side } =
      useSidebarRootContext();
    const resolvedWidth = isCollapsed ? collapsedWidth : width;
    return (
      <SidebarPanelAdapter
        ref={ref}
        side={side}
        state={isCollapsed ? 'collapsed' : 'expanded'}
        width={resolvedWidth}
        tone={tone}
        className={className}
        aria-hidden={isCollapsed}
      >
        <div
          aria-hidden={isCollapsed}
          className={cn(
            'flex h-full min-h-0 flex-col transition-[opacity,transform,visibility] duration-[180ms] ease-out',
            isCollapsed
              ? cn(
                  'pointer-events-none invisible opacity-0',
                  side === 'left' ? '-translate-x-2' : 'translate-x-2',
                )
              : 'visible translate-x-0 opacity-100',
          )}
          style={{
            transitionDelay: isCollapsed ? '0ms, 0ms, 180ms' : '0ms',
          }}
        >
          {children}
        </div>
      </SidebarPanelAdapter>
    );
  },
);
SidebarPanel.displayName = 'Sidebar.Panel';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <SidebarSectionAdapter
    ref={ref}
    className={cn('border-b border-border', className)}
    {...props}
  />
));
SidebarHeader.displayName = 'Sidebar.Header';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <SidebarContentAdapter ref={ref} className={className} {...props} />
));
SidebarContent.displayName = 'Sidebar.Content';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <SidebarSectionAdapter
    ref={ref}
    className={cn('border-t border-border', className)}
    {...props}
  />
));
SidebarFooter.displayName = 'Sidebar.Footer';

export interface SidebarTriggerProps
  extends Omit<React.ComponentProps<'button'>, 'onClick'> {
  onPress?: () => void;
  size?: 'sm' | 'md';
}

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(({ children, onPress, className, size = 'md', ...props }, ref) => {
  const { isCollapsed, toggle } = useSidebarRootContext();
  return (
    <SidebarTriggerAdapter
      ref={ref}
      className={className}
      size={size}
      aria-expanded={!isCollapsed}
      onClick={() => {
        onPress?.();
        toggle();
      }}
      {...props}
    >
      {children ?? <span>{isCollapsed ? 'Open' : 'Close'}</span>}
    </SidebarTriggerAdapter>
  );
});
SidebarTrigger.displayName = 'Sidebar.Trigger';

const SidebarResizeHandle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { isCollapsed, setWidth, side, isResizable, minWidth, maxWidth } =
    useSidebarRootContext();

  const handleMouseDown = React.useCallback(() => {
    if (!isResizable || isCollapsed) return;

    const handleMove = (event: MouseEvent) => {
      let next = event.clientX;
      if (side === 'right') {
        next = window.innerWidth - event.clientX;
      }
      setWidth(Math.min(maxWidth, Math.max(minWidth, next)));
    };

    const handleUp = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  }, [isResizable, isCollapsed, side, setWidth, minWidth, maxWidth]);

  if (!isResizable) return null;

  return (
    <button
      ref={ref}
      type='button'
      aria-label='Resize sidebar'
      onMouseDown={handleMouseDown}
      className={cn(
        'absolute top-0 h-full w-1 cursor-ew-resize bg-transparent transition hover:bg-primary/20',
        side === 'left' ? 'right-0' : 'left-0',
        className,
      )}
      {...props}
    />
  );
});
SidebarResizeHandle.displayName = 'Sidebar.ResizeHandle';

const SidebarNav = React.forwardRef<HTMLElement, React.ComponentProps<'nav'>>(
  ({ className, ...props }, ref) => (
    <SidebarNavAdapter
      ref={ref}
      className={className}
      role='navigation'
      {...props}
    />
  ),
);
SidebarNav.displayName = 'Sidebar.Nav';

const SidebarList = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <SidebarListAdapter ref={ref} className={className} {...props} />
));
SidebarList.displayName = 'Sidebar.List';

const SidebarItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <SidebarListItemAdapter ref={ref} className={className} {...props} />
  ),
);
SidebarItem.displayName = 'Sidebar.Item';

export interface SidebarItemButtonProps
  extends Omit<React.ComponentProps<'button'>, 'onClick'> {
  isActive?: boolean;
  onPress?: () => void;
}

const SidebarItemButton = React.forwardRef<
  HTMLButtonElement,
  SidebarItemButtonProps
>(({ onPress, ...props }, ref) => (
  <SidebarItemButtonAdapter ref={ref} onPress={onPress} {...props} />
));
SidebarItemButton.displayName = 'Sidebar.ItemButton';

export const Sidebar = {
  Root: SidebarRoot,
  Panel: SidebarPanel,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Trigger: SidebarTrigger,
  ResizeHandle: SidebarResizeHandle,
  Nav: SidebarNav,
  List: SidebarList,
  Item: SidebarItem,
  ItemButton: SidebarItemButton,
};
