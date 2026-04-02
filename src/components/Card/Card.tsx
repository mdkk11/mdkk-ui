import * as React from 'react';
import {
  CardAdapter,
  CardContentAdapter,
  CardDescriptionAdapter,
  CardFooterAdapter,
  CardHeaderAdapter,
  CardTitleAdapter,
} from './CardAdapter';
import type { CardVariants } from './cardStyles';

export interface CardProps extends React.ComponentProps<'div'>, CardVariants {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <CardAdapter ref={ref} className={className} {...props} />
  ),
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <CardHeaderAdapter ref={ref} className={className} {...props} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<'h3'>
>(({ className, ...props }, ref) => (
  <CardTitleAdapter ref={ref} className={className} {...props} />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<'p'>
>(({ className, ...props }, ref) => (
  <CardDescriptionAdapter ref={ref} className={className} {...props} />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <CardContentAdapter ref={ref} className={className} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <CardFooterAdapter ref={ref} className={className} {...props} />
));
CardFooter.displayName = 'CardFooter';
