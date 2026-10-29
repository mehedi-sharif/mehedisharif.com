# Cloudflare Pages migration

Build command: `npm run build:cloudflare`
Output directory: `dist-cloudflare`
Node.js: 22
Production branch after migration: `main`

The separate Astro config builds the homepage, blog, categories, contact, privacy policy, and 404 page as static HTML. No Pages Functions or backend secrets are required. The timeline, email verifier, their API routes, and database dependencies have been removed. Existing database data is not modified.

The contact form retains its existing FormSubmit integration.

Run `npm run preview:cloudflare` to verify the built site. Before changing DNS, verify the Pages URL and retained pages. Keep the Netlify deployment available until successful cutover.

Current web DNS (rollback reference):

- Apex `mehedisharif.com`: A `104.198.14.52`, DNS only.
- `www.mehedisharif.com`: CNAME `mehedisharif.netlify.app`, DNS only.

Add both domains through Pages custom domains, then update only these web records. Keep mail and verification records unchanged.
