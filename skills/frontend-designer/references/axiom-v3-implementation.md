# Axiom V3 implementation

This is the detailed Axiom V3 implementation profile extracted from `axiom-play`. Product-design decisions are owned by `interaction-and-composition.md`. In Axiom Play, the paths and local wrappers below are authoritative; in another repository, keep the component, semantic-token, accessibility, and verification principles but inspect that repository before applying Axiom Play-specific paths or shell conventions.

## Required preflight

- Complete `axiom-evidence-and-compliance.md` before implementation. Its component inventory and live lookup are required, not conditional on the model feeling uncertain.
- Fetch supplied Figma context, variables and screenshots before layout work when accessible. Preserve intended composition, but honor the user's requested departures and reconcile stale component variants with the installed system. Figma does not override explicit user instructions or accessibility requirements.
- Inspect nearby production-quality routes and reuse established page structure and local wrappers.
- Use `@optiaxiom/react` whenever an equivalent component exists.
- Use semantic color tokens and spacing tokens.
- Use the correct icon package for the product area.
- Follow the target repository's file-architecture rules. Keep any required extraction scoped to the changed behavior; do not use this profile to justify unrelated refactoring.
- Resolve changed interactive/compound contracts through the evidence workflow. Reuse valid task evidence; installed exports and types are the final API check.

## Component contract

The following names are lookup candidates from Axiom Play, not a guaranteed current catalog. Verify selected exports and contracts for the installed version before using them:

- Layout/type: `Box`, `Cover`, `Grid`, `Group`, `Heading`, `Separator`, `Text`
- Forms: `Button`, `Checkbox`, `DateInput`, `DateRangePicker`, `Field`, `Input`, `RadioGroup`, `SearchInput`, `Select`, `Switch`, `Textarea`, `ToggleButton`
- Feedback: `Alert`, `AlertDialog`, `Badge`, `Banner`, `Indicator`, `Progress`, `Skeleton`, `Spinner`, `Toast`, `Tooltip`
- Navigation: `Breadcrumb`, `Link`, `Menu`, `Pagination`, `Sidebar`, `Tabs`
- Surfaces/data: `Card`, `Dialog`, `Disclosure`, `Popover`, `Table`, `DataTable`, `Avatar`, `FileUpload`, `HoverCard`, `SegmentedControl`, `Sortable`

Do not use raw `button`, `input`, `select` or `textarea` when an Axiom equivalent exists. Native elements are allowed only for unavoidable internals such as file inputs, `input type="color"`, canvas/SVG work surfaces or customer website content under `app/components/vb/blocks/`.

When a component lacks an exact layout prop, wrap it in `Box` or use `style`; do not replace an accessible Axiom control with custom markup.

Icon-only buttons require an accessible label and a tooltip when the meaning is not obvious. Do not leave dead buttons, filters, tabs, menus or ellipsis actions.

## Semantic colors

Use `fg.*`, `bg.*` and `border.*` props for UI chrome. In CSS or `style`, use the matching `--ax-colors-*` variables. Hardcoded hex/rgb values are not allowed for product chrome.

Common roles:

| Family | Roles |
| --- | --- |
| `fg.default`, `fg.secondary`, `fg.tertiary`, `fg.disabled` | Text hierarchy |
| `fg.error`, `fg.success`, `fg.warning` | Semantic text/icons |
| `bg.default`, `bg.page`, `bg.secondary` | Neutral surface hierarchy |
| `bg.default.hovered`, `bg.default.pressed` | Interaction and neutral selected state |
| `bg.accent` | Filled primary action only |
| `bg.error/success/warning/information` plus subtle variants | Semantic state surfaces |
| `border.default`, `border.secondary`, `border.tertiary` | Structural separation |
| `border.control`, `border.focus`, `border.error` | Controls and validation |

`fg.accent` / `--ax-colors-fg-accent` is reserved for primary-button text; do not use it for links, labels, badges or icons. Use `LinkStyle` from `app/components/LinkStyle.tsx` for inline links and pass `external` for external URLs.

`bg.pill.default` is scoped to `Pill`; it is not valid on `Box`.

Selected filters, tabs and toggle-like button groups use Axiom's selected state or `var(--ax-colors-bg-default-pressed)`, never `bg.accent`.

### Match token meaning to usage

A token being valid is not sufficient. Its semantic role must match the element using it.

