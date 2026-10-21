# Axiom evidence and compliance

Use this workflow whenever an interface will be implemented with Axiom or described as Axiom-compliant. Do not ask the model to memorize the catalog. Retrieve the relevant contract before implementation and prove the result afterward.

## Evidence authority

Use [`component-state-conformance.md`](component-state-conformance.md) to separate product intent, system contract and rendered evidence. There is no single authority for every question.

- The user's task owns the intended outcome and constraints.
- Figma owns intended composition and visual acceptance evidence, but not the validity of an Axiom component, variant or state.
- The installed `@optiaxiom/react` and icon package versions own the executable API and runtime implementation available to the repository.
- The stable official Axiom MCP owns current documented semantics, anatomy, props, patterns, states, tokens, icons, tests and guides.
- Nearby production-quality patterns and approved wrappers own repository-specific conventions when they remain compatible with the installed system.
- Public documentation is supporting evidence and must not be assumed to match the installed version.

Reconcile conflicts according to the question being answered. Never claim that a public example compiles locally until the installed package confirms it, and never copy a Figma state that contradicts the verified component contract without an explicit product decision.

## Mandatory preflight

Before writing UI code:

1. Detect the installed Axiom React and icon versions from the target repository. Identify the package manager and authoritative lockfile.
2. If Figma is supplied, fetch the target node, variables and screenshot. Record component instance names and Code Connect information when available.
3. Complete the semantic component-and-state inventory in `component-state-conformance.md`. Include interactive descendants, states and render modes generated internally by compound components, not only elements visible in the default artifact or changed JSX.
4. Query the configured official Axiom MCP for each changed interactive or compound contract. Reuse retrieved evidence within this task when component version, configuration and relevant context are unchanged; familiarity alone is not evidence:
   - use `search_components` when the mapping is unknown;
   - use `get_component` for the exact API, subcomponents and relevant props;
   - use `get_patterns` for compound composition and components used together;
   - use `get_tokens` before adding or translating styling values;
   - use `search_icons` instead of guessing an export;
   - use `get_guides` or `get_tests` when setup or behavior is material.
5. Reconcile MCP results with installed exports and types. The installed package wins when versions differ.
6. Keep one compact internal record shared with the conformance workflow; do not maintain duplicate tables:

| Intent and semantic role | Figma evidence | Axiom component or pattern | Required anatomy/configuration | State model and render modes | Installed verification | Exception |
| --- | --- | --- | --- | --- | --- | --- |

Do not begin component infrastructure while an evidence row is unresolved.

If the MCP is unavailable, inspect the installed declarations/source and the official documentation links below. State that live retrieval was unavailable. Do not guess.

## Prop-contract preflight

A component name or a successful import does not prove that its prop set is valid. Before using a new component or configuration, list the actual JSX props and enum values it will receive, including inherited styling props and required compound children, and resolve each against the installed declaration or matching MCP documentation. Keep the list in working notes, not in the application, and reuse it for every instance with the same contract.

- Do not transfer props between components. A Badge's `intent` does not prove that Button has one; verify Button's own destructive appearance.
- Check style-prop spellings and token domains explicitly. A CSS property name is not automatically an Axiom prop: verify the installed border shorthand rather than assuming `borderBottom`.
- Check sizing per component. `Textarea` in Axiom 3.1.6 takes no `size`; use `rows` and layout props. `LabelMenuButton` fixes its own size. Do not copy a sizing prop to a neighbouring control because they share a row.
- Check required compound children and prop forwarding for `asChild` and local layout wrappers. `Flow` injects margins into direct children, and a Fragment cannot receive them; use a concrete child that forwards margin props.
- Before the first full typecheck, scan the changed JSX for newly introduced or copied props and resolve only the unchecked ones. The typecheck and runtime console assertions stay required; never suppress a type error or warning to pass them.

## Compound component contracts

Treat these as Optimizely implementation rules and verify upstream APIs live before use.

### Card

Do not reconstruct an Axiom Card with arbitrary boxes. Verify the current Card pattern, then use its named anatomy. The current stable pattern includes:

