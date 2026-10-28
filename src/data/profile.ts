/**
 * Editable profile content.
 * Experience, education, and bench skills are placeholders.
 * Do not fill them with guessed employers, schools, or dates.
 * Sources for real rows are named on each item.
 */

export type Skill = {
  name: string;
  short: string;
  pos: string;
  line: 'att' | 'mid' | 'def' | 'gk';
  x: string;
  y: string;
  source: string;
  placeholder?: boolean;
};

export const about = [
  "I'm a web developer specialized in front-end development.",
  "I'm confident I'll bring value to your team. I like teamwork, helping others, and building responsive, user-friendly projects.",
  'I keep learning. Coding has become my biggest passion besides gaming and soccer.',
];

/** Starting XI. Every row is sourced from the old site, the GitHub bio, or a public repo. */
export const startingXi: Skill[] = [
  {
    name: 'TypeScript',
    short: 'TypeScript',
    pos: 'LW',
    line: 'att',
    x: '20%',
    y: '18%',
    source: 'GitHub bio',
  },
  {
    name: 'React',
    short: 'React',
    pos: 'ST',
    line: 'att',
    x: '50%',
    y: '14%',
    source: 'Previous site and GitHub bio',
  },
  {
    name: 'Next.js',
    short: 'Next.js',
    pos: 'RW',
    line: 'att',
    x: '80%',
    y: '18%',
    source: 'commentful README and blog posts',
  },
  {
    name: 'JavaScript',
    short: 'JavaScript',
    pos: 'LCM',
    line: 'mid',
    x: '26%',
    y: '40%',
    source: 'Previous site',
  },
  {
    name: 'AWS',
    short: 'AWS',
    pos: 'CM',
    line: 'mid',
    x: '50%',
    y: '44%',
    source: 'GitHub bio',
  },
  {
    name: 'Jest',
    short: 'Jest',
    pos: 'RCM',
    line: 'mid',
    x: '74%',
    y: '40%',
    source: 'Previous site',
  },
  {
    name: 'HTML5',
    short: 'HTML',
    pos: 'LB',
    line: 'def',
    x: '14%',
    y: '66%',
    source: 'Previous site',
  },
  {
    name: 'CSS3',
    short: 'CSS',
    pos: 'LCB',
    line: 'def',
    x: '38%',
    y: '70%',
    source: 'Previous site',
  },
  {
    name: 'React Testing Library',
    short: 'Testing Lib',
    pos: 'RCB',
    line: 'def',
    x: '62%',
    y: '70%',
    source: 'Previous site',
  },
  {
    name: 'Bootstrap',
    short: 'Bootstrap',
    pos: 'RB',
    line: 'def',
    x: '86%',
    y: '66%',
    source: 'Previous site',
  },
  {
    name: 'Git',
    short: 'Git',
    pos: 'GK',
    line: 'gk',
    x: '50%',
    y: '88%',
    source: 'Previous site',
  },
];

export const bench: Skill[] = [
  {
    name: 'TODO(content): skill from LinkedIn',
    short: 'Open slot',
    pos: 'SUB',
    line: 'mid',
    x: '0',
    y: '0',
    source: 'Not on file',
    placeholder: true,
  },
  {
    name: 'TODO(content): skill from LinkedIn',
    short: 'Open slot',
    pos: 'SUB',
    line: 'mid',
    x: '0',
    y: '0',
    source: 'Not on file',
    placeholder: true,
  },
  {
    name: 'TODO(content): skill from LinkedIn',
    short: 'Open slot',
    pos: 'SUB',
    line: 'mid',
    x: '0',
    y: '0',
    source: 'Not on file',
    placeholder: true,
  },
];

export type TimelineSlot = {
  id: string;
  placeholder: true;
  slot: string;
  title: string;
  place: string;
  season: string;
  detail: string;
  note: string;
};

export const experience: TimelineSlot[] = [
  {
    id: 'exp-slot-1',
    placeholder: true,
    slot: '01',
    title: 'Role not on file',
    place: 'Employer not on file',
    season: 'Dates not on file',
    detail: 'TODO(content)',
    note: 'LinkedIn could not be read for this build. This is an empty slot, not a job. Replace it in src/data/profile.ts.',
  },
  {
    id: 'exp-slot-2',
    placeholder: true,
    slot: '02',
    title: 'Role not on file',
    place: 'Employer not on file',
    season: 'Dates not on file',
    detail: 'TODO(content)',
    note: 'LinkedIn could not be read for this build. This is an empty slot, not a job. Replace it in src/data/profile.ts.',
  },
  {
    id: 'exp-slot-3',
    placeholder: true,
    slot: '03',
    title: 'Role not on file',
    place: 'Employer not on file',
    season: 'Dates not on file',
    detail: 'TODO(content)',
    note: 'LinkedIn could not be read for this build. This is an empty slot, not a job. Replace it in src/data/profile.ts.',
  },
];

export const education: TimelineSlot[] = [
  {
    id: 'edu-slot-1',
    placeholder: true,
    slot: 'ED',
    title: 'Program not on file',
    place: 'School not on file',
    season: 'Dates not on file',
    detail: 'TODO(content)',
    note: 'The essay “From College Dropout to My First Year as a Software Developer” talks about leaving college. School, program, and dates are not entered here. This is an empty slot, not a credential.',
  },
];

export const onTheRecord = [
  {
    href: '/blog/from-college-dropout-to-my-first-year-as-a-software-developer',
    title: 'From College Dropout to My First Year as a Software Developer',
    meta: 'Essay · 24 Jan 2023',
  },
  {
    href: '/blog/dev-retro-2022-my-journey-as-a-developer',
    title: 'Dev Retro 2022 — My Journey as a Developer',
    meta: 'Essay · 22 Dec 2022',
  },
];
