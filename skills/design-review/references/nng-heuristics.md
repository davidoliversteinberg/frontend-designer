# NN/g 10 Usability Heuristics - Backstop Checklist (UX lens, secondary layer)

**This is the BACKSTOP layer, not the primary one.** `patterns.md` runs first and carries the audit; this file catches what the pattern checks don't cover. Two consequences: findings that only this file surfaces are capped at Medium severity (with the original rating disclosed), and they are reported in a separate group after the pattern findings. A finding supported by both a pattern check and a heuristic here is a pattern finding and carries no ceiling.

Based on Jakob Nielsen's 10 usability heuristics (Nielsen Norman Group). Walk through all 10 for every audit. Only report the ones violated or notably well-handled, but check every one. Each heuristic below has audit questions tuned for enterprise SaaS UI (the Optimizely context).

**Treat every heuristic as a question to ask, never a rule the design passes or fails.** Heuristic evaluation is a discovery method for surfacing likely problems cheaply - it is not a validated measure of design quality, and a deviation with a good reason is an observation, not a defect.

**Apply the complex-application reading.** NN/g's own guidance is that the 10 heuristics apply to complex, domain-specific applications exactly as they do to consumer software - what changes is what *satisfying* them looks like. A complex application supports the broad, unstructured goals and nonlinear workflows of highly trained users in specialized domains, which describes every Optimizely product. Each heuristic below carries a **Complex-app reading** line. Use it. The generic consumer-web reading is the single biggest source of false positives in this audit: it flags legitimate density as clutter, correct domain vocabulary as jargon, and expert accelerators as inconsistency.

## 1. Visibility of system status
Does the UI keep the user informed about what is happening, within a reasonable time?
**Complex-app reading**: long waits are normal here, so generic spinners and "please wait" are insufficient past ~10 seconds - show steps completed, steps remaining, or elapsed time so the user can decide whether to wait or go do something else. Density of status is not the problem; ambiguity is.
- Loading, saving, syncing, and processing states exist and are visible
- Async actions (bulk operations, imports, publishing) show progress and completion
- Current location is clear: active nav item, breadcrumbs, step indicators
- Selection states are unambiguous (how many items selected, what is selected)
- After an action, the result is confirmed (toast, inline change, updated count)

## 2. Match between system and the real world
Does the design speak the user's language rather than the system's?
**Complex-app reading**: domain vocabulary the trained user already knows is CORRECT, not jargon - price list, SKU, variant, flag, audience, and similar terms should not be flagged for being technical. What to flag is Optimizely-internal or schema-derived language the user never uses, and broken real-world metaphors (an icon whose established meaning contradicts its function here), which cost expert users repeatedly because they must re-translate every time.
- Labels use merchandiser/marketer/developer vocabulary, not database or internal jargon
- Information order follows the user's mental model of the task, not the data schema
- Icons and metaphors match real-world conventions for this audience
- Error messages describe the problem in user terms, not error codes alone

## 3. User control and freedom
Can users undo, escape, and back out?
**Complex-app reading**: users here invest heavy time and cognition per task, so the cost of a lost action is far higher than in consumer software. Undo, cancel, version history, and restore-to-previous matter more, not less - and they are what let users learn by doing without fear. Weight violations on irreversible, bulk, or high-volume operations accordingly.
- Destructive or bulk actions have undo, or at minimum a clear confirm with consequences stated
- Dialogs and flows have an obvious exit that doesn't lose work
- Multi-step flows allow going back without data loss
- Drafts/autosave exist where work is long-form

