# Pattern heuristics (UX lens, primary layer)

**This is the PRIMARY layer of the UX lens.** Run these checks first; `nng-heuristics.md` runs afterwards as a backstop for what patterns don't cover, and its findings are capped at Medium. The reason for the ordering: Optimizely product UX is heavily industry-specific, and several surfaces carry patterns inherited from acquired products that were never designed against one philosophy, so a general-purpose checklist used as the primary measure surfaces findings that aren't real problems. This file says what good looks like for THIS KIND of screen.

**Every check below is a question to ask of the design, not a rule it passes or fails.** A design can answer "no" to a check and still be right, when the context justifies it - record that as an intentional-deviation observation, not an issue. Findings from this layer still name a base-layer heuristic, so the audit stays teachable and comparable across rounds.

## Classification

Pick 1-3 patterns from the closed list below and nothing else. Rules:
- **Primary job wins.** When two patterns compete, choose the one matching what the user came to this screen to do, not the one occupying the most pixels. A dashboard containing a small table is a dashboard; a screen whose whole point is working through rows is a list view.
- **At most 3.** If more seem to apply, the screen is probably doing too much - that itself may be an IA finding worth raising.
- **Container over content.** A modal containing a form is Modal/dialog + Form or configuration editor; classify both rather than picking one.
- **No confident match - ASK the user.** Render a single-select elicitation listing the pattern names plus "None of these - audit without a pattern", end the turn, and resume with their choice. Only ask when classification genuinely fails: if a pattern plausibly matches, use it and state it rather than spending a round trip. Ask at most once per audit. If they pick "none of these", run the backstop layer alone and say so in one line. Never force a pattern.
- **State the detected patterns in the output** so the reader can challenge the classification.

Patterns are provisional and meant to be edited as PCD learns what it actually ships. Adding or renaming one here changes the audit everywhere, which is the point.

---

## Competitor reference pass

After classifying the patterns and BEFORE running their checks, look up how comparable products handle the primary pattern. This grounds the checks in what the current bar actually is, rather than in what the checklist happens to say.

**Who to compare against**: the competitor list for the audited product in `optimizely-products.md`. If that product has no competitor list on file, fall back to the product category plus the pattern (e.g. "B2B ecommerce admin product list bulk actions", "DXP content dashboard"), and say in the output that the comparison used a category fallback rather than a named competitor set.

**Budget**: 1-2 searches per audit, for the PRIMARY pattern only - not one per detected pattern. Query shape is pattern plus product category plus competitor names, e.g. "Contentful content list view column management". Skip the pass entirely in delta mode (re-audits) unless the user asks for it, so repeat runs stay reproducible.

**How to use what comes back** - this is judgment input, NOT a conformance test:
- The audit still reaches its own verdict. Matching a competitor is not the goal, and **divergence from a competitor is never itself a finding**. A deliberate divergence is an intentional-deviation observation at most.
- Competitor evidence NEVER sets severity and NEVER affects the score. It informs the rationale for a finding and the ahead/behind comparison on the score card. Scoring stays driven by the pattern checks and the anchor tests alone.
- **The removal test**: if deleting the competitor evidence would make a finding disappear, it was not a finding. Every finding must stand on its own pattern check.
- Only name products the search actually surfaced. Never attribute a pattern to a company without evidence, and never invent a comparison.
- If the search returns nothing usable, say benchmarking did not produce anything and run the pattern checks alone. Silence from search is not evidence that nobody does this.

**What to report**: feed the result into the score card's Competitor benchmark section - which products use this pattern (or that none do), and where this design sits ahead of and behind those implementations.

---

## 1. List / table view
Screens whose job is scanning, comparing, and acting on many records.
- Is it clear how many records exist in total, not just how many are visible?
- Past roughly 7 columns or any horizontal scroll, is there column management (hide/reorder/resize)?
- Are sort and filter states visible without opening a menu, and is there one-click clearing?
- Do bulk actions show what is selected, survive pagination, and confirm before anything irreversible?
- Does row density suit the task, and is there a density control if scanning volume varies by user?
- Are numeric and date columns aligned and formatted consistently so they can be compared down the column?
- What happens at 0, 1, and 10,000 rows - are all three states designed?
- Is per-row action discoverability reasonable, or are actions hidden behind hover only (fails on touch and keyboard)?

## 2. Dashboard / overview
Screens whose job is orienting: what's the state of things, what needs me.
- Does the most decision-relevant information occupy the most prominent position?
- Is every metric's meaning, unit, and time range unambiguous without a tooltip?
- Is "needs attention" visually distinct from "informational", and by more than color alone?
- Can the user get from any summary to the underlying detail in one step?
- Is data freshness stated (as-of time, refresh state), especially where numbers drive decisions?
- Does the layout survive a card having no data, an error, or a long loading state?
- Is anything shown here that the user cannot act on and does not need - and if so, why is it here?

