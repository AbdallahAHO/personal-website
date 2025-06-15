import { execSync } from 'node:child_process'

export function getGitCommitHash(): string {
  try {
    const hash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
    return hash
  } catch {
    return 'unknown'
  }
}

export function getGitCommitUrl(hash: string, githubUsername: string, repoName: string): string {
  if (hash === 'unknown') return '#'
  return `https://github.com/${githubUsername}/${repoName}/commit/${hash}`
}
