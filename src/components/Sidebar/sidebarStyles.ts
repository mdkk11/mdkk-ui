import { cva, type VariantProps } from 'cva';

export const sidebarShellVariants = cva({
  base: 'relative flex h-full min-h-0 w-full',
  variants: {
    side: {
      left: 'flex-row',
      right: 'flex-row-reverse',
    },
  },
  defaultVariants: {
    side: 'left',
  },
});

export const sidebarPanelVariants = cva({
  base: 'group/sidebar relative flex h-full min-h-0 shrink-0 flex-col overflow-hidden transition-[width,min-width,max-width,flex-basis] duration-[280ms] ease-[cubic-bezier(0.33,1,0.68,1)]',
  variants: {
    side: {
      left: 'border-l-0 border-r-[length:var(--brutal-border-default)] border-brutal-ink bg-brutal-panel text-brutal-ink',
      right:
        'border-r-0 border-l-[length:var(--brutal-border-default)] border-brutal-ink bg-brutal-panel text-brutal-ink',
    },
    tone: {
      subtle: '',
      solid: '',
    },
    state: {
      expanded: '',
      collapsed: 'border-l-0 border-r-0',
    },
  },
  defaultVariants: {
    side: 'left',
    tone: 'subtle',
    state: 'expanded',
  },
});

export const sidebarItemButtonVariants = cva({
  base: 'flex w-full items-center text-left',
  variants: {
    isActive: {
      true: 'brutal-chip-inverse',
      false: '',
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export const sidebarTriggerVariants = cva({
  base: 'inline-flex items-center justify-center border-0 bg-transparent text-brutal-ink transition-colors hover:bg-brutal-ink/10 hover:text-brutal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-ink/40 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    size: {
      sm: 'h-10 w-10',
      md: 'h-11 w-11',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type SidebarShellVariants = VariantProps<typeof sidebarShellVariants>;
export type SidebarPanelVariants = VariantProps<typeof sidebarPanelVariants>;
