---
name: skill-migration
description: Migrate third-party skills (for example Anthropic skills) into Codex safely. Use when importing, forking, or adapting an external SKILL.md and bundled scripts so it works in Codex without trigger conflicts or platform-specific breakage.
---

# Skill Migration

Port external skills to Codex with minimal breakage and explicit compatibility checks.

## Workflow

1. Inspect source skill scope and bundled files (`SKILL.md`, `scripts/`, `references/`, `assets/`).
2. Check `name` collision against existing Codex skills before enabling the imported skill.
3. Identify platform-specific instructions (`claude`, `cowork`, browser-only assumptions, proprietary CLI calls).
4. Rewrite incompatible instructions into Codex-compatible steps or mark them as optional.
5. Tighten frontmatter `description` for Codex trigger clarity.
6. Run a smoke validation prompt and confirm the skill performs one representative task.
7. Record migration notes and known limitations.

## Required Checks

- Keep only `name` and `description` in frontmatter.
- Ensure skill folder name, `name`, and intent are aligned.
- Avoid duplicate `name` values across installed skills.
- Keep external references one level from `SKILL.md`.

Use `references/migration-checklist.md` as the gate before calling migration done.
