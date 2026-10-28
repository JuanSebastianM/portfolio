/**
 * Profile copy sourced from the public LinkedIn export (2026-10-28)
 * and, where noted, the previous site or GitHub.
 * Do not add employers, dates, or duties that are not in those sources.
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
  'I’m a full-stack developer with a strong background in front-end development. I have strong problem-solving skills with TypeScript, React, Redux, Node.js, Express.js, GraphQL, and MongoDB.',
  'I bring my own ideas, and I like developing new features and innovating.',
];

/** Starting XI. Names he has stated publicly on the old site, GitHub, or LinkedIn. */
export const startingXi: Skill[] = [
  {
    name: 'TypeScript',
    short: 'TypeScript',
    pos: 'LW',
    line: 'att',
    x: '22%',
    y: '22%',
    source: 'LinkedIn headline and about',
  },
  {
    name: 'React',
    short: 'React',
    pos: 'ST',
    line: 'att',
    x: '50%',
    y: '18%',
    source: 'LinkedIn headline and about',
  },
  {
    name: 'Next.js',
    short: 'Next.js',
    pos: 'RW',
    line: 'att',
    x: '78%',
    y: '22%',
    source: 'Devsu role on LinkedIn',
  },
  {
    name: 'JavaScript',
    short: 'JavaScript',
    pos: 'LCM',
    line: 'mid',
    x: '26%',
    y: '40%',
    source: 'LinkedIn skills',
  },
  {
    name: 'AWS',
    short: 'AWS',
    pos: 'CM',
    line: 'mid',
    x: '50%',
    y: '44%',
    source: 'LinkedIn headline',
  },
  {
    name: 'Jest',
    short: 'Jest',
    pos: 'RCM',
    line: 'mid',
    x: '74%',
    y: '40%',
    source: 'Devsu role on LinkedIn',
  },
  {
    name: 'HTML',
    short: 'HTML',
    pos: 'LB',
    line: 'def',
    x: '14%',
    y: '66%',
    source: 'LinkedIn skills',
  },
  {
    name: 'CSS',
    short: 'CSS',
    pos: 'LCB',
    line: 'def',
    x: '38%',
    y: '70%',
    source: 'LinkedIn skills',
  },
  {
    name: 'React Testing Library',
    short: 'Testing Lib',
    pos: 'RCB',
    line: 'def',
    x: '62%',
    y: '70%',
    source: 'Devsu role on LinkedIn',
  },
  {
    name: 'Bootstrap',
    short: 'Bootstrap',
    pos: 'RB',
    line: 'def',
    x: '86%',
    y: '66%',
    source: 'LinkedIn skills',
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

/** Three more skills from the LinkedIn list. SASS is also listed and is not shown here. */
export const bench: Skill[] = [
  {
    name: 'Accessibility',
    short: 'Accessibility',
    pos: 'SUB',
    line: 'mid',
    x: '0',
    y: '0',
    source: 'LinkedIn skills. The Margarita volunteering line is about accessibility fixes.',
  },
  {
    name: 'Redux',
    short: 'Redux',
    pos: 'SUB',
    line: 'mid',
    x: '0',
    y: '0',
    source: 'LinkedIn about and the Devsu role',
  },
  {
    name: 'Responsive Web Design',
    short: 'Responsive',
    pos: 'SUB',
    line: 'mid',
    x: '0',
    y: '0',
    source: 'LinkedIn skills and the freeCodeCamp certificate',
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
    summary:
      'LinkedIn lists the title and the dates, and no description. The headline names React, TypeScript, AWS, and Node.js. Those are not written as duties of this role.',
  },
  {
    id: 'godaddy-ii',
    slot: '02',
    title: 'Software Engineer II',
    org: 'GoDaddy',
    season: 'May 2024 – Apr 2026',
    meta: 'Full-time · Remote · Colombia',
    kind: 'job',
    summary:
      'LinkedIn lists the title and the dates, and no description. Same headline stack: React, TypeScript, AWS, and Node.js.',
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
          'Private web app, Supernotariado y Registro. LinkedIn says Kushki runs it. The certificates record property owners and their legal supports. kushkipagos.com is the company site, not the app.',
        href: 'https://kushkipagos.com/en/',
        hrefLabel: 'Kushki',
      },
      {
        name: 'Prefectura de Pichincha',
        detail:
          'A platform that helps the Government of Pichincha Province collect taxes in order to maintain road infrastructure. No public URL is on the LinkedIn profile.',
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
      'Developed and released a website with React and styled-components for a local business. LinkedIn says it decreased the administrators’ daily workload.',
    ],
    projects: [
      {
        name: 'LynStore',
        detail: 'The live site linked from that freelance role.',
        href: 'https://lynstore.netlify.app/',
        hrefLabel: 'Live site',
      },
    ],
  },
  {
    id: 'margarita',
    slot: '05',
    title: 'Frontend Developer',
    org: 'Margarita Humanitarian Foundation',
    season: 'Oct 2021',
    meta: 'Volunteering · 1 mo · Social services',
    kind: 'volunteer',
    summary:
      'Fixed accessibility issues and removed bug risks with React and Next.js.',
    projects: [
      {
        name: 'Help a Family',
        detail: 'The public repository for that work.',
        href: 'https://github.com/JuanSebastianM/helpafamily',
        hrefLabel: 'Repository',
      },
    ],
  },
];

export const education = {
  school: 'Institución Educativa Simón Araújo',
  credential: 'High School Diploma',
  season: 'Feb 2011 – Nov 2016',
  note: 'LinkedIn lists this diploma and no other credential. The college-dropout essay is a personal story, not a second diploma.',
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
    meta: 'Essay · featured on LinkedIn',
  },
  {
    href: '/blog/detecting-changes-in-html-attributes-with-javascript-mutation-observer',
    title: 'Detecting Changes in HTML Attributes with JavaScript Mutation Observer',
    meta: 'Essay · featured on LinkedIn',
  },
  {
    href: '/blog/dev-retro-2022-my-journey-as-a-developer',
    title: 'First talk at BarranquillaJS',
    meta: 'Self-taught programming, in English and Spanish. The write-up is in the 2022 retro. LinkedIn does not include a recording.',
  },
  {
    href: '/blog/dealing-with-debugging-7-techniques-you-should-know',
    title: 'Dealing with Debugging: 7 Techniques You Should Know',
    meta: 'Essay · featured on LinkedIn',
  },
  {
    href: '/blog/understanding-hooks-usestate-and-useeffect-basics',
    title: 'Understanding Hooks: useState and useEffect',
    meta: 'Essay · featured on LinkedIn',
  },
];
