import type React from 'react';
import {
  FieldErrorAdapter,
  type FieldErrorAdapterProps,
} from './FieldErrorAdapter';

export interface FieldErrorProps extends FieldErrorAdapterProps {
  children?: React.ReactNode;
}

/**
 * FieldError displays validation errors.
 */
export const FieldError = (props: FieldErrorProps) => {
  return <FieldErrorAdapter {...props} />;
};
FieldError.displayName = 'FieldError';
