import type React from 'react';
import { LabelAdapter } from './LabelAdapter';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

/**
 * Labels provide context for form controls.
 */
export const Label = (props: LabelProps) => {
  const { UNSAFE_rootProps, ...restProps } = props;
  return (
    <LabelAdapter
      {...UNSAFE_rootProps}
      {...(restProps as Record<string, unknown>)}
    />
  );
};
Label.displayName = 'Label';
