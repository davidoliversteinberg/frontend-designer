# Fork maintenance

Frontend Designer is an intentionally standalone fork of [Tien Le's Virtual Design Teammate](https://github.com/notienle/virtual-design-teammate). Its active plugin contains one skill. The original project's broader companion pack is installed and maintained separately.

## What ahead and behind mean

GitHub compares commit ancestry with the original repository's default branch:

- **Ahead** counts commits unique to this fork, including its standalone packaging and design implementation work. Being ahead is expected.
- **Behind** counts original-project commits not yet included in this fork's history. It does not mean the installed `frontend-designer` skill is out of date.

## September 16, 2026 reconciliation

Reviewed the seven original-project commits after the shared ancestor `5ad078e2baf04fac32681e69a15abc4e5ad90a60`, through [52736792ed50ba55c4d57119d839b6ed2f816d97](https://github.com/notienle/virtual-design-teammate/commit/52736792ed50ba55c4d57119d839b6ed2f816d97).

Those commits restore or revise the broader companion skill pack, including design review and its references. Their combined changes affect 45 files, all outside `skills/frontend-designer/`. They do not change this standalone skill or its plugin manifests.

The reconciliation uses a tree-preserving merge to record that upstream revision in this fork's ancestry without importing those unrelated active skills. This is an explicit scope decision, not a claim that their file changes were adopted. The upstream source and history remain available at the original repository. The separate 1.2.0 release commit updates this fork's own skill and documentation.

## Future updates

Inspect incoming commits and their affected paths before syncing. Apply relevant changes with normal review, reconcile conflicts deliberately, and keep companion installation separate. Do not automatically repeat a tree-preserving merge or discard potentially relevant changes just to clear a count.

Publish history-reconciliation pull requests with a merge commit, not a squash or rebase merge, so the reviewed upstream ancestry is retained. Do not reset the fork to the original project or force-push to remove the expected ahead count.

The bundled seven-day update checker compares installed skill versions with this repository. It is independent of GitHub's fork comparison and never installs updates automatically.
