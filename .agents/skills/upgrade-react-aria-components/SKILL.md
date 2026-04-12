---
name: upgrade-react-aria-components
description: Safely upgrade `react-aria-components` inside `mdkk-ui` without breaking public API or accessibility behavior. Use when bumping the dependency version, auditing upgrade impact, or validating adapter and primitive compatibility after the upgrade.
---

# Upgrade react-aria-components

`react-aria-components` の更新を、依存境界とアクセシビリティ契約を守りながら進めるためのガイド。

## Workflow

1. Read `AGENTS.md`, `docs/DEPENDENCY_POLICY.md`, `docs/PUBLIC_API_STANDARDS.md`, and `docs/RELEASE_CHECKLIST.md`.
2. Review the upstream release notes or changelog and list possible impacts on props, render behavior, keyboard interaction, focus management, and ARIA semantics.
3. Audit every affected Primitive and Adapter import. Check wrappers, helper usage, render props, slot APIs, and any assumptions about state shape.
4. Verify that the Public layer still does not leak raw dependency types or dependency-specific contracts.
5. Verify that design-system responsibilities still live in tokens, semantic variables, adapters, and components rather than drifting into application pages as workaround styling.
6. Re-run the relevant quality gates and interaction checks for changed components, especially keyboard navigation, focus rings, disabled states, invalid states, and overlay behavior.
7. Update stories, tests, and docs when behavior, examples, or supported props changed.
8. Record migration notes and release notes when the upgrade changes behavior or compatibility expectations.

## Review Focus

- Keep the dependency inside Primitive or Adapter layers unless there is an explicit exception.
- Treat accessibility regressions as release blockers.
- Treat public API drift as a contract issue, not as an implementation detail.

## References

- `AGENTS.md`
- `docs/DEPENDENCY_POLICY.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/PUBLIC_API_STANDARDS.md`
- `docs/RELEASE_CHECKLIST.md`
- `../design-public-api/SKILL.md`
