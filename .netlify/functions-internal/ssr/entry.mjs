import { renderers } from './renderers.mjs';
import { manifest } from './manifest_CtXv6vKD.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./chunks/generic_Dbc17URE.mjs');
const _page1 = () => import('./chunks/404_Db_efQiH.mjs');
const _page2 = () => import('./chunks/timeline_B6px51H_.mjs');
const _page3 = () => import('./chunks/_category__s2FVUhvG.mjs');
const _page4 = () => import('./chunks/index_C8l1imPY.mjs');
const _page5 = () => import('./chunks/contact_Cg5ki89-.mjs');
const _page6 = () => import('./chunks/_slug__2QOdkkAt.mjs');
const _page7 = () => import('./chunks/_single__CG9HhQWr.mjs');
const _page8 = () => import('./chunks/index_Coae9kxC.mjs');
const _page9 = () => import('./chunks/timeline_Bqokq4I0.mjs');
const _page10 = () => import('./chunks/_regular__CFkG8fF3.mjs');
const _page11 = () => import('./chunks/index_Dx1MgdM0.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/timeline.ts", _page2],
    ["src/pages/categories/[category].astro", _page3],
    ["src/pages/categories/index.astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/posts/page/[slug].astro", _page6],
    ["src/pages/posts/[single].astro", _page7],
    ["src/pages/posts/index.astro", _page8],
    ["src/pages/timeline.astro", _page9],
    ["src/pages/[regular].astro", _page10],
    ["src/pages/index.astro", _page11]
]);
const middleware = (_, next) => next();
const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware
});
const _args = {
    "middlewareSecret": "07bf02f4-de52-48cc-b783-54f530adf222"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
