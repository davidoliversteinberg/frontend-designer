#!/usr/bin/env node

/**
 * Merge an upstream frontend-designer release into this installation without
 * destroying local work.
 *
 * The previous update procedure was `rsync -a --delete`, which is wrong for a
 * skill a team contributes to: anything a designer adds under the skill —
 * an extra reference note, a `references/visuals/` image set — is upstream-only
 * in reverse, so --delete removes it, and a locally tightened rule is silently
 * reverted. Neither loss is reported.
 *
 * So this script classifies every path instead of copying over the top:
 *
 *   add       upstream has it, we do not            -> written
 *   update    both have it, ours is untouched       -> written
 *   conflict  both have it, ours was edited locally -> KEPT, upstream saved
 *             alongside as <file>.upstream-<version> for a human to merge
 *   keep      only we have it (designer additions)  -> never touched
 *   orphan    upstream dropped it, ours was edited  -> KEPT, flagged
 *   remove    upstream dropped it, ours untouched   -> written
 *
 * "Edited locally" is decided against `.install-manifest.json`, which records
 * two SHA-256s per file: what upstream shipped, and what ended up on disk. The
 * pristine upstream hash is the one that matters — a file is ours to protect
 * whenever its current content differs from the upstream content it came from.
 *
 * Recording only the on-disk hash would leak a kept conflict: we keep the
 * designer's edit, write their version as the new baseline, and the *next*
 * release then reads as "untouched since last time" and overwrites it. Holding
 * the upstream side means a divergent file keeps reporting as a conflict, every
 * release, until a human actually merges it.
 *
 * Without any baseline a file that merely differs from upstream is
 * indistinguishable from one a designer improved, so the first run treats every
 * difference as a conflict rather than guessing.
 *
 * Dry run is the default. Nothing is written until --apply, because the skill's
 * own rule is that updates need explicit approval.
 *
 * Repository-level material — `design-references/` and its catalog — lives
 * outside the skill directory and is therefore never in scope here. That is
 * deliberate: the images a team collects should not be destroyable by a skill
 * update at all.
 *
 *   node apply-update.mjs                  # plan only
 *   node apply-update.mjs --apply          # perform it
 *   node apply-update.mjs --from <dir>     # use a local checkout, skip cloning
 */

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPOSITORY = "https://github.com/davidoliversteinberg/frontend-designer.git";
const UPSTREAM_SKILL_PATH = "skills/frontend-designer";
const MANIFEST_NAME = ".install-manifest.json";

// Never classified, never copied, never deleted. The manifest is our own
// bookkeeping and the git directory belongs to the temporary clone.
const IGNORED = new Set([MANIFEST_NAME, ".git", ".DS_Store"]);

// Conflict sidecars are bookkeeping too. Left in the walk they would be read as
// designer additions and reported as `keep` on every subsequent release, and a
// file that stays in conflict would collect one per version.
const SIDECAR = /\.upstream-[^/]+$/;

const skillDirectory = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const apply = process.argv.includes("--apply");
const fromIndex = process.argv.indexOf("--from");
const localSource = fromIndex === -1 ? null : process.argv[fromIndex + 1];

function parseVersion(source) {
  return source.match(/\bversion:\s*["']([^"']+)["']/)?.[1] ?? "unknown";
}

