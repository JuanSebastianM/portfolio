/**
 * Fails the build if the old publishing platform name appears under src/.
 * docs/DECISIONS.md may still record that the name was dropped.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const textExt = /\.(astro|ts|tsx|js|mjs|css|md|yml|yaml|html|svg)$/;

async function walk(dir, files) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (textExt.test(entry.name)) files.push(full);
  }
}

const files = [];
await walk(path.join(root, 'src'), files);

const hits = [];
for (const file of files) {
  const text = await readFile(file, 'utf8');
  if (text.toLowerCase().includes('hashnode')) hits.push(path.relative(root, file));
}

if (hits.length > 0) {
  console.error('The string "hashnode" is not allowed under src/:');
  for (const hit of hits) console.error(`  ${hit}`);
  process.exit(1);
}
