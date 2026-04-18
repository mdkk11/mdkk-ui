---
name: create-component
description: Create or refactor an `mdkk-ui` component with the repository's 3-layer architecture, stable public API rules, and accessibility constraints. Use when adding a new component, promoting existing UI into the design system, or splitting a single-file component into Public/Adapter/Primitive layers.
---

# Create Component

`mdkk-ui` のコンポーネントを、このリポジトリの設計ルールに沿って追加または再構成するためのガイド。

## Workflow

1. Read `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, and `docs/PUBLIC_API_STANDARDS.md`.
2. Define the component contract before writing code: component name, primary use cases, public props, intent-level events, ref target, and whether the API should stay flat or become compound.
3. Read `../design-public-api/SKILL.md` when props or events are still ambiguous.
4. Read `../build-compound-component/SKILL.md` only when slots share structure, state, or external controls.
5. Create or normalize the standard files in `src/components/<Name>/`: `<Name>.tsx`, `<Name>Adapter.tsx`, `<Name>Primitive.tsx`, `index.ts`, `<Name>.stories.tsx`, and tests when behavior risk exists.
6. Implement the Public layer to own the exported API, context wiring, and adapter handoff. Do not re-export raw dependency types.
7. Implement the Adapter layer to translate `variant`, `size`, and `tone` into classes, `cva`, and any necessary visual sub-structure. Keep design-system responsibility here instead of pushing one-off design logic into application pages.
8. Implement the Primitive layer as a thin wrapper around DOM or `react-aria-components`, with minimal styling and minimal logic.
9. Export only the supported surface from `index.ts`. Keep primitives and helpers internal unless the public contract requires them.
10. Add stories for default, states, and composition. Add tests when interaction, accessibility behavior, internal state, or compound context creates regression risk.

## Done Checklist

- Keep responsibilities separated across Public, Adapter, and Primitive layers.
- Keep public props explicit and consumer-facing.
- Keep dependency-specific types out of the Public layer.
- Keep reusable visuals on tokens, semantic variables, and adapter-level variants.
- Keep application pages free from design-system implementation responsibility.
- Keep stories and tests aligned with the final contract.

## References

- `AGENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/DEPENDENCY_POLICY.md`
- `docs/PUBLIC_API_STANDARDS.md`
- `docs/RELEASE_CHECKLIST.md`
- `docs/STORYBOOK_STANDARDS.md`
