/* empty css                              */
import { e as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead, g as addAttribute, u as unescapeHTML } from '../astro_DG7-IQXY.mjs';
import 'kleur/colors';
import { h as humanize, a as $$Base, c as config, m as markdownify, $ as $$ImageMod, b as $$Divider } from './404_B3u-Bemm.mjs';
import { b as getTaxonomy, c as getAllTaxonomy, a as getEntry, g as getSinglePage, s as sortByDate, d as dateFormat } from './_category__Dih3iAqg.mjs';
import { $ as $$Pagination } from './_slug__D_SKBYly.mjs';
import { BsArrowRight } from 'react-icons/bs';
import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const BLOG_FOLDER = "blog";
  const categories = await getTaxonomy(BLOG_FOLDER, "categories");
  const allCategories = await getAllTaxonomy(BLOG_FOLDER, "categories");
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Categories" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section"> <div class="container text-center"> <ul> ${categories.map((category) => {
    const count = allCategories.filter((c) => c === category).length;
    return renderTemplate`<li class="m-3 inline-block"> <a${addAttribute(`/categories/${category}`, "href")} class="block rounded bg-theme-light px-4 py-2 text-xl text-dark dark:bg-darkmode-theme-light dark:text-darkmode-dark"> ${humanize(category)}${" "} <span class="ml-2 rounded bg-body px-2 dark:bg-darkmode-body"> ${count} </span> </a> </li>`;
  })} </ul> </div> </section> ` })}`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/categories/index.astro", void 0);

