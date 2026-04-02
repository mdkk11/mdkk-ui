import * as React from 'react';

export type CardRootPrimitiveProps = React.ComponentProps<'div'>;
export type CardHeaderPrimitiveProps = React.ComponentProps<'div'>;
export type CardTitlePrimitiveProps = React.ComponentProps<'h3'>;
export type CardDescriptionPrimitiveProps = React.ComponentProps<'p'>;
export type CardContentPrimitiveProps = React.ComponentProps<'div'>;
export type CardFooterPrimitiveProps = React.ComponentProps<'div'>;

export const CardRootPrimitive = React.forwardRef<
  HTMLDivElement,
  CardRootPrimitiveProps
>((props, ref) => <div ref={ref} {...props} />);
CardRootPrimitive.displayName = 'CardRootPrimitive';

export const CardHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  CardHeaderPrimitiveProps
>((props, ref) => <div ref={ref} {...props} />);
CardHeaderPrimitive.displayName = 'CardHeaderPrimitive';

export const CardTitlePrimitive = React.forwardRef<
  HTMLHeadingElement,
  CardTitlePrimitiveProps
>((props, ref) => <h3 ref={ref} {...props} />);
CardTitlePrimitive.displayName = 'CardTitlePrimitive';

export const CardDescriptionPrimitive = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionPrimitiveProps
>((props, ref) => <p ref={ref} {...props} />);
CardDescriptionPrimitive.displayName = 'CardDescriptionPrimitive';

export const CardContentPrimitive = React.forwardRef<
  HTMLDivElement,
  CardContentPrimitiveProps
>((props, ref) => <div ref={ref} {...props} />);
CardContentPrimitive.displayName = 'CardContentPrimitive';

export const CardFooterPrimitive = React.forwardRef<
  HTMLDivElement,
  CardFooterPrimitiveProps
>((props, ref) => <div ref={ref} {...props} />);
CardFooterPrimitive.displayName = 'CardFooterPrimitive';
