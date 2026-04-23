# Dependency Policy

This library is intentionally built on top of `react-aria-components`.

## Why This Dependency Exists

- Accessibility behavior is difficult to implement correctly from scratch.
- Keyboard interactions, focus management, and ARIA semantics are delegated to proven primitives.
- This lets `mdkk-ui` focus on API ergonomics and design system consistency.

## Contract with Consumers

Consumers should assume:

- `react-aria-components` is a core runtime dependency managed by `mdkk-ui`.
- Consumers do not need to install `react-aria-components` separately unless they import it directly in their own app code.
- API behavior aligns with accessible interaction conventions provided by that dependency.

Package boundary:

- `react` and `react-dom` are peer dependencies (provided by the app).
- `react-aria-components` is a runtime dependency of `mdkk-ui`.
- Icons are sourced from Lucide (`lucide-static`) at build/dev time and compiled into `mdkk-ui`.
- If the app uses Tailwind state variants like `pressed:`/`focused:` with mdkk-ui classes,
  install `tailwindcss-react-aria-components` in the app.

## Internal Layer Rules

- Primitive layer: may import `react-aria-components` directly.
- Adapter layer: may use helper APIs (for example, `composeRenderProps`) when required.
- Public layer: should not expose raw dependency types unless explicitly justified.
- `src/design-system`: keep only cross-component foundations (tokens, semantic variables, shared helpers).
- Component-specific style presets should stay in each component directory.

## Versioning Expectations

When upgrading `react-aria-components`:

1. Verify no Public API leaks or type breaks.
2. Re-run interaction and accessibility checks.
3. Call out behavior changes in release notes.

## Non-goals

- This project does not aim to be dependency-free.
- This project does not re-implement low-level accessibility primitives.
