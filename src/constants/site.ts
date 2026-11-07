import { execSync } from 'node:child_process'
import { yearsSince } from '@/utils/date'

/** Short hash of the commit being built: CI env first, then local git. */
const readCommitHash = (): string => {
  const fromCi = process.env.GITHUB_SHA ?? process.env.SOURCE_COMMIT
  if (fromCi) return fromCi.slice(0, 7)
  try {
    return execSync('git rev-parse --short=7 HEAD', { encoding: 'utf8' }).trim()
  } catch {
    return 'unknown'
  }
}

const COMMIT_HASH = readCommitHash()
const REPO_URL = 'https://github.com/AbdallahAHO/personal-website'

// First professional role, Nov 2016 (Egypt). Drives EXPERIENCE_YEARS at build time.
const CAREER_START = '2016-11-01'

export const SITE = {
  NAME: 'Abdallah Othman',
  TITLE: 'Abdallah Othman: Product Engineer in Hamburg',
  DESCRIPTION:
    'Abdallah Othman is a product engineer in Hamburg, currently a Senior Growth Engineer at Lokalise, working on onboarding, activation, pricing, and AI product features (LLM agents, MCP). TypeScript, React, Node. Originally from Alexandria, Egypt.',
  URL: 'https://abdallahaho.com',
  AUTHOR: 'Abdallah Othman',
  KEYWORDS: [
    'Abdallah Othman',
    'AbdallahAHO',
    'Product Engineer',
    'Product Engineer Hamburg',
    'Growth Engineer',
    'Senior Growth Engineer',
    'AI Engineer',
    'LLM agents',
    'MCP',
    'Claude Code',
    'TypeScript Developer',
    'React',
    'Node.js Developer',
    'Egyptian Engineer Germany',
    'Lokalise',
    'Hamburg Tech Scene',
    'Alexandria Egypt',
    'ABOUT YOU',
    'XING',
    'Postman',
  ] as string[],
  LANGUAGE: 'en-US',
  LOCALE: 'en_US',

  // Social Media
  TWITTER_HANDLE: '@AbdallahAHO',
  GITHUB_USERNAME: 'AbdallahAHO',
  LINKEDIN_USERNAME: 'AbdallahAHO',

  // Open Graph
  OG_IMAGE: '/og/default.png',
  OG_IMAGE_ALT: 'Abdallah Othman, product engineer in Hamburg, working on growth and AI products',
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
  POSITION: 'Senior Growth Engineer',
  CAREER_START,
  EXPERIENCE_YEARS: `${yearsSince(CAREER_START)}+`,
  SPECIALIZATION: 'Product & Growth Engineering, AI/LLM (agents, MCP), TypeScript & React',

  // Contact
  EMAIL: 'hello@abdallahaho.com',

  // Additional SEO
  SCHEMA_TYPE: 'Person',
  BIRTH_PLACE: 'Alexandria, Egypt',
  WORK_LOCATION: 'Hamburg, Germany',
  NATIONALITY: 'Egyptian',

  // Content
  BLOG_TITLE: "Abdallah Othman's Blog: Product & Growth Engineering, AI",
  BLOG_DESCRIPTION:
    'Notes on product and growth engineering, building with AI agents, and shipping software, from an Egyptian engineer in Hamburg.',

  // RSS
  RSS_TITLE: 'Abdallah Othman - Tech Blog',
  RSS_DESCRIPTION: 'Notes on product & growth engineering, AI agents, and shipping software',

  // Git info
  COMMIT_HASH,
  COMMIT_URL: COMMIT_HASH === 'unknown' ? REPO_URL : `${REPO_URL}/commit/${COMMIT_HASH}`,
}
