# Axiom v1 (optimizely-oui) - compliance reference

Read this INSTEAD of relying on the `axiom` MCP tools when the design under audit is built on Axiom v1. The MCP serves v3 (`@optiaxiom/react`) only, so auditing a v1 design against it produces false mismatches on almost every element.

**What v1 is**: the npm package `optimizely-oui`, self-described as "Optimizely's Component Library", latest observed version 49.0.0. Class namespace is `oui-`, components live under `src/components/<Name>`, and colors resolve through `@optimizely/design-tokens`. It is a mixed-vintage library: some components are TypeScript with typed props, others are still JavaScript with PropTypes, so prop naming is not uniform across it.

**Which version am I auditing?** Signals for v1: `oui-` class names in inspected markup or Figma layer names; Badge rendered as a small uppercase pill with a 16px pill radius; `Attention` bars with very pale tinted fills; component names from the v1 list below that do not exist in v3 (ButterBar, Poptip, Disclose, FilterPicker, Token, SummaryBar, ManagerSideNav). If the version is genuinely unclear, ask once rather than guessing - a wrong version choice invalidates the whole lens.

**Documentation links**: v1 has no public per-component doc URL equivalent to v3's `optimizely-axiom.github.io/optiaxiom/components/<name>/`. Do NOT construct v1 doc links; cite the component name and its source path (`optimizely-oui/src/components/<Name>`) instead. If the user supplies an internal Storybook URL, use that and link per component from it.

---

## Core tokens (compiled from source, v1)

Colors, resolved:
- Brand primary: `hsl(227,100%,50%)`
- Text primary: `hsl(241,77%,12%)` - a very dark indigo, NOT black. Pure `#000` text is a v1 mismatch.
- Text secondary: `hsl(0,0%,44%)`
- Background primary: `hsl(0,0%,100%)`; background secondary: `hsl(0,0%,98%)`
- Error: `hsl(0,89%,57%)`
- Default border: `hsl(0,0%,84%)`

Geometry:
- Base border radius: **5px** (not 4px, not 8px). v3 radii differ - do not carry v3 values across.
- Spacing scale via `spacer()`: 0.5 = 4px, 1 = 8px, 2 = 16px, 3 = 24px. Spacing off this 4/8px rhythm is a finding.

Semantic color construction: the four status fills are the status border color tinted 80% toward white (`tint(color, 80%)`), which is why v1 status backgrounds are so pale. A saturated status fill is a v1 mismatch.

---

## Deprecated in v1 - always a finding

Using any of these is a real issue regardless of the rest of the audit, since the library itself marks them dead:
- `Accordion` - deprecated 2020-04-10, no replacement named
- `ArrowsInline` - deprecated 2020-04-10, no replacement named
- `Pagination` - use `PaginationControls`
- `TextField` - use `Input`
- `Badge`'s `backgroundColor` prop - deprecated; use `color` instead

---

## Component inventory (93 live components)

Attention, Avatar, Badge, BlockList, ButterBar, Button, ButtonIcon, ButtonRow, Card, Category, Checkbox, CloseButton, Code, CodeDiff, CopyButton, CurrentUserMenu, DatePicker, Dialog, Disclose, DiscloseTable, DismissButton, DockedFooter, DragAndDrop, DraggableItem, Dropdown, DropdownBlockLink, DropdownBlockLinkSecondaryText, DropdownBlockLinkText, DropdownContents, DropdownListItem, EmptyDashboard, Fieldset, FilterPicker, FilterPickerListItem, Form, Grid, Header, HeaderDetails, HelpPopover, IconLink, Input, Item, Label, Layout, LayoutGrid, Link, ListGroup, ManagerSideNav, NavBar, NavItem, NavList, Navigation, OverlayWrapper, PaginationControls, Popover, Poptip, ProgressBar, ProgressDots, Radio, RangeSlider, Row, SearchPicker, Section, Select, SelectDropdown, Sheet, Sidebar, SortDragLayer, SortTarget, Sortable, SortableGroup, SortableItem, Spinner, Steps, SummaryBar, Switch, TBody, TD, TH, THead, TR, Tab, TabNav, Table, Textarea, Tile, Token, TokensInput, Toolbar, ToolbarButton, ToolbarItemContents, ToolbarLink, Typography

