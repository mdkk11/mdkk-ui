import { cva } from 'cva';
import * as React from 'react';
import { cn } from '@/design-system/utils';
import type { IconProps } from './Icon.types';
import { IconPrimitive } from './IconPrimitive';

const iconVariants = cva({
  base: 'inline-block shrink-0',
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const getDecorativeA11yProps = ({
  isDecorative,
  ariaLabel,
  ariaLabelledby,
}: {
  isDecorative?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
}) => {
  const shouldHideFromAssistiveTech =
    isDecorative ?? !(ariaLabel || ariaLabelledby);

  if (!shouldHideFromAssistiveTech) {
    return {};
  }

  return {
    'aria-hidden': true,
    focusable: false as const,
  };
};

export const IconAdapter = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      className,
      type,
      size = 'md',
      isDecorative,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref,
  ) => {
    const decorativeA11yProps = getDecorativeA11yProps({
      isDecorative,
      ariaLabel,
      ariaLabelledby,
    });

    return (
      <IconPrimitive
        {...props}
        {...decorativeA11yProps}
        type={type}
        ref={ref}
        className={cn(iconVariants({ size }), className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      />
    );
  },
);
IconAdapter.displayName = 'IconAdapter';
