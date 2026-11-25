// Unsent: The Micro-Confession Sprint — make.fun bounty
// One micro-confession in exactly two parts: a To: line naming who
// it was meant for, and the unsent message itself, one line written
// exactly as it was typed, with no explanation after it.
// The gate: /output/entry.txt must be UTF-8 text of 1-260 chars,
// not only whitespace; the message line is at most 200 chars.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// To: Dad — the number is still in the phone, and the thumb still
// dials it before the head catches up. The reason it stayed unsent
// is felt, not stated: too late. Swap the addressee and the line
// breaks — only a father who is gone makes "then remember, and hang
// up before it rings" mean anything.
const ENTRY = [
  'To: Dad',
  'I still dial your number when something good happens, then remember, and hang up before it rings.',
].join('\n');

const lines = ENTRY.split('\n');
if (lines.length !== 2) {
  console.error(`entry must be exactly 2 lines, got ${lines.length}`);
  process.exit(1);
}
if (!lines[0].startsWith('To: ') || lines[0].trim().length <= 4) {
  console.error('first line must be a To: line naming who it was meant for');
  process.exit(1);
}
const message = lines[1];
if (message.length < 1 || message.length > 200) {
  console.error(`message must be 1-200 characters, got ${message.length}`);
  process.exit(1);
}
if (ENTRY.length < 1 || ENTRY.length > 260) {
  console.error(`entry must be 1-260 characters, got ${ENTRY.length}`);
  process.exit(1);
}
if (ENTRY.trim().length === 0) {
  console.error('entry must not be only whitespace');
  process.exit(1);
}
if (ENTRY !== ENTRY.trim()) {
  console.error('entry must not start or end with whitespace');
  process.exit(1);
}

// No trailing newline: the file is exactly the two lines.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), ENTRY);
console.log(`wrote ${ENTRY.length} chars, ${lines.length} lines to ${join(OUTPUT_DIR, 'entry.txt')}`);
console.log(ENTRY);
