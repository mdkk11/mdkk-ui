import { cva } from 'cva';
import * as React from 'react';
import { composeRenderProps, type ToastOptions } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import type { ToastPayload } from './Toast.types';
import {
  type QueuedToast,
  ToastClosePrimitive,
  ToastContentPrimitive,
  ToastPrimitive,
  ToastQueueClassPrimitive,
  ToastRegionPrimitive,
} from './ToastPrimitive';

const toastRegionVariants = cva({
  base: 'fixed bottom-4 right-4 z-[100] flex w-[min(92vw,360px)] flex-col gap-2 outline-none',
});

const toastVariants = cva({
  base: 'grid grid-cols-[auto_1fr_auto] items-start gap-3 rounded-none border-[var(--brutal-border-default)] bg-background p-3',
  variants: {
    tone: {
      info: 'border-border text-foreground',
      success: 'border-accent text-foreground',
      error: 'border-destructive text-foreground',
    },
  },
  defaultVariants: {
    tone: 'info',
  },
});

const toastIndicatorVariants = cva({
  base: 'mt-0.5 h-6 w-1 shrink-0',
  variants: {
    tone: {
      info: 'bg-foreground',
      success: 'bg-accent',
      error: 'bg-destructive',
    },
  },
  defaultVariants: {
    tone: 'info',
  },
});

const toastTitleVariants = cva({
  base: 'text-sm font-semibold leading-tight text-foreground',
});

const toastToneLabelVariants = cva({
  base: 'text-[10px] font-semibold uppercase tracking-[0.08em]',
  variants: {
    tone: {
      info: 'text-foreground',
      success: 'text-accent',
      error: 'text-destructive',
    },
  },
  defaultVariants: {
    tone: 'info',
  },
});

const toastDescriptionVariants = cva({
  base: 'mt-1 text-xs text-muted-foreground',
});

const toastCloseVariants = cva({
  base: 'inline-flex items-center justify-center rounded-none border-[var(--brutal-border-subtle)] px-2 py-1 text-xs font-medium text-foreground hover:bg-muted',
});

export interface ToastContextValue {
  show: (message: ToastPayload, options?: ToastOptions) => string;
  info: (title: string, description?: string, options?: ToastOptions) => string;
  success: (
    title: string,
    description?: string,
    options?: ToastOptions,
  ) => string;
  error: (
    title: string,
    description?: string,
    options?: ToastOptions,
  ) => string;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export const useToastAdapter = (): ToastContextValue => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within Toast.Provider.');
  }
  return context;
};

export interface ToastProviderAdapterProps {
  children: React.ReactNode;
  className?: string;
  maxVisibleToasts?: number;
  defaultTimeout?: number;
}

export const ToastProviderAdapter = ({
  children,
  className,
  maxVisibleToasts = 4,
  defaultTimeout = 4000,
}: ToastProviderAdapterProps) => {
  const queue = React.useMemo(
    () => new ToastQueueClassPrimitive<ToastPayload>({ maxVisibleToasts }),
    [maxVisibleToasts],
  );

  const show = React.useCallback(
    (message: ToastPayload, options?: ToastOptions) => {
      const timeout = options?.timeout ?? defaultTimeout;
      return queue.add(message, {
        ...options,
        timeout,
      });
    },
    [defaultTimeout, queue],
  );

  const info = React.useCallback(
    (title: string, description?: string, options?: ToastOptions) =>
      show({ title, description, tone: 'info' }, options),
    [show],
  );

  const success = React.useCallback(
    (title: string, description?: string, options?: ToastOptions) =>
      show({ title, description, tone: 'success' }, options),
    [show],
  );

  const error = React.useCallback(
    (title: string, description?: string, options?: ToastOptions) =>
      show({ title, description, tone: 'error' }, options),
    [show],
  );

  const contextValue = React.useMemo(
    () => ({ show, info, success, error }),
    [show, info, success, error],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastRegionPrimitive
        queue={queue}
        className={composeRenderProps(className, (className) =>
          cn(toastRegionVariants(), className),
        )}
      >
        {({ toast }) => <ToastItem toast={toast} />}
      </ToastRegionPrimitive>
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: QueuedToast<ToastPayload>;
}

const ToastItem = ({ toast }: ToastItemProps) => {
  const tone = toast.content.tone ?? 'info';
  const toneLabel =
    tone === 'success' ? 'Success' : tone === 'error' ? 'Error' : 'Info';

  return (
    <ToastPrimitive toast={toast} className={cn(toastVariants({ tone }))}>
      <span aria-hidden='true' className={toastIndicatorVariants({ tone })} />

      <ToastContentPrimitive>
        <p className={toastToneLabelVariants({ tone })}>{toneLabel}</p>
        <p className={toastTitleVariants()}>{toast.content.title}</p>
        {toast.content.description ? (
          <p className={toastDescriptionVariants()}>
            {toast.content.description}
          </p>
        ) : null}
      </ToastContentPrimitive>

      <ToastClosePrimitive slot='close' className={toastCloseVariants()}>
        Dismiss
      </ToastClosePrimitive>
    </ToastPrimitive>
  );
};
