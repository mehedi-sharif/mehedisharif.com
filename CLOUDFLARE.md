# Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist-cloudflare`
- Node.js: 24 (set `NODE_VERSION=24` in Pages build settings)
- Production branch: `main`

The default Astro config builds the homepage, posts, categories, contact, privacy policy, and 404 page as static HTML. No server adapter, Pages Functions, database, or backend secrets are required. The contact form uses FormSubmit.

Run `npm ci`, `npm run typecheck`, and `npm run build` before deployment. Run `npm run preview` to serve the generated site locally through Wrangler Pages. The `build:cloudflare` and `preview:cloudflare` scripts remain aliases for existing build settings.

The project name and build directory are defined in `wrangler.jsonc`. Attach the apex and www domains through the Pages custom-domain settings. Keep mail and verification DNS records unchanged.
