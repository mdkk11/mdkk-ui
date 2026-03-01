import React from 'react';
import type { BadgeVariants } from '@/design-system/badgeStyles';
import { BadgeAdapter } from './BadgeAdapter';

export interface BadgeProps extends BadgeVariants {
  /**
   * The content to display in the badge.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes to apply to the badge.
   */
  className?: string;
}

/**
 * Badge component for displaying status labels, counts, and tags.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => {
    return <BadgeAdapter ref={ref} {...props} />;
  },
);
Badge.displayName = 'Badge';
