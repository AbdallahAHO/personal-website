# Abdallah Othman's Personal Website

My personal website and blog, live at [abdallahaho.com](https://www.abdallahaho.com).

## Tech Stack

- **[Astro](https://astro.build)** 7: static site generation with content collections (Content Layer API)
- **[Tailwind CSS](https://tailwindcss.com)** 4: styling, via the `@tailwindcss/vite` plugin
- **[MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/)**: authoring for blog, projects, work, and now pages
- **[Satori](https://github.com/vercel/satori) + [resvg](https://github.com/yisibl/resvg-js)**: dynamic Open Graph image generation
- **[astro-seo](https://github.com/jonasmerlin/astro-seo)** + **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** + **[@astrojs/rss](https://docs.astro.build/en/guides/integrations-guide/rss/)**: SEO, sitemap, and feed
- **[Biome](https://biomejs.dev)**: linting and formatting
- **[Playwright](https://playwright.dev)**: build and smoke tests
- **[Cloudflare Pages](https://pages.cloudflare.com)**: hosting and deployment

## Project Structure

```
src/
├── components/       # UI components, grouped by domain
│   ├── assets/       # Logo, theme toggle
│   ├── blog/         # Blog listing components
│   ├── foundations/   # Base elements, <head> tags, scripts
│   ├── global/       # Footer, navigation
│   ├── landing/      # Hero, FAQ
│   └── projects/     # Project listing components
├── content/          # Markdown content (blog, projects, work, now)
├── content.config.ts # Content collection schemas + glob loaders
├── constants/        # Site-wide config (SITE constant)
├── layouts/          # Page layout shells
├── og/               # OG image generation logic
├── pages/            # File-based routes (incl. /og/*.png endpoints)
├── styles/           # Global CSS
└── utils/            # Date helpers

tests/
├── build/            # Tests against the local build (start a preview server)
└── smoke/            # Post-deploy tests against production
```

Content lives in `src/content/<collection>/` as Markdown. Each route under `src/pages/` maps to a URL; `src/pages/og/` generates social card images at build time: fixed pages from the map in `[...page].png.ts`, posts, projects and tags from their collections.

## Commands

Run from the project root. Requires Node 26 (see `.nvmrc`) and [pnpm](https://pnpm.io) 12 (pinned in `packageManager`).

| Command           | Action                                            |
| :---------------- | :------------------------------------------------ |
| `pnpm install`    | Install dependencies                              |
| `pnpm dev`        | Start the dev server at `localhost:4321`          |
| `pnpm build`      | Build the production site to `./dist/`            |
| `pnpm preview`    | Preview the production build locally              |
| `pnpm typecheck`  | Type-check `.astro` and TS (`astro check` + `tsc`) |
| `pnpm lint`       | Lint with Biome                                   |
| `pnpm lint:ci`    | Lint + format check, no writes (what CI runs)     |
| `pnpm check`      | Lint, format, and organize imports (writes fixes) |
| `pnpm test`       | Run build tests (Playwright)                      |
| `pnpm test:smoke` | Run smoke tests against `SMOKE_URL`               |
| `pnpm run deploy` | Build and deploy (needs Cloudflare creds, below)  |

> First test run only: `pnpm exec playwright install chromium` to download the browser.

## Deployment

GitHub Actions (`.github/workflows/ci.yml`):

1. **Verify**: `astro check` + `tsc`, `biome ci`, build, Playwright build tests.
2. **Deploy** to Cloudflare Pages: a preview per PR, production on push to `main`.
3. **Smoke**: Playwright smoke tests against the deployed URL.

Dependabot opens one grouped minor/patch PR a week. `dependabot-automerge.yml` squash-merges it once CI is green and dispatches CI on `main` to deploy it. Majors open as separate PRs for review.

Local deploy uses the project token in Infisical (`personal-website/prod/deploy`), never the global `wrangler login`:

```sh
infisical run --projectId 42132f2e-dfee-4553-ab40-ee465bac79a2 --env prod --path /deploy -- pnpm run deploy
```

From a feature branch this publishes a preview; from `main` it publishes production.
