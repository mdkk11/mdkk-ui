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

### Import Styles
To apply the design system (variables, Tailwind classes), import the CSS file **once** in your application's root entry point (e.g., `main.tsx`, `App.tsx`, or `layout.tsx`).

```tsx
// main.tsx or App.tsx
import 'mdkk-ui/dist/mdkk-ui.css';
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
```

### ProgressCircle
```tsx
import { ProgressCircle } from 'mdkk-ui';

function Example() {
  return <ProgressCircle isIndeterminate />;
}
```

## Architecture

This library follows a strict **3-Tier Architecture**:
1. **Public API**: Converting human-friendly props to internal logic.
2. **Adapter**: Handling styling (CVA) and layout.
3. **Primitive**: Pure wrapper around `react-aria-components`.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

## License

MIT
