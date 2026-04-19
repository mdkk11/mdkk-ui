import type React from 'react';
import type { ToastPayload, ToastShowOptions } from './Toast.types';
import { ToastProviderAdapter, useToastAdapter } from './ToastAdapter';

export interface ToastProviderProps {
  children: React.ReactNode;
  className?: string;
  maxVisibleToasts?: number;
  defaultTimeout?: number;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_providerProps?: Record<string, unknown>;
}

export type { ToastPayload, ToastShowOptions } from './Toast.types';

export interface ToastAPI {
  show: (message: ToastPayload, options?: ToastShowOptions) => string;
  info: (
    title: string,
    description?: string,
    options?: ToastShowOptions,
  ) => string;
  success: (
    title: string,
    description?: string,
    options?: ToastShowOptions,
  ) => string;
  error: (
    title: string,
    description?: string,
    options?: ToastShowOptions,
  ) => string;
}

export const ToastProvider = ({
  children,
  UNSAFE_providerProps,
  ...props
}: ToastProviderProps) => (
  <ToastProviderAdapter
    {...UNSAFE_providerProps}
    {...(props as Record<string, unknown>)}
  >
    {children}
  </ToastProviderAdapter>
);
ToastProvider.displayName = 'Toast.Provider';

export const useToast = (): ToastAPI => {
  const toast = useToastAdapter();
  return {
    show: (message, options) =>
      toast.show(message, options as Record<string, unknown>),
    info: (title, description, options) =>
      toast.info(title, description, options as Record<string, unknown>),
    success: (title, description, options) =>
      toast.success(title, description, options as Record<string, unknown>),
    error: (title, description, options) =>
      toast.error(title, description, options as Record<string, unknown>),
  };
};

export const Toast = {
  Provider: ToastProvider,
  useToast,
};
