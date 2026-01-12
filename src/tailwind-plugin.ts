import plugin from 'tailwindcss/plugin';
import { tokens } from './design-system/tokens';

/**
 * mdkk-ui Tailwind CSS Plugin
 * Provides all design tokens, theme configurations, and custom utilities.
 */
export const mdkkPlugin = plugin(
  ({ addBase, addUtilities }) => {
    addBase({
      ':root': {
        /* Primitives (Color Palette) */
        '--color-white': tokens.colors.white,
        '--color-black': tokens.colors.black,
        '--color-gray-100': tokens.colors.gray[100],
        '--color-gray-300': tokens.colors.gray[300],
        '--color-gray-500': tokens.colors.gray[500],
        '--color-gray-800': tokens.colors.gray[800],

        /* Dark Mono */
        '--color-neutral-900': tokens.colors.neutral[900],
        '--color-neutral-800': tokens.colors.neutral[800],
        '--color-neutral-700': tokens.colors.neutral[700],

        /* Brand Colors */
        '--color-red-600': tokens.colors.red[600],
        '--color-red-500': tokens.colors.red[500],
        '--color-red-400': tokens.colors.red[400],

        /* Semantic Tokens */
        '--background': 'var(--color-white)',
        '--foreground': 'var(--color-black)',

        '--primary': 'var(--color-red-500)',
        '--primary-foreground': 'var(--color-white)',

        '--secondary': 'var(--color-black)',
        '--secondary-foreground': 'var(--color-white)',

        '--muted': 'var(--color-gray-100)',
        '--muted-foreground': 'var(--color-black)',

        '--accent': 'var(--color-red-500)',
        '--accent-foreground': 'var(--color-white)',

        '--destructive': 'var(--color-red-600)',
        '--destructive-foreground': 'var(--color-white)',

        '--card': 'var(--color-white)',
        '--card-foreground': 'var(--color-black)',

        '--popover': 'var(--color-white)',
        '--popover-foreground': 'var(--color-black)',

        '--border': 'var(--color-black)',
        '--input': 'var(--color-white)',
        '--ring': 'var(--color-black)',

        '--sidebar': 'var(--color-white)',
        '--sidebar-foreground': 'var(--color-black)',
        '--sidebar-primary': 'var(--color-black)',
        '--sidebar-primary-foreground': 'var(--color-white)',
        '--sidebar-accent': 'var(--color-red-500)',
        '--sidebar-accent-foreground': 'var(--color-white)',
        '--sidebar-border': 'var(--color-black)',
        '--sidebar-ring': 'var(--color-black)',

        '--chart-1': 'var(--color-black)',
        '--chart-2': 'var(--color-red-500)',
        '--chart-3': 'var(--color-gray-500)',
        '--chart-4': 'var(--color-gray-300)',
        '--chart-5': 'var(--color-gray-800)',

        '--font-sans': tokens.base.font.sans,
        '--font-heading': tokens.base.font.heading,
        '--font-serif': tokens.base.font.serif,
        '--font-mono': tokens.base.font.mono,

        '--radius': tokens.base.radius,

        /* Brutalist Shadow System */
        '--shadow-color': 'var(--color-black)',
        '--shadow-color-light': 'var(--color-white)',
        '--shadow-offset-sm': tokens.base.shadow.offset.sm,
        '--shadow-offset-md': tokens.base.shadow.offset.md,
        '--shadow-offset-lg': tokens.base.shadow.offset.lg,
      },
      '.dark': {
        '--background': 'var(--color-neutral-900)',
        '--foreground': 'var(--color-white)',

        '--primary': 'var(--color-red-400)',
        '--primary-foreground': 'var(--color-black)',

        '--secondary': 'var(--color-white)',
        '--secondary-foreground': 'var(--color-black)',

        '--muted': 'var(--color-neutral-800)',
        '--muted-foreground': 'var(--color-white)',

        '--accent': 'var(--color-red-400)',
        '--accent-foreground': 'var(--color-black)',

        '--destructive': 'var(--color-red-600)',

        '--card': 'var(--color-neutral-900)',
        '--card-foreground': 'var(--color-white)',

        '--popover': 'var(--color-neutral-900)',
        '--popover-foreground': 'var(--color-white)',

        '--border': 'var(--color-white)',
        '--input': 'var(--color-neutral-900)',
        '--ring': 'var(--color-white)',

        '--sidebar': 'var(--color-neutral-900)',
        '--sidebar-foreground': 'var(--color-white)',
        '--sidebar-primary': 'var(--color-white)',
        '--sidebar-primary-foreground': 'var(--color-black)',
        '--sidebar-accent': 'var(--color-red-400)',
        '--sidebar-accent-foreground': 'var(--color-black)',
        '--sidebar-border': 'var(--color-white)',
        '--sidebar-ring': 'var(--color-white)',

        '--chart-1': 'var(--color-white)',
        '--chart-2': 'var(--color-red-400)',
        '--chart-3': 'var(--color-gray-500)',
        '--chart-4': 'var(--color-neutral-700)',
        '--chart-5': 'var(--color-gray-300)',

        '--shadow-color': 'var(--color-white)',
        '--shadow-color-light': 'var(--color-black)',
      },
      body: {
        background: 'var(--background)',
        color: 'var(--foreground)',
        fontFamily: 'var(--font-sans)',
      },
    });

    addUtilities({
      '.shadow-brutal-sm': {
        boxShadow:
          'var(--shadow-offset-sm) var(--shadow-offset-sm) 0 0 var(--shadow-color)',
      },
      '.shadow-brutal-md': {
        boxShadow:
          'var(--shadow-offset-md) var(--shadow-offset-md) 0 0 var(--shadow-color)',
      },
      '.shadow-brutal-lg': {
        boxShadow:
          'var(--shadow-offset-lg) var(--shadow-offset-lg) 0 0 var(--shadow-color)',
      },
      '.shadow-brutal-left-sm': {
        boxShadow:
          'calc(var(--shadow-offset-sm) * -1) var(--shadow-offset-sm) 0 0 var(--shadow-color)',
      },
      '.shadow-brutal-left-md': {
        boxShadow:
          'calc(var(--shadow-offset-md) * -1) var(--shadow-offset-md) 0 0 var(--shadow-color)',
      },
      '.shadow-brutal-left-lg': {
        boxShadow:
          'calc(var(--shadow-offset-lg) * -1) var(--shadow-offset-lg) 0 0 var(--shadow-color)',
      },
      '.shadow-brutal-light-sm': {
        boxShadow:
          'var(--shadow-offset-sm) var(--shadow-offset-sm) 0 0 var(--shadow-color-light)',
      },
      '.shadow-brutal-light-md': {
        boxShadow:
          'var(--shadow-offset-md) var(--shadow-offset-md) 0 0 var(--shadow-color-light)',
      },
      '.shadow-brutal-light-lg': {
        boxShadow:
          'var(--shadow-offset-lg) var(--shadow-offset-lg) 0 0 var(--shadow-color-light)',
      },
    });
  },
  {
    theme: {
      extend: {
        colors: {
          border: 'var(--border)',
          input: 'var(--input)',
          ring: 'var(--ring)',
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          primary: {
            DEFAULT: 'var(--primary)',
            foreground: 'var(--primary-foreground)',
          },
          secondary: {
            DEFAULT: 'var(--secondary)',
            foreground: 'var(--secondary-foreground)',
          },
          destructive: {
            DEFAULT: 'var(--destructive)',
            foreground: 'var(--destructive-foreground)',
          },
          muted: {
            DEFAULT: 'var(--muted)',
            foreground: 'var(--muted-foreground)',
          },
          accent: {
            DEFAULT: 'var(--accent)',
            foreground: 'var(--accent-foreground)',
          },
          popover: {
            DEFAULT: 'var(--popover)',
            foreground: 'var(--popover-foreground)',
          },
          card: {
            DEFAULT: 'var(--card)',
            foreground: 'var(--card-foreground)',
          },
          sidebar: {
            DEFAULT: 'var(--sidebar)',
            foreground: 'var(--sidebar-foreground)',
            primary: 'var(--sidebar-primary)',
            'primary-foreground': 'var(--sidebar-primary-foreground)',
            accent: 'var(--sidebar-accent)',
            'accent-foreground': 'var(--sidebar-accent-foreground)',
            border: 'var(--sidebar-border)',
            ring: 'var(--sidebar-ring)',
          },
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        fontFamily: {
          sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
          heading: ['var(--font-heading)', 'sans-serif'],
          serif: ['var(--font-serif)', 'serif'],
          mono: ['var(--font-mono)', 'monospace'],
        },
      },
    },
  },
);
