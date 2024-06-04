import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DG7-IQXY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"enable":true,"title":"found something interesting in me?? let’s have a conversation...","image":"/images/call-to-action.png","description":"hey look **at_here**","button":{"enable":true,"label":"Contact With Me","link":"/contact"}};
				const file = "/Users/mehedi/Development/Projects/mehedisharif.com/src/content/sections/call-to-action.md";
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
