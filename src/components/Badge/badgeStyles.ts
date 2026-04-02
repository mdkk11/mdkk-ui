import { cva, type VariantProps } from 'cva';

export const badgeVariants = cva({
  base: 'inline-flex items-center rounded-none border-brutal-subtle px-2.5 py-0.5 text-xs font-black uppercase tracking-brutal-label transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  variants: {
    variant: {
      default: 'border-primary bg-primary text-primary-foreground',
      secondary: 'border-border bg-secondary text-secondary-foreground',
      accent: 'border-accent bg-accent text-accent-foreground',
      destructive:
        'border-destructive bg-destructive text-destructive-foreground',
      outline: 'border-outline-border bg-outline text-outline-foreground',
    },
    size: {
      sm: 'px-2 py-0.5 text-[10px]',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
