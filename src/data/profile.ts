/**
 * Editable profile copy. Sourcing lives in docs/, not in these strings.
 */

export type Skill = {
  name: string;
  short: string;
  pos: string;
  line: 'att' | 'mid' | 'def' | 'gk';
  x: string;
  y: string;
  placeholder?: boolean;
};

export const about = [
  'I’m a full-stack developer with a front-end background and strong problem-solving skills in TypeScript, React, Redux, Node.js, Express.js, GraphQL, and MongoDB.',
];

/**
 * AI copy. The tools and the six uses are Juan’s own list (docs/Claude - DECISIONS.md, “AI copy”).
 * The wording around them is a suggestion he can rewrite.
 */
export const ai = {
  kicker: 'AI in the loop',
  lede: 'I build with AI in the loop, from the first plan to the last refactor.',
  title: 'The assistant coach.',
  intro:
    'AI is part of how I work every day, not a side experiment. I reach for whichever model fits the job.',
  tools: ['Claude', 'ChatGPT', 'Gemini', 'Grok'],
  uses: [
    { label: 'Plan', detail: 'Architecture options and trade-offs before any code.' },
    { label: 'Build', detail: 'Writing new code and refactoring old code.' },
    { label: 'Debug', detail: 'Tracing bugs and reading unfamiliar codebases.' },
    { label: 'Learn', detail: 'Ramping up on new tech.' },
    { label: 'Automate', detail: 'Bots and scripts for repetitive work.' },
    { label: 'Write', detail: 'Docs and content.' },
  ],
};

/** Starting XI. */
export const startingXi: Skill[] = [
  {
    name: 'TypeScript',
    short: 'TypeScript',
    pos: 'LW',
    line: 'att',
    x: '22%',
    y: '22%',
  },
  {
    name: 'React',
    short: 'React',
    pos: 'ST',
    line: 'att',
    x: '50%',
    y: '18%',
  },
  {
    name: 'Next.js',
    short: 'Next.js',
    pos: 'RW',
    line: 'att',
    x: '78%',
    y: '22%',
  },
  {
    name: 'JavaScript',
    short: 'JavaScript',
    pos: 'LCM',
    line: 'mid',
    x: '26%',
    y: '40%',
  },
  {
    name: 'AWS',
    short: 'AWS',
    pos: 'CM',
    line: 'mid',
    x: '50%',
    y: '44%',
  },
  {
    name: 'Jest',
    short: 'Jest',
    pos: 'RCM',
    line: 'mid',
    x: '74%',
    y: '40%',
  },
  {
    name: 'HTML',
    short: 'HTML',
    pos: 'LB',
    line: 'def',
    x: '14%',
    y: '66%',
  },
  {
    name: 'CSS',
    short: 'CSS',
    pos: 'LCB',
    line: 'def',
    x: '38%',
    y: '70%',
  },
  {
    name: 'React Testing Library',
    short: 'Testing Lib',
    pos: 'RCB',
    line: 'def',
    x: '62%',
    y: '70%',
  },
  {
    name: 'Bootstrap',
    short: 'Bootstrap',
    pos: 'RB',
    line: 'def',
    x: '86%',
    y: '66%',
  },
  {
    name: 'Git',
    short: 'Git',
    pos: 'GK',
    line: 'gk',
    x: '50%',
    y: '88%',
  },
];

export const bench: Skill[] = [
  {
    name: 'Accessibility',
    short: 'Accessibility',
    pos: 'SUB',
    line: 'mid',
    x: '0',
    y: '0',
  },
  {
    name: 'Redux',
    short: 'Redux',
    pos: 'SUB',
    line: 'mid',
    x: '0',
    y: '0',
  },
  {
    name: 'Responsive Web Design',
    short: 'Responsive',
    pos: 'SUB',
    line: 'mid',
    x: '0',
    y: '0',
  },
];

export type ExperienceProject = {
  name: string;
  detail: string;
  href?: string;
  hrefLabel?: string;
};

export type ExperienceItem = {
  id: string;
  slot: string;
  title: string;
  org: string;
  season: string;
  meta: string;
  kind: 'job' | 'volunteer';
  summary?: string;
  bullets?: string[];
  projects?: ExperienceProject[];
};

