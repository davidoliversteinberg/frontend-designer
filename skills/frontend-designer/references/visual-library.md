# Visual library and reference intake

Use actual visual evidence to calibrate composition. This library supplements Axiom documentation; screenshots cannot prove APIs, keyboard behavior, accessibility, or all responsive states.

## Current availability

This portable skill does not bundle private user images. Before declaring visual references unavailable, check whether the current target repository contains `design-references/inbox/catalog.md`. If present, read its provenance, selection guidance and caveats, then inspect the actual one or two images relevant to the task; resolve image paths relative to the catalog. Do not search unrelated workspaces or assume a local catalog exists for other users.

A local catalog may contain inspected composition references without formal system approval. Keep that distinction. The July 2026 examples described in `visual-reference-analysis.md` remain historical notes unless actual replacement images are available. If no usable local, attached, or accessible reference exists, state that limitation and continue with safe explicit assumptions.

## Keep authority separate from inspiration

| Reference class | What it can inform | What it cannot authorize |
| --- | --- | --- |
| Axiom system frame | Intended component anatomy, roles and states at its documented version | Assuming current installed APIs or complete behavior from a screenshot |
| Approved Optimizely product screen | Hierarchy, composition, density, type relationships and product character for its task | Copying defects or incidental dimensions into every surface |
| External brand inspiration | A named transferable quality: grouping, rhythm, reading order, disclosure, or comparison layout | Importing its fonts, colors, icons, components, marketing styling, or interaction contract |
| Negative example | A specific failure and its user consequence | Treating every stylistic difference as an error |

Label a user-designed concept as a composition preference unless the user also identifies it as system-approved. Do not promote inspiration into Axiom authority.

## Intake

Prefer a small, varied set over many near-duplicates: asset browsing, focused inspection, dense structured data, configuration, workflow, and a useful empty/error state. Include related narrow frames when available. Export full frames at readable resolution; include detail crops only as supplements so composition is not lost.

For each actual image or Figma node, record:

- stable local relative path or accessible Figma node;
- reference class, owner/source, capture date, product and task;
- frame dimensions and state, including relevant selection or open panels;
- approval scope and known limitations;
- one to three relationships to preserve, and what must not be copied.

Use concrete captions such as "the workflow panel contains density while the editor remains quiet," not "clean and premium." If an external reference is supplied, explicitly name the allowed lesson.

Keep incoming private images in the target repository's ignored `design-references/inbox/` and register inspected examples in its `catalog.md`. Preserve originals. For an explicitly approved shareable package, copy only cleared images into a `visuals/` directory alongside this reference and register those real relative paths below. Do not create fake files or dangling paths. Receiving an attachment is not permission to publish it.

## Use during design

Select one or two examples that match the task and density. Inspect their actual pixels before the brief; compare the rendered result at comparable viewing scale after implementation. Check reading order, type hierarchy, grouping, evidence scale and action reach, not superficial pixel similarity.

When references conflict, preserve the user's task and Axiom identity. Explain the relationship being adopted and any deliberate difference. A valid dense table must not fail merely because a spacious asset screen is the only available example.

## Registered visual entries

No publicly shareable image entries are bundled. Local inspected entries, when present, live in the current target repository's `design-references/inbox/catalog.md`; availability and approval scope must be checked there. If neither source provides usable images, label reference-based calibration unavailable.