const $$file$2 = "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/categories/index.astro";
const $$url$2 = "/categories";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$2,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const BLOG_FOLDER = "posts";
  const postIndex = await getEntry(BLOG_FOLDER, "-index");
  const posts = await getSinglePage(BLOG_FOLDER);
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / config.settings.pagination);
  const currentPosts = sortedPosts.slice(0, config.settings.pagination);
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { ...postIndex.data }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section"> <div class="container"> ${postIndex && renderTemplate`<div class="flex items-center pb-2"> <svg class="h-5 w-5 dark:invert lg:h-6 lg:w-6" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24.909 1.36799C22.078 4.06599 22.078 4.06599 21.812 3.85699C21.679 3.74299 21.375 3.60999 21.166 3.53399C20.71 3.40099 19.589 4.42699 10.735 13.11C8.22702 15.58 5.13002 18.62 3.83802 19.874L1.50102 22.154L1.33002 23.465C0.950018 26.524 0.741018 32.072 0.893018 34.618C1.10202 37.829 1.27302 38.114 2.75502 37.905C4.71202 37.658 8.87302 36.822 12.008 36.081L15.257 35.302L20.881 29.849C30.837 20.235 34.39 16.663 34.39 16.283C34.39 16.093 34.219 15.713 34.01 15.428C33.63 14.953 33.63 14.934 33.972 14.554C34.162 14.326 34.884 13.509 35.587 12.711C37.145 10.944 37.335 10.507 36.879 9.76599C36.366 8.92999 32.376 4.67399 30.419 2.88799C27.854 0.531992 27.17 -7.56853e-06 26.752 -7.56853e-06C26.543 -7.56853e-06 25.726 0.607992 24.909 1.36799ZM31.635 7.06799C32.262 7.73299 33.231 8.73999 33.782 9.32899L34.808 10.393L33.535 11.856C32.851 12.654 32.186 13.3 32.072 13.3C31.958 13.3 30.666 12.122 29.184 10.678C27.702 9.23399 25.859 7.48599 25.08 6.76399L23.655 5.45299L25.251 3.97099L26.847 2.48899L28.671 4.17999C29.678 5.11099 31.008 6.40299 31.635 7.06799ZM18.943 10.83C14.326 15.485 13.11 16.853 13.11 17.404C13.11 17.879 13.718 18.62 14.079 18.62C14.193 18.62 16.473 16.397 19.152 13.661L24.035 8.72099L24.662 9.25299L25.289 9.78499L23.617 11.495C22.686 12.445 20.368 14.915 18.449 17.005C16.511 19.095 14.231 21.546 13.357 22.458C11.723 24.187 11.476 24.738 12.084 25.346C12.844 26.125 13.167 25.84 18.145 20.425C20.919 17.404 25.669 12.369 26.296 11.799L26.79 11.343L27.626 12.084C28.082 12.483 28.481 12.901 28.481 12.996C28.5 13.091 26.144 15.466 23.294 18.278C20.425 21.09 18.012 23.56 17.955 23.769C17.765 24.339 18.335 25.08 18.943 25.08C19.342 25.08 20.463 24.073 24.719 19.855C27.607 16.986 30.058 14.63 30.153 14.63C30.248 14.63 30.666 14.972 31.065 15.39L31.825 16.169L27.93 20.007C22.781 25.099 15.219 32.376 14.991 32.452C14.383 32.68 5.62402 24.871 4.38902 23.009C4.08502 22.553 4.10402 22.534 9.12002 17.613C11.894 14.915 15.732 11.21 17.632 9.36699L21.128 6.04199L21.774 6.66899L22.42 7.29599L18.943 10.83ZM10.963 32.205C11.932 32.927 12.711 33.573 12.711 33.63C12.73 33.725 8.22702 34.789 7.88502 34.77C7.79002 34.77 7.14402 34.238 6.46002 33.611C5.77602 32.984 4.73102 32.091 4.14202 31.597L3.04002 30.723V29.184C3.04002 28.329 3.09702 27.075 3.17302 26.372L3.28702 25.08L6.25102 27.987C7.88502 29.564 10.013 31.464 10.963 32.205ZM4.90202 35.359C4.76902 35.416 4.29402 35.53 3.85702 35.606L3.04002 35.72V34.58V33.421L4.08502 34.314C4.78802 34.922 5.05402 35.264 4.90202 35.359Z" fill="black"></path> </svg> <h2 class="section-title ml-3">${unescapeHTML(markdownify(postIndex.data.title))}</h2> </div>`} ${currentPosts.map((post) => renderTemplate`<div class="post-card group mt-9"> <a${addAttribute(`/posts/${post.slug}`, "href")} class="flex flex-wrap items-center justify-between p-6 md:px-8 lg:px-12"> <div class="basis-full lg:mr-10 lg:basis-1/6"> ${post.data.image ? renderTemplate`${renderComponent($$result2, "ImageMod", $$ImageMod, { "src": post.data.image, "height": 138, "width": 184, "alt": post.data.title, "class": "rounded-lg" })}` : renderTemplate`<p class="mb-3 pt-1 text-sm text-gray-400 lg:mb-1"> ${dateFormat(post.data.date, "dd MMM, yyyy")} </p>`} </div> <div class="basis-11/12 lg:basis-4/6"> ${post.data.image && renderTemplate`<p class="mb-1 pt-1 text-sm text-gray-400"> ${dateFormat(post.data.date, "dd MMM, yyyy")} </p>`} <h3 class="text-h5 font-medium leading-relaxed md:text-h4 xl:text-h3"> ${post.data.title} </h3> </div> <span class="ml-2 mt-4 -translate-x-2 text-base font-normal transition-all group-hover:translate-x-0 group-hover:opacity-100 md:mt-0 md:-translate-y-5 md:pt-3 md:text-3xl md:opacity-0 lg:ml-auto lg:-translate-y-1"> ${renderComponent($$result2, "BsArrowRight", BsArrowRight, {})} </span> </a> </div>`)} </div> ${renderComponent($$result2, "Pagination", $$Pagination, { "section": BLOG_FOLDER, "currentPage": 1, "totalPages": totalPages })} </section> ` })}`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/posts/index.astro", void 0);

const $$file$1 = "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/posts/index.astro";
const $$url$1 = "/posts";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const ScrollAnimationSection = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("span", { className: "absolute left-0 top-1/2 -z-10 opacity-5 dark:invert md:opacity-100", children: /* @__PURE__ */ jsx(
      ScrollAnimation,
      {
        animateIn: "triggerAnimation",
        duration: 0,
        delay: 50,
        animateOnce: true,
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "animate-svg",
            width: "161",
            height: "50",
            viewBox: "0 0 161 50",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M158 43.4387L142.61 46.7689C140.228 47.3239 132.716 48.5125 142.06 27.8978C144.289 22.9811 141.181 16.6862 124.472 20.6825C114.212 22.9026 93.1418 28.1151 84.8972 30.1965C77.7518 32.0003 58.5142 37.9669 48.6206 40.6638L43.6738 41.7738C40.3759 42.4071 35.4291 42.4071 41.4752 32.8933C47.4123 23.551 55.9492 11.0621 59.0638 5.69686C60.3463 3.66174 60.1631 0.81259 49.1702 5.69686C38.1773 10.5811 13.8097 19.9428 3 24.0131",
                stroke: "black",
                strokeWidth: "5",
                strokeLinecap: "round"
              }
            )
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("span", { className: "absolute top-1/2 right-0 -z-10 opacity-5 dark:invert md:opacity-100", children: /* @__PURE__ */ jsx(
      ScrollAnimation,
      {
        animateIn: "triggerAnimation",
        duration: 0,
        delay: 50,
        animateOnce: true,
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "animate-svg",
            width: "167",
            height: "73",
            viewBox: "0 0 167 73",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M3.40968 32.3777C18.9185 17.6749 58.1541 -7.83218 91.0255 7.76112C95.8535 10.0332 107.5 17.4991 115.464 29.1862C119.671 34.7333 126.526 48.6871 120.287 60.1254C116.456 66.9165 101.635 75.3036 94.9378 64.9905C92.4958 61.2298 91.6035 53.0465 99.8305 44.544C104.919 39.2852 111.327 34.9017 117.382 32.487C124.848 29.5099 136.743 26.996 164.042 30.6427",
                stroke: "black",
                strokeWidth: "5",
                strokeLinecap: "round"
              }
            )
          }
        )
      }
    ) })
  ] });
};

const $$CallToAction = createComponent(async ($$result, $$props, $$slots) => {
  const CTA = await getEntry("sections", "call-to-action");
  const { enable, title, description, button } = CTA.data;
  return renderTemplate`${enable && renderTemplate`${maybeRenderHead()}<section class="relative mx-auto max-w-[1460px]"><div class="container">${renderComponent($$result, "Divider", $$Divider, {})}<div class="section mx-auto overflow-hidden text-center md:w-[75%] lg:w-[80%] xl:w-[62%] 2xl:w-[58%]"><div class="before:content[' '] after:content[' '] relative mb-8 inline-flex items-center justify-center before:absolute before:left-full before:top-1/2 before:mx-4 before:bg-black before:px-8  before:py-px after:absolute after:right-full after:top-1/2 after:mx-4 after:bg-black after:px-8 after:py-px dark:before:bg-white dark:after:bg-white"><svg class="dark:invert"${addAttribute(28, "height")}${addAttribute(28, "width")} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_173_28)"><path d="M35.682 2.56496C35.34 3.03996 35.017 3.41996 34.96 3.41996C34.884 3.41996 34.238 3.21096 33.478 2.96396C29.982 1.76696 26.79 1.57696 24.415 2.43196C22.097 3.28696 19.551 5.45296 17.898 8.01796L17.195 9.11996H15.2C13.034 9.10096 11.248 8.91096 8.77798 8.43596C7.65698 8.20796 7.06798 8.16996 6.78298 8.30296C6.30798 8.53096 4.44598 11.704 3.13498 14.516C1.53898 17.955 -0.133023 23.769 0.0379773 25.251C0.113977 25.878 1.42498 26.562 3.87598 27.265C6.44098 27.987 7.82798 28.177 10.83 28.177C13.794 28.158 17.271 27.607 17.879 27.056C18.05 26.904 18.468 25.897 18.81 24.833C19.152 23.769 19.665 22.249 19.969 21.451L20.52 20.007L21.717 20.178C23.142 20.368 24.111 20.558 27.037 21.223C28.994 21.679 29.26 21.774 29.26 22.116C29.26 22.344 28.918 25.251 28.5 28.595C28.082 31.939 27.74 34.865 27.74 35.093C27.74 36.024 29.089 36.67 29.64 36.005C29.773 35.834 30.077 34.162 30.324 32.243C30.552 30.343 30.932 27.284 31.16 25.46C32.376 15.637 34.01 9.84196 36.955 4.82596C37.525 3.85696 38 2.92596 38 2.77396C38 2.31796 37.297 1.70996 36.765 1.70996C36.404 1.70996 36.119 1.93796 35.682 2.56496ZM31.122 4.57896C32.851 5.05396 33.82 5.45296 33.82 5.69996C33.82 5.81396 33.611 6.30796 33.364 6.80196C32.3 8.94896 31.084 12.863 30.229 16.929C29.868 18.62 29.621 19.456 29.469 19.418C23.009 17.955 21.166 17.67 18.107 17.67H15.789L16.283 16.473C17.157 14.288 18.943 10.697 19.836 9.32896C22.781 4.78796 26.315 3.28696 31.122 4.57896ZM9.76598 10.925C10.621 11.077 12.35 11.286 13.604 11.362L15.903 11.495L15.295 12.92C12.73 18.81 11.97 20.786 11.97 21.489C11.97 22.401 12.293 23.199 13.186 24.529C13.642 25.194 13.794 25.612 13.68 25.726C13.414 25.992 8.32198 25.954 6.83998 25.669C6.15598 25.555 4.90198 25.213 4.04698 24.947C2.18498 24.358 2.24198 24.548 3.02098 21.565C3.85698 18.354 5.71898 13.984 7.40998 11.248C7.84698 10.545 7.77098 10.545 9.76598 10.925ZM18.05 20.007C18.05 20.121 16.511 24.396 16.454 24.472C16.264 24.643 15.713 24.149 15.124 23.256C13.984 21.546 14.25 20.558 16.017 20.14C16.644 19.988 18.05 19.893 18.05 20.007Z" fill="black"></path></g><defs><clipPath id="clip0_173_28"><rect width="38" height="38" fill="white"></rect></clipPath></defs></svg><h2 class="section-title section-title-center ml-3 text-center h5">${unescapeHTML(markdownify(description))}</h2></div><h3 class="mb-10 text-[1.5rem] font-semibold capitalize md:text-h1">${title}</h3>${button.enable && renderTemplate`<a${addAttribute(button.link, "href")} class="btn">${button.label}</a>`}</div></div>${renderComponent($$result, "ScrollAnimationSection", ScrollAnimationSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/helpers/ScrollAnimationSection", "client:component-export": "default" })}</section>`}`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/layouts/partials/CallToAction.astro", void 0);

const $$HeroSection = createComponent(async ($$result, $$props, $$slots) => {
  const heroBanner = await getEntry("homepage", "-index");
  const { title, image, image_light, bio } = heroBanner?.data?.banner;
  return renderTemplate`${maybeRenderHead()}<section class="section banner pb-0"> <div class="container"> <div class="mb-16 flex flex-col items-center text-center md:flex-row md:text-left"> <div class="mt-12 md:mt-0"> <div class="mb-5 flex items-center justify-center font-primary md:justify-start"> <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"${addAttribute(38, "height")}${addAttribute(38, "width")} class="hidden dark:invert sm:inline"> <path d="M15.162 0.19003C8.77798 1.27303 3.13498 7.18203 1.00698 14.991C0.569977 16.606 0.512977 17.195 0.493977 19.95C0.474977 23.37 0.664977 24.415 1.70998 27.113C3.38198 31.464 7.48598 35.34 12.122 36.955C18.012 39.007 25.023 37.829 30.305 33.877C34.884 30.457 37.316 25.859 37.563 20.14C37.81 14.25 35.682 8.83503 31.559 4.88303C29.279 2.69803 27.189 1.69103 23.541 0.96903C22.458 0.76003 20.976 0.45603 20.235 0.28503C18.829 -0.0189702 16.644 -0.0569702 15.162 0.19003ZM20.235 3.24903C21.071 3.36303 22.135 3.47703 22.61 3.53403C23.731 3.62903 25.878 4.29403 27.056 4.88303C30.457 6.61203 32.908 9.89903 34.333 14.63C34.979 16.815 35.15 20.748 34.694 22.838C33.459 28.405 28.595 33.136 22.401 34.808C20.311 35.378 16.34 35.416 14.44 34.884C10.431 33.782 6.82098 31.179 4.88298 28.006C3.68598 26.011 3.19198 24.187 3.07798 21.375C2.98298 18.392 3.30598 16.264 4.27498 13.566C5.92798 8.93003 9.46198 5.01603 13.376 3.51503C14.345 3.13503 14.877 3.05903 16.625 3.05903C17.784 3.05903 19.399 3.15403 20.235 3.24903Z" fill="black"></path> <path d="M12.844 14.687C11.875 15.656 12.426 17.176 13.756 17.176C14.668 17.176 15.105 16.72 15.105 15.77C15.105 14.896 14.782 14.497 13.927 14.326C13.433 14.231 13.224 14.307 12.844 14.687Z" fill="black"></path> <path d="M23.009 14.763C21.945 15.656 22.553 17.29 23.94 17.29C24.491 17.29 24.757 17.176 24.966 16.872C25.954 15.485 24.282 13.718 23.009 14.763Z" fill="black"></path> <path d="M10.944 22.439C10.678 22.762 10.45 23.085 10.45 23.18C10.45 23.978 12.141 25.479 14.193 26.524C18.259 28.557 22.895 27.911 26.201 24.833C27.417 23.712 27.417 22.762 26.22 22.135C25.555 21.793 25.232 21.888 24.13 22.8C22.173 24.415 19.855 25.118 17.822 24.7C16.416 24.434 14.877 23.674 13.528 22.629C12.312 21.66 11.647 21.603 10.944 22.439Z" fill="black"></path> </svg> <h2 class="section-title ml-3">${unescapeHTML(markdownify(title))}</h2> </div> <h1 class="order-last text-[1.5rem] font-semibold md:order-first md:text-h1 2xl:text-[2.4rem]"> ${bio} </h1> </div> <div class="order-first mx-auto block w-1/2 text-center md:order-last md:w-[50%] lg:w-4/5 xl:w-[55%] 2xl:w-4/5"> ${renderComponent($$result, "ImageMod", $$ImageMod, { "class": "block dark:hidden", "src": image, "alt": "author", "width": 252, "height": 279, "format": "webp" })} ${renderComponent($$result, "ImageMod", $$ImageMod, { "class": "hidden dark:block", "src": image_light, "alt": "author", "width": 252, "height": 279, "format": "webp" })} </div> </div> </div> </section> <div class="mt-24"> ${renderComponent($$result, "Divider", $$Divider, {})} </div>`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/layouts/partials/HeroSection.astro", void 0);

