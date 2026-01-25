import type React from 'react';
import { LabelAdapter, type LabelAdapterProps } from './LabelAdapter';

export interface LabelProps extends LabelAdapterProps {
  children: React.ReactNode;
}

/**
 * Labels provide context for form controls.
 */
export const Label = (props: LabelProps) => {
  return <LabelAdapter {...props} />;
};
Label.displayName = 'Label';
