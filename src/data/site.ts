/** Single source for the canonical site URL. Keep astro.config.mjs in sync if this moves. */
export const siteUrl = 'https://juansebastianmendoza.com';

export const identity = {
  name: 'Juan Sebastián Mendoza',
  givenName: 'Juan Sebastián',
  familyName: 'Mendoza',
  role: 'Front-end developer',
  location: 'Colombia',
  githubUser: 'JuanSebastianM',
  email: 'hello@juansebastianmendoza.com',
  emailNote:
    'Planned address. Cloudflare Email Routing is not turned on yet, so this inbox is not live.',
  formAction: 'https://formspree.io/f/xzbyoqde',
  github: 'https://github.com/JuanSebastianM',
  twitter: 'https://twitter.com/JuanMendozaDev',
  twitterHandle: '@JuanMendozaDev',
  linkedin: 'https://www.linkedin.com/in/juan-sebastian-mendoza-perez',
  hashnode: 'https://juansebastian.hashnode.dev',
  /** Verbatim GitHub profile bio, snapshot 2026-10-28. */
  githubBio: 'Software Developer specialized in Front End | TypeScript, React, AWS.',
  description:
    'Juan Sebastián Mendoza is a front-end developer in Colombia. TypeScript, React, and AWS. Projects, open-source work, and essays.',
} as const;
