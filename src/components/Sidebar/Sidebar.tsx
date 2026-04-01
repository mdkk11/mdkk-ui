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
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from './SidebarGroup';

type SidebarSide = 'left' | 'right';

type SidebarLayoutContextValue = {
  side: SidebarSide;
};

type SidebarStateContextValue = {
  isCollapsed: boolean;
  setCollapsed: (next: boolean) => void;
  toggle: () => void;
  isMobile: boolean;
  isMobileOpen: boolean;
  setMobileOpen: (next: boolean) => void;
  width: number;
  setWidth: (next: number) => void;
  collapsedWidth: number;
  isResizable: boolean;
  minWidth: number;
  maxWidth: number;
};

const SidebarLayoutContext =
  React.createContext<SidebarLayoutContextValue | null>(null);
const SidebarStateContext =
  React.createContext<SidebarStateContextValue | null>(null);

const useSidebarLayoutContext = () => {
  const context = React.useContext(SidebarLayoutContext);
  if (!context) {
    throw new Error(
      'Sidebar layout components must be used inside Sidebar.Root.',
    );
  }
  return context;
};

const useSidebarStateContext = () => {
  const context = React.useContext(SidebarStateContext);
  if (!context) {
    throw new Error(
      'Sidebar state components must be used inside Sidebar.Provider or Sidebar.Root.',
    );
  }
  return context;
};

export const useSidebar = () => useSidebarStateContext();

const useIsMobileViewport = (breakpoint: number) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const query = window.matchMedia(
      `(max-width: ${breakpoint}px) and (hover: none) and (pointer: coarse)`,
    );
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    setIsMobile(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
};

interface SidebarStateProps {
  isCollapsed?: boolean;
  defaultIsCollapsed?: boolean;
  onCollapsedChange?: (isCollapsed: boolean) => void;
  defaultWidth?: number;
  collapsedWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  isResizable?: boolean;
  onWidthChange?: (width: number) => void;
  mobileBreakpoint?: number;
  defaultMobileOpen?: boolean;
  onMobileOpenChange?: (isOpen: boolean) => void;
}

const useSidebarState = ({
  isCollapsed,
  defaultIsCollapsed = false,
  onCollapsedChange,
  defaultWidth = 280,
  collapsedWidth = 0,
  minWidth = 220,
  maxWidth = 420,
  isResizable = true,
  onWidthChange,
  mobileBreakpoint = 768,
  defaultMobileOpen = false,
  onMobileOpenChange,
}: SidebarStateProps): SidebarStateContextValue => {
  const [internalCollapsed, setInternalCollapsed] =
    React.useState(defaultIsCollapsed);
  const [isMobileOpen, setIsMobileOpen] = React.useState(defaultMobileOpen);
  const [width, setWidthState] = React.useState(defaultWidth);
  const isMobile = useIsMobileViewport(mobileBreakpoint);
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

  const setMobileOpen = React.useCallback(
    (next: boolean) => {
      setIsMobileOpen(next);
      onMobileOpenChange?.(next);
    },
    [onMobileOpenChange],
  );

  React.useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile, setMobileOpen]);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!(isMobile && isMobileOpen)) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobile, isMobileOpen]);

  React.useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileOpen, setMobileOpen]);

  const toggle = React.useCallback(() => {
    if (isMobile) {
      setMobileOpen(!isMobileOpen);
      return;
    }
    setCollapsed(!collapsed);
  }, [collapsed, isMobile, isMobileOpen, setCollapsed, setMobileOpen]);

  return React.useMemo(
    () => ({
      isCollapsed: collapsed,
      setCollapsed,
      toggle,
      isMobile,
      isMobileOpen,
      setMobileOpen,
      width,
      setWidth,
      collapsedWidth,
      isResizable,
      minWidth,
      maxWidth,
    }),
    [
      collapsed,
      setCollapsed,
      toggle,
      isMobile,
      isMobileOpen,
      setMobileOpen,
      width,
      setWidth,
      collapsedWidth,
      isResizable,
      minWidth,
      maxWidth,
    ],
  );
};

export interface SidebarProviderProps extends SidebarStateProps {
  children: React.ReactNode;
}

export const SidebarProvider = ({
  children,
  ...stateProps
}: SidebarProviderProps) => {
  const state = useSidebarState(stateProps);
  return (
    <SidebarStateContext.Provider value={state}>
      {children}
    </SidebarStateContext.Provider>
  );
};

export interface SidebarRootProps extends SidebarStateProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  side?: SidebarSide;
}

