import { cva, type VariantProps } from 'cva';

export const sidebarShellVariants = cva({
  base: 'relative flex min-h-[280px] w-full',
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
  base: 'group/sidebar relative shrink-0 flex h-full flex-col overflow-hidden border-border bg-secondary text-foreground transition-[width] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
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

export const sidebarTriggerVariants = cva({
  base: 'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:bg-accent hover:text-accent-foreground',
  variants: {
    size: {
      sm: 'h-8 w-8 text-xs',
      md: 'h-9 w-9 text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const sidebarItemButtonVariants = cva({
  base: 'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring',
  variants: {
    isActive: {
      true: 'bg-accent text-accent-foreground',
      false: '',
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export type SidebarShellVariants = VariantProps<typeof sidebarShellVariants>;
export type SidebarPanelVariants = VariantProps<typeof sidebarPanelVariants>;
export type SidebarTriggerVariants = VariantProps<
  typeof sidebarTriggerVariants
>;
