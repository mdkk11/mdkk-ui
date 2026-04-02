import * as React from 'react';
import { cn } from '@/design-system/utils';
import {
  CardContentPrimitive,
  CardDescriptionPrimitive,
  CardFooterPrimitive,
  CardHeaderPrimitive,
  CardRootPrimitive,
  CardTitlePrimitive,
} from './CardPrimitive';
import {
  type CardVariants,
  cardContentVariants,
  cardDescriptionVariants,
  cardFooterVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardVariants,
} from './cardStyles';

export interface CardAdapterProps
  extends React.ComponentProps<'div'>,
    CardVariants {}

export const CardAdapter = React.forwardRef<HTMLDivElement, CardAdapterProps>(
  ({ className, tone, ...props }, ref) => (
    <CardRootPrimitive
      ref={ref}
      className={cn(cardVariants({ tone }), className)}
      {...props}
    />
  ),
);
CardAdapter.displayName = 'CardAdapter';

export const CardHeaderAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <CardHeaderPrimitive
    ref={ref}
    className={cn(cardHeaderVariants(), className)}
    {...props}
  />
));
CardHeaderAdapter.displayName = 'CardHeaderAdapter';

export const CardTitleAdapter = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<'h3'>
>(({ className, ...props }, ref) => (
  <CardTitlePrimitive
    ref={ref}
    className={cn(cardTitleVariants(), className)}
    {...props}
  />
));
CardTitleAdapter.displayName = 'CardTitleAdapter';

export const CardDescriptionAdapter = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<'p'>
>(({ className, ...props }, ref) => (
  <CardDescriptionPrimitive
    ref={ref}
    className={cn(cardDescriptionVariants(), className)}
    {...props}
  />
));
CardDescriptionAdapter.displayName = 'CardDescriptionAdapter';

export const CardContentAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <CardContentPrimitive
    ref={ref}
    className={cn(cardContentVariants(), className)}
    {...props}
  />
));
CardContentAdapter.displayName = 'CardContentAdapter';

export const CardFooterAdapter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <CardFooterPrimitive
    ref={ref}
    className={cn(cardFooterVariants(), className)}
    {...props}
  />
));
CardFooterAdapter.displayName = 'CardFooterAdapter';
