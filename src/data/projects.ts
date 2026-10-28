/**
 * Projects drawn from the public GitHub snapshot in repos.json (2026-10-28)
 * and from links on the previous portfolio (index.html).
 * Summaries only state what those sources say.
 */

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  role: string;
  language: string;
  links: ProjectLink[];
  image?: string;
  imageAlt?: string;
  stars?: number;
  pushed?: string;
  featured: boolean;
};

export const githubSnapshot = '2026-10-28';

export const projects: Project[] = [
  {
    slug: 'commentful',
    name: 'commentful',
    role: 'Original',
    language: 'TypeScript',
    featured: true,
    stars: 1,
    pushed: '2024-04-20',
    summary:
      'Next.js and TypeScript repository. Public pull requests add drafts, collaborators, a share dialog, and tRPC routes. The README is still the create-next-app starter, so this summary is taken from those pull request titles.',
    links: [
      { label: 'Code', href: 'https://github.com/JuanSebastianM/commentful' },
      { label: 'Pull requests', href: 'https://github.com/JuanSebastianM/commentful/pulls?q=is%3Apr+author%3AJuanSebastianM' },
    ],
  },
  {
    slug: 'todo',
    name: 'To-do',
    role: 'Original',
    language: 'TypeScript',
    featured: true,
    stars: 1,
    pushed: '2024-02-02',
    summary:
      'Public TypeScript front end, deployed on Vercel, and a separate TypeScript API repository. A July 2023 essay on this site walks through a GraphQL to-do stack.',
    links: [
      { label: 'Live', href: 'https://todo-frontend-sage.vercel.app' },
      { label: 'Front end', href: 'https://github.com/JuanSebastianM/todo-frontend' },
      { label: 'API', href: 'https://github.com/JuanSebastianM/todo-backend' },
    ],
  },
  {
    slug: 'helpafamily',
    name: 'Help a Family',
    role: 'Open source',
    language: 'JavaScript',
    featured: true,
    stars: 1,
    pushed: '2021-10-28',
    image: '/images/projects/helpafamily.webp',
    imageAlt: 'Browser screenshot of Help a Family from the previous portfolio',
    summary:
      'Fork of Margarita Humanitarian Foundation’s app for donated meals, hygiene kits, and other aid. Merged pull requests include DeepSource fixes and a component rename. The previous portfolio listed Juan as a contributor.',
    links: [
      { label: 'Live', href: 'https://helpafamily.margaritahumanitarian.org/' },
      { label: 'Fork', href: 'https://github.com/JuanSebastianM/helpafamily' },
      {
        label: 'Upstream PRs',
        href: 'https://github.com/margaritahumanitarian/helpafamily/pulls?q=is%3Apr+author%3AJuanSebastianM',
      },
    ],
  },
  {
    slug: 'documenso',
    name: 'Documenso',
    role: 'Open source',
    language: 'TypeScript',
    featured: true,
    stars: 0,
    pushed: '2024-03-25',
    summary:
      'Fork of the open-source DocuSign alternative. Merged upstream pull request: sticky behavior for the pricing options container.',
    links: [
      { label: 'Live', href: 'https://documenso.com' },
      { label: 'Fork', href: 'https://github.com/JuanSebastianM/documenso' },
      { label: 'Merged PR', href: 'https://github.com/documenso/documenso/pull/1042' },
    ],
  },
  {
    slug: 'calcom',
    name: 'cal.com',
    role: 'Open source',
    language: 'TypeScript',
    featured: false,
    stars: 0,
    pushed: '2023-10-13',
    summary:
      'Public fork of cal.com. The repository description reads: scheduling infrastructure for absolutely everyone.',
    links: [
      { label: 'Live', href: 'https://cal.com' },
      { label: 'Fork', href: 'https://github.com/JuanSebastianM/cal.com' },
    ],
  },
  {
    slug: 'portfolio-mockup',
    name: 'Portfolio mockup',
    role: 'Original',
    language: 'HTML',
    featured: false,
    stars: 0,
    pushed: '2022-01-07',
    summary: 'Static HTML mockup. Homepage on GitHub points at the Netlify deploy.',
    links: [
      { label: 'Live', href: 'https://portfolio-mockup.netlify.app/' },
      { label: 'Code', href: 'https://github.com/JuanSebastianM/portfolio-mockup' },
    ],
  },
  {
    slug: 'rock-paper-scissors',
    name: 'Rock, Paper, Scissors',
    role: 'Original',
    language: 'JavaScript',
    featured: false,
    stars: 0,
    pushed: '2021-09-05',
    image: '/images/projects/rock.webp',
    imageAlt: 'Screenshot of the Rock, Paper, Scissors page',
    summary: 'Browser game linked from the previous portfolio. The code is on GitHub.',
    links: [
      { label: 'Live', href: 'https://juansebastianm.github.io/rock-paper-scissors/' },
      { label: 'Code', href: 'https://github.com/JuanSebastianM/rock-paper-scissors' },
    ],
  },
  {
    slug: 'lynstore',
    name: 'LynStore',
    role: 'Earlier site',
    language: 'Web',
    featured: false,
    image: '/images/projects/lynstore.webp',
    imageAlt: 'Browser screenshot of LynStore from the previous portfolio',
    summary:
      'Storefront linked from the previous portfolio and published on Netlify. The GitHub repository linked on that site (JuanSebastianM/lynstore) did not resolve on 28 Oct 2026.',
    links: [{ label: 'Live', href: 'https://lynstore.netlify.app/' }],
  },
];

export type OtherRepo = {
  name: string;
  href: string;
  note: string;
};

export const otherRepos: OtherRepo[] = [
  {
    name: 'ATM',
    href: 'https://github.com/JuanSebastianM/ATM',
    note: 'JavaScript. Repository description: “This is a project which includes a virtual ATM.”',
  },
  {
    name: 'Truth-Table',
    href: 'https://github.com/JuanSebastianM/Truth-Table',
    note: 'JavaScript. No repository description in the snapshot.',
  },
  {
    name: 'google-search-results-page',
    href: 'https://github.com/JuanSebastianM/google-search-results-page',
    note: 'HTML. No repository description in the snapshot.',
  },
  {
    name: 'BarranquillaJS official page',
    href: 'https://github.com/barranquillajs/official-page/pull/11',
    note: 'Merged pull request: “feat: add juan mendoza speaker info.”',
  },
  {
    name: 'react-jsx-tag-components',
    href: 'https://github.com/unclebay143/react-jsx-tag-components/pulls?q=is%3Apr+author%3AJuanSebastianM',
    note: 'Merged pull requests adding tag components (anchor, dialog, h3, details).',
  },
];
