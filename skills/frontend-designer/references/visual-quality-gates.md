# Visual quality gates

This is the completion authority for visible Optimizely product UI. Score the rendered surface, not the source code or design intention.

## Scope the verification

For a new screen or substantial change to its interaction model, hierarchy, or composition, use the full scorecard. For a focused edit, verify the changed region, affected states and responsive modes, plus nearby regressions. Do not score unreviewed parts of the page or turn pre-existing unrelated defects into an unrequested redesign. Explicit user corrections always retain their exact acceptance target.

For repeated components, cover each distinct implementation/configuration/mode and representative content extremes; identical rows do not need individual measurement reports. A shared-component change requires checking its affected consumers, not merely one happy-path instance.

## Required evidence

Before scoring or reporting a focused pass:

1. Define the changed scope. Use `component-state-conformance.md` for changed controls/behavior/modes and `acceptance-and-geometry.md` for explicit corrections or ambiguous geometry.
2. Render the exact changed route, named object and state at its primary desktop width.
3. Discover interactive descendants from the source plus the rendered accessibility tree or focusable DOM.
4. Exercise transitions and distinct render modes affected by the change, including internally rendered controls. Choose widths around affected mode boundaries. Reuse existing evidence for unchanged contracts only when version, configuration, and relevant context are unchanged.
5. Capture screenshots and measure explicit geometry requirements against visible painted boundaries.
6. Compare the pixels and measurements with the acceptance contract, design brief and supplied references.
7. Fix visible problems, then score the revised result.

TypeScript, lint, build and route `200` checks are required where relevant but do not count as visual evidence.

If browser or screenshot tooling is unavailable, say so and do not claim the surface passed visual QA.

## Scorecard

Score each category `0`, `1` or `2`.

- `0` — fails, missing or actively harms the task.
- `1` — usable but unresolved, generic or inconsistent.
- `2` — strong, intentional and appropriate to the task.

| Category | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Interaction-model fit | Wrong/competing models obscure the task | Model is usable but includes unnecessary competing patterns | One primary model clearly fits; support models remain subordinate |
| Focal point and reading order | No clear owner or several competing focal points | Main region exists but evidence/action order is weak | Dominant region and first three visual stops are immediate |
| Typography and readability | Tiny, clipped or role-confused text | Readable but hierarchy relies on weight/badges or too much small metadata | Confident page/body/metadata hierarchy at rendered scale |
| Composition and spatial balance | Cramped, accidental dead space or arbitrary columns | Functional but mechanical or weakly balanced | Dominant/supporting/utility regions and quiet space feel deliberate |
| Content restraint | Repeated status/metadata/controls obscure the decision | Some redundancy remains | Only decision-relevant content is visible; low-frequency detail is disclosed |
| Action hierarchy | Competing, clipped, repeated-primary or unsafe actions | Primary/secondary mostly clear but scope or placement is inconsistent | One clear scope-appropriate primary (or intentionally none); secondary/tertiary/destructive roles are precise |
| Surface discipline | Nested cards, excessive borders or generic drawer/card assembly | Boundaries work but are heavier than necessary | Open space, separators, cards, panels and overlays each express workflow |
| Axiom and Optimizely brand fit | Raw/invalid components or generic/non-Optimizely aesthetic | Mostly compliant but visually generic or over-accented | Axiom-correct, calm, premium, selective green, operational and recognizable |
| Accessibility and operability | Keyboard, labels, focus, contrast or live behavior fails | Baseline works with minor unresolved friction | Clear labels/focus/contrast, keyboard support and safe semantic behavior |
| Browser and responsive quality | Broken/clipped at a tested width or not verified | Main state works but edge/responsive states need polish | Verified desktop/narrow states preserve hierarchy and reachable actions |

### Passing threshold

Require **17/20**, no category scored `0`, no automatic failure, and **2 in each core craft category**: focal point and reading order; typography and readability; composition and spatial balance. Other strengths cannot compensate for an unresolved core visual weakness.

For each core score, cite an observable relationship in the rendered result and a relevant inspected reference when available. For example: the asset is large enough to inspect, metadata forms a quieter column, and the decision action remains reachable. Avoid unsupported labels such as "premium" or "intentional." If no usable visual anchor exists, say the review is uncalibrated rather than pretending a prose description was visually inspected.

Record the score and remaining tradeoffs. A focused edit receives scoped pass/fail evidence, not an invented whole-page total. Scores are an aid to judgment, not a measured quality percentage or a guarantee of user preference.

Do not inflate scores because the code is compliant. A technically correct surface can score poorly in interaction fit, composition, content or typography.

## Automatic failures

Any of these blocks completion regardless of score:

