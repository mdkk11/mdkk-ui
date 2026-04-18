import * as React from 'react';
import {
  TooltipContentAdapter,
  TooltipRootAdapter,
  TooltipTriggerAdapter,
} from './TooltipAdapter';

type TooltipButtonDOMProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled'
>;

export interface TooltipRootProps {
  children: React.ReactNode;
  delay?: number;
  closeDelay?: number;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

export interface TooltipTriggerProps extends TooltipButtonDOMProps {
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

export interface TooltipContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_contentProps?: Record<string, unknown>;
}

const TooltipRoot = ({
  UNSAFE_rootProps,
  children,
  ...props
}: TooltipRootProps) => (
  <TooltipRootAdapter
    {...UNSAFE_rootProps}
    {...(props as Record<string, unknown>)}
  >
    {children}
  </TooltipRootAdapter>
);
TooltipRoot.displayName = 'Tooltip.Root';

const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ isDisabled, disabled, UNSAFE_triggerProps, ...props }, ref) => (
    <TooltipTriggerAdapter
      {...UNSAFE_triggerProps}
      {...(props as Record<string, unknown>)}
      isDisabled={isDisabled ?? disabled}
      ref={ref}
    />
  ),
);
TooltipTrigger.displayName = 'Tooltip.Trigger';

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ UNSAFE_contentProps, ...props }, ref) => (
    <TooltipContentAdapter
      {...UNSAFE_contentProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
TooltipContent.displayName = 'Tooltip.Content';

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
};
