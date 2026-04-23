# Icons Policy

`mdkk-ui` icons are standardized on Lucide.

## Source of Truth

- Asset source: `node_modules/lucide-static/icons`
- Managed assets: `src/components/Icons/assets/*.svg`
- Generated components: `src/components/Icons/generated/*.tsx` (do not edit directly)

## Rules

1. Add icons by copying Lucide SVGs using Lucide canonical kebab-case file names.
2. Do not hand-edit icon SVG content in `assets`.
3. Run `pnpm -s generate:icons` after changing assets.
4. `pnpm -s check` includes Lucide provenance validation and fails on non-Lucide/mutated assets.
