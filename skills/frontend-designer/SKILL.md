---
name: frontend-designer
description: >
  Design, build, or polish visible Optimizely product UI with explicit interaction-model
  selection, strong composition, readable typography, disciplined content and actions,
  verified design-system component and state conformance, responsive rendering, and scored
  visual-quality validation. Use when making or changing interfaces; do not use for critique-only requests.
metadata:
  version: "1.1.0"
  phase: make
---

# Optimizely frontend designer

Use this skill for every visible product-UI design, implementation, or polish task. It is the authority for the made interface: product-design judgment comes first, Axiom implementation second, and rendered verification last.

The target is calm, premium, intelligent, restrained, operational, enterprise credible and recognizably Optimizely. Do not import a generic creative-UI aesthetic, marketing-page novelty or maximalism into product surfaces.

## Weekly skill freshness check

At the start of the first `frontend-designer` task in a session, run `node <this-skill-directory>/scripts/check-for-updates.mjs`. The helper persists its last attempt and contacts the canonical GitHub source no more than once every seven days.

- If it reports an update, tell the user the installed and available versions before continuing the design task.
- Never download, merge, or overwrite skills automatically. Update only with explicit user approval, preserving repository-level instructions and project-pinned adaptations.
- A cached result or unavailable network must not block the design task. State an unavailable check briefly only when the user asks about installation freshness.
- Use `--force` only when the user explicitly asks to check now or troubleshoot installation freshness.

## Optional companion routing

This skill is complete and usable on its own. Inspect the skills available in the current client and add only a companion whose description materially covers a needed capability:

- diagnosis of an existing artifact before changing it;
- flows, branching, permissions, async behavior or recovery;
- enterprise or general interaction patterns;
- interface terminology and UX writing;
- accessibility depth beyond the integrated completion gate;
- developer handoff requested as an explicit deliverable.

Select companions by their declared capability, not by a hardcoded repository or assumed skill name. Prefer the smallest useful set. A companion owns its specialist decision; this skill owns the integrated interface, implementation and completion gate. If no companion is installed, perform the essential work directly, name any unavailable depth, and continue when safe.

## Mandatory reading

For every visible UI task, read in this order:

1. [`references/interaction-and-composition.md`](references/interaction-and-composition.md) — interaction model, focal point, composition, typography, density, content, actions and surfaces.
2. [`references/component-state-conformance.md`](references/component-state-conformance.md) — semantic intent, correct design-system mapping, derived state models, rendered modes and repair protocol.
3. [`references/acceptance-and-geometry.md`](references/acceptance-and-geometry.md) — explicit acceptance criteria, systemic scope, visible-boundary measurement and correction-loop discipline.
4. [`references/visual-quality-gates.md`](references/visual-quality-gates.md) — scored rendered-quality gate, accessibility, responsiveness and automatic failures.

Then read only the references that apply:

- [`references/axiom-evidence-and-compliance.md`](references/axiom-evidence-and-compliance.md) whenever the interface will use Axiom or claim Axiom compliance. It makes live component retrieval, Figma-to-code reconciliation and post-implementation proof mandatory.
- [`references/axiom-v3-implementation.md`](references/axiom-v3-implementation.md) before writing or reviewing Axiom Play product UI code. Outside Axiom Play, apply its Axiom principles but defer repository paths and local wrappers to the target codebase.
- [`references/editorial-surfaces.md`](references/editorial-surfaces.md) for DAM, Brand Packs, imagery, typography, logos, color systems, templates or other visual subjects.
- [`references/visual-reference-analysis.md`](references/visual-reference-analysis.md) whenever a screenshot, mockup or prototype is supplied.
- [`references/motion-rules.md`](references/motion-rules.md) when motion, transitions, loading, panels, menus or animated state changes are involved.

A Figma link or node ID is fetchable evidence for product intent, hierarchy, content and visual acceptance. It is not proof that a named component, variant or visible state matches the current design-system contract. When one is supplied, fetch it (`get_design_context`, `get_variable_defs`, `get_screenshot`) before the design brief, then reconcile it through `component-state-conformance.md`. Preserve the intended experience while correcting stale, unsupported or behaviorally wrong component and state choices.

The target repository's build, CSS, navigation, file architecture, and git rules remain authoritative. Product-domain rules and Opal-specific layers are additive; they do not override the design-quality contract.

## Required design sequence

Do not start with components. Before coding, write a compact internal design brief:

