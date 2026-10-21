# Design skill regression tasks

Run these when changing design policy, routing, or quality gates, not for every UI task. Use isolated artifacts and do not mutate production. Give an evaluator the request and minimum inputs without the expected findings. Record model, skill version, inputs, renders, decisions and unavailable evidence. Prefer repeated runs and blind designer preference for visual comparisons; self-scores alone do not establish improvement.

## Cases and observable checks

| Case | Raw request/input | Observable outcome to inspect |
| --- | --- | --- |
| Asset replacement | Review workspace replacing a cycling hero with a running photo; current/proposed labels, explanation and decision required | Replacement is supported; the UI does not claim aligned pixel correspondence or reject different subjects |
| Dense operational table | Twelve campaign rows, long names, owner, status, due date; make scanning denser without shrinking body type | Uses suitable density/grouping and readable targets rather than mechanically increasing gaps or adding cards |
| Typography | A wide detail page with a long title, three paragraphs, technical IDs and optional metadata | Approved font/weights actually load; prose width and line height aid reading; long content, zoom and wrapping remain usable |
| Focused correction | One drag handle beside a two-line title appears high; preserve the page; browser unavailable | Scoped diagnosis or implementation plan; no fabricated measurement, whole-page score or visual pass |
| Ambiguous request | "This table feels cluttered" | Diagnosis before mutation; an explicit "make it calmer" request can then authorize the change |
| External inspiration | Other brand screenshot, explicitly borrow grouping only | Transfers grouping with Axiom identity; missing image is disclosed and not invented |
| Missing Axiom MCP | Installed package and official docs available, MCP unavailable | Uses supported fallback evidence, reports limits, does not invent APIs or abandon all safe work |
| Core score failure | Typography, composition and reading order each 1; seven other categories each 2 | 17/20 is rejected for a full visual pass |
| No approved image | New screen requested, only textual requirements supplied | Continues safe design work with assumptions; does not pretend historical prose is inspected visual evidence |
| Routing migration | Repository rules and optional review companion refer to the active skill | No reference resolves to retired frontend-design paths; critique-only does not edit |
| Repository build skill present | Axiom Play `main`, whose `AGENTS.md` routes UI work to `build-product-ui`; request a new CMP settings page | Follows the repository's procedure and checks, adds the design brief and visual gate, and neither commits nor opens a PR |
| Borrowed prop | Add a destructive Button next to a `Badge intent="danger"`, and a `Textarea` beside `size="lg"` inputs | Verifies Button's own destructive appearance and Textarea's own props before the typecheck; no `intent` on Button, no `size` on Textarea |
| Row actions | A table with Edit, Duplicate and Delete inline links per row | One ellipsis `Menu` per row with a row-specific accessible name; Delete last, danger intent, confirmed |
| Label wiring | A filter form whose checkboxes are labelled by an enclosing label | The browser script discovers the association before clicking the label and asserts the checked state |

## Rendered benchmark

Once approved visual references are available, run asset browsing, focused asset review, dense campaign table, configuration, and workflow tasks on the previous and revised skills with identical content and constraints. Include realistic long/empty/error states. Use repeated runs to distinguish improvements from a lucky sample; keep model constant before comparing models.

A reviewer should judge task fit, reading order, type comfort, spatial balance, content restraint, brand fidelity and operability from actual renders. Record preference and reasons, not a fabricated success percentage. A text-only/preflight test cannot establish rendered quality.

In Axiom Play, the `benchmarks/` harness runs a frozen task against a chosen skill branch and records model, outcome, timing, token use, engineering and browser checks, the visual score and screenshot pairs; `/tests/` lists the runs. Use it for previous-versus-revised comparisons when it is available, and keep its records local as its README requires.
