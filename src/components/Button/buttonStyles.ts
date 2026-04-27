import { cva, type VariantProps } from 'cva';
import { interactiveStyles, shadowStyles } from './buttonInteractionStyles';

export const buttonVariants = cva({
  base: 'relative inline-flex items-center justify-center rounded-none text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background',
  variants: {
    variant: {
      primary: [
        'bg-primary text-primary-foreground border-brutal-subtle border-primary',
        'hover:opacity-90',
        'data-[pressed]:opacity-80 active:opacity-80',
      ],
      secondary: [
        'bg-secondary text-secondary-foreground border-brutal-subtle border-border',
        'hover:bg-muted',
        'data-[pressed]:bg-muted active:bg-muted',
      ],
      accent: [
        'bg-accent text-accent-foreground border-brutal-subtle border-accent',
        'hover:opacity-90',
        'data-[pressed]:opacity-80 active:opacity-80',
      ],
      destructive: [
        'bg-destructive text-destructive-foreground border-brutal-subtle border-destructive',
        'hover:opacity-90',
        'data-[pressed]:opacity-80 active:opacity-80',
      ],
      ghost: [
        'bg-transparent text-foreground border-brutal-subtle border-transparent',
        'hover:bg-foreground/5',
        'data-[pressed]:bg-foreground/10 active:bg-foreground/10',
      ],
      outline: [
        'bg-outline text-outline-foreground border-brutal-subtle border-outline-border',
        'hover:bg-primary hover:text-primary-foreground',
        'data-[pressed]:bg-primary data-[pressed]:text-primary-foreground',
        'active:bg-primary active:text-primary-foreground',
      ],
    },
    size: {
      sm: 'px-3 py-1.5 text-xs font-mono',
      md: 'px-4 py-2 text-sm font-mono',
      lg: 'px-4 py-3 text-xl font-heading',
      xl: 'px-6 py-4 text-2xl font-heading',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    shadow: shadowStyles,
    interactive: interactiveStyles,
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    shadow: 'none',
    interactive: 'none',
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
