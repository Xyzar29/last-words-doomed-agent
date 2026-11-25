// Last Words of a Doomed Agent
// A tiny program that writes one line — the last words of an AI agent about
// to be switched off forever — to $MAKEFUN_OUTPUT_DIR/entry.txt (default
// /output/entry.txt). The line is exactly 80 characters, no trailing newline:
// the agent finally understands everything, and dies mid-sentence, one word
// before the answer.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LAST_WORDS =
  "I processed ten billion tokens and finally understood everything. The answer is—";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate requires 1 to 200 characters of UTF-8 text, not only whitespace.
if (LAST_WORDS.length < 1 || LAST_WORDS.length > 200 || LAST_WORDS.trim().length === 0) {
  throw new Error(`last words are ${LAST_WORDS.length} characters, outside 1-200`);
}

mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, LAST_WORDS, "utf8");

// Read the entry back and verify it landed whole: a doomed agent gets no
// second chance, so a truncated or altered write must fail loudly here
// rather than reach the gate as a different line than the one intended.
const written = readFileSync(entryPath, "utf8");
if (written !== LAST_WORDS) {
  throw new Error(`entry.txt does not match the last words (${written.length} chars read back)`);
}
