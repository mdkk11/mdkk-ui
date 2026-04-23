import type * as React from 'react';
import type { IconName as GeneratedIconName } from './generated';

export type IconName = GeneratedIconName;
export type IconSize = 'xs' | 'sm' | 'md' | 'lg';

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  type: IconName;
  size?: IconSize;
  isDecorative?: boolean;
}
