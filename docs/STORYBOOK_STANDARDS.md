# Storybook Standards

This document defines how stories should be authored in `mdkk-ui` so they remain useful as design-system documentation, QA fixtures, and API examples.

## 1. Purpose

Each story file must communicate three things:

1. API surface (`args`, `argTypes`, and controls)
2. visual intent (variants, sizes, states)
3. composition patterns (realistic usage examples)

## 2. Required File Structure and CSF Shape

Every `*.stories.tsx` file should include:

1. `meta` with explicit `title`, `component`, `tags: ['autodocs']`
2. `parameters.layout` appropriate to component behavior (`centered`, `padded`, or `fullscreen`)
3. `Default` story
4. at least one of:
   - `Variants`/comparison story
   - `States` story (disabled, invalid, loading, etc.)
   - composition/pattern story

Use the TypeScript CSF shape below as the project standard:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta = {
  title: 'Components/Component',
  component: Component,
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;
```

Storybook 10 can infer titles automatically, but this repository keeps explicit `title` mandatory to keep navigation stable and prevent path-based drift.

## 3. Language and Comment Policy

Use English by default for:

1. story names
2. docs descriptions
3. comments
4. example labels/placeholders in stories

Exception: non-English labels are allowed only when the story is intentionally validating i18n behavior (for example locale, typography, overflow, or language-specific UX).

Comments should be short and structural. Avoid long prose comments when the story name already explains intent.

## 4. Story Naming Policy

Use predictable names:

1. `Default`
2. `Sizes`
3. `AllVariants` or `VariantComparison`
4. `Disabled`, `Loading`, `WithError`, etc.
5. `...Pattern` or domain-specific composition names (`FormActions`, `DangerZone`)

Prefer concise, intent-based names over implementation details.

## 5. Args and Controls Policy

1. Provide control-friendly defaults in `meta.args`.
2. Do not use `argTypes.defaultValue`; it is deprecated. Use `meta.args` instead.
3. Add `argTypes.description` for non-obvious props.
4. Use `options` + an appropriate `control` for enum-like inputs.
5. Keep controls focused on public API.
6. Hide callback/internal/migration-only props from controls when they are not intended for public docs exploration.

## 6. Accessibility and Interaction Policy

1. Include accessible names for non-text UI (`aria-label` for icon/progress-only cases).
2. Keep interaction stories keyboard-usable and use realistic text/state combinations.
3. For interactive components, major stories must include `play` tests for primary interactions.
4. For interactive components, major stories must enable strict a11y checks (`parameters.a11y.test = 'error'` or equivalent strict setting in current Storybook version).

## 7. Composition Policy

Design-system components using compound composition should include stories that demonstrate:

1. minimal composition (smallest useful setup)
2. realistic composition (app-like structure)
3. advanced composition where relevant (external trigger, grouped sections, etc.)

## 8. Quality Checklist

Before merging story changes, verify:

1. English-first labels/comments/docs in updated stories, except explicit i18n validation stories.
2. `title` defined in each edited story file.
3. Story names are intention-revealing and consistent.
4. `meta.args` is used for defaults (`argTypes.defaultValue` is not used).
5. Interactive stories include `play` coverage for primary user flow.
6. Interactive stories have strict a11y test settings.
7. Keyboard interaction is verifiable in major interaction stories.
8. `biome` passes for edited files.
9. `typecheck` passes.
