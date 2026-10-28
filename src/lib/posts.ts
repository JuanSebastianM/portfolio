import { getCollection, type CollectionEntry } from 'astro:content';

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: 'career',
    name: 'Career',
    description: 'Personal notes on learning and the first years of writing software.',
  },
  {
    slug: 'open-source',
    name: 'Open source',
    description: 'Stories about contributing to other people’s projects.',
  },
  {
    slug: 'full-stack',
    name: 'Full-stack',
    description: 'GraphQL, data, and app-building notes.',
  },
  {
    slug: 'testing',
    name: 'Testing',
    description: 'Jest and unit testing.',
  },
  {
    slug: 'react',
    name: 'React',
    description: 'Hooks, routing, and interface posts.',
  },
  {
    slug: 'javascript',
    name: 'JavaScript',
    description: 'Language, debugging, and DOM posts.',
  },
  {
    slug: 'notes',
    name: 'Notes',
    description: 'Posts that do not match a mapped tag yet.',
  },
];

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

/**
 * First matching rule wins. Career and open-source tags are checked before
 * broader ones such as reactjs or javascript, which show up on those essays too.
 */
const rules: { slug: string; tags: string[] }[] = [
  { slug: 'career', tags: ['college', 'meetup'] },
  { slug: 'open-source', tags: ['hacktoberfest', 'opensource'] },
  { slug: 'full-stack', tags: ['graphql', 'mongodb', 'nextauthjs'] },
  { slug: 'testing', tags: ['jest', 'unit-testing', 'testing'] },
  { slug: 'react', tags: ['reactjs', 'reacthooks', 'react-router'] },
  { slug: 'javascript', tags: ['mutationobserver', 'debugging', 'javascript', 'css', 'html5'] },
];

export function categoryFor(tags: string[]): Category {
  const set = new Set(tags);
  for (const rule of rules) {
    if (rule.tags.some((tag) => set.has(tag))) {
      return categoryBySlug.get(rule.slug) ?? categories[categories.length - 1];
    }
  }
  return categoryBySlug.get('notes') ?? categories[categories.length - 1];
}

export function readingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function excerptFrom(markdown: string, words = 32): string {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const parts = plain.split(' ').filter(Boolean);
  if (parts.length <= words) return parts.join(' ');
  return `${parts.slice(0, words).join(' ')}…`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export type PostEntry = CollectionEntry<'blog'>;

export type PostView = PostEntry & {
  category: Category;
  minutes: number;
  excerpt: string;
};

export async function getPosts(): Promise<PostView[]> {
  const posts = await getCollection('blog');
  return posts
    .map((post) => {
      const body = post.body ?? '';
      return {
        ...post,
        category: categoryFor(post.data.tags),
        minutes: readingMinutes(body),
        excerpt: post.data.subtitle?.trim() || excerptFrom(body),
      };
    })
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function tagHref(tag: string): string {
  return `/blog/tag/${encodeURIComponent(tag)}`;
}