- Do not apply role-scoped tokens such as `spinner`, `avatar`, `pill`, `overlay` or `focus` to unrelated cards, paragraphs or decorative surfaces.
- Check how elements with the same visual role are tokenized nearby and preserve the established pattern when it is appropriate.
- When no specialized role applies, prefer a general token such as `bg.default`, `bg.secondary` or `fg.secondary` over an unrelated role-scoped token.

## Tokens and API currency

Use semantic Axiom props before raw values. Retrieve the installed spacing, sizing, typography, radius and shadow scales; do not assume that a value valid for `gap` is valid for `w`, or vice versa. Resolve disagreement between prose examples and declarations in favor of the installed API.

Use `rounded` and `shadow` where supported. Exact untokenized dimensions need a structural or explicit acceptance reason, not a wish to approximate another library. Scope necessary exceptions and check the rendered result. Numeric examples below are starting points from Axiom Play, not a substitute for current token verification.

## Spacing rhythm — which token, and why

A valid token is not a correct token. The table above says which values exist; this says which one to reach for, and the question is always the same one: **how strongly are these two things related?** Spacing is the cheapest grouping signal there is, and it should carry the structure before a border, a card or a background tint is considered.

Optimizely product surfaces should be calm and readable at the density their task needs. Choose a gap by grouping strength, scanning distance, content and viewport. When uncertain, compare adjacent valid steps in the rendered composition; neither the larger nor smaller step wins automatically. Avoid both cramped controls and wasteful separation of closely related evidence.

### One scale, keyed to relationship — not to element type

| Relationship | Step | Typical use |
| --- | --- | --- |
| Parts of one control | `4` | Icon to its label; a count beside the noun it counts |
| Inside one block | `8` | A label and the field it names; a title and its one-line caption |
| Frame around dense chrome | `12` | Padding inside a chip, a toolbar, a compact menu row |
| Between siblings in a list | `16` | Two rules in a section; two fields in a form; two rows in a stack |
| Between groups | `24` | Two field groups; a heading and the group beneath it; a nesting indent |
| Between regions | `32` | Two sections of a page; the gutter around a content column |
| Between major page bands | `40`–`48` | A header band and the work surface below it on a long editorial page |

This scale is a relationship-based starting point, not a universal layout law. Use a small, coherent subset appropriate to the surface. A dense table, form, and asset workspace need different rhythms. Larger gaps can be justified by a major decision boundary; smaller supported gaps can make related operational data easier to scan.

### Container padding defaults

Verify shell ownership and component defaults first. These Axiom Play examples may be adapted to content, density, viewport and current component anatomy; they are not component API guarantees.

| Container | Starting point |
| --- | --- |
| Page shell | `px="32" py="24"` — owned by `template.tsx`; never stack route padding on top of it |
| Card, or a bordered section of a page | `24` |
| Nested or inset block inside a card | `16` vertical, `24` horizontal, so the inner text column stays on the outer one |
| Dialog or drawer body | `24` |
| Dense chrome — toolbar, chip, compact row | `8`–`12` |
| Table cell | `12` vertical, `16` horizontal |

Judge padding by content alignment, grouping and target size. Unequal horizontal and vertical padding is not inherently wrong; preserve the established column and explain material departures from a nearby approved pattern.

### Rules that catch the mistakes that actually happen

- **One owner per gap.** A parent `gap`, or `Flow`, owns the vertical rhythm; its children do not also carry `mt`/`mb`. Two owners is how an intended `16` silently becomes `28`.
- **Never tune spacing to fix an alignment problem.** If a control sits a few pixels off, the defect is the alignment, not the gap. Find the box it should align to and align to it — see *Measure what you changed* below.
- **Avoid unexplained corrective offsets.** Prefer baseline, flex/grid alignment or first-line relationships appropriate to the content. If an optical correction remains necessary, verify it at the relevant sizes rather than generalizing a single screenshot.
- **Compactness must preserve usability.** Reduce supported gaps or use a documented density mode when scanning improves and targets remain adequate. If content still competes, remove repetition, group, shorten, disclose, or use a more suitable surface; do not shrink essential text.
- **Keep the set of steps in one view small.** Three or four distinct gaps across a screen read as a system; nine read as an accident. If a new value is needed, check first whether an existing one on that screen would do.

## Known API traps to verify

Do not infer Axiom APIs from Tailwind, Chakra or shadcn. Verify these historically error-prone cases against the installed package:

- A familiar `fullWidth`, `block`, or `as` prop may not exist. Absence of one convenience prop does not itself prohibit a supported composition. A full-width action needs a task and responsive rationale; a repeated low-priority add affordance should not overpower Save.
- Input and SearchInput size variants may differ from Button variants.
- Spacing and size tokens are different scales.
- Caption may be a repository wrapper rather than a system export.
- Check supported exports, including documented unstable exports, before adding a dependency or inventing a primitive.

