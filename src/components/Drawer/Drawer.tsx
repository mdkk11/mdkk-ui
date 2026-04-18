import * as React from 'react';
import {
  DrawerBodyAdapter,
  DrawerCloseAdapter,
  DrawerContentAdapter,
  DrawerFooterAdapter,
  DrawerHeaderAdapter,
  DrawerOverlayAdapter,
  DrawerRootAdapter,
  DrawerTitleAdapter,
  DrawerTriggerAdapter,
} from './DrawerAdapter';

type DrawerButtonDOMProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled'
>;

export interface DrawerPressEvent {
  target: EventTarget | null;
  pointerType?: string;
  [key: string]: unknown;
}

export interface DrawerRootProps {
  children: React.ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

export interface DrawerTriggerProps extends DrawerButtonDOMProps {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  onPress?: (event: DrawerPressEvent) => void;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_triggerProps?: Record<string, unknown>;
}

export interface DrawerOverlayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {
  children: React.ReactNode;
  className?: string;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  shouldCloseOnInteractOutside?: (element: Element) => boolean;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_overlayProps?: Record<string, unknown>;
}

export interface DrawerContentProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'className'> {
  children: React.ReactNode;
  className?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_contentProps?: Record<string, unknown>;
}

export interface DrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface DrawerFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface DrawerTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

export interface DrawerCloseProps extends DrawerButtonDOMProps {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  onPress?: (event: DrawerPressEvent) => void;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_closeProps?: Record<string, unknown>;
}

const DrawerRoot = ({
  UNSAFE_rootProps,
  children,
  ...props
}: DrawerRootProps) => (
  <DrawerRootAdapter
    {...UNSAFE_rootProps}
    {...(props as Record<string, unknown>)}
  >
    {children}
  </DrawerRootAdapter>
);
DrawerRoot.displayName = 'Drawer.Root';

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ isDisabled, disabled, UNSAFE_triggerProps, ...props }, ref) => (
    <DrawerTriggerAdapter
      {...UNSAFE_triggerProps}
      {...(props as Record<string, unknown>)}
      isDisabled={isDisabled ?? disabled}
      ref={ref}
    />
  ),
);
DrawerTrigger.displayName = 'Drawer.Trigger';

const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ UNSAFE_overlayProps, children, ...props }, ref) => (
    <DrawerOverlayAdapter
      {...UNSAFE_overlayProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    >
      {children}
    </DrawerOverlayAdapter>
  ),
);
DrawerOverlay.displayName = 'Drawer.Overlay';

const DrawerContent = React.forwardRef<HTMLElement, DrawerContentProps>(
  ({ UNSAFE_contentProps, children, ...props }, ref) => (
    <DrawerContentAdapter
      {...UNSAFE_contentProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    >
      {children}
    </DrawerContentAdapter>
  ),
);
DrawerContent.displayName = 'Drawer.Content';

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  (props, ref) => <DrawerHeaderAdapter {...props} ref={ref} />,
);
DrawerHeader.displayName = 'Drawer.Header';

const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  (props, ref) => <DrawerBodyAdapter {...props} ref={ref} />,
);
DrawerBody.displayName = 'Drawer.Body';

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  (props, ref) => <DrawerFooterAdapter {...props} ref={ref} />,
);
DrawerFooter.displayName = 'Drawer.Footer';

const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  (props, ref) => <DrawerTitleAdapter {...props} ref={ref} />,
);
DrawerTitle.displayName = 'Drawer.Title';

const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  (
    { isDisabled, disabled, UNSAFE_closeProps, children = 'Close', ...props },
    ref,
  ) => (
    <DrawerCloseAdapter
      {...UNSAFE_closeProps}
      {...(props as Record<string, unknown>)}
      isDisabled={isDisabled ?? disabled}
      ref={ref}
    >
      {children}
    </DrawerCloseAdapter>
  ),
);
DrawerClose.displayName = 'Drawer.Close';

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Close: DrawerClose,
};
