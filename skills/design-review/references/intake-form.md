# Intake form template (single combined form)

Render the intake as ONE elicitation form using the Visualizer (`visualize:show_widget`). First call `visualize:read_me` with modules `["elicitation"]` silently, then render. Keep the header SVG byte-for-byte as provided by the elicitation guide (it is fixed chrome). One short chat line before the form; NOTHING after it - the widget ends the turn. No waiting messages, no recap of the questions, no "hit Start audit" coaching after the widget - the form's buttons carry that, and trailing text makes users think they must retype their answers in chat.

```html
<form class="elicit">
  <div class="elicit-header">
    [fixed header SVG from the elicitation guide]
    <span>Audit setup</span>
  </div>
  <div class="elicit-body">
    <div class="elicit-group">
      <label class="elicit-question">Which product is this design for?</label>
      <div class="elicit-pills" data-name="product">
        <button type="button" class="elicit-pill" data-value="Commerce Connect (CoCo)">Commerce Connect (CoCo)</button>
        <button type="button" class="elicit-pill" data-value="Configured Commerce (CFG)">Configured Commerce (CFG)</button>
        <button type="button" class="elicit-pill" data-value="CMS">CMS</button>
        <button type="button" class="elicit-pill" data-value="CMP">CMP</button>
        <button type="button" class="elicit-pill" data-value="Web Experimentation">Web Experimentation</button>
        <button type="button" class="elicit-pill" data-value="Feature Experimentation">Feature Experimentation</button>
        <button type="button" class="elicit-pill" data-value="ODP">ODP</button>
        <button type="button" class="elicit-pill" data-value="OCP">OCP</button>
        <button type="button" class="elicit-pill" data-value="Opal">Opal</button>
        <button type="button" class="elicit-pill" data-value="Analytics">Analytics</button>
        <button type="button" class="elicit-pill" data-value="Admin Center / Reporting">Admin Center / Reporting</button>
        <button type="button" class="elicit-pill" data-value="Other">Other</button>
      </div>
    </div>
    <div class="elicit-group">
      <label class="elicit-question">What is the context of this design?</label>
      <textarea class="elicit-textarea" data-name="context"
        placeholder="What it's for, who uses it, and what problem it solves"></textarea>
    </div>
    <div class="elicit-group">
      <label class="elicit-question">Quick look or full audit?</label>
      <div class="elicit-pills" data-name="depth" data-multi="false">
        <button type="button" class="elicit-pill" data-value="Quick"
          style="border-radius:12px; padding:14px 16px; display:flex; gap:12px; align-items:flex-start; text-align:left; min-width:180px; box-shadow:0 1px 2px rgba(0,0,0,0.04)">
          <i class="ti ti-bolt" style="font-size:20px" aria-hidden="true"></i>
          <span>
            <span style="font-size:13px; font-weight:500">Quick</span><br>
            <span style="font-size:11px; color:var(--text-muted)">UX and visual craft</span>
          </span>
        </button>
        <button type="button" class="elicit-pill" data-value="Full - Axiom v3" aria-pressed="true"
          style="border-radius:12px; padding:14px 16px; display:flex; gap:12px; align-items:flex-start; text-align:left; min-width:180px; box-shadow:0 1px 2px rgba(0,0,0,0.04)">
          <i class="ti ti-list-check" style="font-size:20px" aria-hidden="true"></i>
          <span>
            <span style="font-size:13px; font-weight:500">Full, Axiom v3</span><br>
            <span style="font-size:11px; color:var(--text-muted)">Adds accessibility and optiaxiom</span>
          </span>
        </button>
        <button type="button" class="elicit-pill" data-value="Full - Axiom v1"
          style="border-radius:12px; padding:14px 16px; display:flex; gap:12px; align-items:flex-start; text-align:left; min-width:180px; box-shadow:0 1px 2px rgba(0,0,0,0.04)">
          <i class="ti ti-list-check" style="font-size:20px" aria-hidden="true"></i>
          <span>
            <span style="font-size:13px; font-weight:500">Full, Axiom v1</span><br>
            <span style="font-size:11px; color:var(--text-muted)">Adds accessibility and optimizely-oui</span>
          </span>
        </button>
      </div>
    </div>
  </div>
  <div class="elicit-footer">
    <button type="button" class="elicit-submit">Start audit</button>
  </div>
</form>
```

