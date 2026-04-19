# Architecture

This document defines the architectural rules for `mdkk-ui`.
The goal is predictable maintenance, safe API evolution, and consistent accessibility.

## 1. Layered Model (3-Tier)

All components should follow this structure:

1. Public layer: `Component.tsx`
2. Adapter layer: `ComponentAdapter.tsx`
3. Primitive layer: `ComponentPrimitive.tsx`

### Public Layer

Responsibilities:

- Define and own the public API interface.
- Expose human-friendly props and events.
- Compose slots and context for compound components.
- Avoid leaking low-level library types whenever possible.

### Adapter Layer

Responsibilities:

- Map design intent (`variant`, `size`, `tone`) to classes.
- Apply `cva` variants and class composition.
- Assemble visual sub-structures when needed.

### Primitive Layer

Responsibilities:

- Wrap DOM or `react-aria-components` primitives.
- Keep logic minimal.
- Keep styling minimal.

## 2. Dependency Boundary

- `react-aria-components` usage is allowed in `Primitive` and sometimes `Adapter`.
- Public layer should avoid direct re-export of raw dependency types.
- If a dependency changes, Public API should remain stable whenever possible.

See `docs/DEPENDENCY_POLICY.md`.

## 3. Compound Components

Complex components should expose a namespaced API:

```tsx
<Sidebar.Provider>
  <Sidebar.Root>
    <Sidebar.Panel>
      <Sidebar.Header />
      <Sidebar.Content />
      <Sidebar.Footer />
    </Sidebar.Panel>
  </Sidebar.Root>
  <Sidebar.Trigger />
</Sidebar.Provider>
```

Rules:

- `Provider` owns shared state for broad layout composition.
- `Root` owns structural layout slots.
- Global controls (for example, `Sidebar.Trigger`) may live outside `Root` but must be inside `Provider`.
- Slot components should stay declarative and not require manual context wiring by consumers.

### When to Use Compound Pattern

Use compound API (`Component.Root`, `Component.Item`, etc.) when at least one of these is true:

- multiple slots have structural rules or order constraints
- slots share internal state/context
- controls outside the visual container must affect internal state (for example, external trigger)

Prefer flat exports (`Card`, `CardHeader`, `CardContent`) when:

- parts are primarily visual composition
- no shared runtime state/context is required
- usage is clearer without namespaced orchestration

Practical guidance in this codebase:

- `Sidebar`: compound namespace + provider-first state model
- `Story`: compound namespace
- `Card`: flat slot exports are acceptable and preferred; `Provider/Root`-style orchestration is unnecessary

## 4. Styling Strategy

`mdkk-ui` styling is split into two concerns:

1. Foundation tokens and semantic variables (`index.css`, `tokens.ts`)
2. Component-level variant mapping (`*.styles.ts`, adapters)

Do not hardcode one-off visual values in app pages when defining design system behavior.
Prefer semantic classes and token-backed variables.

### `src/design-system` Boundary

`src/design-system` is reserved for cross-component foundation modules.

Allowed:

- token definitions (`tokens.ts`)
- semantic CSS variable maps (`cssVariables.ts`)
- global helper utilities shared across components (for example, `utils.ts`)

Not allowed:

- component-specific style presets (for example, button-only interaction maps)
- component-local variants that are only consumed by one component

Component-specific style presets should live in the component directory
(`src/components/<Name>/`).

See `docs/DESIGN_SYSTEM.md`.

## 5. Directory Guidance

`src/components/<Name>/` should contain:

- `Name.tsx` (Public)
- `NameAdapter.tsx` (Adapter)
- `NamePrimitive.tsx` (Primitive)
- `index.ts` (exports)
- `Name.stories.tsx` (documentation)
- `Name.test.tsx` (where behavior risk exists)

## 6. API Evolution

Treat Public API as a contract:

- breaking change: prop rename/removal, event contract change, structural behavior change
- non-breaking change: new optional prop, additive variant, visual polish without semantic break
