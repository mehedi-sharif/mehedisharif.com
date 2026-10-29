# Mehedi Sharif

Astro website with Tailwind CSS. The homepage recreates the supplied personal website design using native Astro components and locally hosted assets.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

The existing Netlify server adapter and secondary routes are retained.

## Homepage

- `src/pages/index.astro` composes the homepage.
- `src/components/personal/` contains navigation, hero, about, values, purpose, personal life, contact, and footer components.
- `src/layouts/Personal.astro` provides homepage metadata and shared styles.
- `src/styles/personal.css` contains the design typography, shared styles, and responsive overrides; layouts use Tailwind utilities.
- `public/images/personal/` contains the extracted artwork, portrait, Archivo font, and its original license notice.

The original HTML is retained as a design reference. Its personal biography, leisure photos/copy, email address, and social handle placeholders still need real content before publishing. The mobile navigation supports toggle, anchor navigation, and Escape to close.