The Opal `GuidanceAddGutter` with a small centered add button is a scoped example for list insertion, not a universal rule for all buttons. Inspect the current implementation if reusing that pattern.

A genuine system gap should be named and resolved within scope; do not silently create shared infrastructure.

## Measure what you changed

Inspect the changed element and its context, not only the whole-page screenshot. Measure numeric acceptance criteria, clipping, target sizes, or disputed gaps/alignment when numbers resolve the issue. Do not report a numeric ledger for every unchanged row or element.

Distinguish layout bounds, interaction target, SVG viewBox, text line boxes, and visible ink. An element or SVG bounding rectangle can include empty space; a text `Range` measures line fragments, not exact painted glyph edges. State which boundary was measured and compare it with the screenshot. Do not label a layout-box measurement an optical measurement.

Choose alignment by semantics: baseline for related text, appropriate first-line alignment beside multiline labels, centering within a self-contained control. Inspect font and icon shapes. No universal cap-height offset or zero-offset rule proves optical correctness. Any necessary optical adjustment must be verified across the affected sizes, weights and states.

When hover/focus adds borders or padding, verify that the intended alignment and layout remain stable. Correct the owning layout layer instead of compensating on an unrelated ancestor.

## Typography implementation

Use the installed Axiom type roles and approved product font stack. Verify available sizes and weights rather than copying a cached pixel table. Use Heading semantics deliberately; visual size and document outline are related but not interchangeable.

Follow the reading-comfort and font-integrity checks in `interaction-and-composition.md`. The quality gate verifies actual font loading, hierarchy, reading width, wrapping, zoom and content extremes.

If the repository provides a Caption wrapper, reuse it only for its specialized role. Inspect the path and implementation instead of assuming that every Optimizely repository shares Axiom Play's structure.

## Buttons and forms

- Primary page/panel actions: `Button appearance="primary" size="md"` or `size="lg"`.
- Secondary: `appearance="default"`.
- Tertiary: `appearance="subtle"`.
- Destructive: `appearance="danger"` or `danger-outline` as supported.
- `size="sm"` is limited to genuinely dense toolbars or compact contextual chrome, not standalone consequential CTAs.
- `Input` and `SearchInput` support `md` (default), `lg` and `xl`; never `sm`.
- Wrap inputs with `Field`; do not create manual text labels.
- Keep form-control sizes consistent within a row or section.
- Pass icons through `Button`'s `icon` and `iconPosition` props. Apply the leading-filled/trailing-unfilled convention from `axiom-evidence-and-compliance.md`; do not hand-compose icon spacing inside Button children.

`Select` is data-driven. `value` must match one of `options`; validate persisted/remote values before rendering. Do not render native `<option>` children.

## Menus

Use Axiom V3 `Menu` with the `options` prop, `MenuTrigger` and `MenuContent`. Do not introduce `DropdownMenu`.

`MenuOption[]` supports search, nested `subOptions`, grouped labels/separators, `addon`, `detail`, `intent: "danger"`, `disabledReason` and `keywords`. Helpers should return `MenuOption[]`, not JSX fragments. Use `subOptionsInputVisible` and `keywords` for searchable submenus instead of hand-rolled input state.

## Badges, pills and shared atoms

- Use `Badge` for short read-only status/metadata when it changes a decision.
- Use `Pill`/`PillMenu` from the supported unstable export for interactive tags or filter chips when that existing pattern is appropriate.
- Create one shared local wrapper for repeated sizing/casing changes.
- Keep chip density, casing and contrast consistent across a feature.
- Use Axiom `Button` with an accessible label for removable-chip actions.

Do not mix custom pill boxes and Axiom badges in one feature.

## Page shell and layout

`app/components/template.tsx` owns standard shell padding (`px="32" py="24"`) and the generated page title. Use `customLayout: true` for full-bleed work surfaces and manage `h="full"`; never use `100vh` inside the product shell.

Use one owner for page padding. Do not stack route padding on shell padding. Standard rhythm:

- header to tabs: `16`;
- tabs to immediate work surface: `16`;
- major section separation: `24` or `32`.

Use `useLayout()` from `app/context/LayoutContext.tsx` for `asideContent`, `footerContent`, `hidePageHeader`, `opalPanelControls` and other shell injection. Use `app/usePersistentState.js` for localStorage-backed state and wait for `isHydrated` before hydration-sensitive rendering.

