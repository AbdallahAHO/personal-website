/**
 * Date formatting for content dates (blog, projects, work, now).
 *
 * Content frontmatter dates are date-only (e.g. `2024-10-13`), which Astro
 * parses as UTC midnight. Formatting in UTC keeps the displayed calendar day
 * stable regardless of the build server's timezone, avoiding off-by-one days.
 *
 * @example
 * formatDate(new Date('2024-10-13')) // 'Oct 13, 2024'
 * toISODate(new Date('2024-10-13'))  // '2024-10-13'  (for <time datetime>)
 */

/** Human-readable date with the year, e.g. `Oct 13, 2024`. */
export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })

/** Machine-readable ISO date (`YYYY-MM-DD`) for the `<time datetime>` attribute. */
export const toISODate = (date: Date): string => date.toISOString().slice(0, 10)

/**
 * Full years elapsed since an ISO date, computed at build time.
 *
 * Keeps "years of experience" current without hand-editing: pass the career
 * start date and let each build recompute it.
 *
 * @example
 * yearsSince('2016-11-01') // 9  (as of mid-2026)
 */
export const yearsSince = (startISO: string): number => {
  const start = new Date(startISO)
  const now = new Date()
  const years = now.getUTCFullYear() - start.getUTCFullYear()
  const beforeAnniversary =
    now.getUTCMonth() < start.getUTCMonth() ||
    (now.getUTCMonth() === start.getUTCMonth() && now.getUTCDate() < start.getUTCDate())
  return beforeAnniversary ? years - 1 : years
}
