---
name: add-icon
description: Add or update `mdkk-ui` icons under the Lucide-only policy, regenerate typed icon artifacts, wire usage into components, and keep docs/tests aligned.
---

# Add Icon

`mdkk-ui` の Icon を Lucide 方針で追加・更新するための作業手順。

## Workflow

1. Read `AGENTS.md` and `docs/ICONS.md`.
2. Resolve target icon names from Lucide (`kebab-case`) and confirm usage points (public `Icon` and/or component internals).
3. Copy SVGs from `node_modules/lucide-static/icons` into `src/components/Icons/assets`.
4. Do not hand-edit the copied SVG files.
5. Run `pnpm -s generate:icons` to refresh `src/components/Icons/generated`.
6. Update component usages to consume the public `Icon` where appropriate (for example `Sidebar`, `Story`, `Checkbox`).
7. Update stories and docs when visible defaults or public names changed.
8. Run validation:
   - `pnpm -s check`
   - `pnpm -s typecheck`
   - targeted `vitest` for changed components
9. If public `IconName` changed, document the change impact in release-facing docs.

## Done Checklist

- `assets` contains only Lucide SVGs.
- generated icon registry is up to date.
- no leftover local icon primitives in component folders where shared `Icon` should be used.
- check/type/tests pass for touched scope.

## References

- `AGENTS.md`
- `docs/ICONS.md`
- `docs/COMPONENT_CATALOG.md`
