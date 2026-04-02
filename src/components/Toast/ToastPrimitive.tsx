import {
  type QueuedToast,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  UNSTABLE_Toast as RACToast,
  UNSTABLE_ToastContent as RACToastContent,
  type ToastProps as RACToastProps,
  UNSTABLE_ToastRegion as RACToastRegion,
  type ToastRegionProps as RACToastRegionProps,
  type ToastOptions,
  UNSTABLE_ToastQueue,
} from 'react-aria-components';

export type ToastClosePrimitiveProps = RACButtonProps;
export type ToastRegionPrimitiveProps<T> = RACToastRegionProps<T>;
export type ToastPrimitiveProps<T> = RACToastProps<T>;
export type ToastQueuePrimitive<T> = InstanceType<
  typeof UNSTABLE_ToastQueue<T>
>;

export const ToastRegionPrimitive = RACToastRegion;
export const ToastPrimitive = RACToast;
export const ToastContentPrimitive = RACToastContent;
export const ToastClosePrimitive = RACButton;
export const ToastQueueClassPrimitive = UNSTABLE_ToastQueue;

export type { QueuedToast, ToastOptions };
