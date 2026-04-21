# Quality Gates

This repository uses local Git hooks (`lefthook`) and GitHub Actions CI.

## Local Hooks (lefthook)

Install hooks once after dependencies are installed:

```bash
pnpm run hooks:install
```

Configured hooks:

- `pre-commit`: `pnpm -s check`
- `pre-push`: `pnpm -s typecheck` and `pnpm -s test:unit`

These hooks are intentionally split by cost: fast static checks at commit time, deeper checks before push.

## CI Workflow

Workflow file: `.github/workflows/ci.yml`

CI runs on:

- `pull_request` to `main`
- `push` to `main`

Jobs:

1. `Check, Type, Unit, Build`
   - `pnpm install --frozen-lockfile`
   - `pnpm -s check`
   - `pnpm -s typecheck`
   - `pnpm -s test:unit`
   - `pnpm -s build`
2. `Storybook Interaction Tests`
   - `pnpm install --frozen-lockfile`
   - `pnpm exec playwright install --with-deps chromium`
   - `pnpm -s test-storybook`

## Visual Regression Tests (VRT)

Workflow file: `.github/workflows/vrt.yml`

VRT runs on:

- `pull_request` to `main`
- `push` to `main`
- `workflow_dispatch` for manual validation

VRT uses Chromatic via `chromaui/action` with:

- `onlyChanged: true` (TurboSnap-based changed story optimization)
- `externals` globs for assets/style/token changes outside the module graph
- `exitZeroOnChanges: false` (fails when visual changes are detected)
- action version pinned to major (`chromaui/action@v1`) for CI stability

Required repository secret:

- `CHROMATIC_PROJECT_TOKEN`

Repository policy:

1. Visual changes fail the VRT workflow by default.
2. Keep `Chromatic Visual Tests` as a required branch protection check.
