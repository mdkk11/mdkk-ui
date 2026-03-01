import { cva, type VariantProps } from 'cva';
import { interactiveStyles, shadowStyles } from '@/design-system/shadowStyles';

export const buttonVariants = cva({
  base: 'relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  variants: {
    variant: {
      primary: [
        'bg-primary text-primary-foreground border-2 border-primary',
        'hover:opacity-90',
        'pressed:opacity-80',
      ],
      // Secondary: border なし（Outline との差別化）
      secondary: [
        'bg-secondary text-secondary-foreground border-2 border-transparent',
        'hover:bg-muted',
        'pressed:bg-muted',
      ],
      // Accent: 赤 — CTA、強調
      accent: [
        'bg-accent text-accent-foreground border-2 border-accent',
        'hover:opacity-90',
        'pressed:opacity-80',
      ],
      // Destructive: 赤枠線 — 削除、危険なアクション（Accent=塗り との差別化）
      destructive: [
        'bg-transparent text-destructive border-2 border-destructive',
        'hover:bg-destructive hover:text-destructive-foreground',
        'pressed:bg-destructive pressed:text-destructive-foreground',
      ],
      // Ghost: 透明
      ghost: [
        'bg-transparent text-foreground border-2 border-transparent',
        'hover:bg-foreground/5',
        'pressed:bg-foreground/10',
      ],
      // Outline: 白bg + 黒border（ライト） / transparent + 白border（ダーク）
      outline: [
        'bg-outline text-outline-foreground border-2 border-outline-border',
        'hover:bg-primary hover:text-primary-foreground',
        'pressed:bg-primary pressed:text-primary-foreground',
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
