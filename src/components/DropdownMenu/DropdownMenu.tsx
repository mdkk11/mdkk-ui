import * as React from 'react';
import {
  DropdownMenuContentAdapter,
  DropdownMenuItemAdapter,
  DropdownMenuRootAdapter,
  DropdownMenuSectionAdapter,
  DropdownMenuSeparatorAdapter,
  DropdownMenuTriggerAdapter,
} from './DropdownMenuAdapter';

type DropdownMenuKey = string | number;

type DropdownMenuTriggerDOMProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled'
>;

export interface DropdownMenuRootProps {
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

export interface DropdownMenuTriggerProps extends DropdownMenuTriggerDOMProps {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_triggerProps?: Record<string, unknown>;
}

export interface DropdownMenuContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {
  children: React.ReactNode;
  className?: string;
  items?: Iterable<unknown>;
  popoverProps?: Record<string, unknown>;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_contentProps?: Record<string, unknown>;
}

export interface DropdownMenuItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  children?: React.ReactNode;
  className?: string;
  id?: DropdownMenuKey;
  textValue?: string;
  isDisabled?: boolean;
  isDestructive?: boolean;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_itemProps?: Record<string, unknown>;
}

export interface DropdownMenuSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_sectionProps?: Record<string, unknown>;
}

export interface DropdownMenuSeparatorProps
  extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_separatorProps?: Record<string, unknown>;
}

const DropdownMenuRoot = ({
  UNSAFE_rootProps,
  children,
  ...props
}: DropdownMenuRootProps) => (
  <DropdownMenuRootAdapter
    {...UNSAFE_rootProps}
    {...(props as Record<string, unknown>)}
  >
    {children}
  </DropdownMenuRootAdapter>
);
DropdownMenuRoot.displayName = 'DropdownMenu.Root';

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ isDisabled, disabled, UNSAFE_triggerProps, ...props }, ref) => (
  <DropdownMenuTriggerAdapter
    {...UNSAFE_triggerProps}
    {...(props as Record<string, unknown>)}
    isDisabled={isDisabled ?? disabled}
    ref={ref}
  />
));
DropdownMenuTrigger.displayName = 'DropdownMenu.Trigger';

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ UNSAFE_contentProps, children, ...props }, ref) => (
  <DropdownMenuContentAdapter
    {...UNSAFE_contentProps}
    {...(props as Record<string, unknown>)}
    ref={ref}
  >
    {children}
  </DropdownMenuContentAdapter>
));
DropdownMenuContent.displayName = 'DropdownMenu.Content';

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(({ UNSAFE_itemProps, ...props }, ref) => (
  <DropdownMenuItemAdapter
    {...UNSAFE_itemProps}
    {...(props as Record<string, unknown>)}
    ref={ref}
  />
));
DropdownMenuItem.displayName = 'DropdownMenu.Item';

const DropdownMenuSection = React.forwardRef<
  HTMLElement,
  DropdownMenuSectionProps
>(({ UNSAFE_sectionProps, ...props }, ref) => (
  <DropdownMenuSectionAdapter
    {...UNSAFE_sectionProps}
    {...(props as Record<string, unknown>)}
    ref={ref}
  />
));
DropdownMenuSection.displayName = 'DropdownMenu.Section';

const DropdownMenuSeparator = React.forwardRef<
  HTMLElement,
  DropdownMenuSeparatorProps
>(({ UNSAFE_separatorProps, ...props }, ref) => (
  <DropdownMenuSeparatorAdapter
    {...UNSAFE_separatorProps}
    {...(props as Record<string, unknown>)}
    ref={ref}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenu.Separator';

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Section: DropdownMenuSection,
  Separator: DropdownMenuSeparator,
};
