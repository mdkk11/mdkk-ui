import * as React from 'react';
import {
  DialogBodyAdapter,
  DialogCloseAdapter,
  DialogContentAdapter,
  DialogDescriptionAdapter,
  DialogFooterAdapter,
  DialogHeaderAdapter,
  DialogOverlayAdapter,
  DialogRootAdapter,
  DialogTitleAdapter,
  DialogTriggerAdapter,
} from './DialogAdapter';

type DialogButtonDOMProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled'
>;

export interface DialogPressEvent {
  target: EventTarget | null;
  pointerType?: string;
  [key: string]: unknown;
}

export interface DialogRootProps {
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

export interface DialogTriggerProps extends DialogButtonDOMProps {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  onPress?: (event: DialogPressEvent) => void;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_triggerProps?: Record<string, unknown>;
}

export interface DialogOverlayProps
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

export interface DialogContentProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'className'> {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_contentProps?: Record<string, unknown>;
}

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface DialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface DialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export interface DialogCloseProps extends DialogButtonDOMProps {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  onPress?: (event: DialogPressEvent) => void;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_closeProps?: Record<string, unknown>;
}

const DialogRoot = ({
  UNSAFE_rootProps,
  children,
  ...props
}: DialogRootProps) => (
  <DialogRootAdapter
    {...UNSAFE_rootProps}
    {...(props as Record<string, unknown>)}
  >
    {children}
  </DialogRootAdapter>
);
DialogRoot.displayName = 'Dialog.Root';

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ isDisabled, disabled, UNSAFE_triggerProps, ...props }, ref) => (
    <DialogTriggerAdapter
      {...UNSAFE_triggerProps}
      {...(props as Record<string, unknown>)}
      isDisabled={isDisabled ?? disabled}
      ref={ref}
    />
  ),
);
DialogTrigger.displayName = 'Dialog.Trigger';

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ UNSAFE_overlayProps, children, ...props }, ref) => (
    <DialogOverlayAdapter
      {...UNSAFE_overlayProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    >
      {children}
    </DialogOverlayAdapter>
  ),
);
DialogOverlay.displayName = 'Dialog.Overlay';

const DialogContent = React.forwardRef<HTMLElement, DialogContentProps>(
  ({ UNSAFE_contentProps, children, ...props }, ref) => (
    <DialogContentAdapter
      {...UNSAFE_contentProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    >
      {children}
    </DialogContentAdapter>
  ),
);
DialogContent.displayName = 'Dialog.Content';

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  (props, ref) => <DialogHeaderAdapter {...props} ref={ref} />,
);
DialogHeader.displayName = 'Dialog.Header';

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  (props, ref) => <DialogBodyAdapter {...props} ref={ref} />,
);
DialogBody.displayName = 'Dialog.Body';

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  (props, ref) => <DialogFooterAdapter {...props} ref={ref} />,
);
DialogFooter.displayName = 'Dialog.Footer';

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  (props, ref) => <DialogTitleAdapter {...props} ref={ref} />,
);
DialogTitle.displayName = 'Dialog.Title';

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>((props, ref) => <DialogDescriptionAdapter {...props} ref={ref} />);
DialogDescription.displayName = 'Dialog.Description';

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  (
    { isDisabled, disabled, UNSAFE_closeProps, children = 'Close', ...props },
    ref,
  ) => (
    <DialogCloseAdapter
      {...UNSAFE_closeProps}
      {...(props as Record<string, unknown>)}
      isDisabled={isDisabled ?? disabled}
      ref={ref}
    >
      {children}
    </DialogCloseAdapter>
  ),
);
DialogClose.displayName = 'Dialog.Close';

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
};
