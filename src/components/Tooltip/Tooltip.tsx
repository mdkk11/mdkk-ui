import * as React from 'react';
import {
  TooltipArrowAdapter,
  TooltipContentAdapter,
  TooltipRootAdapter,
  TooltipTriggerAdapter,
} from './TooltipAdapter';

interface TooltipRootConfigContextValue {
  offset?: number;
  placement?: TooltipPlacement;
}

const TooltipRootConfigContext =
  React.createContext<TooltipRootConfigContextValue | null>(null);

type TooltipButtonDOMProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled'
>;

type TooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top start'
  | 'top end'
  | 'bottom start'
  | 'bottom end'
  | 'left top'
  | 'left bottom'
  | 'right top'
  | 'right bottom';

export interface TooltipRootProps {
  children: React.ReactNode;
  delay?: number;
  closeDelay?: number;
  /**
   * Default content offset. Can be overridden per tooltip via `Tooltip.Content`.
   */
  offset?: number;
  /**
   * Default content placement. Can be overridden per tooltip via `Tooltip.Content`.
   */
  placement?: TooltipPlacement;
  trigger?: 'hover' | 'focus';
  shouldCloseOnPress?: boolean;
  isDisabled?: boolean;
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
  placement?: TooltipPlacement;
  offset?: number;
  crossOffset?: number;
  shouldFlip?: boolean;
  containerPadding?: number;
  arrowBoundaryOffset?: number;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_contentProps?: Record<string, unknown>;
}

export interface TooltipArrowProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className'> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_arrowProps?: Record<string, unknown>;
}

const TooltipRoot = ({
  UNSAFE_rootProps,
  children,
  offset,
  placement,
  ...props
}: TooltipRootProps) => (
  <TooltipRootConfigContext.Provider value={{ offset, placement }}>
    <TooltipRootAdapter
      {...UNSAFE_rootProps}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </TooltipRootAdapter>
  </TooltipRootConfigContext.Provider>
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
  ({ UNSAFE_contentProps, offset, placement, ...props }, ref) => {
    const rootConfig = React.useContext(TooltipRootConfigContext);
    return (
      <TooltipContentAdapter
        {...UNSAFE_contentProps}
        offset={offset ?? rootConfig?.offset}
        placement={placement ?? rootConfig?.placement}
        {...(props as Record<string, unknown>)}
        ref={ref}
      />
    );
  },
);
TooltipContent.displayName = 'Tooltip.Content';

const TooltipArrow = React.forwardRef<HTMLElement, TooltipArrowProps>(
  ({ UNSAFE_arrowProps, ...props }, ref) => (
    <TooltipArrowAdapter
      {...UNSAFE_arrowProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
TooltipArrow.displayName = 'Tooltip.Arrow';

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
};
