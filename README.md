# Abdallah Othman's Personal Website

My personal website and blog, live at [abdallahaho.com](https://www.abdallahaho.com).

## Tech Stack

- **[Astro](https://astro.build)** 6: static site generation with content collections (Content Layer API)
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
│   ├── fundations/   # Base elements, <head> tags, scripts
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
└── utils/            # Helpers (git info)

tests/
├── build/            # Tests against the local build (start a preview server)
└── smoke/            # Post-deploy tests against production
```

Content lives in `src/content/<collection>/` as Markdown. Each route under `src/pages/` maps to a URL; `src/pages/og/` generates social card images at build time.

## Commands

Run from the project root. Requires Node `>=22` (see `.nvmrc`) and [pnpm](https://pnpm.io).

| Command           | Action                                            |
| :---------------- | :------------------------------------------------ |
| `pnpm install`    | Install dependencies                              |
| `pnpm dev`        | Start the dev server at `localhost:4321`          |
| `pnpm build`      | Build the production site to `./dist/`            |
| `pnpm preview`    | Preview the production build locally              |
| `pnpm typecheck`  | Type-check with `tsc`                             |
| `pnpm lint`       | Lint with Biome                                   |
| `pnpm check`      | Lint, format, and organize imports (writes fixes) |
| `pnpm test`       | Run build tests (Playwright)                      |
| `pnpm test:smoke` | Run smoke tests against `SMOKE_URL`               |
| `pnpm deploy`     | Build and deploy to Cloudflare Pages              |

> First test run only: `pnpm exec playwright install chromium` to download the browser.

## Deployment

CI (GitHub Actions) runs type-check, lint, format, and build, then the Playwright build tests, then deploys to Cloudflare Pages (preview on PRs, production on push to `main`), followed by smoke tests against the live site.
