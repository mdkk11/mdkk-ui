import * as React from 'react';
import {
  DrawerBodyAdapter,
  DrawerCloseAdapter,
  type DrawerCloseAdapterProps,
  DrawerContentAdapter,
  type DrawerContentAdapterProps,
  DrawerFooterAdapter,
  DrawerHeaderAdapter,
  DrawerOverlayAdapter,
  type DrawerOverlayAdapterProps,
  DrawerRootAdapter,
  DrawerTitleAdapter,
  DrawerTriggerAdapter,
} from './DrawerAdapter';
import type { DrawerRootPrimitiveProps } from './DrawerPrimitive';

export interface DrawerRootProps extends DrawerRootPrimitiveProps {}
export type DrawerTriggerProps = React.ComponentProps<
  typeof DrawerTriggerAdapter
>;
export interface DrawerOverlayProps extends DrawerOverlayAdapterProps {}
export interface DrawerContentProps extends DrawerContentAdapterProps {}
export type DrawerHeaderProps = React.ComponentProps<
  typeof DrawerHeaderAdapter
>;
export type DrawerBodyProps = React.ComponentProps<typeof DrawerBodyAdapter>;
export type DrawerFooterProps = React.ComponentProps<
  typeof DrawerFooterAdapter
>;
export type DrawerTitleProps = React.ComponentProps<typeof DrawerTitleAdapter>;
export interface DrawerCloseProps extends DrawerCloseAdapterProps {}

const DrawerRoot = (props: DrawerRootProps) => <DrawerRootAdapter {...props} />;
DrawerRoot.displayName = 'Drawer.Root';

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  (props, ref) => <DrawerTriggerAdapter {...props} ref={ref} />,
);
DrawerTrigger.displayName = 'Drawer.Trigger';

const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  (props, ref) => <DrawerOverlayAdapter {...props} ref={ref} />,
);
DrawerOverlay.displayName = 'Drawer.Overlay';

const DrawerContent = React.forwardRef<HTMLElement, DrawerContentProps>(
  (props, ref) => <DrawerContentAdapter {...props} ref={ref} />,
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
  ({ children = 'Close', ...props }, ref) => (
    <DrawerCloseAdapter {...props} ref={ref}>
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
