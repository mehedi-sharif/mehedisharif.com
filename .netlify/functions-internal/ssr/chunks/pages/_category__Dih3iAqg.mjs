/* empty css                              */
import { d as createAstro, e as createComponent, r as renderTemplate, m as maybeRenderHead, h as renderComponent, g as addAttribute, A as AstroError, l as UnknownContentCollectionError, n as renderUniqueStylesheet, o as renderScriptElement, p as createHeadAndContent, u as unescapeHTML } from '../astro_DG7-IQXY.mjs';
import 'kleur/colors';
import { s as slugify, h as humanize, p as plainify, c as config, $ as $$ImageMod, a as $$Base } from './404_B3u-Bemm.mjs';
import { format } from 'date-fns';
import { FaRegUserCircle, FaRegFolder } from 'react-icons/fa';
import 'clsx';
import pLimit from 'p-limit';
import { prependForwardSlash } from '@astrojs/internal-helpers/path';

const dateFormat = (date, pattern = "dd MMM, yyyy") => {
  const dateObj = new Date(date);
  const output = format(dateObj, pattern);
  return output;
};

const $$Astro$1 = createAstro("https://mehedisharif.com/");
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const {
    summary_length,
    blog_folder
  } = config.settings;
  const { data } = Astro2.props;
  const { title, image, date, author, categories } = data.data;
  return renderTemplate`${maybeRenderHead()}<div class="bg-body dark:bg-darkmode-body"> ${image && renderTemplate`${renderComponent($$result, "ImageMod", $$ImageMod, { "class": "mb-6 w-full rounded", "src": image, "alt": title, "width": 445, "height": 230, "format": "webp" })}`} <h4 class="mb-3"> <a${addAttribute(`/${blog_folder}/${data.slug}`, "href")}> ${title} </a> </h4> <ul class="mb-4"> <li class="mr-4 inline-block"> <a${addAttribute(`/authors/${slugify(author)}`, "href")}> ${renderComponent($$result, "FaRegUserCircle", FaRegUserCircle, { "class": "mr-2 -mt-1 inline-block" })} ${humanize(author)} </a> </li> <li class="mr-4 inline-block"> ${renderComponent($$result, "FaRegFolder", FaRegFolder, { "class": "mr-2 -mt-1 inline-block" })} ${categories.map((category, index) => renderTemplate`<a${addAttribute(`/categories/${slugify(category)}`, "href")}> ${humanize(category)} ${index !== categories.length - 1 && ","} </a>`)} </li> ${date && renderTemplate`<li class="inline-block">${dateFormat(date)}</li>`} </ul> <p class="mb-6">${plainify(data.body?.slice(0, Number(summary_length)))}</p> <a class="btn btn-outline-primary btn-sm"${addAttribute(`/${blog_folder}/${data.slug}`, "href")}>
read more
</a> </div>`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/layouts/components/BlogCard.astro", void 0);

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://mehedisharif.com/", "ASSETS_PREFIX": undefined}, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
function createGetEntry({
  getEntryImport,
  getRenderEntryImport
}) {
  return async function getEntry(collectionOrLookupObject, _lookupId) {
    let collection, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection = collectionOrLookupObject;
      if (!_lookupId)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = _lookupId;
    } else {
      collection = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    const entryImport = await getEntryImport(collection, lookupId);
    if (typeof entryImport !== "function")
      return void 0;
    const entry = await entryImport();
    if (entry._internal.type === "content") {
      return {
        id: entry.id,
        slug: entry.slug,
        body: entry.body,
        collection: entry.collection,
        data: entry.data,
        async render() {
          return render({
            collection: entry.collection,
            id: entry.id,
            renderEntryImport: await getRenderEntryImport(collection, lookupId)
          });
        }
      };
    } else if (entry._internal.type === "data") {
      return {
        id: entry.id,
        collection: entry.collection,
        data: entry.data
      };
    }
    return void 0;
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/contact/-index.md": () => import('../-index_Dwvtg8kp.mjs'),"/src/content/homepage/-index.md": () => import('../-index_BxNxIMtA.mjs'),"/src/content/pages/elements.mdx": () => import('../elements_D-p0D7vt.mjs'),"/src/content/pages/privacy-policy.md": () => import('../privacy-policy_CIlSzn7S.mjs'),"/src/content/posts/-index.md": () => import('../-index_Bi9OTY8e.mjs'),"/src/content/posts/Hello.md": () => import('../Hello_C3kMdrgl.mjs'),"/src/content/posts/test.md": () => import('../test_CcsvFKlq.mjs'),"/src/content/posts/welcome-to-my-tales-from-a-young-serial-entrepreneur-s-odyssey.md": () => import('../welcome-to-my-tales-from-a-young-serial-entrepreneur-s-odyssey_NNSinaSj.mjs'),"/src/content/sections/call-to-action.md": () => import('../call-to-action_rIXcautZ.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"homepage":{"type":"content","entries":{"-index":"/src/content/homepage/-index.md"}},"contact":{"type":"content","entries":{"-index":"/src/content/contact/-index.md"}},"pages":{"type":"content","entries":{"privacy-policy":"/src/content/pages/privacy-policy.md","elements":"/src/content/pages/elements.mdx"}},"posts":{"type":"content","entries":{"-index":"/src/content/posts/-index.md","test":"/src/content/posts/test.md","hello":"/src/content/posts/Hello.md","welcome-to-my-tales-from-a-young-serial-entrepreneur-s-odyssey":"/src/content/posts/welcome-to-my-tales-from-a-young-serial-entrepreneur-s-odyssey.md"}},"sections":{"type":"content","entries":{"call-to-action":"/src/content/sections/call-to-action.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/contact/-index.md": () => import('../-index_DJiv0Ibw.mjs'),"/src/content/homepage/-index.md": () => import('../-index_BLI1yfvJ.mjs'),"/src/content/pages/elements.mdx": () => import('../elements_CSLwErXK.mjs'),"/src/content/pages/privacy-policy.md": () => import('../privacy-policy_CUAUQAc8.mjs'),"/src/content/posts/-index.md": () => import('../-index_CcEukH7m.mjs'),"/src/content/posts/Hello.md": () => import('../Hello_DGkemT0n.mjs'),"/src/content/posts/test.md": () => import('../test_C3n7XnIy.mjs'),"/src/content/posts/welcome-to-my-tales-from-a-young-serial-entrepreneur-s-odyssey.md": () => import('../welcome-to-my-tales-from-a-young-serial-entrepreneur-s-odyssey_BCzSQols.mjs'),"/src/content/sections/call-to-action.md": () => import('../call-to-action_C7zv6xL4.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const getEntry = createGetEntry({
	getEntryImport: createGlobLookup(collectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const getSinglePage = async (collectionName) => {
  const allPages = await getCollection(collectionName);
  const removeIndex = allPages.filter((data) => data.id.match(/^(?!-)/));
  const removeDrafts = removeIndex.filter((data) => !data.data.draft);
  return removeDrafts;
};
createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/lib/contentParser.astro", void 0);

const getTaxonomy = async (collection, name) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page) => page.data[name]);
  let taxonomies = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    for (let j = 0; j < categoryArray.length; j++) {
      taxonomies.push(slugify(categoryArray[j]));
    }
  }
  const taxonomy = [...new Set(taxonomies)];
  return taxonomy;
};
const getAllTaxonomy = async (collection, name) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page) => page.data[name]);
  let taxonomies = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    for (let j = 0; j < categoryArray.length; j++) {
      taxonomies.push(slugify(categoryArray[j]));
    }
  }
  return taxonomies;
};
createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/lib/taxonomyParser.astro", void 0);

