import type React from 'react';
import { TextAdapter } from './TextAdapter';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  slot?: 'description' | 'errorMessage' | string;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

export const Text = ({ UNSAFE_rootProps, ...props }: TextProps) => (
  <TextAdapter {...UNSAFE_rootProps} {...(props as Record<string, unknown>)} />
);
