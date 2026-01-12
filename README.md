# mdkk-ui

A personal UI library built on top of **React Aria Components**.
This library provides a styled, accessible layer using Tailwind CSS and TypeScript, following a strict 3-tier architecture.

> **Note:** This library depends on [react-aria-components](https://react-spectrum.adobe.com/react-aria/components.html) for its core accessibility and behavior primitives.

## Installation

```bash
npm install mdkk-ui
# or
pnpm add mdkk-ui
```

## Setup

### Tailwind CSS Configuration (Recommended)
Add the `mdkk-ui` plugin to your `tailwind.config.js`. This plugin sets up all necessary design tokens, colors, and utility classes.

```js
// tailwind.config.js
import { mdkkPlugin } from 'mdkk-ui/tailwind-plugin';

export default {
  content: [
    // ...
    './node_modules/mdkk-ui/dist/**/*.{js,ts,jsx,tsx}', // Add this to scan mdkk-ui components
  ],
  plugins: [
    mdkkPlugin,
    require('tailwindcss-react-aria-components'), // Required for accessibility primitives
  ],
};
```

### Option: Manual Setup (shadcn style)
If you prefer full control over your CSS variables (like shadcn/ui), copy the following into your global CSS file instead of using the plugin.

```css
@layer base {
  :root {
    /* Primitives */
    --color-white: #ffffff;
    --color-black: #000000;
    --color-gray-100: #eeeeee;
    --color-gray-300: #cccccc;
    --color-gray-500: #888888;
    --color-gray-800: #333333;
    
    /* Dark Mono */
    --color-neutral-900: #0a0a0a;
    --color-neutral-800: #1a1a1a;
    --color-neutral-700: #444444;

    /* Brand Colors */
    --color-red-600: #ff0000;
    --color-red-500: #ff1e1e;
    --color-red-400: #ff3333;

    /* Semantic Tokens */
    --background: var(--color-white);
    --foreground: var(--color-black);
    --primary: var(--color-red-500);
    --primary-foreground: var(--color-white);
    --secondary: var(--color-black);
    --secondary-foreground: var(--color-white);
    --muted: var(--color-gray-100);
    --muted-foreground: var(--color-black);
    --accent: var(--color-red-500);
    --accent-foreground: var(--color-white);
    --destructive: var(--color-red-600);
    --card: var(--color-white);
    --card-foreground: var(--color-black);
    --popover: var(--color-white);
    --popover-foreground: var(--color-black);
    --border: var(--color-black);
    --input: var(--color-white);
    --ring: var(--color-black);
    
    /* Brutalist Shadow System */
    --radius: 0rem;
    --shadow-color: var(--color-black);
    --shadow-color-light: var(--color-white);
    --shadow-offset-sm: 2px;
    --shadow-offset-md: 4px;
    --shadow-offset-lg: 8px;
  }
 
  .dark {
    --background: var(--color-neutral-900);
    --foreground: var(--color-white);
    --primary: var(--color-red-400);
    --primary-foreground: var(--color-black);
    --secondary: var(--color-white);
    --secondary-foreground: var(--color-black);
    --muted: var(--color-neutral-800);
    --muted-foreground: var(--color-white);
    --accent: var(--color-red-400);
    --accent-foreground: var(--color-black);
    --destructive: var(--color-red-600);
    --card: var(--color-neutral-900);
    --card-foreground: var(--color-white);
    --popover: var(--color-neutral-900);
    --popover-foreground: var(--color-white);
    --border: var(--color-white);
    --input: var(--color-neutral-900);
    --ring: var(--color-white);
    --shadow-color: var(--color-white);
    --shadow-color-light: var(--color-black);
  }
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

## Usage

### Button
```tsx
import { Button } from 'mdkk-ui';

function App() {
  return (
    <Button variant="primary" onPress={() => console.log('clicked')}>
      Click Me
    </Button>
  );
}

## Architecture

This library follows a strict **3-Tier Architecture**:
1. **Public API**: Converting human-friendly props to internal logic.
2. **Adapter**: Handling styling (CVA) and layout.
3. **Primitive**: Pure wrapper around `react-aria-components`.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

## License

MIT