## Configuration forms and `Flow`

`Flow` from `app/components/Flow.tsx` is the standard container for settings pages, detail forms and document-like vertical content.

- Root settings/form Flow uses `maxW="lg"`.
- Do not add manual `mt`/`mb` to direct children; Flow owns vertical rhythm.
- Do not replace it with a column flex stack.
- Put notices before the first section heading.
- Put the save action in `Footer` from LayoutContext, outside Flow.
- Put dialogs outside Flow.
- Only direct children receive Flow spacing; wrappers hide their descendants from it.

Canonical structure:

```tsx
<>
  <Flow maxW="lg">
    {notice && <Alert intent="information">...</Alert>}
    <Heading level="4">Section</Heading>
    <Field label="Name" required><Input /></Field>
    <Field label="Description"><Textarea rows={3} /></Field>
    <Separator />
    <Heading level="4">Delete</Heading>
    <Text color="fg.secondary">This cannot be undone.</Text>
    <Button appearance="danger">Delete</Button>
  </Flow>
  <Footer><Button appearance="primary">Save</Button></Footer>
  <AlertDialog ... />
</>
```

## Icons

| Area | Package |
| --- | --- |
| `app/opal/` | `@optiaxiom/icons` first; `@optimizely/axiom-icons` only for a missing icon |
| All other product areas | `@optimizely/axiom-icons` |

Never import `@tabler/icons-react` directly in product UI. Outside Opal, add a missing-icon fallback only in `app/lib/axiom-icons.tsx`. CMP custom SVG components live in `app/cmp/assets/` and use `fill="currentColor"`.

The temporary Sub Agent icon remains `IconAgent` until the correct Material-style export exists; do not use the dashed-box `IconSubAgent`.

## Dark mode and CSS

- Use `[data-theme="dark"]`, never `@media (prefers-color-scheme: dark)`.
- Put product-specific CSS in `app/<product>/styles.css`, not `app/globals.css`.
- Use semantic CSS variables in raw CSS.
- Do not mutate webpack SVG rules or build bundler flags unless the target repository's documented build architecture requires it.

## Markup and hydration gotcha

Axiom `Box` renders a `div`; `as="span"` is ignored. Inside a button/menu label that renders a `p`, use `asChild` with a native `span`:

```tsx
<Box asChild display="inline-flex" alignItems="center" gap="8">
  <span><IconClock />All Time</span>
</Box>
```

Use a keyed `React.Fragment` when a `.map()` iteration returns multiple siblings; shorthand fragments cannot receive a key.

## Tables

Use the shared `Table`, `Th`, `Td`, and `Tr` wrappers. Selectable rows should make the row target predictable; avoid repeated edit buttons when row selection opens the same detail flow.

For grouped/collapsible tables:

- merge checkbox and chevron into the first column;
- stop propagation around checkbox/button actions;
- use `colSpan` on the group label cell;
- keep child-row content aligned with a fixed placeholder matching the chevron target;
- render group and children in a keyed `React.Fragment`;
- preserve keyboard-operable controls and visible focus.

The established alignment uses 16px first-column inset, a 32px chevron/placeholder target and small content-column inset. Inspect the current shared-table implementation before copying values into a new table.

## Opal agents-area implementation

When present, the target repository's Opal-specific design skill remains authoritative. Axiom Play currently adds these live patterns:

- Reuse `ResizableDetailsTray` for resizable agent side panels.
- Render `BuildWithOpalPage` as a full-page replacement when configuration is absent.
- Lazy-load heavy browser-only panels with `next/dynamic` and `ssr: false` when required.
- The workflow builder uses `@xyflow/react` and `elkjs`; Axiom components belong in sidebars/toolbars, not as canvas nodes by default.
- Use existing selection-tooltip and loader patterns; do not invent parallel primitives.

## Common build-time mistakes

- Invalid Sprinkles value: choose the nearest supported token or use `style` for a justified exact value.
- `maxHeight="400px"`: invalid prop; use `style={{ maxHeight: 400 }}`.
- Hardcoded product color: replace with semantic prop/variable.
- Custom button-like element: replace with Axiom `Button`.
- Native select children: use `options`.
- `bg.pill.default` on `Box`: use the token only on `Pill`.
- `prefers-color-scheme`: replace with the repository theme selector.

## Implementation verification

Typecheck/lint the touched scope, confirm no raw equivalent controls or invalid tokens were introduced, and then run the rendered visual-quality workflow. Code compliance is necessary but not sufficient.