When a design hand-builds something that exists in this list, that is a mismatch - name the component and its source path.

---

## Variant sets (use these exact values; an invented variant is a mismatch)

- **Attention** - `type`: brand | warning | good-news | bad-news (default brand). `alignment`: left | center. `isDismissible`: bool. Padding 8px, radius 5px, 1px border.
- **Badge** - `color`: default | draft | live | primary | plain | purple | bad-news. Geometry: 16px tall, 32px min-width, 16px radius, 11px / weight 600, uppercase, letter-spacing 0.005rem, padding 0 8px. Fills: default `hsl(0,0%,44%)`, draft `hsl(36,100%,50%)`, live `hsl(122,39%,34%)`, primary `hsl(227,100%,50%)`, bad-news `hsl(0,67%,45%)`, plain transparent with `hsl(0,0%,44%)` label.
- **Button** - `style`: highlight | danger | danger-outline | outline | outline-reverse | plain | toggle | underline | unstyled. `size`: tiny | small | large | narrow | tight. `width`: default | full.
- **ButtonIcon** - `size`: small | medium | large. `style`: highlight | danger | danger-outline | outline | plain | unstyled.
- **Table** - `density`: tight | loose. `style`: wall | rule | rule-no-bottom-border. `tableLayoutAlgorithm`: auto | fixed.
- **TR** - `backgroundColor`: faint | light. `borderStyle`: bottom | top | sides | ends | none.
- **TD** - `textAlign`: center | right | left. `verticalAlign`: top | middle | bottom. **TH** - `textAlign`: center | right | left.
- **Token** - `style`: primary | secondary | tertiary | error. `backgroundColor`: aqua | yellow | blue | green | orange | pink | red | magenta | purple.
- **Link** - `style`: default | dark | muted | bad-news | reverse.
- **Poptip** - `position`: top | bottom | left | right. `theme`: dark | light | transparent. `trigger`: mouseenter | focus | click | manual.
- **Dropdown** - `arrowIcon`: down | left | none | right | up, plus the standard 12-value `placement` set (top/bottom/left/right, each with -start and -end).
- **HelpPopover** / **OverlayWrapper** - `behavior`: click | hover. `horizontalAttachment`: left | center | right.
- **Avatar** - `size`: small | medium. **Spinner** - `size`: small | tiny. **CloseButton** - `size`: small | medium | large.
- **Checkbox** / **Radio** - `labelWeight`: light | normal | bold.
- **Fieldset** - `titleSize`: small | large. **Popover** - `padding`: default | hard | soft-double | soft-half.
- **Navigation** - `theme`: dark | light. **Sidebar** - `anchor`: left | right.
- **IconLink** / **NavBar** - `type`: link | pushstate | button.
- **Code** - `type`: inline | block.

---

## Auditing a v1 design

1. Confirm the version first, then use ONLY this file for component and token judgments. Never flag a v1 element for failing to match a v3 component.
2. The compliance percentage is computed the same way as for v3 (the fixed inventory walk in SKILL.md), and the same hard rule applies: unverifiable is never a mismatch.
3. Separate two finding types, and never conflate them:
   - **Non-compliant within v1** - a real defect. The design ignores a component that exists here, invents a variant, or uses off-scale spacing or wrong tokens.
   - **Would change under migration to v3** - a migration note, not a defect. Do not let these depress the compliance score; report them in a short separate list when they're useful.
4. Deprecated-component use is always reported, and its severity is not capped by the migration-note rule above.
5. State the audited version in the compliance line, e.g. "Axiom compliance (v1 / optimizely-oui): 78% (14 of 18 checked elements match, 3 unverifiable)". A reader must never have to guess which system the percentage refers to.
