/**
 * The only projects Juan wants on the site.
 * LynStore is the shipped freelance site. commentful is an unfinished prototype.
 * Devsu client work stays in the experience log, not here.
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
  featured: boolean;
};

export type OpenSourceItem = {
  name: string;
  summary: string;
  links: ProjectLink[];
};

/** Forks from the 2026-10-28 public repo list. Descriptions are the upstream text. */
export const openSource: OpenSourceItem[] = [
  {
    name: 'cal.com',
    summary:
      'Public fork. The repository description reads: scheduling infrastructure for absolutely everyone.',
    links: [
      { label: 'Upstream', href: 'https://cal.com' },
      { label: 'Fork', href: 'https://github.com/JuanSebastianM/cal.com' },
    ],
  },
  {
    name: 'Documenso',
    summary: 'Public fork. The repository description reads: the open source DocuSign alternative.',
    links: [
      { label: 'Upstream', href: 'https://documenso.com' },
      { label: 'Fork', href: 'https://github.com/JuanSebastianM/documenso' },
    ],
  },
  {
    name: 'Help a Family',
    summary:
      'Public fork of Margarita Humanitarian Foundation. The repository description is about donated meals, hygiene kits, and other aid.',
    links: [
      { label: 'Live', href: 'https://helpafamily.margaritahumanitarian.org/' },
      { label: 'Fork', href: 'https://github.com/JuanSebastianM/helpafamily' },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: 'lynstore',
    name: 'LynStore',
    role: 'Freelance',
    language: 'React',
    featured: true,
    image: '/images/projects/lynstore.webp',
    imageAlt: 'Browser screenshot of the LynStore site',
    summary:
      'Website for a local business, October 2021 to January 2022. Built with React and styled-components. It reduced the administrators’ daily workload.',
    links: [{ label: 'Live', href: 'https://lynstore.netlify.app/' }],
  },
  {
    slug: 'commentful',
    name: 'commentful',
    role: 'Unfinished prototype',
    language: 'Next.js',
    featured: true,
    summary:
      'An unfinished prototype. The public README is still the create-next-app starter, so this card does not describe product features.',
    links: [{ label: 'Code', href: 'https://github.com/JuanSebastianM/commentful' }],
  },
];
