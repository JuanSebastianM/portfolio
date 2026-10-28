/**
 * One-shot localizer for the Hashnode export.
 * Reads markdown from CONTENT_SRC (default /tmp/blog-posts/blog),
 * downloads cdn.hashnode.com images, writes WebP files, and rewrites
 * the posts into src/content/blog so the site does not depend on Hashnode.
 *
 * Safe to re-run. Existing optimized images are reused.
 */
import { mkdir, readdir, readFile, writeFile, copyFile, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const sourceDir = process.env.CONTENT_SRC ?? '/tmp/blog-posts/blog';
const postsDir = path.join(root, 'src/content/blog');
const imageDir = path.join(root, 'public/images/blog');
const projectDir = path.join(root, 'public/images/projects');
const publicImages = path.join(root, 'public/images');

const HASHNODE = /https:\/\/cdn\.hashnode\.com\/[^\s)"']+/g;

const projectShots = [
  {
    name: 'rock.webp',
    file: path.join(root, 'images/rock.png'),
  },
  {
    name: 'lynstore.webp',
    url: 'https://res.cloudinary.com/dmhhz7iam/image/upload/v1641400112/LynStore_and_6_more_pages_-_Personal_-_Microsoft_Edge_5_01_2022_11_15_35_a._m._fjmrcm.png',
  },
  {
    name: 'helpafamily.webp',
    url: 'https://res.cloudinary.com/dmhhz7iam/image/upload/v1641400519/Help_a_Family_in_Need_and_7_more_pages_-_Personal_-_Microsoft_Edge_5_01_2022_11_32_55_a._m._ufq5ov.png',
  },
];

function fileForUrl(url) {
  const clean = url.split('?')[0];
  const base = path.basename(clean).replace(/\.(png|jpe?g|gif|webp)$/i, '');
  return `${base}.webp`;
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function toWebp(input, dest) {
  await sharp(input)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(dest);
}

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

function labelEmbed(url) {
  if (/twitter\.com|x\.com/.test(url)) return 'View the original post on X';
  if (/vimeo\.com/.test(url)) return 'Watch the original video on Vimeo';
  if (/linkedin\.com/.test(url)) return 'View the original post on LinkedIn';
  if (/credly\.com/.test(url)) return 'View the original badge on Credly';
  return 'Open the original embed';
}

function rewriteBody(markdown, urlMap) {
  let text = markdown.replace(/\r\n/g, '\n');
  text = text.replace(HASHNODE, (url) => urlMap.get(url.split('?')[0]) ?? url);
  text = text.replace(
    /https:\/\/juansebastian\.hashnode\.dev\/([a-z0-9-]+)\/?/g,
    '/blog/$1',
  );
  text = text.replace(/^[ \t]*%\[(https?:\/\/[^\]]+)\][ \t]*$/gm, (_match, url) => {
    return `<p><a href="${url}">${labelEmbed(url)}</a></p>`;
  });
  return text;
}

async function main() {
  await mkdir(postsDir, { recursive: true });
  await mkdir(imageDir, { recursive: true });
  await mkdir(projectDir, { recursive: true });
  await mkdir(publicImages, { recursive: true });
  await mkdir(path.join(root, 'public/images/uploads'), { recursive: true });

  const files = (await readdir(sourceDir)).filter((name) => name.endsWith('.md'));
  const urls = new Set();
  const raw = new Map();

  for (const file of files) {
    const markdown = await readFile(path.join(sourceDir, file), 'utf8');
    raw.set(file, markdown);
    for (const match of markdown.matchAll(HASHNODE)) {
      urls.add(match[0].split('?')[0]);
    }
  }

  const urlMap = new Map();
  let downloaded = 0;
  for (const url of urls) {
    const filename = fileForUrl(url);
    const dest = path.join(imageDir, filename);
    urlMap.set(url, `/images/blog/${filename}`);
    if (await exists(dest)) continue;
    const buffer = await download(url);
    await toWebp(buffer, dest);
    downloaded += 1;
    process.stdout.write(`image ${filename}\n`);
  }

  for (const file of files) {
    const next = rewriteBody(raw.get(file), urlMap);
    if (next.includes('cdn.hashnode.com')) {
      throw new Error(`Hashnode URL remains in ${file}`);
    }
    await writeFile(path.join(postsDir, file), next);
  }

  for (const shot of projectShots) {
    const dest = path.join(projectDir, shot.name);
    if (await exists(dest)) continue;
    try {
      const input = shot.file ? await readFile(shot.file) : await download(shot.url);
      await toWebp(input, dest);
      process.stdout.write(`project ${shot.name}\n`);
    } catch (error) {
      process.stderr.write(`skip ${shot.name}: ${error.message}\n`);
    }
  }

  const profileSrc = path.join(root, 'images/profile.jpg');
  if (await exists(profileSrc)) {
    await copyFile(profileSrc, path.join(publicImages, 'profile.jpg'));
  }

  process.stdout.write(`posts ${files.length}, new images ${downloaded}, mapped ${urlMap.size}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
