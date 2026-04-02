# Release Checklist

Use this checklist before publishing `mdkk-ui`.

## 1. API and Compatibility

- [ ] Public API diff reviewed (breaking vs non-breaking)
- [ ] Deprecated APIs documented with migration path
- [ ] `src/index.ts` export surface validated

## 2. Quality Gates

- [ ] `npm run typecheck`
- [ ] `npm run check`
- [ ] `npm run test`
- [ ] Storybook builds without errors

## 3. Accessibility and Behavior

- [ ] Keyboard navigation verified for interactive components
- [ ] Focus ring and disabled states verified
- [ ] Overlay components (if changed) tested for escape/backdrop behavior

## 4. Design System Integrity

- [ ] New visuals use tokens/semantic variables, not random hardcoded values
- [ ] New style modes are represented as variants where reusable
- [ ] Dark mode variables checked when relevant

## 5. Documentation

- [ ] `README.md` updated when API surface changed
- [ ] Architecture/design-system docs updated for new patterns
- [ ] Storybook examples include new component variants

## 6. Packaging

- [ ] `npm run build` passes
- [ ] output in `dist/` includes expected files
- [ ] package `exports` map still valid
- [ ] version bump and changelog prepared

## 7. Final Review

- [ ] release notes include breaking changes and migration steps
- [ ] manual smoke test in a consumer app
