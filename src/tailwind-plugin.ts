import plugin from 'tailwindcss/plugin';
import { cssVariables } from './design-system/cssVariables';

/**
 * mdkk-ui Tailwind CSS Plugin
 * Provides all design tokens, theme configurations, and custom utilities.
 */
export const mdkkPlugin = plugin(
  ({ addBase, addUtilities }) => {
    addBase({
      ':root': cssVariables.root,
      '.dark': cssVariables.dark,
      '.mdkk-theme': {
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
