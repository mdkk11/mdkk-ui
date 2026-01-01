import { cva } from 'cva';

export const progressCircleVariants = cva({
  base: 'inline-flex items-center justify-center',
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