const sortByDate = (array) => {
  const sortedArray = array.sort(
    (a, b) => new Date(b.data.date && b.data.date).valueOf() - new Date(a.data.date && a.data.date).valueOf()
  );
  return sortedArray;
};

const taxonomyFilter = (posts, name, key) => posts.filter(
  (post) => post.data[name].map((name2) => slugify(name2)).includes(key)
);

const $$Astro = createAstro("https://mehedisharif.com/");
async function getStaticPaths() {
  const BLOG_FOLDER = "blog";
  const categories = await getTaxonomy(BLOG_FOLDER, "categories");
  return categories.map((category) => {
    return {
      params: { category }
    };
  });
}
const $$category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$category;
  const { category } = Astro2.params;
  const BLOG_FOLDER = "blog";
  const posts = await getSinglePage(BLOG_FOLDER);
  const filterByCategories = taxonomyFilter(posts, "categories", category);
  const sortedPosts = sortByDate(filterByCategories);
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": category }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="section-sm pb-0"> <div class="container"> <div class="row"> ${sortedPosts.map((post) => renderTemplate`<div class="mb-14 md:col-6 lg:col-4"> ${renderComponent($$result2, "BlogCard", $$BlogCard, { "data": post })} </div>`)} </div> </div> </div> ` })}`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/categories/[category].astro", void 0);

const $$file = "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/categories/[category].astro";
const $$url = "/categories/[category]";

const _category_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$category,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _category_ as _, getEntry as a, getTaxonomy as b, getAllTaxonomy as c, dateFormat as d, getSinglePage as g, sortByDate as s };
