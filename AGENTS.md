# personal-website

Static Astro 7 site for abdallahaho.com, deployed to Cloudflare Pages (project `personal-website`, Escalay account).

## Commands

- `pnpm dev`: dev server on :4321
- `pnpm typecheck`: `astro sync && astro check && tsc --noEmit` (covers `.astro` files)
- `pnpm lint:ci`: Biome lint + format check without writing (CI gate); `pnpm check` writes fixes
- `pnpm build && pnpm test`: Playwright build tests against `astro preview` on port 4391
- `SMOKE_URL=https://abdallahaho.com pnpm test:smoke`: request-only smoke tests against a deployed URL
- Deploy locally only through Infisical: `infisical run --projectId 42132f2e-dfee-4553-ab40-ee465bac79a2 --env prod --path /deploy -- pnpm run deploy`. The global `wrangler login` on this Mac is a different account.

## CI/CD

- `.github/workflows/ci.yml`: verify → deploy (PR preview, `main` production) → smoke. Deploy is skipped for Dependabot PRs because they can't read Actions secrets.
- `.github/workflows/dependabot-automerge.yml`: after green CI on a `minor-and-patch` group PR, squash-merges it and dispatches CI on `main`. Merges made with `GITHUB_TOKEN` don't fire `push`, so the dispatch is what deploys them.
- The deploy token lives in Infisical `personal-website/prod/deploy` and is copied into the repo secrets `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`. Rotate it in Infisical, then re-set the secrets.

## Gotchas

- `compressHTML: true` is deliberate. Astro 7's default `'jsx'` drops the spaces between inline elements.
- TypeScript stays on 6: `astro check` doesn't support TS 7.
- `@emnapi/runtime` is overridden to 1.x in `pnpm-workspace.yaml`; the 2.0 beta crashes `astro check`.
- Biome skips `*.md`/`*.mdx` because its formatter flattens nested YAML frontmatter.
- OG cards (`src/og/generate.ts`) need `boxSizing: 'border-box'` on the root under satori ≥0.63.
- Blog and project pages emit `og:type` `article`; the schema.org type (`BlogPosting`) is separate.
