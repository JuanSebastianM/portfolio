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
  /** Why this tool fits the position. About the tool, not a skill level. */
  fit?: string;
};

export const about = [
  'I’m a full-stack developer with a front-end background and strong problem-solving skills in TypeScript, React, Redux, Node.js, Express.js, GraphQL, and MongoDB.',
];

/**
 * AI copy. The tools and the six uses are Juan’s own list (docs/DECISIONS.md, “AI copy”).
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

/**
 * What each position does on a real pitch. General soccer knowledge, shown in the lineup popups.
 * `fit` says why a technology suits that spot. It describes the tool, not Juan’s skill level.
 */
export const positions: Record<string, { name: string; role: string }> = {
  ST: {
    name: 'Striker',
    role: 'The focal point of the attack. Holds the ball up, finishes chances, and is judged on goals.',
  },
  LW: {
    name: 'Left winger',
    role: 'Stretches the defense wide on the left, beats a full-back one on one, and cuts inside to shoot or cross.',
  },
  RW: {
    name: 'Right winger',
    role: 'The same job on the right: pace and width, crosses, and runs in behind.',
  },
  CM: {
    name: 'Central midfielder',
    role: 'The engine. Links defense to attack, sets the tempo, and covers ground in both directions.',
  },
  LCM: {
    name: 'Left central midfielder',
    role: 'Shares the middle of the park. Carries the ball forward and supports the left side.',
  },
  RCM: {
    name: 'Right central midfielder',
    role: 'Shares the middle on the right. Wins the ball back and keeps possession ticking.',
  },
  LB: {
    name: 'Left back',
    role: 'Defends the left flank, then overlaps to give the attack width.',
  },
  RB: {
    name: 'Right back',
    role: 'Defends the right flank and joins the attack when there is space.',
  },
  LCB: {
    name: 'Left center back',
    role: 'Wins headers and tackles in the middle of the back line and starts play from deep.',
  },
  RCB: {
    name: 'Right center back',
    role: 'The other half of the central pairing. Reads danger early and keeps the line organized.',
  },
  GK: {
    name: 'Goalkeeper',
    role: 'The last line of defense. Stops shots, commands the box, and starts attacks with the first pass.',
  },
  SUB: {
    name: 'Substitute',
    role: 'Fresh legs from the bench. Comes on to change the game or close it out.',
  },
};

/** Starting XI. */
export const startingXi: Skill[] = [
  {
    name: 'TypeScript',
    fit: 'Gets past bugs before they reach the box. Types catch them at compile time.',
    short: 'TypeScript',
    pos: 'LW',
    line: 'att',
    x: '22%',
    y: '22%',
  },
  {
    name: 'React',
    fit: 'The one everything is built around. Most of the UI work ends with it.',
    short: 'React',
    pos: 'ST',
    line: 'att',
    x: '50%',
    y: '18%',
  },
  {
    name: 'Next.js',
    fit: 'Runs in behind: routing, rendering on the server, and shipping to production.',
    short: 'Next.js',
    pos: 'RW',
    line: 'att',
    x: '78%',
    y: '22%',
  },
  {
    name: 'JavaScript',
    fit: 'Carries everything forward. Every other tool on this pitch compiles to it or runs on it.',
    short: 'JavaScript',
    pos: 'LCM',
    line: 'mid',
    x: '26%',
    y: '40%',
  },
  {
    name: 'AWS',
    fit: 'Connects the back line to the front: hosting, storage, and the services in between.',
    short: 'AWS',
    pos: 'CM',
    line: 'mid',
    x: '50%',
    y: '44%',
  },
  {
    name: 'Jest',
    fit: 'Wins the ball back. Tests catch regressions before they turn into goals against.',
    short: 'Jest',
    pos: 'RCM',
    line: 'mid',
    x: '74%',
    y: '40%',
  },
  {
    name: 'HTML',
    fit: 'Holds the flank. Semantic structure is the base every page builds on.',
    short: 'HTML',
    pos: 'LB',
    line: 'def',
    x: '14%',
    y: '66%',
  },
  {
    name: 'CSS',
    fit: 'Keeps the shape. Layout and style hold the page together.',
    short: 'CSS',
    pos: 'LCB',
    line: 'def',
    x: '38%',
    y: '70%',
  },
  {
    name: 'React Testing Library',
    fit: 'Reads danger the way a user would: tests what people see and click.',
    short: 'Testing Lib',
    pos: 'RCB',
    line: 'def',
    x: '62%',
    y: '70%',
  },
  {
    name: 'Bootstrap',
    fit: 'Quick to cover ground with ready-made layout and components.',
    short: 'Bootstrap',
    pos: 'RB',
    line: 'def',
    x: '86%',
    y: '66%',
  },
  {
    name: 'Git',
    fit: 'Every mistake can be undone from here.',
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
    fit: 'Makes sure everyone can play. Keyboard, screen reader, and contrast.',
    short: 'Accessibility',
    pos: 'SUB',
    line: 'mid',
    x: '0',
    y: '0',
  },
  {
    name: 'Redux',
    fit: 'Steady state management when the app gets crowded.',
    short: 'Redux',
    pos: 'SUB',
    line: 'mid',
    x: '0',
    y: '0',
  },
  {
    name: 'Responsive Web Design',
    fit: 'Fits any pitch size, from a phone to a wide screen.',
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
