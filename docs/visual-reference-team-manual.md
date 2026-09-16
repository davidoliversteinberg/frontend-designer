# Visual reference team manual

For Optimizely designers contributing screens, flows, and component examples to Frontend Designer. The aim is better design judgment: clear hierarchy, comfortable typography, useful density, purposeful whitespace, and recognizable Axiom identity across products.

Jump to [storage](#where-everything-lives), [Figma export](#export-from-figma), [component examples](#contribute-component-examples), [catalog template](#copyable-catalog-entry), [usage prompts](#use-references-with-the-skill), or [contribution steps](#share-internally-or-contribute-publicly).

## Start here

1. Choose a few strong examples from the product you know, each demonstrating a different task or state. A small useful set beats a large unlabelled dump.
2. Export readable individual frames from Figma and keep their source-node links when sharing is permitted.
3. Put private exports in your product repository's `design-references/inbox/`. Confirm that directory is ignored by Git before adding files.
4. Add a catalog entry using the template below. Explain the useful design relationship and any known limitations.
5. Ask the agent to inspect and register the images, then use one or two relevant examples during design. Do not mark an image reviewed merely because it was uploaded.

This is a reference library, not model training. The agent uses accessible images as context for the current task; adding a file does not permanently train a model, synchronize Figma, or distribute it to other designers.

## Where everything lives

Paths below are relative to the relevant repository, not a designer's personal home directory.

| Location | Purpose | Sharing behavior |
| --- | --- | --- |
| Product repo: `design-references/inbox/` | Private incoming images, optionally grouped by product or pattern | Local-only by default; must be ignored by Git |
| Product repo: `design-references/inbox/catalog.md` | Index of actual images, provenance, lessons, caveats, and review status | Private with the images |
| Skill repo: `skills/frontend-designer/references/visual-library.md` | Instructions for finding, selecting, and interpreting references; register of any public examples | Ships with the skill |
| Skill repo: `skills/frontend-designer/references/visuals/<product>/` | Future contributions explicitly cleared for public distribution | Public after merge; create only when real cleared files are added |

The public package currently contains guidance but no bundled visual examples. A colleague who installs it does not receive another designer's local inbox. For internal collaboration, share through your team's approved private Figma, repository, or asset location. Each workspace needs accessible images or permitted links and a local catalog; the skill does not provide a central private hosting service.

The `.md` files under `references/` are supporting instructions, not extra skills and not the images themselves. The catalog connects those instructions to actual pictures and tells the agent why each picture is useful.

### Set up a private inbox

In the product repository, add `/design-references/inbox/` to the root `.gitignore` before placing private files there. This rule is already included in the Frontend Designer repository; other product repositories need their own rule. Do not replace existing ignore rules.

Optional organization, shown as an example rather than existing files:

```text
design-references/inbox/
  catalog.md
  cmp/
    cmp-asset-grid-default-desktop-2026-09-16.png
    cmp-asset-review-error-desktop-2026-09-16.png
  cms/
    cms-content-tree-selected-desktop-2026-09-16.png
  components/
    axiom-select-open-2026-09-16.png
```

If you use Git, `git check-ignore -v design-references/inbox/catalog.md` should show the applicable ignore rule. Ignoring a path does not remove files already tracked or erase prior publication. If something private was already committed, stop and involve the repository owner before publishing anything further.

## Choose references that teach something

Contribute product work, not just attractive hero screens. Good coverage includes:

- A browsing or overview screen with a clear reading order.
- A focused editor or detail view with well-balanced primary and supporting regions.
- A dense table, list, or operational view that stays readable.
- A form or configuration flow with clear grouping and save behavior.
- A useful empty, loading, validation, permission, or recovery state.
- A narrow layout when it changes the composition or interaction.

For CMP, this might be asset browsing and campaign planning. For CMS, content-tree navigation and editing. For experimentation, results interpretation and experiment setup. These are suggestions, not a requirement to submit every category or copy another product's layout.

For a short flow, export the meaningful steps separately and explain their order. One giant canvas of tiny screens is an overview, not enough evidence for typography or spacing decisions. Detail crops can supplement a complete frame but should not replace it.

### Keep three decisions separate

- **Reference class:** Axiom system frame, Optimizely product screen, external inspiration, or negative example.
- **Design status:** approved for a stated product/use, shipped but not reviewed, concept/WIP, or unknown. Identify AI-generated work as such; it is not a quality standard without review.
- **Sharing clearance:** private/internal, explicitly cleared for this public repository, or unknown. Good design and internal approval are not permission to publish.

A designer's concept may demonstrate excellent composition without being an approved Axiom component. Record that distinction. If you do not know the owner, version, or approval scope, write "unknown" rather than guessing.

## Export from Figma

1. Prepare an export-safe copy if needed. Replace customer information, unreleased details, credentials, private comments, and unsuitable personal data with realistic fictitious content. Preserve useful layout and text-length characteristics.
2. Select the actual screen frame, not the whole canvas. Include the navigation, panel, or overlay needed to understand its composition.
3. In Figma's **Export** section, add an export configuration, choose **PNG**, and export the selected frame. See [Figma's export instructions](https://help.figma.com/hc/en-us/articles/360040028114-Export-from-Figma).
4. Start with a readable native-scale export. Use 2x when needed for detail, and record both the frame dimensions and export scale. An image exported at twice the width is not evidence of a twice-as-wide product viewport. See [Figma's format and scale settings](https://help.figma.com/hc/en-us/articles/13402894554519-Export-formats-and-settings-for-static-designs).
5. Keep the relevant frame selected when copying a share link so it opens at that frame. Verify the intended reviewers and connected tools have access; do not change a private file to public just for the agent. See [Figma's sharing guidance](https://help.figma.com/hc/en-us/articles/360040531773-Share-files-and-prototypes).
6. Open the exported image and check readable text, intended crop, visible state, and missing fonts or assets before cataloging it.

Use filenames such as `product-pattern-state-width-date.png`. This is a convention for new exports, not a reason to rename someone else's existing files. Keep source links and original exports; do not modify the design source merely to make a reference look cleaner without its owner's agreement.

If export or access is restricted, ask the file owner for an approved route. A node link is useful only when the receiving person or tool can open it. Never put internal Figma links in a public PR unless those links are also cleared for public sharing.

## Contribute component examples

For a component, provide an individual readable frame or small labelled set, plus a screen showing its context when that affects its use. Record:

- Component name, source library, and library/version or capture date; use "unknown" when needed.
- Whether it is a system component, a documented composition, a product-specific wrapper, or a proposal.
- Relevant variants, sizes, and states, such as selected, focused, disabled, loading, error, or open. Include what matters to that component rather than an empty checklist.
- Intended use, important content limits, and any responsive substitution.
- Source node, official documentation, and Code Connect or implementation mapping when available and permitted.

A screenshot documents appearance in one state. It does not establish valid props, keyboard behavior, focus movement, contrast compliance, or all responsive modes. Axiom documentation and the installed package remain the implementation evidence. A product-specific component does not become a cross-product standard by entering this library.

## Copyable catalog entry

Add one entry per reference or tightly related state set to the private `catalog.md`. The example below is a template, not a claim that this file or approval already exists. Image paths resolve relative to the catalog; replace every placeholder and include only real files or accessible nodes.

```markdown
### <stable-reference-id>

- Image: <relative/path/to/actual-export.png>
- Product and task: <product; user decision this screen supports>
- Source type: <designer-created Figma / shipped UI / AI-generated / external>
- Reference class: <Axiom system frame / product screen / inspiration / negative>
- Source node: <permitted Figma node link, or unavailable>
- Owner: <person or team; keep private when necessary>
- Captured: <YYYY-MM-DD>
- Frame and export: <frame width x height; export scale; image dimensions>
- State: <selection, open panel, error, viewport, relevant conditions>
- Design status: <approval scope and reviewer, or concept/WIP/unknown>
- Sharing clearance: <internal only / cleared for public distribution / unknown>
- System context: <Axiom/library version and product wrapper, or unknown>
- Learn: <one to three concrete relationships worth preserving>
- Do not copy: <incidental styling, prototype content, known defects>
- Behavior/evidence limits: <what the static image cannot establish>
- Visual inspection: <pending, or reviewer and date>
```

Useful lesson: "The preview owns most of the workspace; metadata is grouped in a quieter inspector; the decision actions remain visible."

Weak lesson: "Clean, premium, beautiful."

Useful caveat: "This concept uses placeholder filenames and an old toolbar variant. Borrow the grouping, not those details."

## Use references with the skill

For a design task, select one or two examples that match the task, density, and product context. The agent should inspect the actual images, name the relationships it is borrowing, implement with current Axiom contracts, then compare the rendered result at a comparable viewing scale. It should explain meaningful differences rather than force pixel similarity.

Screenshots from other companies can teach grouping, reading order, progressive disclosure, or comparison layout. Keep their lesson narrow. Do not import their fonts, colors, icon language, or marketing style into Optimizely. Their presence in a private inspiration collection is not permission to republish them.

### Register new references

> I added images to this repository's design-references/inbox/. Inspect them and update the private catalog with their actual paths, product/task/state, useful design relationships, and limitations. Treat unknown approval as unknown. Keep all images and the catalog private; do not commit or upload them. Do not change the application.

### Design with selected references

> Use frontend-designer to improve this [product and route]. Read our local reference catalog and inspect [reference IDs]. Borrow their hierarchy and grouping, preserve our product behavior and Axiom identity, and explain what should not transfer. Implement only the requested change and verify the rendered result.

### Ask for critique only

> Compare this screen with [reference IDs] for reading order, typography, density, and action hierarchy. Inspect the images and explain the differences. Do not edit code or publish anything.

If the images or Figma nodes cannot be opened, the agent should say so. A catalog description is not a substitute for visual inspection, and a plausible self-score is not proof that the reference improved the design.

## Share internally or contribute publicly

### Private team contribution: the default for product work

Keep the source in an approved internal location and provide access only to the intended team. Share the catalog entry and permitted node/export through that channel. Teammates can place approved exports in their own ignored inbox and use the same reference IDs. Do not put confidential images or links in public issues, PR descriptions, or review comments. There is no automatic synchronization; assign an owner to keep the shared source and local entries current.

### Public contribution to this repository

Only use this route when the content and associated metadata are explicitly cleared for public distribution. Do not assume a sanitized screenshot is cleared just because customer names were removed.

1. Confirm the source owner, sharing clearance, and permission to distribute any included imagery, logos, or other third-party material. Keep private approval records in the appropriate internal system, not the PR.
2. Prepare the cleared export and a concise catalog entry with the design lesson, product scope, source/version, review status, and limitations. Do not disclose internal links or names that are not also cleared.
3. Create a branch or fork. Add only the cleared files under `skills/frontend-designer/references/visuals/<product>/`. Do not force-add an ignored private inbox.
4. Register the actual relative image links under **Registered visual entries** in `skills/frontend-designer/references/visual-library.md`. From that file, image paths start with `visuals/<product>/`. When adding the first public images, update the availability wording in the visual library, README, and guides so they no longer say no images are bundled.
5. Open a pull request explaining the task/pattern represented, what other products can learn, what must not transfer, and that the submitted content is cleared for public distribution. Preview every image and inspect the complete diff before requesting review.
6. A maintainer reviews privacy/clearance, provenance, image readability, design value, Axiom scope, duplication, and link correctness. Unclear approval or evidence should be resolved before merging.
7. After merge, designers must update their local skill copy to receive bundled examples. The freshness checker only reports new skill versions; it does not download assets. Maintainers should update the skill and both plugin versions together when distributing a new skill package.

Do not upload whole Figma files, broad internal libraries, or every variant just because they are available. Submit the smallest useful, understandable set. A contribution is normally images plus catalog metadata, not a new skill per product.

## Review and maintenance checklist

- [ ] Actual image and source inspected; text is readable and the relevant state is visible.
- [ ] Product, task, source, capture date, dimensions, and scale recorded.
- [ ] Design approval and sharing clearance stated separately; unknowns remain explicit.
- [ ] Concrete transferable lesson and "do not copy" caveats included.
- [ ] System/version context and component evidence limits recorded.
- [ ] No private data, unapproved internal links, or unclear redistribution rights in public changes.
- [ ] Real relative paths resolve; no personal-machine paths or missing image files.
- [ ] No claim of interaction, accessibility, or API verification from screenshots alone.

Revisit entries when the product or Axiom pattern changes. Mark superseded examples and explain what changed; do not silently continue treating them as current. Keep negative examples clearly labelled. Prefer replacing redundant references with a better example over growing an uncurated image dump.