- an explicit user acceptance criterion that remains unmet or was tested on a substitute route, object, state or viewport;
- an unresolved mismatch between semantic intent, selected design-system pattern, component anatomy/configuration or rendered state;
- an affected transition, internally rendered control or distinct render mode omitted from the declared verification scope;
- a claimed measurement taken from an offscreen, unclipped or otherwise different boundary than the one visible to the user;
- computed geometry and screenshot evidence that contradict one another;
- a repeated component fix applied only to one instance while the shared defect remains elsewhere;
- clipped, obscured or unreachable actions;
- unreadably small typography or use of `xs`/10px product text;
- body/explanatory content rendered as Caption or repeated monospaced uppercase labels;
- repeated bright-green row/card actions;
- nested cards without a workflow reason;
- no clear focal point;
- unrelated or unaligned imagery presented as a pixel-level diff; clearly labeled asset-replacement review may intentionally show different subjects;
- dead controls, empty menus, fake filters or tabs with no content;
- broken keyboard interaction, focus visibility or essential contrast;
- broken responsive layout, incorrect responsive component mode or horizontal clipping at the tested width;
- unverified rendered screenshots;
- raw controls or hardcoded product chrome where Axiom/semantic tokens exist.
- an Axiom compound or interactive component whose anatomy, props or icon export contradict live documentation or the installed package;
- a custom primitive or generic wrapper introduced without proving that no suitable Axiom component, documented composition or established local pattern exists.

## Gate details

### Interaction and composition gate

- The primary interaction model can be named and justified.
- One region owns the task.
- Supporting and utility regions are visibly subordinate.
- The first three reading stops follow object/decision → evidence/state → action.
- Quiet space has a purpose; dense information is localized.
- Images are intentionally cropped and scaled for the judgment task.

### Typography gate

- The approved product font has loaded and intended weights are available; distinguish declarations from actual rendered faces where tooling permits.
- Main body and decision text use readable product roles; Body/Small remains secondary and Caption/mono use rare and semantic.
- Line height and reading width suit sustained prose versus compact labels; essential text is not stretched across a broad workspace by default.
- Roles remain distinct without making every label bold or adding a badge to every section.
- Realistic long titles, multiline text and identifiers wrap or truncate intentionally, with essential full values accessible.
- Representative changed text remains usable at 200% zoom and relevant narrow widths; supported localization is not broken.
- Text and controls do not clip, collide, or rely on invisible overflow; hierarchy survives a squint test.

### Content gate

- Status is not repeated across badge, title, score and description.
- Labels, metrics and timestamps each change a decision.
- Helper text prevents real error or is removed/disclosed.
- Button labels state what happens.
- Placeholder/faux content has been replaced with credible product content when available.

### Action gate

- Primary, secondary, tertiary and destructive actions have distinct roles.
- Repeated actions remain neutral/contextual.
- Selected states do not use primary green.
- Low-frequency actions do not crowd the main toolbar/footer.
- Action placement remains stable through loading/selection and narrow widths.

### Surface gate

- Cards represent peer objects or independent tools, not arbitrary page sections.
- Repeated rows prefer alignment and separators over card-per-row containment.
- Drawers remain secondary and brief.
- A deep review/comparison has enough width and does not feel bolted onto another panel.
- Borders, backgrounds and shadows communicate hierarchy rather than decoration.

### Accessibility and operability gate

- Icon-only controls have accessible labels and tooltips where needed.
- Focus is visible and logical.
- Color is not the only carrier of state.
- Muted text remains readable on tinted surfaces.
- Forms have visible labels, field-level errors and recovery paths.
- Destructive actions are visually and semantically distinct.
- Keyboard use does not trigger distracting motion.
- Reduced-motion preferences are respected where motion exists.

### Responsive/browser gate

- Major regions collapse intentionally, not merely stack in DOM order.
- The focal point and action remain reachable.
- Fixed panels, drawers and sticky bars fit the viewport.
- No unintended scrollbars, truncated tabs or compressed CTAs appear.
- Image grids, tables and comparison surfaces have an explicit narrow-width behavior.

## Anti-generic scan with positive replacements

Fix these tells before adding polish:

| Tell | Replacement |
| --- | --- |
| Three or more equal cards with identical hierarchy | Establish a dominant region or use a grid/table only when the items are true peers |
| Icon tile over heading repeated across modules | Use direct headings, alignment and relevant content |
| Tiny uppercase label over every section | Use sans headings/body roles and spacing; reserve Caption for machine-like metadata |
| Pill/badge for every attribute | Use one status signal plus plain grouped metadata |
| Stat cards that do not change decisions | Use a compact summary/filter or remove them |
| Nested bordered boxes | Use open layout and separators |
| Loud gradients, glass, blobs or heavy shadows | Use neutral Axiom surfaces and selective semantic emphasis |
| Generic right drawer for deep work | Use a task-appropriate master-detail, sheet or workspace |
| AI score as visual centerpiece | Lead with conclusion and evidence; subordinate or remove the score |
| Marketing/AI copy in operational UI | Use direct product nouns and action labels |

## Reference comparison

When a relevant visual reference is available, select it using `visual-library.md`, inspect the actual pixels, then compare. If none is available, disclose that calibration is unavailable and assess the rendered relationships without inventing a reference:

- interaction model;
- focal point and region proportions;
- type hierarchy and readable scale;
- content density and disclosure;
- action hierarchy;
- surface boundaries;
- image treatment;
- responsive behavior.

Do not compare by pixel similarity alone. Use `visual-reference-analysis.md` to distinguish durable relationships from screenshot-specific artifacts.

## Completion record

Report:

- tested routes and viewport widths;
- screenshot evidence;
- score by category and total for a full review, or scoped pass/fail evidence for a focused edit;
- automatic-failure check;
- fixes made after the first rendered pass;
- anything unverified.

Work is visually verified only after the scoped rendered result passes, not when the first implementation compiles. Separate implementation completion from unavailable visual verification.