Rules:
- Raw `<input type="checkbox">` elements are forbidden - the shell only harvests `.elicit-pill` buttons with `data-value` inside `.elicit-pills` containers; multi-select values arrive comma-joined.
- The submission arrives as ONE user message with the filled fields (e.g. `Audit setup - Product: Opal - Context: ... - Depth: Full - Axiom v3`). But the FIRST user message after the form renders is the submission whatever shape it takes - structured payload, plain text, or partial answers all count. Parse what's answerable; any missing/empty field gets its default (product: infer from design; context: infer from design; depth: full review with the Axiom version inferred from the design using the v1 signals in `axiom-v1.md`). Never re-render the form or re-ask a field because the reply wasn't in form format.
- There is NO skip button: testing scope is required, and a skip button that bypasses a required question is a contradiction. The shell may still emit `(Skipped the form ...)` if the user dismisses it another way - treat that exactly as before: all defaults, no re-asking. Never re-ask any intake question after submission, in any form. State inferred assumptions in one line and start the audit in the same turn.
- If the pre-selected `aria-pressed` state doesn't render, the question text still communicates the default, and an empty depth submission runs a full review. A user who wants the defaults just presses Start audit without changing anything, which is what the skip button was for.
- Handling the Axiom version answer: **v3** verify via the `axiom` MCP tools; **v1** read `axiom-v1.md` and use only that. The form offers these two options only. If the field comes back blank or skipped, infer the version from the v1 signals in `axiom-v1.md` and state that it was inferred, so the reader can correct it - never re-ask. Always name the audited version in the compliance line.
- Depth mapping: **Quick** runs the UX heuristics and Visual craft lenses only; **Full - Axiom v3** and **Full - Axiom v1** both run all four, differing only in which Axiom system the compliance lens checks against. Quick is a scope choice, not a lower standard - the same anchor tests, relevance test, and severity rules apply to the lenses that do run.
- The Axiom version is folded INTO this question on purpose. The elicitation shell allows no scripts, so a separate version question cannot be hidden when Quick is chosen, and asking which Axiom version applies to an audit that will not check Axiom is noise. One question, three options, no dead field.
- **Version-mismatch guard**: if the run says v3 but the design shows the v1 signals in `axiom-v1.md` (or the reverse), say so in one line and audit against the evidence, not the pill. A pre-selected default must never silently send an audit against the wrong system.
- In a quick review, say in one line which lenses were skipped, so nobody reads a quick score as a full one. Never present a quick review's overall score as comparable to a full one: it averages two lenses, not four.
- The Blocker exception still holds. If a skipped lens's problem is visible anyway - an obviously inaccessible control, a badly broken component - report it briefly even in a quick review rather than burying it.
- The Axiom version question is only consumed by the Axiom lens, so in a quick review the answer is ignored without comment.
- Only fall back to plain chat (all four questions in one message) if the Visualizer tool is unavailable.

## Testing scope (REQUIRED - always the FIRST group in the form)

Testing scope is a required question and always appears first, before product. It is no longer conditional and no longer optional: testers reported not knowing what the audit would actually cover, and a scope answered up front prevents the audit auditing the wrong thing. No pre-form resolution of the link or file is allowed (that is the main source of intake lag) - resolve after submission.

```html
    <div class="elicit-group">
      <label class="elicit-question">What should I audit? (required)</label>
      <div class="elicit-pills" data-name="testing_scope" data-multi="false">
        <button type="button" class="elicit-pill" data-value="Whole screen">Whole screen</button>
        <button type="button" class="elicit-pill" data-value="Specific flow">Specific flow</button>
        <button type="button" class="elicit-pill" data-value="Specific component or section">Specific component or section</button>
        <button type="button" class="elicit-pill" data-value="Compare against a previous round">Compare against a previous round</button>
      </div>
      <textarea class="elicit-textarea" data-name="scope_detail"
        placeholder="Optional - name the flow, component, or section (e.g. the checkout flow, the Admin row)"></textarea>
    </div>
```

Handling each choice after submission:
- **Whole screen** - audit everything in the resolved frame or screenshot.
- **Specific flow** - audit the named flow across its screens; if the detail field is blank, list the detected flows in one line, pick the most likely, and proceed.
- **Specific component or section** - scope to that element and its immediate context; findings elsewhere on the screen are out of scope EXCEPT Blockers, which are always reported.
- **Compare against a previous round** - this is a re-audit: go to delta mode in SKILL.md and use the prior audit as baseline.

If the user already named the target in their request ("audit the checkout flow"), pre-select the matching pill and put their words in the detail field - do not make them type it twice. Never render a second form round for scope.