## 3. Form / configuration editor
Screens whose job is entering or changing settings and structured data.
- Are labels persistent (not placeholder-only), and is required versus optional explicit?
- Is validation timed to help rather than nag - on blur or submit, not mid-typing - and does each error say what's wrong AND how to fix it?
- Do errors appear next to their field, with a summary when the form is long enough to scroll?
- Is save behavior unambiguous: explicit save, autosave with confirmation, or dirty-state warning on exit?
- Are dependent and conditional fields revealed progressively rather than shown disabled with no explanation?
- Are destructive or irreversible settings separated from routine ones, with confirmation proportional to the consequence?
- Is field grouping meaningful to the user's mental model rather than to the data schema?
- Can the user preview or test the effect of a configuration before committing it?

## 4. Multi-step flow / wizard
Screens whose job is guiding through a sequence.
- Is total step count and current position visible throughout?
- Can the user go back without losing entered data, and leave and return without losing the whole flow?
- Is each step's exit criterion clear - what makes this step done?
- Is validation per step rather than deferred to the end?
- Is there a final review before commit for anything consequential?
- Are steps skippable or reorderable where the sequence isn't genuinely dependent?
- Is the flow's cost stated up front (how long, what's needed) so users don't start unprepared?

## 5. Detail / record page
Screens whose job is understanding and editing one thing.
- Is the record's identity unmistakable at the top: what it is, its state, and which environment or tenant it belongs to?
- Is the hierarchy right - identity, then state, then attributes, then history?
- Are edit affordances discoverable without hunting, and is edit-versus-read mode unambiguous?
- Are related records reachable, and is the path back to the list preserved (breadcrumb, back behavior)?
- Is history or audit information available where the record's change history matters?
- Do long text fields, empty fields, and unusually long names all render sensibly?

## 6. Search / filter
Screens or regions whose job is narrowing to a subset.
- Are active filters visible as a set, individually removable, and clearable in one action?
- Does the result count update visibly, and is it clear when a result set is filtered rather than complete?
- Is the zero-results state actionable - suggesting what to relax, not just reporting failure?
- Is search scope stated (what is being searched), and are matches indicated in results?
- Do filters persist appropriately across navigation, and can a useful filter set be saved where the workflow repeats?
- Is the delay before results appear communicated, and is stale-result flashing avoided?

## 7. Modal / dialog
Overlays that interrupt.
- Does this need to be a modal at all, or would inline or a panel serve better?
- Is the primary action unmistakable, and does its label say what it does rather than "OK" or "Submit"?
- Is dismissal behavior consistent and safe - does escape or backdrop click risk losing work?
- Is destructive confirmation specific about consequence and scope ("delete 12 items permanently"), not generic?
- Does focus move into the dialog, stay trapped, and return to the trigger on close?
- Does content that grows scroll within the dialog while actions stay reachable?

## 8. Empty and first-run states
The screens users see before there's anything to see.
- Does the empty state explain what belongs here and offer the action that fills it?
- Is "empty because new" distinguished from "empty because filtered" and from "empty because it failed"?
- Does first-run guidance appear in context rather than as a forced tour?
- Is the empty state honest about prerequisites (permissions, connections, upstream setup) when those are what's blocking?

## 9. Agent / conversational surface
Screens where an automated agent acts on the user's behalf. Newer than the NN/g set and not covered by it.
- Can the user see what the agent is doing right now, not just that it is busy?
- Is there a way to stop, pause, or interrupt an in-progress action, and is it reachable during the action?
- Is the boundary between what the agent decided and what the user decided legible?
- Is the agent's scope and permission stated - what it can touch, and what it will never do without asking?
- Are consequential agent actions reviewable before they commit, or reversible after?
- Is the agent's confidence or uncertainty surfaced where acting on a wrong result would be costly?
- Is there an obvious path to a human or to manual control when the agent is wrong?
- Does each agent or teammate presented in a set have genuinely distinguishable purpose and state, rather than differing only by name?

## 10. Data visualization
Charts, graphs, and visual analytics.
- Does the chart type match the question being asked of the data?
- Are axes labelled with units, and does the axis range avoid exaggerating or flattening change?
- Is the data encoded by more than color, so it survives color-blindness and greyscale?
- Are the underlying numbers reachable (tooltip, table view, export) rather than only inferable from the picture?
- Are sample size, time range, and any exclusions stated where they change interpretation?
- Does the visualization degrade sensibly with one data point, no data, or far more series than the palette supports?

---

## Cross-cutting checks (Optimizely-specific)

These are ours, not NN/g's, and they cut across patterns. Label them "Optimizely check" in findings so their provenance is clear and they're not mistaken for published heuristics.

- **Environment and tenant clarity**: on any screen where the user can act, is it unmistakable which environment, site, or tenant the action will affect?
- **Propagation state**: where a change must publish, sync, or deploy to take effect, is the difference between saved and live visible?
- **Upstream dependency**: where the screen's configuration depends on something managed elsewhere (a catalog, a schema, a connected app), is it clear what happens when that upstream thing changes?
- **Cross-product coherence**: does a user arriving from another Optimizely product find the same pattern behaving the same way here?
