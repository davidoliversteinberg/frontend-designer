# Optimizely product context

Read this when the audited product is known (intake Turn 1). Judge the design against the product's job to be done and its primary users - a pattern that's right for a marketer-facing tool can be wrong for an admin console. Reference the relevant JTBD when explaining why an issue matters.

**Using the competitor lists.** Each product carries a **Key competitors** line for the competitor reference pass in `patterns.md`. Rules: search only the ones plausibly relevant to the pattern you detected, not the whole list; name only products the search actually surfaced, never a name lifted from this list without evidence; and remember the pass is judgment input, not a conformance test - divergence from a competitor is never itself a finding. Where a list is marked *category-level*, treat it as the category fallback the pass describes and say so in the output.

**Provenance.** These lists were assembled from market research in September 2026 and have NOT been signed off by PCD. They are a starting point to react to, not an authority. Market facts move - the VWO and AB Tasty merger below is one example - so verify anything load-bearing rather than trusting this file's vintage.

## Commerce Connect (CoCo)
- **JTBD**: Manage and publish commerce content and operations on top of Optimizely CMS - create, edit, and publish catalogs, products, and variants across languages and markets; set pricing across markets and customer groups; build promotions; process and fulfill orders.
- **Primary users**: Ecommerce managers, merchandisers, content editors; administrators for markets, warehouses, payment, and shipping settings.
- **Audit implications**: Users live in catalog/pricing/promotion workflows daily - efficiency and bulk operations matter; content-editing patterns should feel consistent with CMS conventions (Visual Builder, Content Manager); multi-market and multi-language states must be visible, never ambiguous.
- **Key competitors**: Adobe Commerce, Salesforce Commerce Cloud, commercetools, VTEX, Shopify Plus, Bloomreach (Discovery and Content), Sitecore OrderCloud. Closest comparators for CMS-coupled commerce workflows are Adobe (Commerce plus AEM) and Bloomreach, since both pair content and catalog in one data model.

## Configured Commerce (CFG)
- **JTBD**: Run a B2B ecommerce business for manufacturers and distributors out of the box - manage products, customer-specific pricing, quotes, customer segments, promotions, orders, and the business rules around them via the Admin Console and Spire CMS storefront.
- **Primary users**: B2B ecommerce managers, sales/CSR teams handling quotes and orders, site admins; buyers on the storefront side.
- **Audit implications**: Dense enterprise data UI is the norm - tables, filters, and rule builders must scale to large catalogs and customer lists; B2B logic (customer-specific pricing, quote flows, order approval) creates complex states that need clear visibility; admin patterns predate Axiom in places, so flag legacy-vs-Axiom inconsistencies.
- **Key competitors**: OroCommerce, Sana Commerce, Adobe Commerce, BigCommerce B2B Edition, SAP Commerce Cloud, Salesforce Commerce Cloud, Unilog, Spryker, commercetools, NetSuite SuiteCommerce. Useful distinctions when benchmarking: Oro is the purpose-built quote-driven comparator, Sana is the ERP-embedded one (Microsoft Dynamics shops), and Unilog serves catalog-complexity-first industrial distributors.

## Opal
- **JTBD**: Get work done across Optimizely One through AI - ask questions, run agents and tools (e.g. build a promotion, generate product content, configure settings), and automate multi-step tasks conversationally instead of navigating each product's UI.
- **Primary users**: Any Optimizely One user, from marketers to admins, at varying technical levels.
- **Audit implications**: Conversational/agentic UI patterns - visibility of what the agent is doing and did (system status) is critical; trust cues, confirmation before consequential actions, and graceful error recovery weigh heavier than in form-based UI; entry points from host products must feel native to their context.
- **Key competitors**: Sitecore Stream, Adobe's AEM and Experience Platform AI assistants and agent orchestration, Contentstack's agentic orchestration, Bloomreach's AI layer. *Newest and least settled category in this file* - agentic DXP UI has no established conventions yet, so expect the benchmark pass to find divergent approaches rather than a norm, and weight your own judgment accordingly.

## Optimizely Connect Platform (OCP)
- **JTBD**: Connect external systems (PIM, ERP, DAM, CRM, and other third-party tools) to Optimizely products - build, install, and manage integration apps and data syncs, host Opal tools, and make external data and actions available across the suite.
- **Primary users**: Developers building integrations; technical admins installing and configuring apps from the directory.
- **Audit implications**: Developer-facing surfaces (Dev Portal, app management) should follow developer-tool conventions - clear states for syncs and jobs, honest error/log surfaces, copy-paste-friendly technical details; App Directory browsing follows marketplace patterns; assume high technical literacy but low tolerance for ambiguity.
- **Key competitors** (*category-level*): Sitecore Connect, Contentstack Marketplace and Automate, Adobe Exchange for the app-directory and connector side; Workato, MuleSoft, Boomi and Zapier for integration-builder and job-monitoring conventions. Developer-portal conventions are better benchmarked against general developer platforms than against DXP rivals.

## Admin Center and Reporting
- **JTBD**: Centrally manage who can access what across Optimizely One - users, roles, permissions, product access via Opti ID - and see what users or agents have done through auditing and reporting.
- **Primary users**: Org admins and IT; security/compliance reviewers reading audit trails.
- **Audit implications**: Access control errors are high-consequence - error prevention and explicit confirmation matter more than speed; permission states must be legible at a glance; audit/reporting views prioritize scannability, filtering, and export over visual flair.
- **Key competitors** (*category-level*): Adobe Admin Console, Sitecore Cloud Portal, Contentstack organization settings for suite-level admin; Okta and Microsoft Entra for identity, role and audit-log conventions, which are the mature reference for this pattern.

