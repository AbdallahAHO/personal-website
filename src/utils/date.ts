/**
 * Date formatting for content dates (blog, projects, work, now).
 *
 * Content frontmatter dates are date-only (e.g. `2024-10-13`), which Astro
 * parses as UTC midnight. Formatting in UTC keeps the displayed calendar day
 * stable regardless of the build server's timezone — avoiding off-by-one days.
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
