import { cva, type VariantProps } from 'cva';
import { interactiveStyles, shadowStyles } from './shadowStyles';

export const buttonVariants = cva({
  base: 'relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  variants: {
    variant: {
      primary: [
        'bg-primary text-white border-2 border-black',
        'hover:bg-black hover:text-white',
        'pressed:bg-black pressed:text-white',
      ],
      // Inverted black button/link
      secondary: [
        'bg-black text-white border-1 border-white',
        'hover:bg-white hover:text-black',
        'pressed:bg-white pressed:text-black',
      ],
      // Transparent button/link
      ghost: [
        'bg-transparent text-black border-1 border-transparent',
        'hover:bg-black/5',
        'pressed:bg-black/10',
      ],
      // Outlined primary
      outline: [
        'bg-transparent text-primary border-[2px] border-primary',
        'hover:bg-primary hover:text-white',
        'pressed:bg-primary pressed:text-white',
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
