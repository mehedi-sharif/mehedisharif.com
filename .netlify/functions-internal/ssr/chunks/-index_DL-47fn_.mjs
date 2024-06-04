import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DG7-IQXY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"title":"My **Thou_ghts**","meta_title":"","description":"I write about Hugo, jekyell and how to solve problems, Enjoy your read!"};
				const file = "/Users/mehedi/Development/Projects/mehedisharif.com/src/content/posts/-index.md";
				const url = undefined;
				function rawContent() {
					return "";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
