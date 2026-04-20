import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  OverlayArrow as RACOverlayArrow,
  type OverlayArrowProps as RACOverlayArrowProps,
  Tooltip as RACTooltip,
  type TooltipProps as RACTooltipProps,
  TooltipTrigger as RACTooltipTrigger,
  type TooltipTriggerComponentProps as RACTooltipTriggerProps,
} from 'react-aria-components';

export type TooltipRootPrimitiveProps = RACTooltipTriggerProps;
export type TooltipTriggerPrimitiveProps = RACButtonProps;
export type TooltipContentPrimitiveProps = RACTooltipProps;
export type TooltipArrowPrimitiveProps = RACOverlayArrowProps;

export const TooltipRootPrimitive = RACTooltipTrigger;
export const TooltipTriggerPrimitive = RACButton;
export const TooltipContentPrimitive = RACTooltip;
export const TooltipArrowPrimitive = RACOverlayArrow;