async function walk(root, prefix = "") {
  const out = new Map();
  let entries;
  try {
    entries = await readdir(path.join(root, prefix), { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (IGNORED.has(entry.name) || SIDECAR.test(entry.name)) continue;
    const relative = prefix ? path.join(prefix, entry.name) : entry.name;
    if (entry.isDirectory()) {
      for (const [key, value] of await walk(root, relative)) out.set(key, value);
    } else if (entry.isFile()) {
      const buffer = await readFile(path.join(root, relative));
      out.set(relative, createHash("sha256").update(buffer).digest("hex"));
    }
  }
  return out;
}

// Remove any sidecar left beside a file by an earlier release.
async function dropSidecars(target) {
  const directory = path.dirname(target);
  const prefix = `${path.basename(target)}.upstream-`;
  const entries = await readdir(directory).catch(() => []);
  for (const name of entries) {
    if (name.startsWith(prefix)) await rm(path.join(directory, name), { force: true });
  }
}

async function resolveUpstream() {
  if (localSource) {
    const direct = path.resolve(localSource);
    // Accept either the repository root or the skill directory itself.
    const nested = path.join(direct, UPSTREAM_SKILL_PATH);
    const candidate = await stat(nested).then(
      (s) => (s.isDirectory() ? nested : direct),
      () => direct,
    );
    return { directory: candidate, cleanup: null };
  }

  const temporary = await mkdtemp(path.join(os.tmpdir(), "frontend-designer-upstream-"));
  execFileSync("git", ["clone", "--quiet", "--depth", "1", REPOSITORY, temporary], {
    stdio: ["ignore", "ignore", "pipe"],
  });
  return {
    directory: path.join(temporary, UPSTREAM_SKILL_PATH),
    cleanup: () => rm(temporary, { force: true, recursive: true }),
  };
}

function classify(upstream, local, baseline, firstRun) {
  const plan = [];
  const paths = [...new Set([...upstream.keys(), ...local.keys(), ...baseline.keys()])].sort();

  for (const file of paths) {
    const up = upstream.get(file);
    const mine = local.get(file);
    // What upstream shipped for this path last time — the only honest answer to
    // "is this file still theirs?". See the header note on kept conflicts.
    const pristine = baseline.get(file)?.upstream;
    const was = pristine;
    // Without a baseline we cannot tell a designer's edit from an old release,
    // so treat any difference as a conflict and let a human decide once.
    const edited =
      mine !== undefined && (firstRun ? mine !== up : pristine !== undefined && mine !== pristine);

    if (up !== undefined && mine === undefined) {
      plan.push({ action: "add", file });
    } else if (up !== undefined && mine === up) {
      plan.push({ action: "same", file });
    } else if (up !== undefined && edited) {
      plan.push({ action: "conflict", file });
    } else if (up !== undefined) {
      plan.push({ action: "update", file });
    } else if (mine !== undefined && was === undefined) {
      plan.push({ action: "keep", file });
    } else if (mine !== undefined && edited) {
      plan.push({ action: "orphan", file });
    } else if (mine !== undefined) {
      plan.push({ action: "remove", file });
    }
  }
  return plan;
}

const LABELS = {
  add: "add       new upstream file",
  update: "update    ours was untouched",
  conflict: "CONFLICT  ours was edited — keeping ours",
  keep: "keep      local addition — not upstream",
  orphan: "ORPHAN    dropped upstream, ours was edited — keeping ours",
  remove: "remove    dropped upstream, ours was untouched",
  same: "same      already identical",
};

const upstreamSource = await resolveUpstream();

try {
  const [upstream, local] = await Promise.all([
    walk(upstreamSource.directory),
    walk(skillDirectory),
  ]);

  if (upstream.size === 0) {
    throw new Error(`No upstream files found at ${upstreamSource.directory}`);
  }

  const baseline = await readFile(path.join(skillDirectory, MANIFEST_NAME), "utf8")
    .then((raw) => new Map(Object.entries(JSON.parse(raw).files ?? {})))
    .catch(() => new Map());
  const firstRun = baseline.size === 0;

  const fromVersion = parseVersion(await readFile(path.join(skillDirectory, "SKILL.md"), "utf8"));
  const toVersion = parseVersion(
    await readFile(path.join(upstreamSource.directory, "SKILL.md"), "utf8"),
  );

  const plan = classify(upstream, local, baseline, firstRun);
  const counts = {};
  for (const { action } of plan) counts[action] = (counts[action] ?? 0) + 1;

  process.stdout.write(`frontend-designer ${fromVersion} -> ${toVersion}\n`);
  process.stdout.write(`${apply ? "applying" : "dry run — nothing written"}\n`);
  if (firstRun) {
    process.stdout.write(
      "no baseline manifest yet: any file differing from upstream is reported as a conflict\n",
    );
  }
  process.stdout.write("\n");

  for (const { action, file } of plan) {
    if (action === "same") continue;
    process.stdout.write(`  ${LABELS[action]}  ${file}\n`);
  }

  const summary = Object.entries(counts)
    .map(([action, count]) => `${action} ${count}`)
    .join(", ");
  process.stdout.write(`\n${summary || "nothing to do"}\n`);

  if (!apply) {
    process.stdout.write("\nre-run with --apply to perform it\n");
    process.exit(0);
  }

  for (const { action, file } of plan) {
    const target = path.join(skillDirectory, file);
    if (action === "add" || action === "update") {
      await mkdir(path.dirname(target), { recursive: true });
      await cp(path.join(upstreamSource.directory, file), target);
    } else if (action === "conflict") {
      // Ours stays in place. Theirs lands beside it so the diff is one command
      // away and nobody has to re-clone to see what they would have lost. Only
      // the newest one is worth keeping — an unmerged file would otherwise
      // collect a sidecar per release.
      await dropSidecars(target);
      await cp(path.join(upstreamSource.directory, file), `${target}.upstream-${toVersion}`);
    } else if (action === "remove") {
      await dropSidecars(target);
      await rm(target, { force: true });
    }
  }

  // Record both sides: what upstream shipped, and what is actually on disk. A
  // file with no `upstream` key is a local addition and stays one.
  const installed = await walk(skillDirectory);
  const files = {};
  for (const file of [...installed.keys()].sort()) {
    const shipped = upstream.get(file);
    files[file] = shipped === undefined
      ? { local: installed.get(file) }
      : { local: installed.get(file), upstream: shipped };
  }
  await writeFile(
    path.join(skillDirectory, MANIFEST_NAME),
    `${JSON.stringify(
      { version: toVersion, installedAt: new Date().toISOString(), source: REPOSITORY, files },
      null,
      2,
    )}\n`,
    "utf8",
  );

  const conflicts = plan.filter((entry) => entry.action === "conflict");
  if (conflicts.length > 0) {
    process.stdout.write(
      `\n${conflicts.length} conflict(s) kept as-is. Upstream copies saved as *.upstream-${toVersion} — merge and delete them.\n`,
    );
  }
  process.stdout.write("\ndone\n");
} finally {
  await upstreamSource.cleanup?.();
}