- `CardHeader` as the required identifying region;
- optional `CardPreview`, `CardImage` and `CardFooter` regions;
- `CardLink` for the card's primary link;
- `CardAction` and `CardCheckbox` for contextual actions and selection;
- `CardPreview` overlay slots `addonTopLeft`, `addonTopRight`, `addonBottomLeft` and `addonBottomRight`;
- `CardHeader` slots `addonBefore` and `addonAfter`, plus its description.

Put controls in the documented slots rather than absolutely positioning parallel markup. Use a product-specific wrapper such as an asset card only when the same domain composition repeats and the wrapper preserves the Axiom anatomy.

Inspect the installed Card and CardPreview styles before overriding their padding, margin or overflow. Some versions use parent padding together with negative preview margins and a separately padded overlay. Setting a zero-padding Card or clipping overflow can cancel a slot's visible inset even while the overlay itself reports the expected padding. Follow `acceptance-and-geometry.md`: measure every occupied corner against the visible preview boundary and verify default, hover and narrow states.

### Button and icons

Use the Axiom `Button` `icon` and `iconPosition` API. Do not manually assemble icon, label and spacing inside a button.

Apply the Optimizely product convention unless the supplied Figma component or a verified product rule says otherwise:

- a filled Material icon marks a selected navigation item; unselected navigation items use the unfilled treatment. Do not infer fill from a button's leading or trailing position, size or appearance;
- `Button` owns its icon's size: do not pass `size`, `width`, `height` or font-size to an icon inside `icon`, an addon or the children;
- an icon-only button has an accessible name and a tooltip when its meaning is not obvious;
- menu, ellipsis, disclosure, select and segmented triggers use their purpose-built Axiom components instead of a generic Button recreation. A `*Trigger` already renders a button: put button props on the trigger rather than wrapping an Axiom `Button` with `asChild`. Purpose-built buttons such as `EllipsisMenuButton` and `LabelMenuButton` are the intended `asChild` children.

Verify that the chosen icon export and filled variant exist. A visually similar invented name is not an acceptable fallback.

## Figma-to-code reconciliation

For every Figma component instance:

1. Use Code Connect when it maps the instance to an Axiom component.
2. Otherwise search Axiom by the component's role and verify a documented pattern.
3. If no single component exists, compose documented Axiom primitives and record the composition.
4. If neither a component nor a supported composition exists, mark a design-system gap. Do not silently invent a shared primitive.

Then reconcile the Figma variant and visible state with the current component's documented state model. Preserve the product intent, not an unsupported or stale representation. When they disagree, classify the conflict as a prototype defect, version mismatch, intentional product exception or design-system gap before implementation.

A gap may justify a local implementation only when the user requested it or the target repository already owns that pattern. A new shared wrapper needs a demonstrated gap and repeated credible use. Keep an isolated prototype clearly labeled when those conditions are not met.

In Axiom Play, a product-neutral reusable component that fills a real gap belongs in `components/axiom-candidates/`, following that folder's README: its own subdirectory, focused tests, and a short record of the need, API, states and browser evidence. Product-specific UI, routing, mock data and product language stay with the owning prototype.

## Mandatory postflight

After implementation and before visual scoring:

1. Inventory every changed Axiom component, compound part, icon and token.
2. Compare changed compound/interactive components with the retrieved contract. Refresh lookup if the version, selected component, relevant configuration, or documentation evidence changed, or a mismatch remains unresolved. Do not repeat identical retrieval merely to perform a postflight.
3. Reinspect parent/child layout defaults whenever padding, margin, overflow, position, display or sizing was overridden.
4. Confirm every imported component and icon exists in the installed packages.
5. Run TypeScript, lint and the repository's deterministic Axiom checker when one exists. Treat unsupported props, legacy component parts, invalid compound anatomy, raw replacement controls and icon-policy failures as blockers.
6. Reconcile the rendered accessibility tree or focusable DOM with the component-and-state inventory so internally rendered controls are not omitted.
7. Exercise affected transitions and distinct render modes, then complete component conformance and the scoped visual-quality gate. Use `acceptance-and-geometry.md` when an explicit correction or disputed geometry requires it.
8. Diagnose and repair the owning layer for every mismatch. An upstream claim requires isolated evidence against the installed version and does not permit a completion claim while the required behavior remains broken.
9. Report checks run, material exceptions, version differences and anything unverified. Keep routine passing inventory internal unless the user requests the detailed record.

