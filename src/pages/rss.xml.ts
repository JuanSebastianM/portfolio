import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { identity, siteUrl } from '../data/site';
import { getPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${identity.name} — essays`,
    description: identity.description,
    site: context.site ?? siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.excerpt,
      pubDate: post.data.date,
      link: `/blog/${post.data.slug}`,
      categories: [post.category.name, ...post.data.tags],
    })),
    customData: '<language>en-us</language>',
  });
}