export const experience: ExperienceItem[] = [
  {
    id: 'godaddy-senior',
    slot: '01',
    title: 'Senior Software Engineer',
    org: 'GoDaddy',
    season: 'Apr 2026 – present',
    meta: 'Full-time · Remote · Colombia',
    kind: 'job',
    summary: 'Remote, Colombia. React, TypeScript, AWS, and Node.js.',
  },
  {
    id: 'godaddy-ii',
    slot: '02',
    title: 'Software Engineer II',
    org: 'GoDaddy',
    season: 'May 2024 – Apr 2026',
    meta: 'Full-time · Remote · Colombia',
    kind: 'job',
    summary: 'Remote, Colombia. React, TypeScript, AWS, and Node.js.',
  },
  {
    id: 'devsu',
    slot: '03',
    title: 'Software Developer',
    org: 'Devsu',
    season: 'Jan 2022 – Mar 2024',
    meta: 'Full-time · 2 yrs 3 mos',
    kind: 'job',
    bullets: [
      'Worked with a team of engineers on high-quality software through test-driven development and Agile practices.',
      'Wrote unit tests with Jest, React Testing Library, Enzyme, and Mocha, achieving 100% coverage for every component or service.',
      'Fixed bugs in direct contact with the QA team.',
      'Refactored old code toward clean-code principles.',
      'Worked on the Prefectura de Pichincha web app, front end (Next.js, TypeScript, Redux Toolkit) and back end (Go, AWS).',
      'Worked on the Certificado de tradición y libertad web app, front end (Next.js, TypeScript, Material UI, Redux Toolkit) and back end (Node.js, AWS).',
      'Led responsive email templates for email clients in Salesforce Marketing Cloud, with HTML and CSS.',
    ],
    projects: [
      {
        name: 'Certificado de tradición y libertad',
        detail:
          'Private web app for Supernotariado y Registro, run by Kushki. The certificates record property owners and their legal supports.',
        href: 'https://kushkipagos.com/en/',
        hrefLabel: 'Kushki',
      },
      {
        name: 'Prefectura de Pichincha',
        detail:
          'A platform that helps the Government of Pichincha Province collect taxes in order to maintain road infrastructure.',
      },
    ],
  },
  {
    id: 'freelance',
    slot: '04',
    title: 'Frontend Developer',
    org: 'Freelance',
    season: 'Oct 2021 – Jan 2022',
    meta: 'Full-time · Colombia · 4 mos',
    kind: 'job',
    bullets: [
      'Developed and released a website with React and styled-components for a local business. It decreased the administrators’ daily workload.',
    ],
    projects: [
      {
        name: 'LynStore',
        detail: 'Live site for that local business.',
        href: 'https://lynstore.netlify.app/',
        hrefLabel: 'Live site',
      },
    ],
  },
];

export const education = {
  school: 'Institución Educativa Simón Araújo',
  credential: 'High School Diploma',
  season: 'Feb 2011 – Nov 2016',
  note: '',
  essayHref: '/blog/from-college-dropout-to-my-first-year-as-a-software-developer',
  essayTitle: 'From College Dropout to My First Year as a Software Developer',
};

export type Certification = {
  name: string;
  issuer: string;
  issued: string;
  expired?: string;
};

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issued: 'Nov 2022',
    expired: 'Nov 2025',
  },
  {
    name: 'Scrum Foundation Professional Certificate (SFPC)',
    issuer: 'Certiprof',
    issued: 'Feb 2022',
  },
  {
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    issued: 'Jul 2021',
  },
  {
    name: 'Curso Gratis de Programación Básica',
    issuer: 'Platzi',
    issued: 'Jun 2021',
  },
];

export const featured = [
  {
    href: '/blog/build-a-full-stack-crud-app-with-graphql-mongodb-nextjs-nextauth-and-typescript',
    title: 'Build a Full Stack CRUD App With GraphQL, MongoDB, Next.js, NextAuth, and TypeScript',
    meta: 'Essay',
  },
  {
    href: '/blog/detecting-changes-in-html-attributes-with-javascript-mutation-observer',
    title: 'Detecting Changes in HTML Attributes with JavaScript Mutation Observer',
    meta: 'Essay',
  },
  {
    href: '/blog/dev-retro-2022-my-journey-as-a-developer',
    title: 'First talk at BarranquillaJS',
    meta: 'Self-taught programming, in English and Spanish.',
  },
  {
    href: '/blog/dealing-with-debugging-7-techniques-you-should-know',
    title: 'Dealing with Debugging: 7 Techniques You Should Know',
    meta: 'Essay',
  },
  {
    href: '/blog/understanding-hooks-usestate-and-useeffect-basics',
    title: 'Understanding Hooks: useState and useEffect',
    meta: 'Essay',
  },
];
