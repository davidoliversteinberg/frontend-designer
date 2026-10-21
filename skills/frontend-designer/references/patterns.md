# Pattern index

Runnable compositions for recurring Axiom Play needs. Shared component rules live in [Axiom evidence](axiom-evidence-and-compliance.md) and the [Axiom Play profile](axiom-v3-implementation.md); design decisions live in [interaction and composition](interaction-and-composition.md). Choose the best matching entry below and open only that file. If nothing fits, inspect the nearest suitable product implementation instead.

| Reference | Read when |
| --- | --- |
| [Control patterns](patterns/controls.md) | Building a validated form, a controlled select with a fallback, or an object action menu. |
| [List view](patterns/list-view.md) | Composing a collection page with search, filter menus, a create action, results, row actions and pagination. |

The examples are adapted from Ben Holme's `build-product-ui` skill in Axiom Play.

## Maintenance standard

- Keep this index short and code-free. Give every entry a specific "read when" condition and a direct link; no nested indexes.
- Add recurring cross-product compositions, not screen variants. Keep prototype-specific examples beside their prototype, and update an existing example before adding an overlapping one.
- Each example states when it applies, gives a minimal complete composition, names its assumptions, and lists the behavior checks that prove it works.
- Keep shared rules in their owning reference rather than repeating them here or in each example. Do not move a safety rule into an optional pattern.
- Type-check changed examples against the installed package. Compilation is not interaction verification; record browser evidence separately.
- An example is a starting point for composition, not a design decision. The interaction model, hierarchy and density still come from the task.
