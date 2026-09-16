# Acceptance and geometry

Use this for explicit visual corrections, numeric acceptance criteria, or disputed geometry. It turns the changed scope and user corrections into observable completion criteria and prevents a locally plausible measurement from overruling the rendered result. Routine small edits use the scoped visual-quality gate without requiring a separate acceptance table.

## 1. Lock the acceptance contract

Before changing code, record each explicit visual or behavioral requirement in a compact table:

| Target | Route or surface | State | Viewport | Expected result | Evidence method |
| --- | --- | --- | --- | --- | --- |

Treat user corrections, supplied screenshots and Figma measurements as blocking acceptance evidence. Preserve the user's named object and wording. “Fix the 16px inset on all overlay controls” is not satisfied by inspecting one badge, another card or a similar route.

When a requirement is qualitative, translate it into observable relationships without pretending the user supplied a pixel value. Examples include no collision, consistent repeated-card rhythm, readable hierarchy, stable alignment and one clear primary action.

## 2. Expand a local defect to its systemic scope

Fix the rule that produced the defect, not only the first visible instance. Inventory:

- every component or wrapper sharing the implementation;
- every repeated instance on the current surface;
- every distinct semantic contract and interactive descendant identified by `component-state-conformance.md`, including controls rendered internally by a compound component;
- every applicable state and transition derived from the component contract and product logic;
- long labels, missing media, dense metadata and other content extremes;
- every distinct render mode, including structural or behavioral changes caused by viewport, container, overlay or input method;
- sibling routes only when they reuse the same implementation or rule.

Do not wander to a similar-looking component while leaving the named target unresolved. Verify the exact target first, then prove the systemic fix across affected implementations and representative content/state extremes. Identical repeated instances can share evidence; do not redesign unrelated consumers.

## 3. Measure the painted result

For spacing, alignment, overlap, clipping, target size or responsive complaints, measure against the boundary the user can actually see.

Distinguish:

- **layout bounds:** an element's DOM rectangle before ancestor clipping;
- **painted bounds:** the visible intersection after overflow, clipping, transforms and viewport boundaries;
- **reference bounds:** the visible container, image, control or alignment edge named by the acceptance criterion.

Compute insets from the reference bounds to the painted target bounds. Inspect the full ancestor chain for padding, negative margin, overflow, position, transform, grid/flex alignment and pseudo-elements. A correct child-to-parent number is invalid evidence when that parent extends outside a clipped visible container.

Use computed styles to explain pixels, not to replace them. Screenshot evidence and geometry must agree. If the screenshot appears wrong while the measurement appears right, the task fails until the discrepancy is explained.

Do not confuse a clipped layout rectangle with visible ink: an SVG viewBox can contain empty space, and a text Range reports line fragments rather than exact glyph edges. Record the boundary actually measured and use the screenshot to confirm perceptual alignment.

## 4. Preserve compound layout contracts

Before overriding padding, margin, gap, overflow, position, display or sizing on a design-system compound component:

1. inspect the installed parent and child implementation;
2. identify defaults that assume one another;
3. test how the override changes slots, overlays, focus rings, clipping and responsive behavior;
4. prefer the documented composition over parallel absolute positioning;
5. record a justified exception when the design requires an override.

A padding prop on a compound child may not control its addon or overlay layer. A negative child margin may depend on parent padding. `overflow: hidden` can make a mathematically correct offscreen inset visibly zero. Verify the whole rendered contract.

## 5. Correction protocol

When the user says the defect remains:

1. revoke the previous completion claim and score;
2. return to the user's exact route, object, viewport and state;
3. capture fresh pixels before proposing another cause;
4. measure the target against the visible reference boundary;
5. inspect the component and ancestor implementation that produces that geometry;
6. make one evidence-based correction;
7. repeat the exact acceptance check before expanding to regression coverage.

Do not argue that the user is viewing another deployment, stale build or different route unless direct evidence proves it. Do not keep changing numeric tokens when the coordinate system or layout contract is wrong.

## 6. Completion evidence

For explicit visual corrections, report:

| Acceptance criterion | Exact target tested | Viewport/state | Before | After | Result |
| --- | --- | --- | --- | --- | --- |

Include the tested route, visible boundary used, representative repeated instances and states, and screenshot status. Report numeric measurements only when the requirement is numeric or measurement materially resolves ambiguity.

Completion requires all of the following:

- the exact reported defect passes;
- the systemic instances and relevant states pass;
- the semantic mapping, component contract and rendered state agree;
- computed geometry agrees with captured pixels;
- every affected distinct render mode passes, not merely two arbitrary viewport widths;
- any unavailable evidence is named rather than assumed.
