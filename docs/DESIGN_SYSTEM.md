# Design System Foundations

This document explains how visual language is defined and applied in `mdkk-ui`.

## 1. Token Sources

### `src/design-system/tokens.ts`

Design primitives and brand-level constants.

- core colors
- type families
- radius and spacing-related offsets
- Brutalist semantic seed values (`tokens.brutalist`)

### `src/index.css`

Runtime semantic CSS variables and utility/component classes.

- global semantic variables (`--background`, `--foreground`, ...)
- Brutalist semantic variables (`--brutal-*`)
- dark mode overrides
- opt-in root theme scope (`.mdkk-theme`) for base typography/colors
- semantic component classes (`.brutal-card`, `.brutal-button`, ...)

## 2. Styling Hierarchy

Use this order when defining styles:

1. token (`tokens.ts`)
2. semantic CSS variable (`index.css`)
3. semantic class (`index.css` @layer components)
4. component variant (`cva` in `*styles.ts`)
5. local class usage in app/screen

Avoid skipping directly to step 5 when the style is reusable.

## 3. Brutalist Semantic Variables

Current core variables:

- `--brutal-canvas`
- `--brutal-emphasis`
- `--brutal-panel`
- `--brutal-ink`
- `--brutal-ink-inverse`
- `--brutal-border-subtle`
- `--brutal-border-default`
- `--brutal-border-strong`
- `--brutal-track-label`
- `--brutal-track-heading`
- `--brutal-track-kicker`
- `--brutal-grid-size`
- `--brutal-grid-line`

## 4. Semantic Classes

Examples defined in `index.css`:

- Layout: `brutal-canvas`, `brutal-topbar`, `brutal-rail`
- Typography intent: `brutal-label`, `brutal-kicker`, `brutal-heading`
- Surfaces: `brutal-card`, `brutal-card-header`, `brutal-card-footer`
- Interactive elements: `brutal-button`, `brutal-chip`, `brutal-chip-inverse`

These classes are design-system artifacts and are safe to reuse across screens.

## 5. Component Variant Policy

Prefer intent variants over ad-hoc style flags.

Examples:

- `Card` uses `tone: 'default' | 'brutal'`
- `Badge` variants map to semantic intents (`default`, `accent`, `outline`, ...)

When adding a new style mode, first ask:

1. is this a one-off or reusable intent?
2. can this be represented with existing semantic variables?
3. should this be a component `variant`?

## 6. Dark Mode

Dark mode is variable-driven in `.dark` scope.
Do not hardcode light values in component styles when a semantic variable exists.

## 7. Anti-Patterns

- Hardcoding random color hex values in pages for reusable UI patterns
- Encoding visual style in business components instead of design-system layers
- Adding component-specific custom CSS before evaluating semantic utility reuse

## 8. Storybook as Design-System Contract

Story files are part of the design-system contract, not just demos.

- Author stories using `docs/STORYBOOK_STANDARDS.md`
- Keep stories English-only for public distribution consistency
- Ensure every component exposes default, states, and composition examples

## 9. Visual Consistency Rules

Current semantic intent mapping:

- `accent`: yellow highlight (`--accent` -> `--brutal-emphasis`)
- `destructive`: red danger state (`--destructive`)

Do not assign the same semantic meaning to both red and yellow across components.

Border and radius baseline:

- controls and small interactive parts: `--brutal-border-subtle`
- surfaced containers (dialog/card/panel/popover): `--brutal-border-default` (or stronger)
- default radius policy: `rounded-none` unless shape semantics require otherwise (for example, avatar/skeleton circle)
