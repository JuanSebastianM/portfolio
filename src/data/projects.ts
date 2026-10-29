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

export type OpenSourceAction = {
  text: string;
  href: string;
};

export type OpenSourceItem = {
  name: string;
  kind: 'Contribution' | 'Volunteering';
  detail?: string;
  actions: OpenSourceAction[];
};

/** Merged pull requests only. cal.com has a fork and no authored upstream pull request. */
export const openSource: OpenSourceItem[] = [
  {
    name: 'Documenso',
    kind: 'Contribution',
    actions: [
      {
        text: 'Added sticky behavior to the pricing options container.',
        href: 'https://github.com/documenso/documenso/pull/1042',
      },
    ],
  },
  {
    name: 'Help a Family',
    kind: 'Volunteering',
    detail: 'Frontend developer, October 2021. Fixed accessibility issues and removed bug risks with React and Next.js.',
    actions: [
      {
        text: 'Added passHref on Link components and an href on each anchor so Next.js links keep a real href.',
        href: 'https://github.com/margaritahumanitarian/helpafamily/pull/308',
      },
      {
        text: 'Moved toggleTheme below the setThemeColor declaration to avoid a bug risk.',
        href: 'https://github.com/margaritahumanitarian/helpafamily/pull/315',
      },
      {
        text: 'Reapplied the link href fix after an earlier pull request failed the build.',
        href: 'https://github.com/margaritahumanitarian/helpafamily/pull/325',
      },
      {
        text: 'Renamed DoctorsAsVolunteers.js to DoctorsAsVolunteersCard.js and updated its import.',
        href: 'https://github.com/margaritahumanitarian/helpafamily/pull/326',
      },
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
