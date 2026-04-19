export type ToastTone = 'info' | 'success' | 'error';

export interface ToastPayload {
  title: string;
  description?: string;
  tone?: ToastTone;
}

export interface ToastShowOptions {
  timeout?: number;
  priority?: number;
  [key: string]: unknown;
}
