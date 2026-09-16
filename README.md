# Frontend Designer

Frontend Designer is a standalone skill for designing, implementing, diagnosing, and quality-gating visible Optimizely product interfaces.

It combines product-design judgment with verified design-system usage, implementation, browser inspection, and a rendered completion gate. It does not accept a plausible prototype, an Axiom import, or compiling code as proof that the correct component, state, or responsive behavior was used.

## What it does

Use `frontend-designer` when you want an agent to build, change, polish, or finish a visible product interface.

The skill:

- selects the interaction model before assembling components;
- establishes composition, hierarchy, content, actions, typography, and surfaces;
- maps semantic user intent to the correct current design-system primitive or documented pattern;
- verifies compound anatomy, props, tokens, icons, states, transitions, and rendered modes;
- reconciles Figma and prototypes with the installed design-system contract instead of copying them uncritically;
- discovers interactive controls created internally by compound components;
- diagnoses whether a defect belongs to intent, mapping, composition, application code, the design system, or a version mismatch;
- fixes the earliest incorrect layer and repeats verification;
- renders new screens and substantial redesigns at primary, narrow, and affected component-mode boundaries; verifies focused edits within their scope;
- blocks completion on unresolved component, state, accessibility, responsive, or visual-quality failures.

Read the [complete user guide](docs/frontend-designer-guide.md) for the workflow, evidence model, prompt recipes, installation details, and completion contract.

## What's new in 1.2.0

- Stronger typography checks: actual font loading and weights, line height, reading width, wrapping, long content, and zoom.
- A full-screen visual pass now requires top marks in reading order, typography, and composition as well as at least 17/20 overall, no zero, and no automatic failure. Strong technical compliance cannot mask weak core design craft.
- Context-sensitive spacing and density replace blanket rules to make everything larger or more spacious.
- Focused edits get focused verification, not an unrelated whole-page redesign or invented score.
- References are loaded when relevant, and unchanged component evidence can be reused within a task.
- A portable [visual-library intake](skills/frontend-designer/references/visual-library.md) separates Axiom authority, product composition references, external inspiration, and negative examples. Private screenshots are not bundled.
- [Regression tasks](skills/frontend-designer/evals/design-tasks.md) cover scope, evidence gaps, typography, density, asset replacement, and a rendered comparison procedure. Textual validation is not a claim of measured visual improvement.

## Use it

In Codex:

> Use $frontend-designer to review and finish this interface. Verify the component and state contracts against the installed design system, fix the owning layer of every important defect, and run the rendered conformance postflight.

In Claude Code:

> Use /frontend-designer to implement this Figma design. Treat Figma as product-intent evidence, reconcile it with the installed Axiom version, and verify every applicable transition and rendered mode.

You can provide a route, branch, screenshot, Figma link, written requirement, or existing implementation. The skill should report the evidence it inspected, what it fixed, what passed, and anything that remains genuinely unverifiable.

## Standalone skill with optional companions

The active plugin contains only `frontend-designer`. It does not install or update a broader product-design skill pack; the historical `OLD/` archive remains inert and outside discovery paths.

The skill is complete on its own. When compatible companion skills are installed, it can select the smallest useful specialist by declared capability for design critique, flows and states, interaction patterns, UX writing, accessibility depth, or developer handoff. It does not require fixed companion names and continues safely when none are available.

## Use it with Tien Le's Virtual Design Teammate

