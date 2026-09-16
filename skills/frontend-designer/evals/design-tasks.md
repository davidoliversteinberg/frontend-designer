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

## Rendered benchmark

Once approved visual references are available, run asset browsing, focused asset review, dense campaign table, configuration, and workflow tasks on the previous and revised skills with identical content and constraints. Include realistic long/empty/error states. Use repeated runs to distinguish improvements from a lucky sample; keep model constant before comparing models.

A reviewer should judge task fit, reading order, type comfort, spatial balance, content restraint, brand fidelity and operability from actual renders. Record preference and reasons, not a fabricated success percentage. A text-only/preflight test cannot establish rendered quality.
