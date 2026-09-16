# Component and state conformance

Use this when adding or changing controls, semantics, state transitions, or responsive component modes. It prevents three false proofs of quality: a prototype looks plausible, a design-system component is imported, or the default state renders correctly.

The objective is not to remember more examples. Derive and verify the correct contract for the current interface from live evidence.

## 1. Separate the authorities

Treat evidence according to the question it can answer:

- The user and product requirements own the intended outcome, task and constraints.
- A prototype or Figma artifact provides intended hierarchy, content, relationships and visual acceptance evidence. It may contain stale components, unsupported variants, incomplete states or prototype shortcuts.
- The installed design-system package owns the executable API and version available to the product.
- Current design-system documentation owns documented semantics, anatomy, behavior and supported states.
- The rendered product owns the final evidence of what users can perceive and operate.

Do not let one source impersonate another. Visual resemblance does not prove a valid component contract, and a valid import does not prove correct behavior or appearance.

## 2. Build the semantic contract

Before selecting components, inventory each distinct contract affected by the change by what the user needs it to do. Include controls rendered internally by compound components, overlays and responsive substitutions, not only JSX written directly in the changed file.

For each distinct contract, record:

| User intent and semantic role | System primitive or pattern | Required anatomy and configuration | Applicable states and transitions | Distinct render modes | Evidence | Exception |
| --- | --- | --- | --- | --- | --- | --- |

Repeated instances may share one row when they use the same implementation, configuration, state model and render mode. Exercise representative content extremes and affected consumers of shared components. Reuse task evidence for unchanged contracts; do not inventory unrelated parts of the application for a small edit. Resolve the mapping and required state model before implementing the affected component; independent resolved work may proceed.

## 3. Resolve the system mapping

Select a design-system primitive or documented composition by semantics and behavior, not by name or visual similarity.

1. Search current component and pattern documentation by the intended role.
2. Inspect the installed exports, types and implementation for the available version.
3. Reconcile Code Connect, prototype instances and nearby product patterns with that evidence.
4. Confirm required parent-child anatomy, configuration, tokens, accessibility behavior and responsive behavior.
5. Classify an unresolved mapping as an existing primitive, documented composition, established product component or design-system gap.

Do not invent a primitive, silently substitute a merely similar component, or copy a prototype shortcut. A design-system gap is a decision to surface, not permission to improvise infrastructure.

## 4. Derive the state model

Derive states from the selected component contract, product logic and reachable transitions. Do not apply a memorized checklist mechanically, and do not test only states visible in the initial artifact.

For each contract:

1. Identify its initial state and every user, system or data event that changes it.
2. Identify the visible feedback, operability and exit or recovery for each resulting state.
3. Include states created inside compound components even when the application does not own their markup.
4. Identify every mode where the component changes structure or behavior because of viewport, container, input method, overlay placement or product context.
5. Mark a state or mode not applicable only when the component contract or product logic proves it.

Represent complex behavior as `event -> resulting state -> visible feedback -> next action or recovery`. The useful set is the set of reachable, decision-relevant states, not the longest possible list.

## 5. Verify three layers

Every conformance row must pass all three layers:

- **Structural:** correct primitive or documented composition, valid anatomy, supported configuration, real tokens and icons, and no conflicting application overrides.
- **Behavioral:** correct transitions, keyboard and pointer operation, focus movement, dismissal, selection, validation, async feedback and recovery as applicable.
- **Rendered:** the correct visual treatment is perceptible in every distinct mode, without clipping, collision, hidden focus, incorrect hierarchy or contradictory state cues.

Inspect the rendered accessibility tree or focusable DOM together with the source inventory. This catches interactive descendants created by the design system that are absent from the changed JSX.

For affected components that change rendering mode, test on both sides of the actual mode boundary. A generic desktop and narrow screenshot is insufficient when both widths happen to use the same mode.

## 6. Diagnose and repair the owning layer

When evidence disagrees, classify the first incorrect layer:

- **Intent defect:** requirements or prototype express the wrong behavior or state.
- **Mapping defect:** the implementation chose the wrong primitive or pattern.
- **Composition defect:** the primitive is right but its anatomy or configuration is wrong.
- **Application defect:** local styles, wrappers, event handling or layout break a correct system contract.
- **System defect:** the installed design system contradicts its documented contract or cannot produce the required accessible behavior.
- **Version defect:** documentation, prototype and installed package describe different releases.

Fix the earliest owning layer within the task's authority, then repeat structural, behavioral and rendered verification. Replace a wrong mapping rather than styling it into resemblance. Remove a conflicting override rather than compensating elsewhere. Reconcile a prototype defect rather than faithfully reproducing it.

If the defect belongs upstream, isolate and prove it against the installed version. Prefer an upgrade or supported public extension point. Never target generated class names or undocumented internals. If no safe in-scope repair exists, report the blocker and the exact upstream evidence; do not call the interface complete.

## 7. Completion gate

Before completion, reconcile the implementation and rendered interface back to every conformance row. Record the evidence compactly; do not narrate routine passing states.

Completion is blocked when:

- an affected visible or interactive contract has no resolved system mapping;
- a prototype or Figma state conflicts with the current system contract without an explicit reconciliation;
- an affected state, transition or distinct render mode is untested;
- source structure passes while rendered behavior or appearance fails;
- a failure is labeled upstream without isolated installed-version evidence;
- the agent reports a defect but does not repair the owning layer when a safe in-scope repair exists.

The contract is complete only when the correct pattern behaves and renders correctly, not when the code contains the expected component name.
