# Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist-cloudflare`
- Node.js: 24 (set `NODE_VERSION=24` in Pages build settings)
- Production branch: `main`

The default Astro config builds the homepage, posts, categories, contact, privacy policy, and 404 page as static HTML. No server adapter or database is required. The contact form posts to `/api/contact` (`functions/api/contact.js`, a Pages Function), which upserts the contact in GoHighLevel and adds the message as a note.

Run `npm ci`, `npm run typecheck`, and `npm run build` before deployment. Run `npm run preview` to serve the generated site locally through Wrangler Pages. The `build:cloudflare` and `preview:cloudflare` scripts remain aliases for existing build settings.

The project name and build directory are defined in `wrangler.jsonc`. Attach the apex and www domains through the Pages custom-domain settings. Keep mail and verification DNS records unchanged.

The meeting page lives at `https://meet.mehedisharif.com/`. This hostname is a custom domain on the same Pages project, with a proxied CNAME to `mehedisharif-com.pages.dev`. A zone URL Rewrite Rule serves `/meet/` at the subdomain root. A Single Redirect sends visitors from the old `/meet` and `/meet/` addresses to the subdomain and preserves the query string. Edit `src/pages/meet.astro` to update the page.

## Environment variables (contact form)

Set these in Pages > Settings > Environment variables (Production and Preview):

- `GHL_TOKEN` (secret): GoHighLevel private integration token. Never commit it.
- `GHL_LOCATION_ID`: `RulB9rnnRn2HFdQ5yzJT`

For local testing with `npm run preview`, put them in an untracked `.dev.vars` file.
