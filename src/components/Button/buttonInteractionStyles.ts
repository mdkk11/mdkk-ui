export const shadowStyles = {
  none: '',
  'right-sm': 'shadow-brutal-sm',
  'right-md': 'shadow-brutal-md',
  'right-lg': 'shadow-brutal-lg',
  'left-sm': 'shadow-brutal-left-sm',
  'left-md': 'shadow-brutal-left-md',
  'left-lg': 'shadow-brutal-left-lg',
  'light-sm': 'shadow-brutal-light-sm',
  'light-md': 'shadow-brutal-light-md',
  'light-lg': 'shadow-brutal-light-lg',
  sm: 'shadow-brutal-sm',
  md: 'shadow-brutal-md',
  lg: 'shadow-brutal-lg',
  left: 'shadow-brutal-left-md',
  white: 'shadow-brutal-light-md',
} as const;

export type ShadowStyle = keyof typeof shadowStyles;

export const interactiveStyles = {
  none: '',
  press: [
    'transition-all duration-100',
    'data-[pressed]:translate-x-1 data-[pressed]:translate-y-1',
    'active:translate-x-1 active:translate-y-1',
    'data-[pressed]:shadow-none active:shadow-none',
  ].join(' '),
  hover: [
    'transition-all duration-100',
    'hover:translate-x-1 hover:translate-y-1',
    'hover:shadow-none',
  ].join(' '),
} as const;

export type InteractiveStyle = keyof typeof interactiveStyles;
