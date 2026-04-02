import * as React from 'react';
import {
  TooltipContentAdapter,
  type TooltipContentAdapterProps,
  TooltipRootAdapter,
  type TooltipRootPrimitiveProps,
  TooltipTriggerAdapter,
  type TooltipTriggerAdapterProps,
} from './TooltipAdapter';

export interface TooltipRootProps extends TooltipRootPrimitiveProps {}
export interface TooltipTriggerProps extends TooltipTriggerAdapterProps {}
export interface TooltipContentProps extends TooltipContentAdapterProps {}

const TooltipRoot = (props: TooltipRootProps) => (
  <TooltipRootAdapter {...props} />
);
TooltipRoot.displayName = 'Tooltip.Root';

const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  (props, ref) => <TooltipTriggerAdapter {...props} ref={ref} />,
);
TooltipTrigger.displayName = 'Tooltip.Trigger';

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  (props, ref) => <TooltipContentAdapter {...props} ref={ref} />,
);
TooltipContent.displayName = 'Tooltip.Content';

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
};
