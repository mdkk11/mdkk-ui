/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brutal: {
          canvas: 'var(--brutal-canvas)',
          panel: 'var(--brutal-panel)',
          ink: 'var(--brutal-ink)',
          'ink-inverse': 'var(--brutal-ink-inverse)',
          emphasis: 'var(--brutal-emphasis)',
          grid: 'var(--brutal-grid-line)',
        },
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
        outline: {
          DEFAULT: 'var(--outline)',
          foreground: 'var(--outline-foreground)',
          border: 'var(--outline-border)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        'brutal-subtle': 'var(--brutal-border-subtle)',
        brutal: 'var(--brutal-border-default)',
        'brutal-strong': 'var(--brutal-border-strong)',
      },
      letterSpacing: {
        'brutal-label': 'var(--brutal-track-label)',
        'brutal-heading': 'var(--brutal-track-heading)',
        'brutal-kicker': 'var(--brutal-track-kicker)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
};
