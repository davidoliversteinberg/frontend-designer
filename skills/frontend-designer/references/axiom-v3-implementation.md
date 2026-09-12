# Axiom V3 implementation

This is the detailed Axiom V3 implementation profile extracted from `axiom-play`. Product-design decisions are owned by `interaction-and-composition.md`. In Axiom Play, the paths and local wrappers below are authoritative; in another repository, keep the component, semantic-token, accessibility, and verification principles but inspect that repository before applying Axiom Play-specific paths or shell conventions.

## Required preflight

- Complete `axiom-evidence-and-compliance.md` before implementation. Its component inventory and live lookup are required, not conditional on the model feeling uncertain.
- If a Figma design exists or is supplied for the surface being built, fetch it (`get_design_context` plus `get_variable_defs`, and `get_screenshot` for visual confirmation) before writing layout code. Treat its exact spacing, typography and component composition as authoritative over general judgment calls, prose descriptions or reference screenshots from elsewhere. If the fetched Figma content conflicts with an existing implementation or general guidance below, state the reconciliation rather than silently picking one.
- Inspect nearby production-quality routes and reuse established page structure and local wrappers.
- Use `@optiaxiom/react` whenever an equivalent component exists.
- Use semantic color tokens and spacing tokens.
- Use the correct icon package for the product area.
- Split files over 300 lines or with multiple concerns before adding behavior.
- Query the configured stable Axiom MCP for every selected interactive or compound component. Use installed package exports and types as the final API check.

## Component contract

Use Axiom components for product chrome:

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

## Spacing and sizing tokens

Use Axiom spacing props before raw pixel values.

| Prop | Valid values used here |
| --- | --- |
| `p`, `m`, `gap` | `0 2 4 6 8 10 12 16 20 24 32 40 48 64 80` (**no `56`**); `auto` for margin |
| `w`, `h` | `0 10 12 16 20 24 32 40 48 56 64 80 224 384` (**no `2 4 6 8`**); named `2xs xs sm md lg xl 3xl`; fractions; `auto fit full max min` |
| `border`, `borderT/B/L/R` | `0 1 2` |
| `maxH` | `xs sm md lg full` |

The spacing scale and the size scale are not the same list. `56` is a size, not a spacing step; `4` and `8` are spacing steps, not sizes. `gap="56"` and `w="8"` both fail to compile. Confirm against `node_modules/@optiaxiom/react/dist/*.d.ts` rather than from memory or from a prose list elsewhere in the repository — where the two disagree, the installed types win.

Use `style` only when an exact value is structurally required and no token exists, for example `style={{ width: 448 }}` for a proven panel dimension. Never round to an off-token value to make something look right: `13px`, `18px` and `28px` are all evidence that a layout was tuned by eye instead of composed.

Use `rounded`, not `borderRadius`, and `shadow`, not `boxShadow`, when the tokenized prop fits. Radius tokens: `sm`, `md`, `lg`, `xl`, `full`. Shadow tokens: `sm`, `md`, `lg`.

## Spacing rhythm — which token, and why

A valid token is not a correct token. The table above says which values exist; this says which one to reach for, and the question is always the same one: **how strongly are these two things related?** Spacing is the cheapest grouping signal there is, and it should carry the structure before a border, a card or a background tint is considered.

Optimizely product surfaces are open, calm and generous. **When a gap is genuinely ambiguous, take the larger step.** Under-spacing is the failure this design language actually suffers from. A screen that breathes reads as considered; a screen packed to its edges reads as a form somebody filled in, and no amount of type or colour work fixes that afterwards.

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

Do not reach past `48` inside a content column — that is page-shell territory. The working set for almost every surface is **`32` / `24` / `16`**, with `8` and `4` reserved for the inside of a single control and `12` for deliberately dense chrome.

### Container padding

| Container | Padding |
| --- | --- |
| Page shell | `px="32" py="24"` — owned by the app shell; never stack route padding on top of it |
| Card, or a bordered section of a page | `24` |
| Nested or inset block inside a card | `16` vertical, `24` horizontal, so the inner text column stays on the outer one |
| Dialog or drawer body | `24` |
| Dense chrome — toolbar, chip, compact row | `8`–`12` |
| Table cell | `12` vertical, `16` horizontal |

Within one container, horizontal padding is normally equal to or greater than the vertical. A box padded `24` at the top and `12` at the left reads as broken before anyone can say why.

### Rules that catch the mistakes that actually happen

- **One owner per gap.** A parent `gap`, or `Flow`, owns the vertical rhythm; its children do not also carry `mt`/`mb`. Two owners is how an intended `16` silently becomes `28`.
- **Never tune spacing to fix an alignment problem.** If a control sits a few pixels off, the defect is the alignment, not the gap. Find the box it should align to and align to it — see *Measure what you changed* below.
- **A fixed offset cannot serve two type sizes.** Any `top`, `mt` or padding picked to make one heading look right is wrong at every other size on the page. Align to a line box, not to a number.
- **Shrinking spacing is not a way to fit more content**, exactly as shrinking type is not. Remove, group, shorten, disclose, or move to a larger surface.
- **Keep the set of steps in one view small.** Three or four distinct gaps across a screen read as a system; nine read as an accident. If a new value is needed, check first whether an existing one on that screen would do.

## What Axiom does not have

The component documentation says what to pick from. This says what is *not* there — which is where invented markup actually comes from. A missing affordance gets quietly filled in with generic web convention instead of being recognised as a design decision to make.

