import type { QuestionTree } from "@/types/post-job";

/**
 * Eagerly import every JSON file from `src/data/post-job/`
 * using Vite's `import.meta.glob` in eager mode so they're bundled.
 */
const modules = import.meta.glob<QuestionTree>("../data/post-job/*.json", {
  eager: true,
});

/**
 * Build a slug → QuestionTree map at module evaluation time.
 *
 * File: `../../data/post-job/handyman.json` → key `handyman`
 */
const treeBySlug: Record<string, QuestionTree> = {};

for (const [path, mod] of Object.entries(modules)) {
  const match = path.match(/\/([^/]+)\.json$/);
  if (match) {
    treeBySlug[match[1]] = mod;
  }
}

/**
 * Look up a question tree by category slug.
 * Returns `undefined` if no matching JSON exists.
 */
export function loadQuestionTree(slug: string): QuestionTree | undefined {
  return treeBySlug[slug];
}

/** All available category slugs (derived from the JSON filenames). */
export const availableSlugs = Object.keys(treeBySlug);