## CMS (Content Management System)
- **JTBD**: Create, manage, and publish digital content and experiences - author pages with Visual Builder, manage content types and assets, and deliver headlessly via Optimizely Graph.
- **Primary users**: Content editors and marketers daily; developers for content modeling.
- **Audit implications**: Editor efficiency and WYSIWYG clarity dominate; publishing states (draft, review, published, scheduled) must be unmistakable; this is the convention-setter other products inherit, so deviations here ripple.
- **Key competitors**: Sitecore (XM Cloud), Adobe Experience Manager, Contentful, Contentstack, Storyblok, Sanity, Bloomreach Content, Webflow Enterprise, WordPress VIP. Sitecore is the closest architectural match (both .NET-rooted DXPs with PaaS and SaaS paths); Contentful, Contentstack and Storyblok are the headless comparators for editor and modeling patterns.

## CMP (Content Marketing Platform)
- **JTBD**: Plan, produce, and collaborate on marketing content end to end - campaign and calendar planning, briefs, tasks and approval workflows, and asset management in the DAM.
- **Primary users**: Marketers, content producers, and campaign managers collaborating in teams.
- **Audit implications**: Collaboration surfaces (assignments, statuses, comments, approvals) must make ownership and next steps obvious; calendar and workflow views live or die on scannability; notification and handoff moments deserve extra scrutiny.
- **Key competitors**: Sitecore Content Hub (closest direct comparator for planning plus DAM), Adobe Workfront with AEM Assets, Contentful for content operations; Asana, Wrike and Monday for the collaboration, assignment and approval-workflow patterns, which are often the better benchmark for those specific surfaces than DXP rivals are.

## Web Experimentation
- **JTBD**: Run A/B tests and personalization on websites without code deploys - build variations in the visual editor, target audiences, and read statistically grounded results.
- **Primary users**: Marketers and optimization/growth teams; some technically fluent, many not.
- **Audit implications**: Stats and results UI must prevent misreading (significance, baselines, sample size) - honesty of data presentation is a UX concern here; the visual editor needs clear feedback about what's been changed and where a variation will run.
- **Key competitors**: VWO and AB Tasty (*they merged in January 2026, so treat them as one comparator going forward*), Adobe Target, Kameleoon, Convert.com, Dynamic Yield. VWO is the most frequently cited mid-market alternative and the closest match on visual-editor and results-reading patterns.

## Feature Experimentation
- **JTBD**: Ship features safely with flags and server-side experiments - manage flags, rollout rules, environments, and audiences, and measure feature impact through SDKs.
- **Primary users**: Developers and product managers working across environments.
- **Audit implications**: Developer-tool conventions apply - environment context must always be visible (a change in the wrong environment is a production incident); rule ordering and targeting logic need legible mental models; copy-friendly keys and technical details.
- **Key competitors**: LaunchDarkly (the enterprise governance benchmark), Statsig, Split (Harness FME), Unleash, Flagsmith, GrowthBook, PostHog, ConfigCat, Eppo, DevCycle. For environment context, rule ordering and flag-governance UI, LaunchDarkly and Split are the strongest references; PostHog and GrowthBook are the open-source comparators.

## ODP (Optimizely Data Platform)
- **JTBD**: Unify customer data across channels into profiles and real-time segments that power personalization, campaigns, and reporting across Optimizely One.
- **Primary users**: Marketers building segments and campaigns; data-minded admins managing integrations.
- **Audit implications**: Segment builders must make audience logic (and resulting size) predictable before use; data freshness and sync states need visibility; destructive actions on data or integrations warrant strong error prevention.
- **Key competitors**: Segment, Tealium, mParticle and Treasure Data on the neutral-hub side; Adobe Real-Time CDP, Salesforce Data Cloud, Bloomreach Engagement, Klaviyo Data Platform, Braze, Insider and SAP Emarsys on the CDP-plus-activation side. Match the comparator to the surface: segment-builder patterns benchmark against the activation group, data-ingestion and sync states against the hub group.

## Analytics
- **JTBD**: Measure and explore how experiences and experiments perform - dashboards, metrics, and reports that answer performance questions across Optimizely One products.
- **Primary users**: Marketers, analysts, and leaders scanning dashboards; PMs digging into metrics.
- **Audit implications**: Scannability and data-viz integrity dominate - clear hierarchies, honest axes and comparisons, obvious date/filter context on every view; empty and loading states for data-heavy views; export and share flows matter.
- **Key competitors**: Adobe Analytics, Google Analytics 4, Amplitude, Mixpanel, Heap, PostHog, Contentsquare, Quantum Metric. Amplitude and Mixpanel are the strongest references for dashboard scannability and metric-definition clarity; Adobe Analytics for enterprise report depth.

## Other / cross-product
If the design spans products, isn't listed, or the product question was skipped, infer who uses it and what job it serves from the design and any context given - never ask again after a skip. State the inference in one line at the top of the audit, then judge against general enterprise SaaS expectations plus Axiom.
- **Key competitors** (*category-level*): none on file. Use the category fallback in `patterns.md` - search the product category plus the detected pattern - and say in the output that the comparison used a category fallback rather than a named competitor set.
