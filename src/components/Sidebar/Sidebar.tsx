import * as React from 'react';
import { cn } from '@/design-system/utils';
import {
  SidebarContentAdapter,
  SidebarFooterAdapter,
  SidebarHeaderAdapter,
  SidebarItemButtonAdapter,
  SidebarListAdapter,
  SidebarListItemAdapter,
  SidebarNavAdapter,
  SidebarPanelAdapter,
  SidebarShellAdapter,
  SidebarTriggerAdapter,
} from './SidebarAdapter';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from './SidebarGroup';

type SidebarSide = 'left' | 'right';
type SidebarMobileDetection = 'viewport' | 'touch-viewport';

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
  isMobileAutoCloseOnItemPress: boolean;
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

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const getFocusableElements = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute('disabled'),
  );

const mergeRefs =
  <T,>(...refs: Array<React.Ref<T> | undefined>) =>
  (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && 'current' in ref) {
        ref.current = node;
      }
    }
  };

const isHTMLElement = (value: unknown): value is HTMLElement =>
  value instanceof HTMLElement;

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

const useIsMobileViewport = (
  breakpoint: number,
  detection: SidebarMobileDetection,
) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const query = window.matchMedia(
      detection === 'touch-viewport'
        ? `(max-width: ${breakpoint}px) and (hover: none) and (pointer: coarse)`
        : `(max-width: ${breakpoint}px)`,
    );
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    setIsMobile(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [breakpoint, detection]);

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
  mobileDetection?: SidebarMobileDetection;
  defaultMobileOpen?: boolean;
  onMobileOpenChange?: (isOpen: boolean) => void;
  isMobileAutoCloseOnItemPress?: boolean;
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
  mobileDetection = 'viewport',
  defaultMobileOpen = false,
  onMobileOpenChange,
  isMobileAutoCloseOnItemPress = false,
}: SidebarStateProps): SidebarStateContextValue => {
  const [internalCollapsed, setInternalCollapsed] =
    React.useState(defaultIsCollapsed);
  const [isMobileOpen, setIsMobileOpen] = React.useState(defaultMobileOpen);
  const [width, setWidthState] = React.useState(defaultWidth);
  const isMobile = useIsMobileViewport(mobileBreakpoint, mobileDetection);
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
      isMobileAutoCloseOnItemPress,
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
      isMobileAutoCloseOnItemPress,
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
    const panelRef = React.useRef<HTMLElement | null>(null);
    const overlayRef = React.useRef<HTMLButtonElement | null>(null);
    const mergedPanelRef = mergeRefs(ref, panelRef);
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

    React.useEffect(() => {
      if (!isMobile || !isMobileOpen) return;

      const panelNode = panelRef.current;
      if (!panelNode) return;

      const parentNode = panelNode.parentElement;
      if (!parentNode) return;

      const excludedNodes = new Set<Node>([panelNode]);
      if (overlayRef.current) {
        excludedNodes.add(overlayRef.current);
      }

      const siblings = Array.from(parentNode.children).filter(
        (element) => !excludedNodes.has(element),
      );
      const previousStates = siblings.map((element) => ({
        element,
        ariaHidden: element.getAttribute('aria-hidden'),
        inert: element.hasAttribute('inert'),
      }));

      for (const element of siblings) {
        element.setAttribute('aria-hidden', 'true');
        element.setAttribute('inert', '');
      }

      return () => {
        for (const previous of previousStates) {
          if (previous.ariaHidden === null) {
            previous.element.removeAttribute('aria-hidden');
          } else {
            previous.element.setAttribute('aria-hidden', previous.ariaHidden);
          }

          if (previous.inert) {
            previous.element.setAttribute('inert', '');
          } else {
            previous.element.removeAttribute('inert');
          }
        }
      };
    }, [isMobile, isMobileOpen]);

    React.useEffect(() => {
      if (!isMobile || !isMobileOpen) return;

      const panelNode = panelRef.current;
      if (!panelNode) return;

      const previousFocusedElement = isHTMLElement(document.activeElement)
        ? document.activeElement
        : null;

      const focusFirstElement = () => {
        const focusableElements = getFocusableElements(panelNode);
        const nextFocusableElement = focusableElements[0] ?? panelNode;
        nextFocusableElement.focus({ preventScroll: true });
      };

      focusFirstElement();

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          setMobileOpen(false);
          return;
        }

        if (event.key !== 'Tab') return;

        const focusableElements = getFocusableElements(panelNode);
        const activeElement = document.activeElement;
        const firstFocusableElement = focusableElements[0] ?? panelNode;
        const lastFocusableElement =
          focusableElements[focusableElements.length - 1] ?? panelNode;

        if (
          !isHTMLElement(activeElement) ||
          !panelNode.contains(activeElement)
        ) {
          event.preventDefault();
          if (event.shiftKey) {
            lastFocusableElement.focus({ preventScroll: true });
          } else {
            firstFocusableElement.focus({ preventScroll: true });
          }
          return;
        }

        if (event.shiftKey && activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus({ preventScroll: true });
        } else if (!event.shiftKey && activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus({ preventScroll: true });
        }
      };

      const handleFocusIn = (event: FocusEvent) => {
        const target = event.target;
        if (!(target instanceof Node) || panelNode.contains(target)) return;

        const focusableElements = getFocusableElements(panelNode);
        const nextFocusableElement = focusableElements[0] ?? panelNode;
        nextFocusableElement.focus({ preventScroll: true });
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('focusin', handleFocusIn);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('focusin', handleFocusIn);
        if (
          isHTMLElement(previousFocusedElement) &&
          previousFocusedElement.isConnected
        ) {
          previousFocusedElement.focus({ preventScroll: true });
        }
      };
    }, [isMobile, isMobileOpen, setMobileOpen]);

    return (
      <>
        {isMobile ? (
          <button
            ref={overlayRef}
            type='button'
            aria-hidden='true'
            tabIndex={-1}
            data-sidebar-overlay
            onClick={() => setMobileOpen(false)}
            onMouseDown={(event) => event.preventDefault()}
            className={cn(
              'fixed inset-0 z-40 bg-black/40 transition-opacity duration-220 ease-out',
              isMobileOpen
                ? 'pointer-events-auto visible opacity-100'
                : 'pointer-events-none invisible opacity-0',
            )}
          />
        ) : null}
        <SidebarPanelAdapter
          ref={mergedPanelRef}
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
          role={isMobile && isMobileOpen ? 'dialog' : undefined}
          aria-modal={isMobile && isMobileOpen ? true : undefined}
          aria-label={isMobile && isMobileOpen ? 'Sidebar' : undefined}
          tabIndex={isMobile && isMobileOpen ? -1 : undefined}
          aria-hidden={!isOpen}
        >
          <div
            aria-hidden={contentHidden}
            className={cn(
              'flex h-full min-h-0 flex-col will-change-[opacity] transition-[opacity,visibility] ease-[cubic-bezier(0.4,0,0.2,1)]',
              contentHidden
                ? 'pointer-events-none invisible opacity-0'
                : 'visible opacity-100',
            )}
            style={{
              transitionDuration: contentHidden ? '120ms, 0ms' : '180ms, 0ms',
              transitionDelay: contentHidden ? '0ms, 180ms' : '0ms, 0ms',
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
  <SidebarHeaderAdapter ref={ref} className={className} {...props} />
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
  <SidebarFooterAdapter ref={ref} className={className} {...props} />
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
      aria-haspopup={isMobile ? 'dialog' : undefined}
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
>(({ onPress, ...props }, ref) => {
  const {
    isMobile,
    isMobileOpen,
    setMobileOpen,
    isMobileAutoCloseOnItemPress,
  } = useSidebarStateContext();

  return (
    <SidebarItemButtonAdapter
      ref={ref}
      onPress={() => {
        onPress?.();
        if (isMobileAutoCloseOnItemPress && isMobile && isMobileOpen) {
          setMobileOpen(false);
        }
      }}
      {...props}
    />
  );
});
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
