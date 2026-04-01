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
  base: 'group/sidebar relative shrink-0 flex h-full min-h-0 flex-col overflow-hidden transition-[width,min-width,max-width,flex-basis] duration-[280ms] ease-[cubic-bezier(0.33,1,0.68,1)]',
  variants: {
    side: {
      left: '',
      right: '',
    },
    tone: {
      subtle: '',
      solid: '',
    },
    state: {
      expanded: '',
      collapsed: '',
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
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export const sidebarTriggerVariants = cva({
  base: 'inline-flex items-center justify-center',
  variants: {
    size: {
      sm: 'h-8 px-2',
      md: 'h-9 px-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type SidebarShellVariants = VariantProps<typeof sidebarShellVariants>;
export type SidebarPanelVariants = VariantProps<typeof sidebarPanelVariants>;
