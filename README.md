# Mehedi Sharif

Personal website built with Astro 7, Tailwind CSS 4, React 19, and TypeScript 6.

TypeScript is held at 6.0.3 because the Netlify adapter’s dependency parser still requires the JavaScript compiler API removed in TypeScript 7.

## Development

Use Node.js 24 (`nvm use`) and npm 11.

```sh
npm ci
npm run dev
# Check TypeScript
npm run typecheck
```

## Production

```sh
npm run build
npm run build:cloudflare
```

The default build targets Netlify. Cloudflare Pages uses static HTML in `dist-cloudflare`; see [CLOUDFLARE.md](CLOUDFLARE.md). The homepage, posts, categories, contact, privacy policy, and 404 page are retained. The contact form uses FormSubmit. No database or backend secrets are required.

## Homepage and styling

- `src/pages/index.astro` composes the restored original design with current personal content.
- `src/layouts/partials/` contains the hero, about/ventures/values, posts, and contact sections.
- `src/data/homepage.json` contains the ventures and values.
- `src/content/` contains Markdown content, loaded through `src/content.config.ts`.
- `src/styles/main.css` uses Tailwind 4 via its Vite plugin, with the existing JSON theme wired through `tailwind.config.js`.
- Sass and the legacy Astro Tailwind integration are no longer required.

The previous black-and-lime website is preserved on the `v1` Git branch. Its unused components and original HTML remain available as references.
