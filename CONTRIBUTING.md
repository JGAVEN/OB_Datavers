# Contributing

## Branching
- `main` is always releasable and protected. No direct pushes.
- Branch per change: `feature/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>`.

## Commits — Conventional Commits
Format: `type(scope): summary` — types: `feat, fix, docs, refactor, test, chore,
build, ci, security`. Example: `feat(sku-xref): add fuzzy competitor match`.
Keep commits small and focused; explain *why* in the body when non-obvious.

## Pull requests
- One logical change per PR. Fill in the PR template.
- Required before merge: green CI, at least one CODEOWNERS review, no unresolved
  threads. Squash-merge to keep `main` history linear.
- Any change to data boundaries, access, or security needs a SECURITY reviewer
  and usually an ADR.

## Definition of Done
- [ ] Behavior matches the brief / ADRs; boundaries respected (read-only, in-tenant).
- [ ] Docs updated (README/ARCHITECTURE/ADR) if structure or decisions changed.
- [ ] No secrets, credentials, or real customer/margin data committed.
- [ ] CHANGELOG updated for user-visible changes.

## Recommended local tooling (optional)
A pre-commit hook for secret-scanning and whitespace is recommended. Because this
repo holds to a strict supply-chain posture, vet and pin any hook versions before
adopting; nothing third-party runs by default.
