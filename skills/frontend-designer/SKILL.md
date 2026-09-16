---
name: frontend-designer
description: >
  Design, build, or polish visible Optimizely product UI with Axiom, strong composition,
  readable typography, restrained content, and rendered verification. Use when creating
  interfaces, changing layouts, or making a screen calmer or clearer. For critique-only
  requests, use an available design-review capability instead; do not edit the interface.
metadata:
  version: "1.2.0"
  phase: make
---

# Optimizely frontend designer

Design for the user's decision first, compose the interface second, implement with the verified system, then inspect the result. The target is clear, calm, operational, and recognizably Optimizely. Restraint does not mean sparse at any cost: useful density is appropriate when the task needs it.

## Freshness and companions

At the first task in a session, run `node <this-skill-directory>/scripts/check-for-updates.mjs`. It caches attempts for seven days. Report a newer version, but never download or overwrite skills without approval. An unavailable check must not block design. Use `--force` only when explicitly asked to check now.

This skill works alone. Add available companion capabilities only when materially needed: critique, complex flows, UX writing, accessibility depth, or requested handoff. Select them by their descriptions, not assumed installation names. A companion owns its specialist decision; this skill owns the integrated interface. Missing optional companions do not block safe work.

For an ambiguous observation such as "this table feels cluttered," inspect and explain first; do not infer permission to edit. "Make this table calmer" authorizes a scoped change.

## Load only the relevant guidance

- **New screens or changes to hierarchy, layout, density, content, or type:** read [interaction and composition](references/interaction-and-composition.md).
- **Every visible change:** read [visual quality gates](references/visual-quality-gates.md), choosing full-screen or focused verification.
- **Adding or changing controls, states, semantics, or responsive modes:** read [component and state conformance](references/component-state-conformance.md). Reuse verified unchanged contracts.
- **Explicit visual corrections or disputed geometry:** read [acceptance and geometry](references/acceptance-and-geometry.md).
- **Axiom implementation or compliance claims:** read [Axiom evidence](references/axiom-evidence-and-compliance.md). Also read the [Axiom Play implementation profile](references/axiom-v3-implementation.md) when working in that repository; other repositories own their local wrappers and architecture.
- **Screenshots, Figma, or visual calibration:** read [reference analysis](references/visual-reference-analysis.md) and the [visual library](references/visual-library.md); inspect the actual relevant images.
- **Visual subjects such as DAM assets, Brand Packs, typography or imagery:** read [editorial surfaces](references/editorial-surfaces.md).
- **Changed motion or animated states:** read [motion rules](references/motion-rules.md).

Read each selected reference completely. Do not load unrelated modes as ceremony.

## Authority and rule strength

The user owns the task, explicit constraints, and approved departures. The installed package owns the available API; version-matched system evidence owns component semantics. The target repository owns build, architecture, navigation, and local conventions. Rendered evidence establishes what users can actually perceive and operate.

Fetch supplied Figma nodes and screenshots before implementation when accessible. They convey intended hierarchy, content, and visual acceptance, not proof of current component validity. Reconcile stale variants or inaccessible behavior openly. A user's requested change can intentionally depart from a Figma frame.

Distinguish three kinds of guidance:

- **Requirements:** valid component contracts, accessibility, reachable actions, truthful content, and explicit user acceptance criteria. These block completion when unmet.
- **Defaults:** type roles, spacing rhythm, density, and surface proportions. Adapt them to task, content, viewport, and approved patterns; explain material departures.
- **Examples:** a specific screenshot or shipped product treatment. Transfer its useful relationship, not incidental dimensions, fonts, or brand styling.

An external brand reference can inform composition, not replace Axiom identity. Do not interpret an image as blanket system approval.

## Design sequence

For a new screen or substantial redesign, write a compact internal brief:

1. **Decision and model:** what must the user do, and why does this interaction model fit?
2. **Composition:** dominant, supporting, and utility regions; first three reading stops; purpose of quiet space.
3. **Content and density:** realistic content, essential evidence, progressive disclosure, and where compactness helps.
4. **Type and actions:** page/body/metadata roles, reading width, and one primary action per decision scope or intentionally none.
5. **Surface boundaries:** what actually needs a card, panel, separator, drawer, or modal?

When two materially different compositions are plausible, compare them briefly against task fit, evidence scale, scanning effort, and action reach. Choose one before detailed implementation; do not generate alternatives mechanically for small fixes.

For a focused edit, state only the intended improvement, affected region/states, and invariants to preserve. Do not redesign unrelated areas.

## Design contract

- Establish hierarchy with scale, placement, type, alignment, and spacing before adding badges, borders, or color.
- Choose spacing by relationships and density needs. More whitespace is not automatically better; retain readable content and adequate targets.
- Use the approved product font and verify its rendered use. Do not invent font pairings or shrink essential copy to hide content excess.
- Localize density; keep the main task recognizable even in a dense operational interface.
- Reserve bright green for a meaningful primary action, not repeated row actions or selected filters.
- Give visual subjects enough scale to judge. Give configuration predictable labels, grouping, and save behavior.
- Use real or realistic content early. Test long names, multiline text, and relevant non-happy states before calling the composition settled.
- Make a subtractive pass after the first render: remove a badge, border, label, or control only when its removal preserves meaning and operability.

## Implementation and completion

Resolve changed component/state mappings before implementing them. Verify Axiom contracts once per component/version/configuration in the task and refresh evidence when that contract changes. Never invent an API, primitive, or wrapper without first checking supported system and local patterns.

Implement within the requested scope. Respect repository architecture; avoid unrelated refactors. Do not leave dead controls or claim behavior not implemented.

For new screens or substantial redesigns, render the primary viewport and a narrower one, exercise changed states, and test both sides of affected responsive mode boundaries. Score the rendered screen using the quality gate: **17/20, no zero, all three core craft categories at 2, and no automatic failure**. Each core score needs observable evidence, not flattering adjectives.

For a focused change, verify the exact target, relevant interaction and responsive states, and adjacent regressions. Do not issue a whole-page score for unreviewed areas or broaden scope to repair unrelated pre-existing issues.

Explicit corrections remain blocking until the exact route, object, state, and viewport satisfy the user's acceptance criterion. Measure numeric requirements and ambiguous geometry; do not produce a measurement ledger for every element.

Run the target repository's relevant checks. In Axiom Play, run `yarn check:axiom <changed TSX files>`; run `yarn test:axiom-check` when the checker changes. Separate pre-existing findings from introduced ones.

If browser, font, component, or reference evidence is unavailable, name the gap and limit the claim. Never claim visual verification from code or a self-assigned score alone. Report changed scope, inspected evidence, verification, material exceptions, and remaining uncertainty concisely.

## Maintaining this skill

When changing the skill itself, use [regression tasks](evals/design-tasks.md). Structural checks and textual forward tests do not replace a rendered, reference-calibrated benchmark.