## 4. Consistency and standards
Internal consistency and platform conventions (Jakob's law).
**Complex-app reading**: check internal consistency (same meaning for the same control across the product family) and external consistency (industry and platform convention) separately. Jakob's Law still applies to expert users: they spend most of their day in other software. Frequent daily users are confused by inconsistency just as much as newcomers - familiarity does not immunize them.
- Same action = same label, icon, and placement everywhere in the product
- Follows Axiom patterns and broader enterprise SaaS conventions users already know
- Terminology is consistent (don't mix "delete"/"remove", "item"/"product" for the same thing)
- Button hierarchy and placement match the rest of the surface

## 5. Error prevention
Is the design preventing errors, not just reporting them?
**Complex-app reading**: users start doing before they finish reading, so design for exploration rather than assuming documentation was read. Live preview of an in-progress configuration, showing the effect of a setting before it commits, is the strongest form of prevention available in this class of tool.
- Risky actions are guarded proportionally to their cost (confirm for destructive, none for reversible)
- Constraints prevent invalid input (date pickers, allowed characters, disabled invalid options)
- Defaults are safe and sensible
- Slips are prevented: adequate spacing between dangerous and common actions

## 6. Recognition rather than recall
Is everything needed for a decision visible at the point of decision?
**Complex-app reading**: dense screens make recognition cues MORE valuable, not less - visible labels, inline previews, and identifiers resolved to human-readable names beat forcing the user to remember a code. This does not conflict with providing accelerators for experts; provide both.
- Options, context, and previously entered values are visible, not memorized
- Field help, format hints, and examples appear where the input happens
- Comparisons show items side by side rather than requiring back-and-forth
- Recently used items, suggestions, and autocomplete reduce memory load

## 7. Flexibility and efficiency of use
Does it serve both the novice and the power user?
**Complex-app reading**: efficiency is the highest-value currency here. All users eventually plateau, and accelerators - keyboard shortcuts, saved views, bulk operations, customizable defaults - are how experts push past that plateau while novices still use the primary path. Absence of accelerators on a heavily repeated workflow is a real finding.
- Frequent actions have accelerators: keyboard shortcuts, bulk actions, saved filters/views
- Defaults work for the common case; customization exists for the expert
- Repetitive tasks can be batched or templated
- Dense-data users can adjust density, columns, or sort

## 8. Aesthetic and minimalist design
Does every element earn its place?
**Complex-app reading**: THE most over-fired heuristic in enterprise audits - do not flag density as clutter by default. Complexity is inherent to the domain, and the answer is staged and progressive disclosure of rarely-used elements, not removal of information the expert needs. What genuinely violates this: gratuitous decoration, redundant icons that carry no information (an icon repeated on every row of a single-type list), and elements competing with the ones that matter.
- No decorative or rarely-needed content competing with the primary task
- Progressive disclosure: advanced options are reachable but not in the way
- One clear primary action per view
- Visual noise (borders, colors, badges) is proportional to information value

## 9. Help users recognize, diagnose, and recover from errors
When things fail, can the user fix it?
**Complex-app reading**: commonly unsupported in this software class because users are assumed to be trained. "Contact your administrator" is a dead end, not resolution guidance. Errors are also the moment users are most motivated to read, so a good message teaches the system. Where resolution genuinely cannot fit inline, link directly to the specific documentation.
- Error messages are in plain language, state what went wrong, and suggest a fix
- Errors appear next to the field or object they concern
- Partial failures in bulk operations report which items failed and why
- Recovery path is one step away (retry, edit, contact), not a dead end

## 10. Help and documentation
Is help available in context when needed?
**Complex-app reading**: training and docs usually exist here, but are rarely read before attempting and hard to recall in the moment. Brief in-context help - a tooltip carrying a description, a shortcut, an example - beats forced upfront tutorials, because it is available at the point of confusion.
- Complex fields or concepts have inline explanation (tooltip, helper text, learn-more link)
- Empty states teach: what this is, why it's empty, what to do first
- Help is task-focused, concrete, and short
- Onboarding for a new surface exists where the concept is unfamiliar

## Supporting laws (apply where relevant, cite by name)
- **Fitts's law** - important/frequent targets are large and close; check small icon buttons and edge targets
- **Hick's law** - too many undifferentiated choices at once; check long unsorted menus and option grids
- **Law of proximity** - related controls grouped, unrelated separated; check whether spacing communicates grouping
- **Miller's law / chunking** - long forms and data broken into digestible groups
- **Peak-end rule** - flows end on confirmation/success, not abandonment ambiguity

## Information architecture (evaluate alongside the heuristics)
- Hierarchy: does the visual and structural hierarchy match task importance - does the eye land where the job starts, and do secondary things read as secondary?
- Grouping and labeling: are items grouped by the user's categories (not the org chart or data schema), with labels a first-time user would predict?
- Navigation and wayfinding: is it clear where you are, what's one level up, and where the sibling sections are; do section names promise what their contents deliver?
- Findability: could a user locate a specific item/setting here without prior knowledge - by scanning, search, or predictable placement?
- Depth vs breadth: is content over-nested (important things buried 3+ levels) or over-flattened (walls of undifferentiated options)?

## Mental models
- Does the design's structure match how this product's users think about the task (check the product JTBD), or does it mirror the system's internal model?
- Do objects behave as their appearance promises - things that look clickable are, things that look grouped act together, things that look like states are states?
- Are new or AI-driven concepts anchored to something familiar, with the differences made explicit rather than assumed?
- Would a user's prediction of "what happens if I press this" be correct every time? Flag any control whose outcome would surprise.

## Design at scale
- 10x data: does the layout survive ten times the rows, cards, tags, or child items shown in the mock - what scrolls, what truncates, what paginates?
- Long values: names, emails, product titles, and localized strings 2-3x longer than the mock's - where do they wrap, truncate, or break alignment?
- Extremes and absences: zero items, one item, thousands; missing images; stale or failed data - does each state have a design?
- Permissions and variants: how does the screen look for a role missing half the actions, or a plan missing half the features - hidden, disabled, or broken?
- Concurrency and time: multiple users editing, data changing under you, long-running jobs - is any of that visible where it matters?
