import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  Tooltip as RACTooltip,
  type TooltipProps as RACTooltipProps,
  TooltipTrigger as RACTooltipTrigger,
  type TooltipTriggerComponentProps as RACTooltipTriggerProps,
} from 'react-aria-components';

export type TooltipRootPrimitiveProps = RACTooltipTriggerProps;
export type TooltipTriggerPrimitiveProps = RACButtonProps;
export type TooltipContentPrimitiveProps = RACTooltipProps;

export const TooltipRootPrimitive = RACTooltipTrigger;
export const TooltipTriggerPrimitive = RACButton;
export const TooltipContentPrimitive = RACTooltip;