const $$Posts = createComponent(async ($$result, $$props, $$slots) => {
  const BLOG_FOLDER = "posts";
  const postIndex = await getEntry(BLOG_FOLDER, "-index");
  const posts = await getSinglePage(BLOG_FOLDER);
  return renderTemplate`${maybeRenderHead()}<section${addAttribute("section", "class")}> <div class="container"> ${postIndex && renderTemplate`<div class="flex items-center pb-2"> <svg class="h-5 w-5 dark:invert lg:h-6 lg:w-6" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24.909 1.36799C22.078 4.06599 22.078 4.06599 21.812 3.85699C21.679 3.74299 21.375 3.60999 21.166 3.53399C20.71 3.40099 19.589 4.42699 10.735 13.11C8.22702 15.58 5.13002 18.62 3.83802 19.874L1.50102 22.154L1.33002 23.465C0.950018 26.524 0.741018 32.072 0.893018 34.618C1.10202 37.829 1.27302 38.114 2.75502 37.905C4.71202 37.658 8.87302 36.822 12.008 36.081L15.257 35.302L20.881 29.849C30.837 20.235 34.39 16.663 34.39 16.283C34.39 16.093 34.219 15.713 34.01 15.428C33.63 14.953 33.63 14.934 33.972 14.554C34.162 14.326 34.884 13.509 35.587 12.711C37.145 10.944 37.335 10.507 36.879 9.76599C36.366 8.92999 32.376 4.67399 30.419 2.88799C27.854 0.531992 27.17 -7.56853e-06 26.752 -7.56853e-06C26.543 -7.56853e-06 25.726 0.607992 24.909 1.36799ZM31.635 7.06799C32.262 7.73299 33.231 8.73999 33.782 9.32899L34.808 10.393L33.535 11.856C32.851 12.654 32.186 13.3 32.072 13.3C31.958 13.3 30.666 12.122 29.184 10.678C27.702 9.23399 25.859 7.48599 25.08 6.76399L23.655 5.45299L25.251 3.97099L26.847 2.48899L28.671 4.17999C29.678 5.11099 31.008 6.40299 31.635 7.06799ZM18.943 10.83C14.326 15.485 13.11 16.853 13.11 17.404C13.11 17.879 13.718 18.62 14.079 18.62C14.193 18.62 16.473 16.397 19.152 13.661L24.035 8.72099L24.662 9.25299L25.289 9.78499L23.617 11.495C22.686 12.445 20.368 14.915 18.449 17.005C16.511 19.095 14.231 21.546 13.357 22.458C11.723 24.187 11.476 24.738 12.084 25.346C12.844 26.125 13.167 25.84 18.145 20.425C20.919 17.404 25.669 12.369 26.296 11.799L26.79 11.343L27.626 12.084C28.082 12.483 28.481 12.901 28.481 12.996C28.5 13.091 26.144 15.466 23.294 18.278C20.425 21.09 18.012 23.56 17.955 23.769C17.765 24.339 18.335 25.08 18.943 25.08C19.342 25.08 20.463 24.073 24.719 19.855C27.607 16.986 30.058 14.63 30.153 14.63C30.248 14.63 30.666 14.972 31.065 15.39L31.825 16.169L27.93 20.007C22.781 25.099 15.219 32.376 14.991 32.452C14.383 32.68 5.62402 24.871 4.38902 23.009C4.08502 22.553 4.10402 22.534 9.12002 17.613C11.894 14.915 15.732 11.21 17.632 9.36699L21.128 6.04199L21.774 6.66899L22.42 7.29599L18.943 10.83ZM10.963 32.205C11.932 32.927 12.711 33.573 12.711 33.63C12.73 33.725 8.22702 34.789 7.88502 34.77C7.79002 34.77 7.14402 34.238 6.46002 33.611C5.77602 32.984 4.73102 32.091 4.14202 31.597L3.04002 30.723V29.184C3.04002 28.329 3.09702 27.075 3.17302 26.372L3.28702 25.08L6.25102 27.987C7.88502 29.564 10.013 31.464 10.963 32.205ZM4.90202 35.359C4.76902 35.416 4.29402 35.53 3.85702 35.606L3.04002 35.72V34.58V33.421L4.08502 34.314C4.78802 34.922 5.05402 35.264 4.90202 35.359Z" fill="black"></path> </svg> <h2 class="section-title ml-3">${unescapeHTML(markdownify(postIndex.data.title))}</h2> </div>`} ${posts.map((post) => renderTemplate`<div class="post-card group mt-9"> <a${addAttribute(`/posts/${post.slug}`, "href")} class="flex flex-wrap items-center justify-between p-6 md:px-8 lg:px-12"> <div class="basis-full lg:mr-10 lg:basis-1/6"> ${post.data.image ? renderTemplate`${renderComponent($$result, "ImageMod", $$ImageMod, { "src": post.data.image, "height": 138, "width": 184, "alt": post.data.title, "class": "rounded-lg" })}` : renderTemplate`<p class="mb-3 pt-1 text-sm text-gray-400 lg:mb-1"> ${dateFormat(post.data.date, "dd MMM, yyyy")} </p>`} </div> <div class="basis-11/12 lg:basis-4/6"> ${post.data.image && renderTemplate`<p class="mb-1 pt-1 text-sm text-gray-400"> ${dateFormat(post.data.date, "dd MMM, yyyy")} </p>`} <h3 class="text-h5 font-medium leading-relaxed md:text-h4 xl:text-h3"> ${post.data.title} </h3> </div> <span class="ml-2 mt-4 -translate-x-2 text-base font-normal transition-all group-hover:translate-x-0 group-hover:opacity-100 md:mt-0 md:-translate-y-5 md:pt-3 md:text-3xl md:opacity-0 lg:ml-auto lg:-translate-y-1"> ${renderComponent($$result, "BsArrowRight", BsArrowRight, {})} </span> </a> </div>`)} </div> </section>`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/layouts/partials/Posts.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroSection", $$HeroSection, {})} ${renderComponent($$result2, "Posts", $$Posts, {})} ${renderComponent($$result2, "CallToAction", $$CallToAction, {})} ` })}`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/index.astro", void 0);

const $$file = "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index$1 as a, index as b, index$2 as i };
