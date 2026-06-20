# Architecture Decision Records (ADRs)

An ADR captures one significant, hard-to-reverse decision: the context, the
choice, and the consequences. They make the *why* survive staff changes.

- Write an ADR when a decision affects structure, security, data boundaries,
  vendors, or anything costly to undo.
- Copy `template.md` to `NNNN-short-title.md` (zero-padded, incrementing).
- ADRs are immutable once `Accepted`. To change one, write a new ADR that
  supersedes it and update the old one's status.
