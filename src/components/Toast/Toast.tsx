import {
  type ToastMessage,
  ToastProviderAdapter,
  type ToastProviderAdapterProps,
  useToastAdapter,
} from './ToastAdapter';

export interface ToastProviderProps extends ToastProviderAdapterProps {}
export type ToastPayload = ToastMessage;

export const ToastProvider = ({ children, ...props }: ToastProviderProps) => (
  <ToastProviderAdapter {...props}>{children}</ToastProviderAdapter>
);
ToastProvider.displayName = 'Toast.Provider';

export const useToast = useToastAdapter;

export const Toast = {
  Provider: ToastProvider,
  useToast,
};
