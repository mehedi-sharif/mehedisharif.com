# Editing this site with Sitepins

## Connect the project

The repository configuration is `.sitepins/config.json`. In Sitepins, select
`mehedi-sharif/mehedisharif.com` and the `main` branch once these changes have
been pushed. Sitepins edits repository content; Cloudflare builds commits to main.
This configuration does not create a Sitepins account or grant GitHub access.

## Edit the staging homepage

Select the `staging` branch and open **Staging homepage — sections, navigation & footer**. Publish to `staging` to update the Cloudflare preview at `staging.mehedisharif.com`.

- Edit the hero, About, Businesses, Values, For fun, Blog, and Connect groups. The title fields keep highlighted words in the current design. Use `**bold**` in the hero description and About paragraphs.
- Add, reorder, or remove business cards, value cards, blog cards, navigation links, and social links in their lists. Keep at least one word in **Rotating words**. A For fun story row pairs the text before a highlighted word with its hover image. Begin **Story end** with a space if it starts a new word.
- Change the header or footer signature, its destination, and its accessible label in the corresponding **Brand** group. Footer social icons support `facebook`, `linkedin`, `x`, and `github`. Use root-relative URLs such as `/meet` for links that should stay on staging.
- Upload replacement images to `public/images` and use their `/images/…` URLs. Turn off **Animate portrait** to use the light and dark still images in place of the current animation frames.
- Use **Contact drawer & form** for the drawer copy and **Navigation, social links & site identity** for the shared contact links and interior pages.

## Editor sidebar

- **Home — all sections**: banner, About, businesses, values, personal-interest photos,
  and Connect. The `enable` switches hide individual sections. Items within the
  businesses, values, and image arrays can be added, removed, or reordered.
- **Navigation, social links & site identity**: menu order/labels/links, signatures,
  global title and description, social profiles, and booking link. Social icon
  names are `facebook`, `linkedin`, `x`, and `github`.
- **Contact drawer & form**: heading, labels, placeholders, send/success/error text,
  and email subject. Field identifiers and validation remain in code.
- **Blog landing page**: heading, description, empty-state and navigation copy.
- **Blog posts**: create Markdown/MDX posts using the posts template. New posts start
  as drafts. Set `draft: false` to publish. Files become `/posts/<filename>`.
  Keep `-index.md` for the blog landing page; it is never an article.
- **Pages**: regular Markdown pages, such as the existing privacy page. New files
  become `/<filename>`. Do not use filenames matching existing app routes.
- **Legacy call to action**: used by the older content-page templates.

## Images and formatting

Upload photos to `public/images` and use `/images/...` in the content fields.
The personal-interest photos are now in this media folder too. Keep descriptive
alt text. The About portrait's rounded crop and lime treatment remain automatic.
Use `**bold**` inside About paragraphs for emphasis; the other structured text
fields are plain text. Blog article bodies support Markdown and their existing
HTML formatting. The Sample Post remains the complete style reference.

Signatures are separate light/dark SVG files. Keep their contrast appropriate
for the black navigation and light footer (the footer inverts in dark mode).

## Settings and boundaries

`src/config` is exposed for existing advanced template settings: the domain,
favicon, pagination, legacy navigation and theme, and FormSubmit recipient.
Changing the recipient may require verification with FormSubmit. Never put
private tokens or passwords in these files: this is client-rendered static HTML.
The current custom CSS, hill animation, layout, fonts, and color treatment stay
in code; the older theme JSON only controls the legacy template styles.

Homepage and contact are singletons, so they intentionally have no new-file
schema. Only growing collections (`posts`, `pages`) have templates. Astro validates
structured singleton fields at build time; edit field values rather than renaming
or deleting keys. Section anchor IDs remain stable for navigation links.

## Local verification

Run `npm run typecheck` and `npm run build`. The local preview at port 8010 serves
`dist-cloudflare`, so rebuilding refreshes that preview. Push to GitHub main only
when ready to publish; no manual Cloudflare deployment is required.
