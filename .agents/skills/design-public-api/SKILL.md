---
name: design-public-api
description: Design or review a stable public component API for `mdkk-ui`. Use when defining props, events, refs, variants, compatibility strategy, or when removing dependency-shaped props from the public surface.
---

# Design Public API

公開 API を、利用者視点で理解しやすく、依存更新に引きずられにくい契約へ整えるためのガイド。

## Workflow

1. Read `AGENTS.md`, `docs/PUBLIC_API_STANDARDS.md`, and `docs/DEPENDENCY_POLICY.md`.
2. Define what the consumer actually needs to control, observe, and customize. Start from intent, not from dependency props.
3. Replace dependency-shaped APIs with explicit public props. Do not `extends` raw prop types from `react-aria-components` in the Public layer.
4. Name boolean state as `isXxx`.
5. Prefer intent-level events such as `onChange(value)` or `onPress(event?)`. Expose low-level DOM handlers only when the component is intentionally low-level.
6. Express design intent through `variant`, `size`, and `tone` before adding one-off style props.
7. Allow `className` by default. Allow `style` only when runtime styling is genuinely required.
8. Forward refs to the most meaningful DOM target for the consumer.
9. Keep design-system responsibility inside the component contract. Do not require application pages to carry reusable styling semantics that belong in adapters or tokens.
10. Check whether the change is breaking. When a breaking change is unavoidable, prepare migration notes, compatibility exports when practical, and release notes.

## Deliverables

- Define a clear public props interface.
- List any intentional omissions from the dependency API.
- Confirm which design decisions belong in component API versus adapter styling.
- Call out compatibility risk and required migration notes when relevant.

## References

- `AGENTS.md`
- `docs/PUBLIC_API_STANDARDS.md`
- `docs/DEPENDENCY_POLICY.md`
- `docs/RELEASE_CHECKLIST.md`
- `../create-component/SKILL.md`
