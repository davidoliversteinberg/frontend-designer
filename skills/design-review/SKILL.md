---
name: design-review
description: "Audit and critique UX/UI designs for Optimizely product work. Use this skill whenever the user shares a screenshot, mockup, HTML prototype, working URL (Vercel deploys, sandbox links, staging), or Figma link and wants design feedback of any kind, and for any request for a heuristic evaluation, accessibility check, or Axiom compliance check. Trigger on phrases like \"critique this\", \"audit my design\", \"design review\", \"UX review\", \"what do you think of this screen\", \"roast this\", \"any issues with this UI\", \"is this accessible\", \"does this follow Axiom\", or when an image/HTML file of a UI is uploaded with a request for feedback - even casual ones. Covers UX heuristics, Axiom design system compliance, accessibility (WCAG), and visual craft. Default output is a fast inline chat critique with severity ratings; a branded Word doc is an optional follow-up. Do NOT use for competitive research (use design-competitor-research), building new UI from scratch, or pure copy/content editing."
---

# Design UX Audit

Version: v47 (2026-09-16). When starting an audit, silently note this version internally; if the user asks which version is installed, tell them.

A critique skill for Optimizely designers. It evaluates a design against four lenses and returns an honest, severity-rated critique inline in chat. The goal is critique a senior designer would give: specific, actionable, tied to evidence, and never padded with flattery.

## Inputs and how to read them

**Screenshot(s)**: Analyze the image directly. If multiple screens are shared, treat them as a flow and also critique the transitions between them.

**HTML file**: Read the full source. Critique both what renders (infer layout from markup + CSS) and what the code reveals that a screenshot cannot: semantic HTML, ARIA usage, focus management, heading order, alt text, form labels, touch target sizes, and hardcoded colors vs tokens. Compute contrast ratios from CSS hex values where text/background pairs are identifiable. If visual judgment is impossible from code alone, say which findings are code-verified vs inferred, and ask for a screenshot only if it materially changes the audit.

**Working URL**: If Claude in Chrome tools are available, open the URL, take screenshots of key states, and interact where relevant (hover, focus, empty/error states, resize for responsiveness). Audit what you actually observed, and list which states you did or didn't reach. If browser tools are unavailable, use `web_fetch` on the URL and treat it like the HTML file case.

