---
name: build-compound-component
description: Design or implement a compound component for `mdkk-ui`. Use when multiple slots have structural rules, slots share internal state or context, or controls outside the visual root must affect internal behavior. Use it also to decide that flat exports are the better choice.
---

# Build Compound Component

compound component を必要な場面だけで採用し、Provider/Root/Slot/Control の責務を明確に保つためのガイド。

## Workflow

1. Read `AGENTS.md`, `docs/ARCHITECTURE.md`, and `docs/PUBLIC_API_STANDARDS.md`.
2. Prove that compound composition is necessary. Use it only when slot order matters, state is shared across slots, or external controls need to affect internal behavior.
3. Stop and prefer flat exports when parts are mostly visual and independent.
4. Define the shared state boundary first. Decide what belongs in `Provider`, what belongs in `Root`, and which controls may live outside the visual container.
5. Keep slot APIs declarative. Do not require consumers to wire internal context manually.
6. Keep internal context private to the implementation. Expose only the namespaced public API that improves clarity.
7. Keep visual rules and reusable styling decisions inside the design-system layers. Do not push compound coordination into application pages.
8. Validate that misuse is hard: slot order, placement constraints, and control placement should be obvious from the API shape.
9. Add stories for the standard composition and tests when shared state, focus behavior, or slot interaction creates regression risk.

## Review Questions

- Is compound structure solving a real state or structure problem?
- Would flat exports be simpler for the consumer?
- Are Provider, Root, Slot, and Trigger responsibilities clearly separated?
- Can external controls work without leaking internal context into the public contract?

## References

- `AGENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/PUBLIC_API_STANDARDS.md`
- `../create-component/SKILL.md`
- `../design-public-api/SKILL.md`
