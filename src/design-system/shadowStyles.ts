// シャドウの方向
export type ShadowDirection = 'right' | 'left';

// シャドウのサイズ
export type ShadowSize = 'sm' | 'md' | 'lg';

// シャドウのカラーバリアント
export type ShadowColor = 'default' | 'light';

/**
 * シャドウクラス（静的・見た目のみ）
 */
export const shadowStyles = {
  none: '',
  // Right direction (default)
  'right-sm': 'shadow-brutal-sm',
  'right-md': 'shadow-brutal-md',
  'right-lg': 'shadow-brutal-lg',
  // Left direction
  'left-sm': 'shadow-brutal-left-sm',
  'left-md': 'shadow-brutal-left-md',
  'left-lg': 'shadow-brutal-left-lg',
  // Light color (for dark backgrounds)
  'light-sm': 'shadow-brutal-light-sm',
  'light-md': 'shadow-brutal-light-md',
  'light-lg': 'shadow-brutal-light-lg',
  // Legacy aliases
  sm: 'shadow-brutal-sm',
  md: 'shadow-brutal-md',
  lg: 'shadow-brutal-lg',
  left: 'shadow-brutal-left-md',
  white: 'shadow-brutal-light-md',
} as const;

export type ShadowStyle = keyof typeof shadowStyles;

/**
 * インタラクションクラス（アニメーション・挙動のみ）
 *
 * - false: なし
 * - 'press': active時に押し込み
 * - 'hover': hover時に押し込み（activeと同じ動作）
 */
export const interactiveStyles = {
  none: '',
  press: [
    'transition-all duration-100',
    'pressed:translate-x-1 pressed:translate-y-1',
    'pressed:shadow-none',
  ].join(' '),
  hover: [
    'transition-all duration-100',
    'hover:translate-x-1 hover:translate-y-1',
    'hover:shadow-none',
  ].join(' '),
} as const;

export type InteractiveStyle = keyof typeof interactiveStyles;
