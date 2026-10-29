# Cloudflare Pages migration

Build command: `npm run build:cloudflare`
Output directory: `dist-cloudflare`
Node.js: 22
Production branch after migration: `main`

The separate Astro config prerenders the homepage, blog, categories, contact, timeline UI, verifier UI, and 404 page. API routes execute in Pages Functions with Node.js compatibility. Netlify configuration remains available until cutover is verified.

Required production secrets (copy existing values from Netlify into Pages encrypted environment variables):

- `MONGODB_URI`: existing MongoDB database connection.
- `SECRET_KEY`: existing timeline login password.
- `REOON_EMAIL_API_KEY`: existing verification service key.

Never commit these values. For local testing, use an ignored `.dev.vars` file. `npm run preview:cloudflare` serves the built site through the Cloudflare runtime.

MongoDB connections are created and closed per request. The timeline uses an eight-hour HttpOnly signed session; its password is no longer embedded in page HTML. Email verification calls Reoon server-side and reserves one of the existing 20 daily verifications atomically. Reservations remain consumed if the provider fails, preventing repeated provider calls from bypassing the limit.

Before changing DNS, verify the Pages URL, blog/contact pages, timeline login and database reads, and email verification with the real secrets. Do not delete the Netlify deployment before successful cutover.

Current web DNS (rollback reference):

- Apex `mehedisharif.com`: A `104.198.14.52`, DNS only.
- `www.mehedisharif.com`: CNAME `mehedisharif.netlify.app`, DNS only.

Add both domains through Pages custom domains, then update only these web records. Keep mail and verification records unchanged.
