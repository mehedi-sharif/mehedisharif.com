/* empty css                              */
import { d as createAstro, e as createComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, h as renderComponent, u as unescapeHTML } from '../astro_DG7-IQXY.mjs';
import 'kleur/colors';
import { c as config, a as $$Base, m as markdownify, $ as $$ImageMod } from './404_B3u-Bemm.mjs';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { g as getSinglePage, a as getEntry, s as sortByDate, d as dateFormat } from './_category__Dih3iAqg.mjs';
import { BsArrowRight } from 'react-icons/bs';

const $$Astro$1 = createAstro("https://mehedisharif.com/");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { section, currentPage = 1, totalPages = 1 } = Astro2.props;
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;
  return renderTemplate`${maybeRenderHead()}<div class="mt-12 mx-auto mb-10 flex items-center justify-between rounded-full bg-gray-100 dark:bg-theme-dark md:mb-20 md:w-1/2 lg:w-1/4"> ${hasPrevPage ? renderTemplate`<a${addAttribute(
    indexPageLink ? `${section ? "/" + section : "/"}` : `${section ? "/" + section : ""}/page/${currentPage - 1}`,
    "href"
  )} class="border-border-default block border-r py-4 px-5 text-center dark:border-darkmode-border"> ${renderComponent($$result, "MdArrowBackIos", MdArrowBackIos, {})} </a>` : renderTemplate`<span class="border-border-default block cursor-not-allowed border-r py-4 px-5 text-center opacity-20 dark:border-darkmode-border"> ${renderComponent($$result, "MdArrowBackIos", MdArrowBackIos, {})} </span>`} <span> <strong> ${currentPage < 9 ? "0" + currentPage : currentPage}</strong>/
${totalPages < 9 ? "0" + totalPages : totalPages} </span> ${hasNextPage ? renderTemplate`<a${addAttribute(`/posts/page/${currentPage + 1}`, "href")}${addAttribute(`${section ? "/" + section : ""}/page/${currentPage + 1}`, "href")} class="border-border-default block border-l py-4 px-5 text-center dark:border-darkmode-border"> ${renderComponent($$result, "MdArrowForwardIos", MdArrowForwardIos, {})} </a>` : renderTemplate`<span class="border-border-default block cursor-not-allowed border-l py-4 px-5 text-center opacity-20 dark:border-darkmode-border"> ${renderComponent($$result, "MdArrowForwardIos", MdArrowForwardIos, {})} </span>`} </div>`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/layouts/components/Pagination.astro", void 0);

