# Abdallah Othman - Personal Website

My personal website built with Astro and Tailwind CSS.

## Tech Stack
- Tailwind CSS v4 Beta
- Astro SEO - Powered by [@astrolib/seo](https://github.com/onwidget/astrolib/tree/main/packages/seo)
- Astro Sitemap - https://docs.astro.build/en/guides/integrations-guide/sitemap/

## Project Structure

The project follows a typical Astro project structure. You'll find the following key directories and files:


```
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

- `src/pages/`: Contains `.astro` and `.md` files. Each file becomes a route in your project based on its name.
- `src/components/`: Ideal for placing your Astro/React/Vue/Svelte/Preact components.
- `public/`: For static assets such as images that you want to serve directly.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

Learn more - Explore more through Astro's official [documentation](https://docs.astro.build).