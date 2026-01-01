# Architecture & Design Guidelines

This document outlines the architectural principles and directory structure for the component library. Ensuring consistency across components is critical for maintainability and scalability.

## Core Philosophy

- **Public API as a Contract**: Component props are the public API. Changes to them are breaking changes.
- **Encapsulation**: Dependencies on external UI libraries (e.g., `react-aria-components`) must be encapsulated within the implementation details, not exposed in the Public API.
- **Strict Separation**: Implementation details and Public API must be strictly separated.
- **Usability over Flexibility**: Prioritize "an API that cannot be misused" over "an API that can do anything".

## 3-Tier Component Architecture

All components must adhere to the following 3-layer structure:

### 1. Public API Layer (`Component.tsx`)
- **Role**: The user-facing interface.
- **Responsibility**:
  - Exposes a simplified, framework-agnostic API.
  - Maps "Human friendly" props to internal logic.
  - Hides external library types (no `react-aria-components` imports in the interface).
  - Acts as the default export.
- **Location**: `src/components/Name/Name.tsx`

### 2. Adapter Layer (`ComponentAdapter.tsx`)
- **Role**: The bridge between the primitive and the design system.
- **Responsibility**:
  - Applies styling using `cva` (Class Variance Authority).
  - Handles internal layout and compound elements (e.g., icon placement, loading spinners).
  - Maps Design System props (e.g., `variant="primary"`) to styles.
- **Location**: `src/components/Name/NameAdapter.tsx`

### 3. Primitive Layer (`ComponentPrimitive.tsx`)
- **Role**: The foundational functionality.
- **Responsibility**:
  - Wrapper around `react-aria-components` or HTML elements.
  - Receives exact props defined by the underlying library.
  - **No business logic**.
  - **Minimal styling**.
- **Location**: `src/components/Name/NamePrimitive.tsx`

## Directory Structure

We maintain a flat structure under `src/components` to maximize discoverability. Grouping into subdirectories (e.g., `inputs/`, `data-display/`) should only be considered when the number of components significantly exceeds 50.

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx          (Public API)
│   │   ├── ButtonAdapter.tsx   (Adapter)
│   │   ├── ButtonPrimitive.tsx (Primitive)
│   │   ├── Button.stories.tsx  (Documentation)
│   │   ├── Button.test.tsx     (Tests)
│   │   └── index.ts            (Export)
│   └── ProgressCircle/
│       ├── ...
├── design-system/
│   ├── styles/                 (CVA definitions)
│   │   ├── buttonStyles.ts
│   │   └── ...
│   └── utils.ts
└── ...
```

## Props Design Guidelines

### YES (Public API)
- **Intent**: `variant`, `size`, `tone`
- **State**: `isDisabled`, `isLoading`, `isSelected`
- **Events**: `onPress`, `onChange` (high-level)

### NO (Internal / Primitive)
- **Raw Library Props**: `react-aria-components` specific types used directly in Public API.
- **Direct Style Overrides**: `style`, arbitrary `className` (unless explicitly allowed for layout capabilities).
- **Low-level Events**: `onPressStart`, `onHoverChange` (unless necessary for specific advanced use cases).