const $$Astro = createAstro("https://mehedisharif.com/");
async function getStaticPaths() {
  const BLOG_FOLDER = "posts";
  const posts = await getSinglePage(BLOG_FOLDER);
  const totalPages = Math.ceil(posts.length / config.settings.pagination);
  const paths = [];
  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString()
      }
    });
  }
  return paths;
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const BLOG_FOLDER = "posts";
  const { slug } = Astro2.params;
  const postIndex = await getEntry(BLOG_FOLDER, "-index");
  const posts = await getSinglePage(BLOG_FOLDER);
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / config.settings.pagination);
  const currentPage = slug && !isNaN(Number(slug)) ? Number(slug) : 1;
  const indexOfLastPost = currentPage * config.settings.pagination;
  const indexOfFirstPost = indexOfLastPost - config.settings.pagination;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { ...postIndex.data }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section"> <div class="container"> ${postIndex && renderTemplate`<div class="flex items-center pb-2"> <svg class="h-5 w-5 dark:invert lg:h-6 lg:w-6" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24.909 1.36799C22.078 4.06599 22.078 4.06599 21.812 3.85699C21.679 3.74299 21.375 3.60999 21.166 3.53399C20.71 3.40099 19.589 4.42699 10.735 13.11C8.22702 15.58 5.13002 18.62 3.83802 19.874L1.50102 22.154L1.33002 23.465C0.950018 26.524 0.741018 32.072 0.893018 34.618C1.10202 37.829 1.27302 38.114 2.75502 37.905C4.71202 37.658 8.87302 36.822 12.008 36.081L15.257 35.302L20.881 29.849C30.837 20.235 34.39 16.663 34.39 16.283C34.39 16.093 34.219 15.713 34.01 15.428C33.63 14.953 33.63 14.934 33.972 14.554C34.162 14.326 34.884 13.509 35.587 12.711C37.145 10.944 37.335 10.507 36.879 9.76599C36.366 8.92999 32.376 4.67399 30.419 2.88799C27.854 0.531992 27.17 -7.56853e-06 26.752 -7.56853e-06C26.543 -7.56853e-06 25.726 0.607992 24.909 1.36799ZM31.635 7.06799C32.262 7.73299 33.231 8.73999 33.782 9.32899L34.808 10.393L33.535 11.856C32.851 12.654 32.186 13.3 32.072 13.3C31.958 13.3 30.666 12.122 29.184 10.678C27.702 9.23399 25.859 7.48599 25.08 6.76399L23.655 5.45299L25.251 3.97099L26.847 2.48899L28.671 4.17999C29.678 5.11099 31.008 6.40299 31.635 7.06799ZM18.943 10.83C14.326 15.485 13.11 16.853 13.11 17.404C13.11 17.879 13.718 18.62 14.079 18.62C14.193 18.62 16.473 16.397 19.152 13.661L24.035 8.72099L24.662 9.25299L25.289 9.78499L23.617 11.495C22.686 12.445 20.368 14.915 18.449 17.005C16.511 19.095 14.231 21.546 13.357 22.458C11.723 24.187 11.476 24.738 12.084 25.346C12.844 26.125 13.167 25.84 18.145 20.425C20.919 17.404 25.669 12.369 26.296 11.799L26.79 11.343L27.626 12.084C28.082 12.483 28.481 12.901 28.481 12.996C28.5 13.091 26.144 15.466 23.294 18.278C20.425 21.09 18.012 23.56 17.955 23.769C17.765 24.339 18.335 25.08 18.943 25.08C19.342 25.08 20.463 24.073 24.719 19.855C27.607 16.986 30.058 14.63 30.153 14.63C30.248 14.63 30.666 14.972 31.065 15.39L31.825 16.169L27.93 20.007C22.781 25.099 15.219 32.376 14.991 32.452C14.383 32.68 5.62402 24.871 4.38902 23.009C4.08502 22.553 4.10402 22.534 9.12002 17.613C11.894 14.915 15.732 11.21 17.632 9.36699L21.128 6.04199L21.774 6.66899L22.42 7.29599L18.943 10.83ZM10.963 32.205C11.932 32.927 12.711 33.573 12.711 33.63C12.73 33.725 8.22702 34.789 7.88502 34.77C7.79002 34.77 7.14402 34.238 6.46002 33.611C5.77602 32.984 4.73102 32.091 4.14202 31.597L3.04002 30.723V29.184C3.04002 28.329 3.09702 27.075 3.17302 26.372L3.28702 25.08L6.25102 27.987C7.88502 29.564 10.013 31.464 10.963 32.205ZM4.90202 35.359C4.76902 35.416 4.29402 35.53 3.85702 35.606L3.04002 35.72V34.58V33.421L4.08502 34.314C4.78802 34.922 5.05402 35.264 4.90202 35.359Z" fill="black"></path> </svg> <h2 class="section-title ml-3">${unescapeHTML(markdownify(postIndex.data.title))}</h2> </div>`} ${currentPosts.map((post) => renderTemplate`<div class="post-card group mt-9"> <a${addAttribute(`/posts/${post.slug}`, "href")} class="flex flex-wrap items-center justify-between p-6 md:px-8 lg:px-12"> <div class="basis-full lg:mr-10 lg:basis-1/6"> ${post.data.image ? renderTemplate`${renderComponent($$result2, "ImageMod", $$ImageMod, { "src": post.data.image, "height": 138, "width": 184, "alt": post.data.title, "class": "rounded-lg" })}` : renderTemplate`<p class="mb-3 pt-1 text-sm text-gray-400 lg:mb-1"> ${dateFormat(post.data.date, "dd MMM, yyyy")} </p>`} </div> <div class="basis-11/12 lg:basis-4/6"> ${post.data.image && renderTemplate`<p class="mb-1 pt-1 text-sm text-gray-400"> ${dateFormat(post.data.date, "dd MMM, yyyy")} </p>`} <h3 class="text-h5 font-medium leading-relaxed md:text-h4 xl:text-h3"> ${post.data.title} </h3> </div> <span class="ml-2 mt-4 -translate-x-2 text-base font-normal transition-all group-hover:translate-x-0 group-hover:opacity-100 md:mt-0 md:-translate-y-5 md:pt-3 md:text-3xl md:opacity-0 lg:ml-auto lg:-translate-y-1"> ${renderComponent($$result2, "BsArrowRight", BsArrowRight, {})} </span> </a> </div>`)} </div> ${renderComponent($$result2, "Pagination", $$Pagination, { "section": BLOG_FOLDER, "currentPage": currentPage, "totalPages": totalPages })} </section> ` })}`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/posts/page/[slug].astro", void 0);

const $$file = "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/posts/page/[slug].astro";
const $$url = "/posts/page/[slug]";

const _slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Pagination as $, _slug_ as _ };
