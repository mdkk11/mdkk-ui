import { cva, type VariantProps } from 'cva';

export const cardVariants = cva({
  base: [
    'group relative w-full overflow-hidden rounded-none border-2 border-border',
    'bg-card text-card-foreground transition-colors',
  ],
  variants: {
    tone: {
      default:
        'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-border/70',
      brutal:
        'border-[length:var(--brutal-border-default)] border-brutal-ink bg-brutal-panel text-brutal-ink before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brutal-emphasis',
    },
  },
  defaultVariants: {
    tone: 'brutal',
  },
});

export const cardHeaderVariants = cva({
  base: 'relative flex flex-col gap-2 border-b-2 border-border bg-muted/20 px-5 pb-4 pt-5',
});

export const cardTitleVariants = cva({
  base: 'font-heading text-base font-bold uppercase leading-tight tracking-brutal-label',
});

export const cardDescriptionVariants = cva({
  base: 'text-xs font-mono uppercase tracking-brutal-label text-muted-foreground/90',
});

export const cardContentVariants = cva({
  base: 'space-y-3 px-5 py-4 text-sm leading-relaxed',
});

export const cardFooterVariants = cva({
  base: 'flex items-center gap-2 border-t-2 border-border bg-muted/10 px-5 py-3',
});

export type CardVariants = VariantProps<typeof cardVariants>;
