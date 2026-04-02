# Storybook Standards

This document defines how stories should be authored in `mdkk-ui` so they remain useful as design-system documentation, QA fixtures, and API examples.

## 1. Purpose

Each story file must communicate three things:

1. API surface (`args`, `argTypes`, and controls)
2. visual intent (variants, sizes, states)
3. composition patterns (realistic usage examples)

## 2. Required File Structure

Every `*.stories.tsx` file should include:

1. `meta` with explicit `title`, `component`, `tags: ['autodocs']`
2. `parameters.layout` appropriate to component behavior (`centered`, `padded`, or `fullscreen`)
3. `Default` story
4. at least one of:
   - `Variants`/comparison story
   - `States` story (disabled, invalid, loading, etc.)
   - composition/pattern story

Use explicit titles to keep stable Storybook navigation and avoid path-based drift.

## 3. Language and Comment Policy

Use English for:

1. story names
2. docs descriptions
3. comments
4. example labels/placeholders in stories

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
2. Add `argTypes.description` for non-obvious props.
3. Use `options` for enum-like controls.
4. Keep controls focused on public API; do not expose internal-only knobs.

## 6. Accessibility Policy

1. Include accessible names for non-text UI (`aria-label` for icon/progress-only cases).
2. Keep interaction stories keyboard-usable.
3. Prefer realistic text and state combinations.

## 7. Composition Policy

Design-system components using compound composition should include stories that demonstrate:

1. minimal composition (smallest useful setup)
2. realistic composition (app-like structure)
3. advanced composition where relevant (external trigger, grouped sections, etc.)

## 8. Quality Checklist

Before merging story changes, verify:

1. English-only labels/comments/docs in updated stories
2. `title` defined in each edited story file
3. Story names are intention-revealing and consistent
4. `biome` passes for edited files
5. `typecheck` passes
