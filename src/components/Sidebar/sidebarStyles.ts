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
  base: 'flex w-full items-center text-left text-sm transition',
});

export type SidebarShellVariants = VariantProps<typeof sidebarShellVariants>;
export type SidebarPanelVariants = VariantProps<typeof sidebarPanelVariants>;