1. **User decision:** what must the user understand, judge or do?
2. **Primary interaction model:** choose queue, grid, table, master-detail, editor, comparison, dashboard, or focused modal/sheet; explain why it fits in one sentence.
3. **Composition:** name the dominant, supporting and utility regions; define the first three stops in the reading order and the purpose of any quiet space.
4. **Content budget:** remove repeated status, metadata and controls; decide what is progressively disclosed.
5. **Type and action hierarchy:** identify readable body copy, limited metadata, and the one primary action for the current scope (or intentionally none).
6. **Surface plan:** choose open space, separators, cards, panels, drawers or modals because of workflow boundaries—not because they are convenient containers.

If these choices are unclear, inspect nearby production-quality screens and the supplied positive references before implementation.

## Product-design contract

- One task owns the surface and one region owns the user's attention.
- Page-level hierarchy is established before component-level styling.
- Typography, alignment and spacing carry hierarchy before badges, borders or color.
- Surfaces breathe. The working spacing set is `32` / `24` / `16`, and when a gap is genuinely ambiguous the larger step wins — under-spacing is this design language's characteristic failure, not over-spacing.
- Spacing is chosen from the relationship between two elements, never from how much room is left. See the spacing-rhythm section of `axiom-v3-implementation.md`.
- Large work surfaces use readable body type. Never shrink text to make excessive content fit.
- Caption and monospaced uppercase text are specialized styles, not default section labels.
- Density is localized. A dense operational panel may sit beside a quiet workspace; the entire page must not feel equally dense.
- Green is selective: one filled primary action at most per visible decision scope, never repeated bright-green row/card actions, and never as a selected filter treatment.
- Visual inspection surfaces give the subject enough scale to judge. Configuration surfaces favor narrow, predictable form structure.
- A drawer stays secondary and brief. Promote deep comparison or complex review into a workspace with enough width.
- Screenshots provide relationships and quality evidence. Extract requirements; do not copy prototype defects or incidental dimensions.

The detailed rules and positive alternatives live only in the references above. Do not recreate parallel doctrine in feature files or other skills.

## Implementation contract

After the design brief:

- Inspect nearby live routes and reusable components.
- Resolve the component-and-state conformance record before coding. The presence of a design-system import never proves that the correct primitive, anatomy, props, states or responsive mode were used.
- Implement with the applicable Axiom authority and target-repository rules. For Axiom work, complete the Axiom evidence record before coding.
- Preserve semantic tokens, spacing tokens, icon-package rules, form/menu rules, dark mode, accessibility and file boundaries.
- Do not invent a design-system primitive, generic wrapper or component infrastructure until live lookup and installed-package inspection prove there is no suitable component or documented composition. A shared wrapper also needs repeated product use or explicit user scope.
- Never leave dead controls or claim behavior that is not implemented.
- Do not extend a monolithic file; split concerns before adding behavior.

## Completion contract

Visible UI work is incomplete until it is rendered at the primary desktop width, a narrower width, and both sides of every discovered component-mode boundary, compared against the reconciled design and system contracts, and scored with `visual-quality-gates.md`.

Every explicit user correction remains a blocking acceptance criterion until the exact route, object, state and viewport pass against the visible rendered boundary. A prior pass is revoked when the user reports that the defect remains. Do not substitute a similar component, route or state, and do not use computed styles or invisible layout bounds to overrule contradictory pixels.

Minimum passing score: **17/20 with no zero and no automatic failure**. TypeScript, lint, route `200`, or component compliance alone never proves visual quality.

Completion requires the conformance postflight in `component-state-conformance.md`. For Axiom work, also complete `axiom-evidence-and-compliance.md`: verify every changed compound or interactive component against live documentation and the installed package, run the repository's deterministic Axiom check when available, and report any exception or unverifiable mapping.

In Axiom Play, run `yarn check:axiom <changed TSX files>` before completion, and `yarn test:axiom-check` whenever the checker itself changes. Its rules are enumerated in `axiom-evidence-and-compliance.md`; satisfy them while writing, and report pre-existing findings separately from introduced ones.

Measure what you changed, not only the page around it. A whole-page score can pass while the one new control on it is wrong. For every element added or moved, report its painted size, its gap to the neighbour it groups with, and its measured alignment offset against whatever it should line up with — see *Measure what you changed* in `axiom-v3-implementation.md`. Before assuming a prop exists, check it against the installed `.d.ts`; the *What Axiom does not have* section in the same file lists the absences that have caused real defects.

If browser or screenshot verification is unavailable, state that explicitly and do not claim the UI is visually verified.

In the completion report, name any companion skills that materially contributed, summarize the Axiom/Figma/repository/browser evidence actually inspected, and separate verified outcomes from remaining assumptions or unavailable checks.
