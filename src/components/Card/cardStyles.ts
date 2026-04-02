import { cva, type VariantProps } from 'cva';

export const cardVariants = cva({
  base: [
    'group relative w-full overflow-hidden rounded-none border-brutal-strong border-border',
    'bg-card text-card-foreground shadow-brutal-md',
  ],
  variants: {
    tone: {
      default: '',
      brutal:
        'border-brutal-ink bg-brutal-panel text-brutal-ink shadow-brutal-lg',
    },
  },
  defaultVariants: {
    tone: 'brutal',
  },
});

export const cardHeaderVariants = cva({
  base: 'relative flex flex-col gap-2 border-b-2 border-border bg-muted/30 px-4 pb-4 pt-5',
});

export const cardTitleVariants = cva({
  base: 'font-heading text-lg font-black uppercase leading-none tracking-brutal-heading',
});

export const cardDescriptionVariants = cva({
  base: 'text-xs font-mono uppercase tracking-brutal-label text-muted-foreground',
});

export const cardContentVariants = cva({
  base: 'space-y-3 px-4 py-4 text-sm leading-relaxed',
});

export const cardFooterVariants = cva({
  base: 'flex items-center gap-2 border-t-2 border-border bg-muted/20 px-4 py-3',
});

export type CardVariants = VariantProps<typeof cardVariants>;
