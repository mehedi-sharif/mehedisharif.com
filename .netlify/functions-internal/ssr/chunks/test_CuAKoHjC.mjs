import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DG7-IQXY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.</p>";

				const frontmatter = {"title":"2 How to build an Application with modern Technology","meta_title":"","description":"this is meta description","date":"2022-04-04T05:00:00.000Z","image":"","categories":["Application","Data"],"author":"John Doe","tags":["nextjs","tailwind"],"draft":false};
				const file = "/Users/mehedi/Development/Projects/mehedisharif.com/src/content/posts/test.md";
				const url = undefined;
				function rawContent() {
					return "\nNemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.\n";
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
