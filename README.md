# mdkk-ui

`mdkk-ui` is a React component library built on top of `react-aria-components`.
It provides a strict component architecture, accessible behavior primitives, and a Brutalist-oriented design token system.

## Core Principles

- Public API is a stable contract.
- Accessibility and interaction behavior are delegated to `react-aria-components`.
- Styling and visual language are controlled by design tokens and semantic CSS variables.
- Components follow a strict 3-tier architecture: Public -> Adapter -> Primitive.

## Installation

```bash
npm install mdkk-ui react react-dom react-aria-components
# or
pnpm add mdkk-ui react react-dom react-aria-components
```

## Quick Start

### 1) Import base styles

```tsx
import 'mdkk-ui/dist/index.css';
```

### 2) Configure Tailwind v4 (recommended)

```js
// tailwind.config.js
import { mdkkPlugin } from 'mdkk-ui/tailwind-plugin';
import reactAria from 'tailwindcss-react-aria-components';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/mdkk-ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [mdkkPlugin, reactAria],
};
```

```css
/* src/index.css */
@import "tailwindcss";
@config "../tailwind.config.js";
```

### 3) Use components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from 'mdkk-ui';

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant='primary'>Click</Button>
      </CardContent>
    </Card>
  );
}
```

## React Aria Dependency

This library intentionally depends on `react-aria-components` for core behavior.
Consumers should treat this as a foundational dependency, not an optional add-on.

- `Primitive` layer may import `react-aria-components`.
- `Public` layer should not leak raw `react-aria-components` prop types.

See `docs/DEPENDENCY_POLICY.md` for details.

## Documentation Map

- `docs/ARCHITECTURE.md`: component architecture, layers, and responsibilities
- `docs/DESIGN_SYSTEM.md`: tokens, semantic variables, Brutalist styling strategy
- `docs/PUBLIC_API_STANDARDS.md`: API naming and prop design standards
- `docs/COMPONENT_CATALOG.md`: exported components and usage notes
- `docs/SIDEBAR_USAGE.md`: Sidebar provider-first usage and composition patterns
- `docs/RELEASE_CHECKLIST.md`: pre-release and publishing checklist
- `docs/FORM_GUIDE.md`: Japanese form UX and implementation standards

## Exported Surface

The package exports:

- components from `src/index.ts`
- Tailwind plugin via `mdkk-ui/tailwind-plugin`
- built CSS via `mdkk-ui/dist/index.css`

## Development

```bash
npm run storybook
npm run typecheck
npm run check
```

## License

MIT
