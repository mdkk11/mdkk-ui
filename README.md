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
npm install mdkk-ui react react-dom
# or
pnpm add mdkk-ui react react-dom
```

If your app uses Tailwind and you want React Aria state variants
(`pressed:`, `focused:`, etc.), also install:

```bash
npm install -D tailwindcss-react-aria-components
# or
pnpm add -D tailwindcss-react-aria-components
```

## Quick Start

### 1) Import base styles

```tsx
import 'mdkk-ui/dist/index.css';
```

`mdkk-ui` no longer styles `body` automatically.
Wrap your app root with `mdkk-theme` to opt into design-system base typography/colors:

```tsx
export function AppRoot() {
  return <div className='mdkk-theme'>{/* app */}</div>;
}
```

If you want global behavior, add `class="mdkk-theme"` to your app `body`.

### 2) Configure Tailwind v4

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
`react-aria-components` is managed internally by `mdkk-ui` as a runtime dependency.
Consumers do not need to install it separately unless they also import it directly.

`react` and `react-dom` remain peer dependencies and should be provided by the consumer app.

- `Primitive` layer may import `react-aria-components`.
- `Public` layer should not leak raw `react-aria-components` prop types.

See `docs/DEPENDENCY_POLICY.md` for details.

## Icons

`Icon` is publicly exported and fully standardized on Lucide.

- Source and rules: `docs/ICONS.md`
- Third-party license notice: `THIRD_PARTY_LICENSES.md`

## Documentation Map

- `docs/ARCHITECTURE.md`: component architecture, layers, and responsibilities
- `docs/DESIGN_SYSTEM.md`: tokens, semantic variables, Brutalist styling strategy
- `docs/PUBLIC_API_STANDARDS.md`: API naming and prop design standards
- `docs/COMPONENT_CATALOG.md`: exported components and usage notes
- `docs/ICONS.md`: icon source policy

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

### Git Hooks

This repository uses `lefthook` for local quality gates.

```bash
pnpm run hooks:install
```

- `pre-commit`: `pnpm -s check`
- `pre-push`: `pnpm -s typecheck` and `pnpm -s test:unit`

### CI

GitHub Actions CI is defined in `.github/workflows/ci.yml`.
It runs static checks, type checks, unit tests, Storybook interaction tests, and build validation on PRs/pushes to `main`.

### Storybook VRT (Chromatic)

Visual regression testing workflow is defined in `.github/workflows/vrt.yml`.

- runs on PRs/pushes to `main` and via `workflow_dispatch`
- uses `chromaui/action@v1` (major pinned) with `onlyChanged: true`
- defines `externals` globs for CSS/assets/design-system token changes
- runs in strict mode (`exitZeroOnChanges: false`) to fail on visual changes

Configure this repository secret before running VRT:

- `CHROMATIC_PROJECT_TOKEN`

Keep `Chromatic Visual Tests` as a required check in branch protection.

## License

MIT