A prop that is idiomatic in Tailwind, Chakra or shadcn is not evidence that Axiom has it. Confirm against the installed `.d.ts` before using one.

- **There is no full-width button.** `Button` offers `appearance`, `size` (`sm`/`md`/`lg`), `square` for icon-only, `loading`, `disabled`, `icon`, `iconPosition`, `addonBefore`, `addonAfter`. There is no `fullWidth` and no `block`, and stretching one with `w="full"` is off-pattern rather than a workaround.

  For a full-bleed *add* affordance at the foot of a list, **the gutter owns the width and the button stays small**: a `24`-tall box spanning the list with a `size="sm" appearance="subtle"` button centred in it. This is what the shipped product does (`GuidanceAddGutter` + `GuidanceAddButton` in `opal-app`). A 1300px dashed bar is visually heavier than *Save*, and the quietest action on a page must never be the largest thing on it.
- **There is no `size="sm"` on `Input` or `SearchInput`** — `md`, `lg`, `xl` only.
- **There is no approved `xs` type role.** The token exists at 10px; it is not approved for Optimizely product surfaces. The floor is `sm` (12px) and body copy is `md` (14px).
- **`Box` ignores `as`.** It renders a `div` whatever is passed. Use `asChild` around a real `span` where a `div` would be invalid — inside a `p`, for instance.
- **There is no Caption primitive.** Reuse the shared wrapper; do not rebuild uppercase and letter-spacing locally.
- **`56` is not a spacing step, and `2`/`4`/`6`/`8` are not size steps.** See the token table.
- **Check the `unstable` export before hand-rolling layout or interaction.** `Sortable`, `SortableItem`, `SortableHandle` and `SortableGroup` ship there, and `@dnd-kit` is already vendored transitively — a drag-reorder needs no new dependency, which matters wherever dependency changes need separate review.

When something genuinely is absent, that is a design-system gap to name in the completion report — not a licence to improvise a primitive.

## Measure what you changed

Before reporting visible work complete, measure the elements you added or moved — not the page around them. A whole-page quality score can pass while the single new control on it is wrong; that is exactly how both a 1300px add button and a 2px-high drag handle shipped past a green gate.

For every new or changed element, read back from the rendered page:

- its painted width and height;
- its gap to the neighbour it is grouped with;
- its optical alignment against whatever it is meant to line up with.

Report those numbers. "It looks right in the screenshot" is not a measurement, and a computed style on a parent is not evidence about a child.

**Measure the painted thing, not the box around it.** A 16px icon centred inside a 24px hit target inside a positioned slot has three rectangles, and only the innermost one is what the user sees. Measuring the slot will report a perfect `0` while the icon is visibly high, because the error lives between the boxes. Query down to the `svg`, the glyph run, the painted border — whatever actually has ink — and measure that. This is not hypothetical: a grip reported as `0.0px` on 35 rows was still 2.75px high, because every one of those readings was taken on the wrapper.

Likewise, take the text's extent from a `Range` over its contents rather than from its element's bounding box. The element may carry padding, a transparent border or a negative margin for a hover affordance; the `Range` returns the line boxes the type actually occupies.

**Aligning a control to text.** A control beside a line of text aligns to the **centre of that text's first line box** — not to the top of its container, and not to a fixed offset. Express the alignment in terms of the line box (its top and its line-height) so it survives a change of type size, then verify the measured offset is within a pixel of `0`.

Do not add an "optical correction" on top of that. Measured against painted glyphs in this type ramp, the centre of the cap-height band sits **0.26px below** the line-box centre at 20px and **0.39px below** at 14px — the optical centre and the geometric centre are the same place, and there is nothing to compensate for. A nudge introduced to make one screenshot look right is an offset by eye with a rationale attached, and it will be wrong at the next type size. If a correction really is needed, measure it first — canvas `TextMetrics` gives `fontBoundingBoxAscent/Descent` and `actualBoundingBoxAscent` for cap height — and record the number you measured.

**A hover affordance must cancel its own box.** When a resting element gains padding and a transparent border so it can show a hover or focus outline, the compensating negative margin has to cancel *both*. Cancelling only the padding leaves the text displaced by the border width, which silently moves every inline-editable title off the grid its neighbours align to and then poisons anything positioned against it.

## Typography implementation

The installed Axiom scale is:

| Token | Size | Implementation role |
| --- | --- | --- |
| `xs` | 10px | Not approved for this project; do not use |
| `sm` | 12px | Body/Small and secondary metadata |
| `md` | 14px | Body/Medium and default product copy |
| `lg` | 16px | Body/Large and Heading 4 |
| `xl` | 20px | Heading 3 |
| `2xl` | 24px | Heading 2 |
| `3xl` | 28px | Exceptional intermediate display size |
| `4xl` | 50px | Heading 1 token; use only where the established page pattern calls for it |

Use `fontSize` tokens on Axiom `Text`; do not hardcode raw pixel font sizes. Use Axiom `Heading` levels for headings and the product font stack. Weight roles: `400` body, `500` emphasis, `600` subheading, `700` heading/button.

Caption is implemented at `app/dam/components/Caption.tsx` until Axiom ships a primitive. Reuse a shared wrapper rather than reconstructing uppercase/letter-spacing styles locally. The decision to use Caption is governed by `interaction-and-composition.md`.

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
