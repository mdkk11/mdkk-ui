# Skill Migration Checklist

## 1. Identity and Trigger

- `name` does not collide with installed Codex skills.
- `description` includes both capability and when-to-use trigger.
- Skill name is lowercase kebab-case.

## 2. Platform Compatibility

- Replace `claude`-specific CLI/process guidance with Codex-equivalent steps.
- Remove or annotate cowork-only/browser-only assumptions.
- Confirm scripts can run in the target environment.

## 3. Content Shape

- Keep operational core in `SKILL.md`.
- Move long schemas/examples to `references/`.
- Avoid duplicate instructions between files.

## 4. Validation

- Execute one representative migration scenario end-to-end.
- Confirm no hard failure on missing external tools.
- Document known gaps and follow-up actions.

## 5. Suggested Command Snippets

```bash
find "${CODEX_HOME:-$HOME/.codex}/skills" -type f -name SKILL.md | sort
rg -n '^name:' "${CODEX_HOME:-$HOME/.codex}/skills"/**/SKILL.md
```
