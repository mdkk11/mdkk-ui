import * as React from 'react';
import {
  DropdownMenuContentAdapter,
  type DropdownMenuContentAdapterProps,
  DropdownMenuItemAdapter,
  type DropdownMenuItemAdapterProps,
  DropdownMenuRootAdapter,
  type DropdownMenuRootPrimitiveProps,
  DropdownMenuSectionAdapter,
  type DropdownMenuSectionAdapterProps,
  DropdownMenuSeparatorAdapter,
  type DropdownMenuSeparatorAdapterProps,
  DropdownMenuTriggerAdapter,
  type DropdownMenuTriggerAdapterProps,
} from './DropdownMenuAdapter';

export interface DropdownMenuRootProps extends DropdownMenuRootPrimitiveProps {}
export interface DropdownMenuTriggerProps
  extends DropdownMenuTriggerAdapterProps {}
export interface DropdownMenuContentProps
  extends DropdownMenuContentAdapterProps {}
export interface DropdownMenuItemProps extends DropdownMenuItemAdapterProps {}
export interface DropdownMenuSectionProps
  extends DropdownMenuSectionAdapterProps {}
export interface DropdownMenuSeparatorProps
  extends DropdownMenuSeparatorAdapterProps {}

const DropdownMenuRoot = (props: DropdownMenuRootProps) => (
  <DropdownMenuRootAdapter {...props} />
);
DropdownMenuRoot.displayName = 'DropdownMenu.Root';

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>((props, ref) => <DropdownMenuTriggerAdapter {...props} ref={ref} />);
DropdownMenuTrigger.displayName = 'DropdownMenu.Trigger';

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>((props, ref) => <DropdownMenuContentAdapter {...props} ref={ref} />);
DropdownMenuContent.displayName = 'DropdownMenu.Content';

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>((props, ref) => <DropdownMenuItemAdapter {...props} ref={ref} />);
DropdownMenuItem.displayName = 'DropdownMenu.Item';

const DropdownMenuSection = React.forwardRef<
  HTMLElement,
  DropdownMenuSectionProps
>((props, ref) => <DropdownMenuSectionAdapter {...props} ref={ref} />);
DropdownMenuSection.displayName = 'DropdownMenu.Section';

const DropdownMenuSeparator = React.forwardRef<
  HTMLElement,
  DropdownMenuSeparatorProps
>((props, ref) => <DropdownMenuSeparatorAdapter {...props} ref={ref} />);
DropdownMenuSeparator.displayName = 'DropdownMenu.Separator';

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Section: DropdownMenuSection,
  Separator: DropdownMenuSeparator,
};
