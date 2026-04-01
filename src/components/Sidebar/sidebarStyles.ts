import { cva, type VariantProps } from 'cva';

export const sidebarShellVariants = cva({
  base: 'relative flex h-full w-full',
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
  base: 'group/sidebar relative shrink-0 flex h-full flex-col overflow-hidden border-border bg-secondary text-foreground transition-[width,min-width,max-width,flex-basis] duration-[280ms] ease-[cubic-bezier(0.33,1,0.68,1)]',
  variants: {
    side: {
      left: 'border-r',
      right: 'border-l',
    },
    tone: {
      subtle: 'bg-secondary',
      solid: 'bg-background',
    },
    state: {
      expanded: '',
      collapsed: 'border-0',
    },
  },
  defaultVariants: {
    side: 'left',
    tone: 'subtle',
    state: 'expanded',
  },
});

export const sidebarItemButtonVariants = cva({
  base: 'flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm transition-colors',
  variants: {
    isActive: {
      true: 'bg-accent text-accent-foreground',
      false: 'text-foreground hover:bg-accent/60',
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export const sidebarTriggerVariants = cva({
  base: 'inline-flex items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent/60',
  variants: {
    size: {
      sm: 'h-8 px-2 text-xs',
      md: 'h-9 px-3 text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type SidebarShellVariants = VariantProps<typeof sidebarShellVariants>;
export type SidebarPanelVariants = VariantProps<typeof sidebarPanelVariants>;
