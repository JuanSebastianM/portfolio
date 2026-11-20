/** Single source for the canonical site URL. Keep astro.config.mjs in sync if this moves. */
export const siteUrl = 'https://jmendozaperez.dev';

export const identity = {
  name: 'Juan Sebastián Mendoza',
  givenName: 'Juan Sebastián',
  familyName: 'Mendoza',
  role: 'Software Engineer / AI @GoDaddy',
  /** Browser tab and share title. No employer name, per Juan. */
  titleRole: 'Software Engineer',
  location: 'Colombia',
  githubUser: 'JuanSebastianM',
  email: 'hello@jmendozaperez.dev',
  github: 'https://github.com/JuanSebastianM',
  twitter: 'https://twitter.com/JuanMendozaDev',
  twitterHandle: '@JuanMendozaDev',
  linkedin: 'https://www.linkedin.com/in/juan-sebastian-mendoza-perez',
  /** Verbatim GitHub profile bio, snapshot 2026-10-28. */
  githubBio: 'Software Developer specialized in Front End | TypeScript, React, AWS.',
  headline: 'Software Engineer / AI @GoDaddy',
  description:
    'Juan Sebastián Mendoza is a software engineer at GoDaddy in Colombia. React, TypeScript, AWS, and Node.js.',
} as const;