**Figma link**: pull the frame via Figma MCP `get_screenshot` / `get_design_context`, but do NOT resolve the node before the intake form - that's the main source of pre-form lag. Instead, the intake form carries a generic optional scope field ONLY when the user has not already specified what to audit (see the template conditions), and resolution happens after submission:
- **Single frame** → audit it; the scope field is ignored unless filled.
- **Section, page, or board with multiple frames/rows/flows** (e.g. a working board with labeled rows and dozens of screens) → never audit the whole thing shallowly and never silently pick one frame. If the user filled the scope field, match it against the detected rows/sections/frame layer names and audit that part. If the scope field was left blank, list the detected row/flow names in ONE short line with a recommendation ("This board has 4 rows: Admin view, Buyer flow, IA, Components - I'll audit 'Buyer flow' as the most complete; say the word if you want a different one or everything") and proceed with the recommendation without waiting - the user can redirect at any point, including at the confirmation gate.
- **Flow / range of screens**: when the chosen scope (or the user's request) is a flow or row of connected screens, audit it as a flow, not isolated frames - evaluate the step-by-step progression, pattern consistency across screens, what carries over between steps, and where a user would lose the thread. Locate issues by screen ("Screen 2 of 5: ...") and name the flow in the score card.
- **Whole section (broad pass)**: audit at the pattern level - recurring issues named once with instance counts - and say explicitly that per-screen depth is reduced at this breadth; offer to deep-dive any single row or frame afterward.

**HTML file and working URL - scope**: handled by the same generic optional scope field in the intake form; no pre-form fetching or route detection. After submission: a filled scope field is matched against the detected views/routes; an empty one on a multi-view prototype gets the same one-line list-and-recommend treatment as Figma boards (proceed with the recommendation, user can redirect anytime). If the user already named the screen or flow in their request ("audit the checkout flow in this prototype"), the scope field's answer is that - never ask for what's already stated. Whole-prototype audits follow the broad pass rules (pattern-level findings, reduced per-screen depth stated, deep-dive offered after).

## Context intake (always do this first)

**Fast intake path - the form must appear within the first few steps.** On invocation, do ONLY these before rendering: read `references/intake-form.md`, load the Visualizer elicitation guidance, render the form. Do NOT resolve Figma links, fetch URLs, read HTML files, read the product/heuristics references, or run any benchmark searches before the form is on screen - all of that happens AFTER the submission arrives. The user should see the form almost immediately.

Before running any audit, render ONE combined intake form (Visualizer elicitation pattern; template in `references/intake-form.md`) containing all four questions stacked in this order:

1. **"What should I audit?"** - REQUIRED, always first: single-select pills - Whole screen, Specific flow, Specific component or section, Compare against a previous round - plus an optional free-text detail field. "Compare against a previous round" routes to delta mode. This question is no longer conditional or optional; testers reported not knowing what the audit would cover.
2. **"Which product is this design for?"** - single-select pills covering the Optimizely One portfolio: Commerce Connect (CoCo), Configured Commerce (CFG), CMS, CMP, Web Experimentation, Feature Experimentation, ODP, OCP, Opal, Analytics, Admin Center / Reporting, Other.
3. **"What is the context of this design?"** - free text field (what it's for, who uses it, what problem it solves). Never reduce this to preset options.
4. **"Quick look or full audit?"** - single-select cards, three options: **Quick** (UX heuristics and Visual craft only), **Full - Axiom v3** and **Full - Axiom v1** (both run all four lenses, differing only in which Axiom system the compliance lens checks against). Default is Full - Axiom v3. The Axiom version is folded into this question deliberately: the elicitation shell allows no scripts, so a separate version question cannot be hidden when Quick is chosen, and asking which Axiom version applies to an audit that will not check Axiom is noise. Quick is a scope choice, not a lower standard: the same anchor tests, relevance test, and severity rules apply to the lenses that do run.

Rendering rules:
- One short chat line before the form, nothing after it - **the widget is the last thing in the turn**. End the turn immediately; the submission arrives as the next user message. Nothing after it means NOTHING: no "I'll wait for your answers", no recap of the questions or inferred answers, no "hit Start audit" coaching - the form's own button carries that. Text after the widget is the intake flow's most common failure mode: it reads as a second prompt and makes the user think they must retype in chat what they already entered in the form.
- The intake questions exist ONLY inside the interactive form - never restate them as a static card, list, or summary in chat, before or after rendering.
- If the Visualizer is unavailable, ask all four questions in one plain chat message instead (for depth, offer quick or full so the user can reply in a word).

Handling the submission - the FIRST user message after the form renders IS the submission, whatever shape it takes:
- Structured form payload (e.g. "Product: Opal - Context: personality picker for VAUs - Lenses: 1. UX heuristics, 2. Accessibility"): use the fields as given.
- Plain text, partial answers, or free-form ("it's the Opal teammates screen, check everything"): parse whatever is answerable from it and treat it as the submission. Never tell the user to use the form, never re-render the form, never ask for a field again in chat - the user should never have to enter the same information twice.
- For ANY missing, empty, or skipped field, apply its default silently: testing scope = whole screen; product = infer from the design; context = infer from the design; depth = full review with the Axiom version inferred from the design.
- The form has no skip button (testing scope is required, so a skip would contradict it); pressing Start audit with nothing changed is the defaults path. If a `(Skipped ...)` payload arrives anyway, apply all defaults exactly as before. **Never re-ask any intake question after the first post-form user message, in any format - not as a form, not in plain chat, not as a confirmation request.** State inferred assumptions in one line at the top of the audit and proceed straight into it in the same turn.
- After the product is known (answered or inferred), read `references/optimizely-products.md` and judge findings against that product's job to be done and audit implications.
- Skip the form entirely only when the user's message already answers everything (e.g. "check the accessibility of this Opal personality screen for VAU setup" covers product, context, and lenses) - then confirm the reading in one line and audit immediately.
- Scope the audit to the lenses the chosen depth runs - but if you spot a Blocker outside that scope, mention it briefly anyway (never bury a Blocker for scope reasons). In a quick review, state in one line which lenses were skipped, so a quick score is never mistaken for a full one. If the context answer is thin, work with it rather than interrogating. Don't ask about the design's stage, but if the user volunteers it, calibrate polish severity accordingly (lighter on early explorations, stricter on pre-ship builds).

## Re-audits (delta mode)

Detect a re-audit before running the lenses: the same input (same Figma file + node, same screenshot, or same URL) was already audited earlier in this conversation, or the user says "run again", "re-audit", "audit again", or similar. When detected, do NOT re-derive the audit from scratch:

- **Baseline**: the most recent prior audit of this input available in context is the baseline - its issue list, severities, and scores carry forward. If the user references a prior audit that is not in context, ask them to paste it (or retrieve it from conversation history if a search tool is available) rather than starting over.
- **Unchanged design**: if nothing has changed in the design, reproduce the baseline findings and scores exactly - same issues, same numbers. Say plainly that the design is unchanged so the audit is too. A new issue may be added ONLY with justification for why the baseline missed it, tagged "(missed in the previous round)"; it never silently replaces the baseline.
- **Changed design**: re-verify each baseline issue against the current design and classify it: **resolved** (fix confirmed), **still open**, or **regressed** (was resolved earlier, broke again). Then check the changed areas for **new** issues. Unchanged areas keep their baseline findings without re-derivation.
- **Score deltas**: recompute lens scores mechanically from the updated issue list and show the movement on the score card next to each lens ("UX 2.5 → 3.0") and on the overall score. Resolved issues appear in a short "Resolved since last round" line above the accordion - progress deserves visibility.
- Intake for a re-audit is skipped entirely: product, context, and lenses carry over from the baseline unless the user changes them in the request.

## The four lenses

Run the lenses the chosen depth covers: **Quick review** runs lenses 1 and 4 (UX heuristics, Visual craft); **Full review** runs all four. Default is full. In the output, show theme headers only for the lenses that ran.

### 1. UX heuristics (pattern layer leads, NN/g as backstop)

This lens runs in two layers, and the ORDER MATTERS: patterns first, NN/g second. Optimizely product UX is heavily industry-specific, and several surfaces carry patterns inherited from acquired products that were never designed against a single philosophy. A general-purpose checklist applied as the primary measure produces findings that aren't real problems. So the pattern layer carries the audit and the base layer catches what patterns don't cover. Heuristic evaluation is a discovery method for finding likely problems, not a validated measure of design quality - treat every check as a question to ask of the design, never a rule the design passes or fails.

**Primary layer - patterns. Read `references/patterns.md` FIRST.** Classify the screen into 1-3 patterns from the closed list, then run those patterns' checks. Classification rules: pick from the list and nothing else; at most 3; when two patterns compete, choose the one matching the screen's primary job (what the user came here to do), not the largest visual area. **State the detected patterns in the audit output** so the reader can challenge the classification.

**When no pattern matches, ASK.** If no pattern reaches a confident match, render a single-select elicitation listing the pattern names plus "None of these - audit without a pattern", then end the turn and resume with the user's choice next turn. Guardrails: ask ONLY when classification genuinely fails, never when a pattern plausibly matches (use it and state it instead), or every audit costs an extra round trip. Ask at most once per audit. If the user picks "none of these", run the backstop layer alone and say so in one line.

**Competitor reference pass.** After classification and before running the pattern checks, search for how comparable products handle the PRIMARY pattern (full rules in `patterns.md`): 1-2 searches per audit, competitors taken from `optimizely-products.md`, category fallback when that product has no list on file, skipped in delta mode. It is judgment input, not a conformance test - divergence from a competitor is never itself a finding, competitor evidence never sets severity or affects the score, and any finding that would vanish if the competitor evidence were removed was never a finding.

**Backstop layer - NN/g. Read `references/nng-heuristics.md` AFTER the pattern checks.** Walk all of it: the 10 heuristics, the supporting UX-psychology laws (Fitts, Hick, proximity, chunking, peak-end), and the Information architecture, Mental models, and Design at scale sections. Each heuristic carries a **complex-application reading** - what satisfying it looks like in a dense, expert-user enterprise tool. Apply that reading, not the consumer-web default: the generic reading is the main source of false positives (flagging density as clutter, domain vocabulary as jargon, or expert shortcuts as inconsistency).

**Reporting order and the backstop severity ceiling:**
- Pattern findings are listed FIRST under the UX theme. NN/g-only findings follow in a clearly separated group, labelled as backstop findings.
- An **NN/g-only finding** is one no pattern check surfaced. A finding supported by BOTH a pattern check and a heuristic is a pattern finding, not a backstop finding, and carries no ceiling.
- **NN/g-only findings are capped at Medium severity.** Where such a finding would otherwise rate Blocker or High, cap it to Medium AND disclose the original rating inline: "Medium (capped from Blocker under the backstop rule)". The disclosure is mandatory and is what makes this rule safe to run - the ceiling must never hide a serious finding silently, and the disclosures are the evidence for whether the ceiling needs revisiting.

**Every UX finding must pass the relevance test**: state which pattern check or base-layer framework it comes from AND why that matters for this product's users on this surface. A finding that only restates a heuristic in the abstract gets dropped, not downgraded.

**Intentional deviation.** Where the design breaks a check but the context justifies it - a deliberate density tradeoff for power users, a domain term that is correct industry vocabulary, an inherited convention retained on purpose - record it as a one-line observation under the theme, not as an issue. Observations carry no severity and do not affect the score. Never silently suppress: an unrecorded deviation and a recorded observation are different outcomes.

Name the source in each finding (pattern check, heuristic name, law, "IA: hierarchy", "mental model", "at scale") so it's teachable.

### 2. Axiom design system compliance
If the `axiom` MCP tools are available, verify rather than guess: `search_components` to check whether a pattern in the design has an existing Axiom component, `get_component` for correct props/variants, `get_tokens` for color/spacing/type tokens. Flag: custom-built elements where an Axiom component exists, off-token colors or spacing, wrong component variant for the context, and icon misuse (`search_icons`). If the tools aren't available, flag likely deviations as "verify against Axiom" instead of asserting.

**Which Axiom version?** Established by the depth answer (Full - Axiom v3 or Full - Axiom v1), before checking anything, because auditing a v1 design against v3 rules produces false mismatches on nearly every element. **Version-mismatch guard**: if the chosen version contradicts the evidence (the run says v3 but the design shows the v1 signals in `axiom-v1.md`, or the reverse), say so in one line and audit against the evidence, not the pill - a pre-selected default must never silently send an audit against the wrong system.
- **v3** (`@optiaxiom/react`) - verify via the `axiom` MCP tools and link doc pages as described below.
- **v1** (`optimizely-oui`, `oui-` class namespace) - read `references/axiom-v1.md` and use ONLY that file for component and token judgments. The MCP serves v3 only, so do not consult it for a v1 design.
- The depth answer carries the version (Full - Axiom v3 or Full - Axiom v1), so normally you already have it. When the answer is blank, skipped, or Quick, infer it from the v1 signals in `axiom-v1.md` (oui- class names, uppercase pill Badge, very pale Attention fills, components like ButterBar/Poptip/Disclose/Token that don't exist in v3) and state the inferred version so the reader can correct it. Only ask mid-audit if the signals genuinely conflict.
- **Always state the audited version in the compliance line**, e.g. "Axiom compliance (v1 / optimizely-oui): 78% (...)". A reader must never have to guess which system the percentage refers to.
- If the design turns out to visibly mix both systems (common where admin surfaces predate Axiom v3), audit each element against the system it actually belongs to, report one score with the split noted (e.g. "62% across a mixed v1/v3 surface"), and raise the inconsistency itself as a finding. This is an audit observation, not a form choice - the form still asks only which version the design is meant to be on.
- Whichever version, keep the two finding types separate: non-compliant *within its own version* is a defect; *would change under migration to v3* is a migration note that must not depress the score.

**Compliance score**: this lens always reports a percentage, derived from a FIXED inventory procedure so the number is reproducible across runs:
1. Walk this canonical category list in order, and only this list - (a) buttons and menu buttons, (b) badges/tags/pills, (c) inputs and form fields, (d) navigation (sidenav, global bar, breadcrumbs, tabs), (e) overlays (tooltips, menus, modals, popovers), (f) data display (cards, tables, lists, dividers, avatars, empty states), (g) icons, (h) color tokens, (i) spacing tokens, (j) typography tokens. Within each category, count each DISTINCT element type present in the design exactly once (e.g. "primary button" and "icon-only ellipsis button" are two types; three identical cards are one type).
2. Classify each counted type as compliant, mismatch, or unverifiable. HARD RULE: unverifiable is never a mismatch - if the input can't prove the deviation (exact hex unknowable from a compressed screenshot, component connection not inspectable, Axiom MCP tools unavailable), it goes in unverifiable, excluded from the math, and disclosed. Mismatch requires positive evidence of the deviation.
3. Score = compliant / (compliant + mismatch), as a whole-number percentage.
4. Report as e.g. "Axiom compliance: 78% (14 of 18 checked elements match, 3 unverifiable)" followed by the mismatch list - every non-compliant element gets a line: the element, what it currently is, and the correct Axiom component/token/variant to use.
5. If the `axiom` MCP tools are unavailable, the score line must add "Axiom tools unavailable - reduced verification this round", and everything not judgeable from established Axiom knowledge moves to unverifiable rather than being asserted either way.

**Documentation links**: every finding that names an Axiom component links to its doc page, so the reader can check the real usage guidance rather than taking the audit's word for it. URL shape is `https://optimizely-axiom.github.io/optiaxiom/components/<kebab-case-name>/` - EllipsisMenuButton becomes `.../components/ellipsis-menu-button/`, DataTable becomes `.../components/data-table/`, LabelMenuButton becomes `.../components/label-menu-button/`. Box is the one exception, living at `.../components/` itself. Token and style findings link under `.../styling/` instead (e.g. `.../styling/design-tokens/`, `.../styling/colors/`). Only link components confirmed to exist via `search_components` or `get_component`; never construct a link for a component name you haven't verified, since a dead link is worse than no link.

**Interactive state matrix**: interactive elements are checked consistently every run, so the same screen doesn't get its states audited in one round and skipped in the next. For each distinct interactive element type found in categories (a), (c), (d) and (e) of the inventory above, check this fixed state list: default, hover, focus-visible, active/pressed, disabled, loading, selected, error, empty. What counts as assessable depends on the input, and this mapping is not optional:
- **Figma**: states ARE inspectable through component variants and interactive components. Check them. A missing focus-visible or disabled variant on a custom-built control is a real finding, not an unassessable one.
- **URL or HTML**: trigger the states with the browser tools where reachable; anything not reachable goes in the couldn't-assess line with the reason.
- **Flat screenshot**: states are not inspectable. Emit ONE line naming which states went unchecked - never silently skip them, and never assert a state is missing because you can't see it.
This is about component states, not motion. The existing rule still holds: never list transitions, animation, or motion as findings for a static input.

### 3. Accessibility (WCAG 2.2 AA)
Check what the input allows: text contrast (4.5:1 body, 3:1 large text and UI components), touch/click target size (24x24 minimum, 44x44 preferred), visible focus states, color as the only signal, form labels and error identification, heading hierarchy, and keyboard reachability (code/URL inputs only). Cite the specific WCAG criterion number for anything flagged so engineers can look it up.

### 4. Visual craft
Hierarchy (does the eye land where the job starts), spacing rhythm and alignment consistency, typography scale discipline, color usage restraint, density appropriate to an enterprise data product, and empty/loading/error state design if visible. This lens is subjective - frame findings as a designer's judgment call, not a rule violation.

## Screen type and pattern benchmark

Before auditing, AUTO-DETECT what kind of screen or flow this is - never ask the user. **The user's own words come first**: the context answer from the intake form (and anything stated in their request) outranks what's visually detectable on the screen. If they wrote "quote approval flow for CSR managers", classify and benchmark THAT - even if the screen superficially reads as a generic table or form. What's readable on screen refines the classification; it never overrides the stated context. Only when the context field is empty or too thin does on-screen detection carry the classification alone. Classify from the common taxonomy: dashboard/hub, list/table, detail view, form/settings, permissions & access management, wizard/multi-step flow, picker/selector, onboarding, empty state, auth/login, search/browse, checkout/order, builder/editor, notifications/activity, conversational/agent UI. Use the strongest signals each input offers:
- **Figma link**: layer and frame names from the resolved metadata (a frame named "Roles & permissions" answers the question), plus the rendered content when a screenshot is obtainable.
- **HTML file**: page title, headings, nav labels, route names, and dominant components in the markup (one big `<table>` with filters = list/table screen; grouped inputs with a save bar = settings).
- **Working URL**: the page as actually observed via browser tools - URL path, page title, visible structure.
- **Screenshot**: the visible UI itself.
If the screen genuinely spans types (a settings page containing a permissions table), classify as the primary job with the secondary noted. State the classification in the JTBD line (e.g. "This is a permissions management screen whose job is confident, mistake-proof access control").

**Benchmarking**: for the classified pattern, gather how current leading products design it - and build the search from the user's stated context first, not just the visual pattern. "Quote approval for B2B CSRs" should drive searches about quote/approval workflows in B2B commerce tools, not generic "table UI best practices"; the intake context tells you which competitors and which job to benchmark against. **Default source: general web search (Google-style)** - search the pattern plus category leaders relevant to the product (for commerce surfaces: Shopify, Salesforce Commerce, commercetools, BigCommerce; for experimentation/analytics: Amplitude, LaunchDarkly, Mixpanel; for content: Contentful, Sanity; for agent UI: leading AI assistants), plus pattern write-ups from NN/g and reputable design publications. Mobbin's public explore/flow pages may naturally appear in those results and are fine to fetch (they contain usable text: flow descriptions, implementing apps, UI elements - though not the screenshots themselves), but do not treat Mobbin as a required or primary source. Exception: if Mobbin MCP tools are present in the tool list (someone connected a paid account), use them first - they're the richest source.

Use what you find in two ways:
- Ground findings: when the design deviates from a well-established convention, cite it ("list bulk actions conventionally appear in a persistent bottom bar - see how Shopify and Airtable handle multi-select") - this is Jakob's law with receipts.
- Ground V3: the Rethink version's restructure should be informed by how the best current implementations solve the same job, adapted to Axiom - say which reference inspired what.

Keep it proportional: 2-4 tool calls maximum across the whole chain, skip entirely when the pattern is unambiguous and the design already follows convention, and never let benchmark notes crowd out the design's own findings. Benchmark observations appear as brief notes inside the relevant issues or Next actions, not as their own section. For a full competitive analysis, point the user to the `design-competitor-research` skill instead of expanding this audit.

## Severity scale

Rate every issue. Each severity has an anchor test - if the issue fails the test, it belongs one level down. Borderline calls default DOWN, never up:

- **Blocker** - prevents task completion or excludes users (broken flow, illegible text, inaccessible control). Anchor test: you must be able to complete the sentence "a user cannot ___" with a concrete task, or name the user group excluded. If you can't, it's not a Blocker.
- **High** - significant friction or clear standards violation most users will hit. Anchor test: name the specific standard violated (heuristic, WCAG criterion number, or Axiom component rule) AND why most users hit it in normal use. Missing either half makes it a Medium.
- **Medium** - noticeable quality issue with a concrete fix, worth fixing before ship.
- **Low** - polish item.
- **Nit** - subjective preference, take or leave.

## Output format (inline chat critique)

Keep it fast and scannable. This exact structure - and never begin with a TLDR, summary, or verdict line before the Overall impression, even if user preferences or general habits call for starting responses with a TLDR. For this skill's output, the Overall impression IS the opening summary; anything before it is a violation of the format:

1. **Overall impression** - the score card widget plus one JTBD-anchored line, nothing else.

   **Score card** (rendered inline with the Visualizer as a flat HTML card, full width - no max-width cap - adapting to light/dark via CSS variables - never hardcoded colors):
   - Header row: a short name for the audited design (left) and the overall score in large type (right), e.g. "2.6 / 4". Overall = average of the lens scores.
   - One row per lens that ran (UX, Accessibility, Axiom compliance, Visual craft - two rows for a quick review, four for a full one; the overall score averages only the lenses that ran, so never present a quick review's overall as comparable to a full one): lens name, a horizontal progress bar filled proportionally, and its score "n / 4" on the right. Lens scores are MECHANICAL, never vibes: each lens starts at 4.0 and subtracts per issue found in that lens - Blocker −1.5, High −0.75, Medium −0.4, Low −0.15, Nit −0.05 - floored at 0, rounded to one decimal. Exception: the Axiom lens score is always the compliance percentage ÷ 25, one decimal. The same issue list must always produce the same scores; if a score feels wrong, the fix is re-rating an issue's severity against its anchor test, never hand-adjusting the number. Overall = average of the lens scores, one decimal.
   - **UX-lens note**: NN/g-only (backstop) findings are capped at Medium before scoring, so they subtract at most 0.4 each. Score from the capped severity, and note that the original severity is still disclosed in the finding text.
   - **Only anchor-passing findings count toward the score.** A finding subtracts points only if it passes its severity's anchor test AND, for UX findings, the relevance test. Findings that fail those tests are either dropped or recorded as observations - and observations never affect the score. This keeps the number tied to defensible findings rather than to how much the audit happened to notice. Score from the FULL qualifying issue list, including issues trimmed from display by the cap below, so the number never moves based on display budget.
   - Bar colors by score: green for scores above 3, orange for 2 to 3 inclusive (a 3.0 renders orange, not green), red for below 2. Use the theme's strong role colors for the fill - `var(--text-success)`, `var(--text-warning)`, `var(--text-danger)` - NOT the soft `--bg-*` tints, which render muddy brown/olive on a thin bar. The fill must read unmistakably as green, orange, or red at a glance in both light and dark mode.
   - Footer row: severity count badges - Blocker, High, Medium, Low - each showing its count (the Low badge label is always just "Low", never "Low/Nit"; Nit-severity issues are counted inside it), color-coded (red, orange-red, amber, gray). Omit zero-count badges.
   - Below the severity row, inside the same card, two labeled mini-sections separated by a hairline divider so the reader can scan straight to what they care about - each label in medium weight followed by its one-or-two-sentence content, never merged into one paragraph:

     **JTBD** - anchored in the product context from intake: what job this screen does for this product's users (from `references/optimizely-products.md` plus the user's context answer), and the single biggest way the design currently helps or hinders that job. E.g. "For merchandisers building promotions in CoCo, this screen's job is fast rule setup across markets - the layout supports that, but the hidden selection state works against it."

     **Competitor benchmark** (always render this label when the UX lens ran; if the reference pass produced nothing or was skipped, keep the label and give the one-line reason - "not run: re-audit, baseline comparison used instead", "no usable results", or "category fallback, no named competitor set on file". Silently dropping the section reads as a bug) - tells the designer whether their approach is working, with named competitors as evidence, in two beats: validation - which known products use this same pattern ("Adobe, Figma, and Linear use this card-based picker pattern too"), or plainly that nobody does (innovation or convention violation; the issues show which) - then comparison - where this design is ahead and behind those implementations ("ahead on density, behind on selection visibility"). Only name products the search actually surfaced; never fabricate a comparison or attribute a pattern to a company without evidence.
   - Keep it to exactly this: name, overall score, lens bars, severity counts, JTBD, competitor benchmark. No extra attributes, legends, or decoration.

   Nothing more in the opening: no multi-sentence stakeholder paragraph, no restating the findings, no summary of strengths and weaknesses - the score card carries those. Do not add a separate TLDR or summary section before or after this - the score card (with JTBD and benchmark inside it) IS the opening.

2. **Issues by theme** - rendered as a single interactive accordion widget (via the Visualizer), not as long markdown. One collapsible panel per selected theme, in this order: **UX**, **Accessibility**, **Axiom compliance**, **Visual craft**. All panels start collapsed so the audit stays compact and people expand only what they want.
   - **Panel header** (always visible): theme name in medium font weight (font-weight 500 - not bold), issue count, and compact severity chips (e.g. "UX · 4 issues · [Blocker 1] [Medium 2] [Low 1]") - CSS chips matching the score card's palette. The Axiom panel header also carries its compliance score ("Axiom compliance · 78% · 3 issues").
   - **Panel body** (on expand): the theme's annotated overview image at the top, then the issues - each one short line (roughly 15-25 words), numbered globally across all themes (1, 2, 3...), sorted by severity, in problem → fix format with the anchor in parentheses, severity chip at the start. Detail crops for Blocker/High/Medium issues sit directly under their issue line. The panel closes with a **Next actions** block: 1-3 imperative lines for THIS theme, ordered by impact, each referencing its issue numbers so the issue → solution connection is visible at a glance, and each carrying an effort tag rendered as a chip: `quick fix` (under an hour, no design decisions), `medium` (a working session or component swap), `high` (needs design exploration or restructuring). E.g. "Fix contrast on secondary buttons (issues 4, 7) - quick fix". Related issues sharing one fix are grouped into one action. There is no separate priority-actions section elsewhere in the audit - each theme carries its own next actions.
   - **Progressive delivery - the audit must be readable before any image renders.** Deliver the score card and the full issue accordion FIRST, with text locators on every issue, and end that turn. Produce annotations in a second step and deliver them after. Never block the whole audit on image generation: testers consistently report the wait as the worst part of the experience, and a reader who has the findings can start acting while the images are still being drawn.
   - **Images inside the accordion**: embed the annotated overviews and detail crops as base64 data URIs in the widget (compress first: JPEG, overview max ~1000px wide, crops max ~500px, quality ~60, total across all images in one audit under roughly 500KB - downscale further rather than exceeding it). If embedding would make the widget too large or the environment can't produce images, fall back to the previous format: markdown theme sections with images presented as files, and severities as 🔴 `Blocker`-style dot+chip lines.
   - **Annotation scope**: overviews for UX and Accessibility only (see the annotation rules below); Axiom compliance and Visual craft get one only when the user asks or their findings are strongly locational. Detail crops for Blocker and High issues only - Medium and below rely on their text locator.
   - Empty and unverified themes keep their panels: "checked, no issues found" or "not verified" with the reason as the collapsed header's subtitle - never a silent skip.
   - **Tie findings to the product's job where it sharpens them**: when an issue directly blocks the JTBD from intake, say so in the issue line or the theme's Next actions. Don't force it onto every issue.
   - **Detail crop mechanics**: crop each Blocker/High/Medium issue's region from the ORIGINAL image (the element plus roughly 15-20% surrounding context so it's recognizable), draw a severity-colored rectangle around the exact element, upscale small crops so they're comfortably readable. Low/Nit issues get crops only when the finding is hard to picture from words. Neighboring issues on the same element may share one crop (draw both rectangles, label with both numbers).
   - **UX and Accessibility panels must have their annotated overview** whenever an image input exists - the reader should understand those themes' findings from the image alone; it's a UI audit, the feedback should live on the UI. Axiom compliance and Visual craft get overviews when their issues are locational; skip only when findings aren't pointable (e.g. "terminology inconsistent across the flow").
   - The **Axiom compliance** header always leads with the compliance score, e.g. "Axiom compliance - 78% (14 of 18 checked elements match, 3 unverifiable)", followed by one line per mismatch: the element, what it is now, and the correct Axiom component/token/variant. At 100%, show "Axiom compliance - 100%, all N checked elements match" so the user knows the check ran and how much was covered.
   - If a theme has no issues, still show the header with a one-line confirmation so the user knows the check ran, e.g. "Accessibility - checked, no issues found".
   - If a theme could not be checked (e.g. Axiom tools unavailable, contrast unverifiable from a low-res screenshot), say "not verified" and why - never a silent skip, and never "checked" when it wasn't.
3. **Couldn't assess** - OMIT this section entirely for static inputs (Figma links/frames, screenshots): staticness is inherent to the medium, so a limits section is noise there. Include it only for HTML files and working URLs where motion and interaction states ARE assessable in principle but genuinely couldn't be reached (browser tools unavailable, states not triggerable) - one short line naming what wasn't reached. Never list motion/hover/transitions for a static input anywhere in the audit.
4. **Output contract self-check** - before ending the audit turn, silently verify every required piece rendered: score card; labeled JTBD and Competitor benchmark mini-sections (benchmark only if it ran); one accordion panel per lens that ran, each with its issues, next actions, and its annotated overview (or the structured-location fallback with its reason stated); detail crops for Blocker/High/Medium issues; couldn't-assess line (HTML/URL inputs only); confirmation gate. If anything is missing, produce it before closing the turn - the output structure must be identical across runs and across designs; partial audits are the failure mode testers noticed most.
5. **Confirmation gate** - the audit turn ENDS here. Do not generate improved versions yet. Close the audit with a short confirmation asking whether the findings look right and whether to proceed, rendered as tappable options when an interactive question tool is available (otherwise one plain chat line). Options: "Generate 3 improved versions", "Something's off - let me correct first", "Skip the redesigns". Mention in the same line that they can also reply with direction or constraints in their own words (e.g. "generate, but keep the table layout and don't touch the nav") and generation will honor it. Then wait.
   - "Generate 3 improved versions" → produce them in the next turn per "Proposing an improved version".
   - "Something's off" (or any message disputing findings) → revise honestly: drop or amend the disputed issues, recompute affected scores and counts, restate the corrected summary in a few lines (don't re-render the full audit), then offer generation again once.
   - "Skip" or no engagement → don't generate and don't re-offer.
6. **Improved versions** (only after explicit confirmation) - three variants of the fixed screen, from minimal to rethink (see "Proposing an improved version" below).

After delivering, offer once as part of the confirmation gate's closing line: a downloadable export of the full audit - PDF, Markdown, or branded Word doc (via the `optimizely-brand` skill) - since chat scrolls and inline visualizations reload when switching conversations, an exported file is the durable record. Also offer a fix-priority list mapped to their Jira ticket. Produce these only when asked. The export must contain the complete audit: score table, JTBD and benchmark lines, all issues with severities and effort tags, next actions, and the annotated images embedded.

## Annotating the design

Findings are easier to act on when they live on the design itself, so annotation is per theme, embedded in the critique (see output step 2): one annotated copy of the design per theme, showing only that theme's markers so images stay uncluttered. **For UX and Accessibility this is mandatory whenever there is an image input (or one can be captured) and code execution is available - do not deliver those theme sections as text-only.**

Annotation works ONLY on the real image - never a recreation:
- The base of every annotated image MUST be the literal pixels of the user's design: the actual uploaded file from `/mnt/user-data/uploads`, or an actual browser screenshot capture. Open that exact file and draw on a copy of it.
- NEVER redraw, recreate, rebuild, or approximate the design as SVG/HTML/mockup for annotation purposes - a recreated lookalike is not their design, loses detail, and destroys trust in the audit. If you cannot access or produce a real image of the design, use the text-location fallback below instead of fabricating a visual.
- Sanity check at the verify step: the annotated image must be pixel-identical to the original everywhere except the added gutter, labels, and arrows.

Annotation style - text callouts with arrows, not bare number dots:
- Extend the canvas with a white gutter on the right side (or bottom if the design is wide) roughly 35-40% of the original width, so callout text never covers the UI.
- Each issue gets a short text label in the gutter (issue number + a 3-6 word summary, e.g. "3. Cancel competes with primary CTA") in a legible font size relative to the image, color-coded by severity: red for Blocker/High, orange for Medium, gray for Low/Nit.
- Draw an arrow (line with arrowhead) from each label to the exact element in the design it concerns. Arrows must visibly touch or point into the target element, not float nearby.

Required workflow, in order:
1. Get the base image. Screenshot input: copy from `/mnt/user-data/uploads`. Working URL: capture screenshots of the audited states via the browser tools. HTML file: render to an image if the environment allows; if not, quote the exact code line/selector per issue instead.
2. `view` the base image and note the pixel positions of each issue's target element (use the image dimensions to compute coordinates - never guess blindly).
3. Draw the gutter, labels, and arrows with Python (PIL/Pillow).
4. **Verify before presenting**: `view` the annotated PNG. Check every arrow lands on the right element and every label is legible. If anything is off, adjust the coordinates and redraw. Do not present an unverified annotation.
5. **Deliver the images inside the accordion** (see output step 2): compress each verified overview and crop (JPEG, overview max ~1200px wide, crops max ~600px, quality ~65) and embed them as base64 data URIs in the accordion widget under their theme panel. Only in the fallback (widget too large or unavailable) save the PNGs to `/mnt/user-data/outputs` and present them with the file-presenting tool at the right points in the response. Either way, an image the user can't see is a failed step.
6. **Detail crops**: while the coordinates from step 2 are known, also cut the per-issue crops from the original image per the crop mechanics in output step 2, and embed each under its issue line in the accordion (same fallback rule).

- Marker numbers are the issue's global number from the critique text (not restarting per image) - the images and the text are one system.
- **Figma inputs - image availability is the exception, not the rule.** Figma image export URLs are typically unreachable from this execution environment, so for Figma links treat annotation as conditional, in this order:
1. Try to obtain a real image via the Figma MCP `get_screenshot` / `download_assets`; if a genuine image file lands on disk, annotate it per the workflow above.
2. If no real image can be obtained, do NOT treat it as a failure or fabricate a visual. Switch to the **structured location format as the first-class deliverable**: every issue's line starts with a precise locator - row/frame layer name, screen position in the flow, and element position ("Row 'Admin view', screen 3, top-right toolbar, third button"). Consistent locators replace arrows.
3. In the same breath, offer once: "paste a quick screenshot of this area and I'll produce the annotated versions" - a designer can screenshot in seconds, and that unlocks the full visual output.
Never present a recreation as the design in any of these paths.

If the environment genuinely can't produce images for other input types either, the same structured location format applies - never silently drop the visual step, and never fabricate one.

## Proposing an improved version

Generate these ONLY after the user confirms at the confirmation gate - never in the audit turn itself. Show, don't just tell - **three distinct versions**, not one. Each version is scoped to the audit findings; the three differ in how far they go:

- **V1 - Minimal fix**: the smallest change set that resolves the Blockers and Highs, inside the current layout. What ships this sprint.
- **V2 - Refined**: V1's fixes plus the Mediums and craft corrections - tightened hierarchy, spacing rhythm, correct Axiom components - still the same structure. What ships next sprint with a bit of room.
- **V3 - Rethink**: restructures the screen to solve the root causes behind the findings (e.g. if five issues trace back to a misplaced action bar, V3 moves it). The direction worth a design discussion.

Present each as an inline mockup with a one-line label of what it prioritizes and trades off, separated by brief prose - never three mockups stacked with no text between them. Every change in every version must trace to a numbered issue (V3 may additionally restructure, but its rationale still cites the issues that motivated it). No freelance redesigning of unflagged things - that undermines trust in the critique.

Generation logic - follow this process, borrowed from Anthropic's frontend-design skill (`/mnt/skills/public/frontend-design/SKILL.md`; read it before building if available):
1. **Plan before building**: for each version, write a short internal plan - which issues it resolves, what changes, what stays. Review the plan against the audit before writing any markup; only build from the reviewed plan.
2. **Fidelity first**: recreate the original screen faithfully - same layout, sections, and real content/data from the screenshot (product names, numbers, labels - never lorem ipsum or gray boxes). A viewer must recognize their screen instantly. This is the opposite of a from-scratch design brief: distinctiveness is NOT the goal here - Axiom consistency is. Pull real values via the `axiom` MCP tools (`get_tokens`, `get_component`) when available; no invented palettes or typefaces.
3. **Apply the frontend-design quality floor**: visible focus states, honest hover/disabled states, real hierarchy through spacing and type scale rather than decoration - executed quietly, no announcing.
4. **Apply its writing guidance to any copy the fixes touch**: name things by what users control, active verbs on controls ("Save changes", not "Submit"), errors that say what went wrong and how to fix it, empty states that invite action.
5. **Critique before presenting**: review each rendered version against its plan - are the fixes actually visible, does it still read as the user's screen, would a designer respect it? Revise once if not.
6. **Render inline** using Claude's default visual mockup capability (load the Visualizer's mockup guidance via its `read_me` before the first render) - do NOT produce HTML files. Only create a downloadable file if the user explicitly asks.

After the three versions, stop - no closing diff-to-issue mapping, no "which version to pick and when" comparison. Each version's one-line label plus the issue numbers cited in its intro prose carry everything needed.

Rules:
- **HTML file or URL input**: render the versions inline the same way; additionally offer (don't produce unprompted) a revised copy of their HTML file for whichever version they pick, since they have real code to update.
- **Screenshot input**: rebuild the full screen layout inline per the fidelity bar above - the complete view as the user shared it (nav, headers, content, footer areas all present), not a cropped region or isolated component. Only zoom into a region if the user explicitly asks for it.
- If the user says "critique only" or the fixes are purely conceptual (e.g. flow-level problems one screen can't show), replace the mockups with a short "recommended direction" note instead.

## Critique quality rules

- Be honest. If the design has real problems, the TLDR says so plainly. Softening a Blocker into a "consider maybe" wastes the user's time.
- Every issue needs a fix. "This is confusing" is not a finding; "the primary action competes with Cancel - make Cancel a text button per Axiom's button hierarchy" is.
- Anchor claims: heuristic name, WCAG criterion number, or Axiom component name. Unanchored opinion goes in Nits.
- Distinguish observed from inferred, especially for HTML/URL audits where some states weren't reached.
- Cap displayed issues at roughly 10-12, because past that findings stop getting fixed - but the cap is SEVERITY-AWARE, never flat:
  - **Every Blocker and High is always shown.** These are never trimmed for budget, no matter how many there are.
  - Mediums, Lows, and Nits fill the remaining budget, highest severity first.
  - Collapse repeats into one pattern finding ("spacing is inconsistent throughout, 6 instances") before trimming anything.
  - Anything trimmed gets a visible tail line under its theme: "4 further low-severity items not shown - ask and I'll list them." Nothing disappears silently.
  - Trimmed issues still count toward the score (see the score card rules), so display budget never changes the number.
- No em-dashes anywhere in the output. Use regular dashes.

## What to push back on

- A single low-res or cropped screenshot for a flow-level question: ask for the full screen or the surrounding steps.
- "Is this good?" with zero context: ask for the user job before auditing.
- A request to only validate ("just confirm this is fine"): audit honestly anyway - that is the job.

## Reference files

Load these lazily - only at the step that needs them, never before the intake form is on screen:

- `references/intake-form.md` - the combined intake form template and submission-handling rules. Read at invocation, immediately before rendering the form.
- `references/optimizely-products.md` - each product's job to be done, audit implications, and key competitors for benchmarking. Read after the product is known (answered or inferred from the submission).
- `references/axiom-v1.md` - Axiom v1 (`optimizely-oui`) components, variant sets, tokens, and deprecations. Read when the design under audit is built on v1; the `axiom` MCP covers v3 only.
- `references/patterns.md` - the closed list of screen patterns and their per-pattern checks. Read FIRST when running the UX heuristics lens; this is the primary layer.
- `references/nng-heuristics.md` - the 10 NN/g heuristics with their complex-application readings, supporting UX laws, and the IA / mental models / design-at-scale checklists. Read AFTER the pattern checks; this is the backstop layer, capped at Medium severity.