This work grew from a frontend-design extension originally explored alongside [Tien Le's Virtual Design Teammate](https://github.com/notienle/virtual-design-teammate). Tien's repository remains the source for his broader product-design framework and specialist skills.

Install the two repositories separately if you want both:

1. Install `frontend-designer` from `https://github.com/davidoliversteinberg/frontend-designer` for implementation, design-system conformance, rendered QA, and repair.
2. Install [Tien's Virtual Design Teammate](https://github.com/notienle/virtual-design-teammate) for its broader strategy, critique, flows, UX writing, accessibility, validation, and handoff capabilities.

They can coexist in the same Claude or Codex setup. Each repository remains independently maintained and updated. `frontend-designer` may use a relevant installed companion skill when its capability materially applies, but it never copies, updates, or assumes ownership of Tien's skills.

GitHub's ahead/behind indicator compares this fork's commit history with Tien's repository, not the installed skill version. See [fork maintenance](docs/fork-maintenance.md) for the reviewed upstream reconciliation and why the companion pack remains separate.

## Axiom and Figma evidence

For Axiom work, current evidence is retrieved rather than remembered:

- the target repository and installed package establish the executable version;
- the stable [OptiAxiom MCP](https://optimizely-axiom.github.io/optiaxiom/guides/mcp/) supplies current component, pattern, token, icon, guide, and test documentation;
- Figma node data, variables, screenshots, and Code Connect provide product-intent and visual-acceptance evidence;
- browser and accessibility-tree inspection prove rendered behavior.

The public [components](https://optimizely-axiom.github.io/optiaxiom/components/), [styling](https://optimizely-axiom.github.io/optiaxiom/styling/), and [guides](https://optimizely-axiom.github.io/optiaxiom/guides/) are supporting sources. The installed package remains the final API and runtime check.

## Visual references: team manual and contributions

Start with the [Visual reference team manual](docs/visual-reference-team-manual.md). It explains how Optimizely designers across CMP, CMS, Opal, experimentation, commerce, and other products can add Figma screens and component examples, use them with the skill, and contribute safely.

| What | Where it lives | Who receives it |
| --- | --- | --- |
| Private screenshots and their catalog | `design-references/inbox/` in the product repository you are working in; register entries in `catalog.md` | That local workspace only; not included when someone installs this skill |
| Guidance for selecting and interpreting references | [Visual library](skills/frontend-designer/references/visual-library.md) | Everyone installing the skill |
| Images explicitly cleared for public contribution | `skills/frontend-designer/references/visuals/<product>/`, created when a cleared contribution is accepted; register it in the visual library | Everyone with access to this public repository |

No public image collection is bundled yet. Existing local images are not uploaded or synchronized automatically. For private team sharing, use your approved internal Figma or asset location and keep its links in a private catalog.

The best reference is **a readable full screen, its product/task/state, and a short explanation of what to learn and what not to copy**. Component examples should also identify their library/version and relevant variants or states. A screenshot teaches composition; it does not prove current Axiom APIs, accessibility, or interaction behavior.

The manual includes Figma export steps, a copyable catalog template, examples for different product teams, ready-to-use prompts, and a public contribution checklist. You do not need to create another skill for every product or image.

## Install

Ask Claude or Codex:

> Install `frontend-designer` from `https://github.com/davidoliversteinberg/frontend-designer` for my local Claude Code and Codex setup. Preserve unrelated skills, validate the installation, and tell me whether I need a new session.

Manual personal locations commonly used in the current setup are:

- Claude Code: `~/.claude/skills/frontend-designer/SKILL.md`
- Codex: `~/.agents/skills/frontend-designer/SKILL.md`

Some Codex installations use `$CODEX_HOME/skills` instead. Confirm the discovery directory shown by the client.

The bundled checker compares the installed version with GitHub at most once every seven days and reports available updates. It never downloads or overwrites skills without explicit approval. To force a freshness check from a clone:

```sh
node skills/frontend-designer/scripts/check-for-updates.mjs --force
```

Start a new Claude or Codex session after installation or a skill rename so discovery metadata refreshes.

## Repository contents

```text
commands/frontend-designer.md
docs/frontend-designer-guide.md
docs/visual-reference-team-manual.md
docs/fork-maintenance.md
skills/frontend-designer/
  SKILL.md
  evals/design-tasks.md
  references/
  scripts/check-for-updates.mjs
```

The inactive `OLD/` directory is retained only as historical, recoverable source from the earlier fork. It is outside the active `skills/` and `commands/` paths and is not installed or invoked by Frontend Designer.

## Credit

Credit to [Tien Le](https://github.com/notienle) for the original Virtual Design Teammate concept and framework. This standalone repository is maintained separately so Tien can continue evolving his work while Frontend Designer focuses on production interface design, implementation, component-and-state conformance, and rendered quality control.
