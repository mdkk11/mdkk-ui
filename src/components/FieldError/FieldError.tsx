import type React from 'react';
import { FieldErrorAdapter } from './FieldErrorAdapter';

export type FieldErrorRenderContext = Record<string, unknown>;
export type FieldErrorChildren =
  | React.ReactNode
  | ((context: FieldErrorRenderContext) => React.ReactNode);

export interface FieldErrorProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'> {
  children?: FieldErrorChildren;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

/**
 * FieldError displays validation errors.
 */
export const FieldError = (props: FieldErrorProps) => {
  const { UNSAFE_rootProps, ...restProps } = props;
  return (
    <FieldErrorAdapter
      {...UNSAFE_rootProps}
      {...(restProps as Record<string, unknown>)}
    />
  );
};
FieldError.displayName = 'FieldError';
