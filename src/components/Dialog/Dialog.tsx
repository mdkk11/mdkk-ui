import * as React from 'react';
import {
  DialogBodyAdapter,
  DialogCloseAdapter,
  type DialogCloseAdapterProps,
  DialogContentAdapter,
  type DialogContentAdapterProps,
  DialogDescriptionAdapter,
  DialogFooterAdapter,
  DialogHeaderAdapter,
  DialogOverlayAdapter,
  type DialogOverlayAdapterProps,
  DialogRootAdapter,
  DialogTitleAdapter,
  DialogTriggerAdapter,
} from './DialogAdapter';
import type { DialogRootPrimitiveProps } from './DialogPrimitive';

export interface DialogRootProps extends DialogRootPrimitiveProps {}
export type DialogTriggerProps = React.ComponentProps<
  typeof DialogTriggerAdapter
>;
export interface DialogOverlayProps extends DialogOverlayAdapterProps {}
export interface DialogContentProps extends DialogContentAdapterProps {}
export type DialogHeaderProps = React.ComponentProps<
  typeof DialogHeaderAdapter
>;
export type DialogBodyProps = React.ComponentProps<typeof DialogBodyAdapter>;
export type DialogFooterProps = React.ComponentProps<
  typeof DialogFooterAdapter
>;
export type DialogTitleProps = React.ComponentProps<typeof DialogTitleAdapter>;
export type DialogDescriptionProps = React.ComponentProps<
  typeof DialogDescriptionAdapter
>;
export interface DialogCloseProps extends DialogCloseAdapterProps {}

const DialogRoot = (props: DialogRootProps) => <DialogRootAdapter {...props} />;
DialogRoot.displayName = 'Dialog.Root';

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  (props, ref) => <DialogTriggerAdapter {...props} ref={ref} />,
);
DialogTrigger.displayName = 'Dialog.Trigger';

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  (props, ref) => <DialogOverlayAdapter {...props} ref={ref} />,
);
DialogOverlay.displayName = 'Dialog.Overlay';

const DialogContent = React.forwardRef<HTMLElement, DialogContentProps>(
  (props, ref) => <DialogContentAdapter {...props} ref={ref} />,
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
  ({ children = 'Close', ...props }, ref) => (
    <DialogCloseAdapter {...props} ref={ref}>
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