Code compilation does not prove correct composition. Visual similarity does not prove valid API use. Both evidence paths must pass.

## The deterministic checker, rule by rule

In Axiom Play the checker is `yarn check:axiom <changed TSX files>` (`scripts/check-axiom.mjs` plus `scripts/check-axiom-rules.mjs`), with `yarn test:axiom-check` when the checker itself changes. With no file arguments it checks files changed against `origin/main`. Its own `scripts/check-axiom.md` is the authority for the current rule set; the table below summarizes it as of October 2026. It encodes rules stated nowhere else in this skill, so satisfy them while writing rather than discovering them at the gate:

| Rules | What they require |
| --- | --- |
| `raw-control`, `invented-component`, `invented-icon`, `tabler-icon` | Axiom controls and packaged icons, not raw controls, local stand-in primitives, hand-drawn SVG icons or Tabler |
| `button-icon-label`, `button-manual-icon`, `button-icon-size`, `icon-stroke` | Icon-only buttons are labelled; icons pass through `icon`/`iconPosition`; Button owns icon size; no `stroke`/`strokeWidth` on Material icons |
| `card-header`, `card-action-slot`, `card-checkbox-slot`, `legacy-card-part`, `card-preview-visible-inset`, `nested-card` | Current Card anatomy and slots, a visible preview inset, and no card inside a card |
| `compound-component-anatomy`, `trigger-as-child-button`, `as-child-content` | `Select`, `Menu` and `Dialog` roots have their required parts; triggers are not wrapped around a Button; `asChild` receives exactly one element |
| `deprecated-flex`, `box-flex-container` | `Group` for flex layout, not `Flex` or `Box display="flex"` |
| `flow-child-margin` | No vertical margins, including zero, on direct children of `Flow` |
| `typography-color-override` | `Text` and `Heading` keep their default colors; no `color` prop or inline color |
| `invalid-component-size`, `unsupported-component-prop`, `heading-level` | Valid Button and Input sizes, no `Badge.colorScheme` or sized `LabelMenuButton`, and Heading levels `"1"`–`"4"` |
| `hardcoded-ui-color`, `negative-letter-spacing` | Semantic color tokens and no negative letter spacing on product UI |
| `nested-interactive`, `positive-tabindex`, `empty-accessibility-attribute`, `image-alt`, `button-type` | Operable, labelled markup in natural focus order |
| `controlled-default-conflict`, `controlled-input-handler`, `duplicate-jsx-prop`, `void-element-children`, `html-children-conflict`, `invalid-jsx-syntax` | Well-formed React props and markup |

A narrowly scoped, documented exception uses the checker's rule-specific ignore comment beside the element, for a genuine case such as a chart's categorical color. Never suppress a rule to make a check pass.

Run the checker on the files changed, then read the findings against a pre-change baseline. Report pre-existing findings separately from any introduced by this work; do not present an unchanged count as a pass.

## The shipped product is evidence

For Opal surfaces, `newscred/opal-app` is the running implementation of the feature being prototyped. Read the relevant component before designing a pattern from scratch — it settles component choice, affordance shape and spacing rhythm in one pass, and it is more current than any screenshot. Its `guidanceSpacing.ts` is the origin of the relationship-keyed spacing scale in `axiom-v3-implementation.md`.

Treat it as evidence, not as specification. It shows what the system already does; this skill still owns whether that is the right thing to do. Where the prototype deliberately diverges — a hover-revealed control made persistent, for example — state the divergence and the reason.

## Official sources

- [Components](https://optimizely-axiom.github.io/optiaxiom/components/)
- [Styling](https://optimizely-axiom.github.io/optiaxiom/styling/)
- [Guides](https://optimizely-axiom.github.io/optiaxiom/guides/)
- [MCP guide](https://optimizely-axiom.github.io/optiaxiom/guides/mcp/)
- [Card](https://optimizely-axiom.github.io/optiaxiom/components/card/)
- [Button](https://optimizely-axiom.github.io/optiaxiom/components/button/)
- [Icons](https://optimizely-axiom.github.io/optiaxiom/guides/icons/)
