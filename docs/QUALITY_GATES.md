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

## Bundle Size Budget (Dev-First)

Bundle size monitoring is enabled locally via `size-limit`.

Run:

```bash
pnpm -s size:check
```

Initial monitored targets (`dist` artifacts, public-entry set):

- `index.js` (raw): `4 KB`
- `tailwind-plugin.js` (gzip): `1 KB`
- `index.css` (gzip): `11 KB`

Policy:

1. If size budget fails, explain root cause in the PR.
2. Prioritize reducing unintended growth before changing budget.
3. If budget update is required, include explicit rationale in the same PR.
4. CI gating is intentionally deferred; current phase is dev-first visibility.
5. Add representative component targets only when needed.

## CI Workflow

Workflow file: `.github/workflows/ci.yml`

CI runs on:

- `pull_request` to `main`
- `push` to `main`

Jobs:

1. `Check, Type, Unit, Build`
   - `pnpm install --frozen-lockfile`
   - `pnpm -s check`
     - includes Lucide icon provenance verification (`check:icons`)
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
