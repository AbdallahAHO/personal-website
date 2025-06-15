export async function getGitCommitHash(): Promise<string> {
  try {
    // Try to get from environment variables first (for build environments)
    if (process.env.GITHUB_SHA) {
      return process.env.GITHUB_SHA.substring(0, 7)
    }

    if (process.env.SOURCE_COMMIT) {
      return process.env.SOURCE_COMMIT.substring(0, 7)
    }

    // Fallback to GitHub API
    const response = await fetch(
      'https://api.github.com/repos/AbdallahAHO/personal-website/commits/main'
    )

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`)
    }

    const data = await response.json()
    return data.sha.substring(0, 7)
  } catch (error) {
    console.warn('Failed to fetch git commit hash:', error)
    return 'unknown'
  }
}

export function getGitCommitUrl(hash: string, githubUsername: string, repoName: string): string {
  if (hash === 'unknown') return '#'
  return `https://github.com/${githubUsername}/${repoName}/commit/${hash}`
}
