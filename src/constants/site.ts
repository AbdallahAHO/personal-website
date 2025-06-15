import { getGitCommitHash } from '@/utils/git'

export const SITE = {
  NAME: 'Abdallah Othman',
  TITLE: 'Abdallah Othman - Senior Software Engineer & Technical Lead',
  DESCRIPTION:
    'Senior Software Engineer and Technical Lead specializing in Growth Engineering, TypeScript, React, and AI. Based in Hamburg, Germany. Originally from Alexandria, Egypt.',
  URL: 'https://www.abdallahaho.com',
  AUTHOR: 'Abdallah Othman',
  KEYWORDS: [
    'Abdallah Othman',
    'AbdallahAHO',
    'Software Engineer Hamburg',
    'Senior Frontend Engineer',
    'Technical Lead Germany',
    'Growth Engineering',
    'TypeScript Developer',
    'React Expert',
    'Egyptian Engineer Germany',
    'Lokalise Engineer',
    'AI Large Language Models',
    'Hamburg Tech Scene',
    'Frontend Development',
    'JavaScript Expert',
    'Node.js Developer',
    'Software Architecture',
    'Team Leadership',
    'Multicultural Teams',
    'Alexandria Egypt',
    'ABOUT YOU Engineer',
    'XING Developer',
    'Postman Engineer',
  ] as string[],
  LANGUAGE: 'en-US',
  LOCALE: 'en_US',

  // Social Media
  TWITTER_HANDLE: '@AbdallahAHO',
  GITHUB_USERNAME: 'AbdallahAHO',
  LINKEDIN_USERNAME: 'AbdallahAHO',

  // Open Graph
  OG_IMAGE: '/images/og/abdallah-othman-og.jpg',
  OG_IMAGE_ALT:
    'Abdallah Othman - Senior Software Engineer specializing in Growth Engineering and AI',
  OG_IMAGE_WIDTH: '1200',
  OG_IMAGE_HEIGHT: '630',
  OG_TYPE: 'website',
  TWITTER_CARD_TYPE: 'summary_large_image',

  // Location
  LOCATION: 'Hamburg, Germany',
  ORIGIN: 'Alexandria, Egypt',
  TIMEZONE: 'Europe/Berlin',

  // Professional
  CURRENT_COMPANY: 'Lokalise',
  POSITION: 'Senior Software Engineer',
  EXPERIENCE_YEARS: '7+',
  SPECIALIZATION: 'Growth Engineering, Frontend Development, AI/LLM Integration',

  // Contact
  EMAIL: 'hello@abdallahaho.com',

  // Additional SEO
  SCHEMA_TYPE: 'Person',
  BIRTH_PLACE: 'Alexandria, Egypt',
  WORK_LOCATION: 'Hamburg, Germany',
  NATIONALITY: 'Egyptian',

  // Content
  BLOG_TITLE: "Abdallah Othman's Blog - Growth Engineering & Tech Leadership",
  BLOG_DESCRIPTION:
    'Insights on Growth Engineering, Frontend Development, AI/LLM, and leading multicultural tech teams from an Egyptian Software Engineer in Hamburg.',

  // RSS
  RSS_TITLE: 'Abdallah Othman - Tech Blog',
  RSS_DESCRIPTION: 'Latest insights on Growth Engineering, AI, and Software Development',

  // Git info
  COMMIT_HASH: getGitCommitHash(),
  REPO_NAME: 'personal-website',
}