const SidebarRoot = React.forwardRef<HTMLDivElement, SidebarRootProps>(
  ({ children, id, className, style, side = 'left', ...stateProps }, ref) => {
    const parentState = React.useContext(SidebarStateContext);
    const localState = useSidebarState(stateProps);

    const shell = (
      <SidebarLayoutContext.Provider value={{ side }}>
        <SidebarShellAdapter
          ref={ref}
          id={id}
          side={side}
          className={className}
          style={style}
        >
          {children}
        </SidebarShellAdapter>
      </SidebarLayoutContext.Provider>
    );

    if (parentState) return shell;

    return (
      <SidebarStateContext.Provider value={localState}>
        {shell}
      </SidebarStateContext.Provider>
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
    const {
      isCollapsed,
      isMobile,
      isMobileOpen,
      setMobileOpen,
      width,
      collapsedWidth,
    } = useSidebarStateContext();
    const { side } = useSidebarLayoutContext();
    const isOpen = isMobile ? isMobileOpen : !isCollapsed;
    const resolvedWidth = isCollapsed ? collapsedWidth : width;
    const contentHidden = !isOpen;
    const previousIsOpenRef = React.useRef(isOpen);
    const isVisibilityChanging = previousIsOpenRef.current !== isOpen;
    const shouldDisableMotion = !isVisibilityChanging;

    React.useEffect(() => {
      previousIsOpenRef.current = isOpen;
    }, [isOpen]);

    const panelMotionStyle: React.CSSProperties = {
      transitionDuration: shouldDisableMotion ? '0ms' : undefined,
      transitionDelay:
        shouldDisableMotion || !isMobile || !contentHidden ? '0ms' : '120ms',
      ...(isMobile ? { width: `min(${width}px, 90vw)` } : {}),
    };

    return (
      <>
        {isMobile ? (
          <button
            type='button'
            aria-label='Close sidebar'
            aria-hidden={!isMobileOpen}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'fixed inset-0 z-40 bg-black/40 transition-opacity duration-220 ease-out',
              isMobileOpen
                ? 'pointer-events-auto visible opacity-100'
                : 'pointer-events-none invisible opacity-0',
            )}
          />
        ) : null}
        <SidebarPanelAdapter
          ref={ref}
          side={side}
          state={isOpen ? 'expanded' : 'collapsed'}
          width={isMobile ? width : resolvedWidth}
          tone={tone}
          className={cn(
            className,
            isMobile &&
              cn(
                'fixed inset-y-0 z-50 transition-transform duration-240 ease-[cubic-bezier(0.33,1,0.68,1)]',
                side === 'left'
                  ? cn(
                      'left-0',
                      isMobileOpen ? 'translate-x-0' : '-translate-x-full',
                    )
                  : cn(
                      'right-0',
                      isMobileOpen ? 'translate-x-0' : 'translate-x-full',
                    ),
              ),
          )}
          style={panelMotionStyle}
          aria-hidden={!isOpen}
        >
          <div
            aria-hidden={contentHidden}
            className={cn(
              'flex h-full min-h-0 flex-col will-change-[opacity,transform] transition-[opacity,transform,visibility] ease-[cubic-bezier(0.4,0,0.2,1)]',
              contentHidden
                ? cn(
                    'pointer-events-none invisible opacity-0',
                    side === 'left' ? '-translate-x-2' : 'translate-x-2',
                  )
                : 'visible translate-x-0 opacity-100',
            )}
            style={{
              transitionDuration: contentHidden
                ? '120ms, 180ms, 0ms'
                : '180ms, 240ms, 0ms',
              transitionDelay: contentHidden
                ? '0ms, 0ms, 180ms'
                : '0ms, 0ms, 0ms',
            }}
          >
            {children}
          </div>
        </SidebarPanelAdapter>
      </>
    );
  },
);
SidebarPanel.displayName = 'Sidebar.Panel';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <SidebarSectionAdapter ref={ref} className={className} {...props} />
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
  <SidebarSectionAdapter ref={ref} className={className} {...props} />
));
SidebarFooter.displayName = 'Sidebar.Footer';

export interface SidebarTriggerProps extends React.ComponentProps<'button'> {
  onPress?: () => void;
}

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(({ children, onPress, onClick, ...props }, ref) => {
  const { isCollapsed, isMobile, isMobileOpen, toggle } =
    useSidebarStateContext();
  return (
    <SidebarTriggerAdapter
      ref={ref}
      aria-expanded={isMobile ? isMobileOpen : !isCollapsed}
      onClick={(event) => {
        onClick?.(event);
        onPress?.();
        toggle();
      }}
      {...props}
    >
      {children}
    </SidebarTriggerAdapter>
  );
});
SidebarTrigger.displayName = 'Sidebar.Trigger';

const SidebarResizeHandle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { isCollapsed, isMobile, setWidth, isResizable, minWidth, maxWidth } =
    useSidebarStateContext();
  const { side } = useSidebarLayoutContext();

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

  if (!isResizable || isMobile) return null;

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
  Provider: SidebarProvider,
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
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  GroupContent: SidebarGroupContent,
  useSidebar,
};
