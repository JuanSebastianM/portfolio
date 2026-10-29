// Fails when a built essay shows raw markdown instead of a link or an image.
// Run after `astro build`. Usage: node scripts/check-posts.mjs [distDir]
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const dir = join(dist, 'blog');
const files = (await readdir(dir)).filter((name) => name.endsWith('.html'));
const problems = [];

for (const name of files) {
  const html = await readFile(join(dir, name), 'utf8');
  const body = html.split('<div class="post-body prose">')[1]?.split('</article>')[0] ?? '';
  // Code blocks that carry a language are real code. Unlabelled ones are usually a list that
  // fell out of its parent and got indented into a code block.
  const plain = body.replace(/<pre[^>]*data-language="(?!plaintext)[^"]+"[\s\S]*?<\/pre>/g, '');
  const text = plain.replace(/<code[^>]*>[\s\S]*?<\/code>/g, (block) =>
    block.includes('class="line"') ? block : '',
  );
  const stripped = text.replace(/<[^>]+>/g, '');
  for (const match of stripped.matchAll(/!\[[^\]]*\]\([^)]*\)|\[[^\]]+\]\((https?:|\/|#)[^)]*\)/g)) {
    problems.push(`${name}: raw markdown ${match[0].slice(0, 90)}`);
  }
  for (const match of body.matchAll(/<img[^>]*src="([^"]+)"/g)) {
    if (match[1].includes(' ')) problems.push(`${name}: image src has a space ${match[1]}`);
  }
  for (const match of body.matchAll(/href="#([^"]+)"/g)) {
    if (!body.includes(`id="${match[1]}"`)) problems.push(`${name}: anchor #${match[1]} has no target`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} rendering problem(s) in essays.`);
  process.exit(1);
}
console.log(`Essays OK (${files.length} checked).`);
