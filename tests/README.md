# Visual Testing

This directory contains Playwright visual regression tests for the website.

## Overview

The visual tests capture screenshots of main pages across different:
- **Browsers**: Chromium, WebKit (Safari)
- **Viewports**: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)
- **Pages**: Home, About, Blog, Projects, Work, Now

## Commands

```bash
# Run visual tests
pnpm test:visual

# Run tests with UI mode
pnpm test:visual:ui

# Update baseline screenshots
pnpm test:visual:update
```

## How it works

1. Tests build the site and run against the preview server
2. Screenshots are taken at different viewport sizes
3. Screenshots are compared against baseline images
4. Any differences above threshold (0.2) cause test failures

## CI Integration

Visual tests run automatically in GitHub Actions after code quality checks pass. Test reports are uploaded as artifacts for review.

## Updating Baselines

When intentional visual changes are made:

1. Run `pnpm test:visual:update` locally
2. Review the updated screenshots
3. Commit the new baseline images

## File Structure

- `tests/visual/pages.spec.ts` - Main visual test suite
- `tests/visual/pages.spec.ts-snapshots/` - Baseline screenshots (committed to git)
- `playwright.config.ts` - Playwright configuration
- `test-results/` - Test run artifacts (ignored)
- `playwright-report/` - HTML test reports (ignored)