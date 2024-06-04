import { _ as __astro_tag_component__, i as Fragment, w as createVNode } from './astro_DG7-IQXY.mjs';
import '@astrojs/internal-helpers/path';
import './astro/assets-service_CJeNPXlp.mjs';
import { h as humanize, d as $$Image } from './pages/404_B3u-Bemm.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
/* empty css                                    */
import { marked } from 'marked';
import 'clsx';

const Button = ({
  label,
  link,
  style,
  rel
}) => {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: link,
      target: "_blank",
      rel: `noopener noreferrer ${rel ? rel === "follow" ? "" : rel : "nofollow"}`,
      class: `btn mb-4 me-4 hover:text-white dark:hover:text-black hover:no-underline ${style === "outline" ? "btn-outline-primary" : "btn-primary"}`,
      children: label
    }
  );
};

const Accordion = ({
  title,
  children,
  className
}) => {
  const [show, setShow] = useState(false);
  return /* @__PURE__ */ jsxs("div", { class: `accordion ${show && "active"} ${className}`, children: [
    /* @__PURE__ */ jsxs("button", { class: "accordion-header", onClick: () => setShow(!show), children: [
      title,
      /* @__PURE__ */ jsx(
        "svg",
        {
          class: "accordion-icon",
          x: "0px",
          y: "0px",
          viewBox: "0 0 512 512",
          xmlSpace: "preserve",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              fill: "currentColor",
              d: "M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { class: "accordion-content", children })
  ] });
};

function Notice({
  type,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { class: `notice ${type}`, children: [
    /* @__PURE__ */ jsxs("div", { class: "notice-head", children: [
      type === "tip" ? /* @__PURE__ */ jsx(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2.4C6.69807 2.4 2.4 6.69807 2.4 12C2.4 17.3019 6.69807 21.6 12 21.6C17.3019 21.6 21.6 17.3019 21.6 12C21.6 6.69807 17.3019 2.4 12 2.4ZM15.9515 7.55147L9.6 13.9029L8.04853 12.3515C7.5799 11.8828 6.8201 11.8828 6.35147 12.3515C5.88284 12.8201 5.88284 13.5799 6.35147 14.0485L8.75147 16.4485C9.2201 16.9172 9.9799 16.9172 10.4485 16.4485L17.6485 9.24853C18.1172 8.7799 18.1172 8.0201 17.6485 7.55147C17.1799 7.08284 16.4201 7.08284 15.9515 7.55147Z",
              fill: "currentColor"
            }
          )
        }
      ) : type === "info" ? /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 18 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M9.16109 0.993016C9.97971 1.03952 10.6611 1.42989 11.0721 2.22339L17.7981 15.8014C18.4502 17.1739 17.4403 19.0208 15.7832 19.0474H2.23859C0.730337 19.0234 -0.507163 17.3108 0.231587 15.7864L7.08321 2.20877C7.21146 1.96502 7.26996 1.89452 7.38059 1.76664C7.82534 1.25102 8.31171 0.975016 9.16109 0.993016ZM9.05046 2.49189C8.79284 2.50464 8.55696 2.64902 8.42834 2.87327C6.06134 7.36539 3.77946 11.9036 1.56546 16.4734C1.36071 16.9328 1.71209 17.5223 2.22621 17.547C6.74871 17.6201 11.2731 17.6201 15.7956 17.547C16.2925 17.523 16.666 16.953 16.459 16.4783C14.2866 11.9093 12.0471 7.37102 9.72171 2.87814C9.58446 2.63402 9.38309 2.48739 9.05046 2.49189Z",
                fill: "currentColor"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M9.61323 13.2153H8.35773L8.21973 7.04688H9.75723L9.61323 13.2153ZM8.17773 15.1015C8.17773 14.8731 8.25161 14.6841 8.39973 14.5338C8.54823 14.3838 8.75036 14.3084 9.00648 14.3084C9.26298 14.3084 9.46511 14.3838 9.61323 14.5338C9.76136 14.6841 9.83561 14.8731 9.83561 15.1015C9.83561 15.3216 9.76323 15.5057 9.61923 15.6539C9.47486 15.802 9.27086 15.8762 9.00648 15.8762C8.74211 15.8762 8.53811 15.802 8.39373 15.6539C8.24973 15.5057 8.17773 15.3216 8.17773 15.1015Z",
                fill: "currentColor"
              }
            )
          ]
        }
      ) : type === "warning" ? /* @__PURE__ */ jsx(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M10 0C15.522 0 20 4.478 20 10C20 15.522 15.522 20 10 20C4.478 20 0 15.522 0 10C0 4.478 4.478 0 10 0ZM10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18C14.411 18 18 14.411 18 10C18 5.589 14.411 2 10 2ZM12.293 6.293L13.707 7.707L11.414 10L13.707 12.293L12.293 13.707L10 11.414L7.707 13.707L6.293 12.293L8.586 10L6.293 7.707L7.707 6.293L10 8.586L12.293 6.293Z",
              fill: "currentColor"
            }
          )
        }
      ) : /* @__PURE__ */ jsx(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M10 9V14M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19ZM10.0498 6V6.1L9.9502 6.1002V6H10.0498Z",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("p", { class: "my-0 ml-1.5", children: humanize(type) })
    ] }),
    /* @__PURE__ */ jsx("div", { class: "notice-body", children })
  ] });
}

function Video({
  title,
  width = 500,
  height = "auto",
  src,
  ...rest
}) {
  return /* @__PURE__ */ jsxs(
    "video",
    {
      class: "overflow-hidden rounded-lg",
      width,
      height,
      controls: true,
      ...rest,
      children: [
        /* @__PURE__ */ jsx(
          "source",
          {
            src: src.match(/^http/) ? src : `/videos/${src}`,
            type: "video/mp4"
          }
        ),
        title
      ]
    }
  );
}

const Youtube = ({
  id,
  title,
  ...rest
}) => {
  return /* @__PURE__ */ jsx(
    LiteYouTubeEmbed,
    {
      wrapperClass: "yt-lite rounded-lg",
      id,
      title,
      ...rest
    }
  );
};

const Tabs = ({ children }) => {
  const [active, setActive] = useState(0);
  const [defaultFocus, setDefaultFocus] = useState(false);
  const tabRefs = useRef([]);
  useEffect(() => {
    if (defaultFocus) {
      tabRefs.current[active]?.focus();
    } else {
      setDefaultFocus(true);
    }
  }, [active]);
  const tabLinks = Array.from(
    children.props.value.matchAll(
      /<div\s+data-name="([^"]+)"[^>]*>(.*?)<\/div>/gs
    ),
    (match) => ({ name: match[1], children: match[0] })
  );
  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      setActive(index);
    } else if (event.key === "ArrowRight") {
      setActive((active + 1) % tabLinks.length);
    } else if (event.key === "ArrowLeft") {
      setActive((active - 1 + tabLinks.length) % tabLinks.length);
    }
  };
  return /* @__PURE__ */ jsxs("div", { class: "tab", children: [
    /* @__PURE__ */ jsx("ul", { class: "tab-nav", children: tabLinks.map(
      (item, index) => /* @__PURE__ */ jsx(
        "li",
        {
          class: `tab-nav-item ${index === active && "active"}`,
          role: "tab",
          tabIndex: index === active ? 0 : -1,
          onKeyDown: (event) => handleKeyDown(event, index),
          onClick: () => setActive(index),
          ref: (ref) => tabRefs.current[index] = ref,
          children: item.name
        },
        index
      )
    ) }),
    tabLinks.map((item, i) => /* @__PURE__ */ jsx(
      "div",
      {
        class: active === i ? "tab-content block px-5" : "hidden",
        dangerouslySetInnerHTML: {
          __html: marked.parse(item.children)
        }
      },
      i
    ))
  ] });
};

function Tab({ name, children }) {
  return /* @__PURE__ */ jsx("div", { "data-name": name, children });
}

const frontmatter = {
  "title": "Elements",
  "meta_title": "",
  "description": "this is meta description",
  "draft": false
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "heading-1",
    "text": "Heading 1"
  }, {
    "depth": 2,
    "slug": "heading-2",
    "text": "Heading 2"
  }, {
    "depth": 3,
    "slug": "heading-3",
    "text": "Heading 3"
  }, {
    "depth": 4,
    "slug": "heading-4",
    "text": "Heading 4"
  }, {
    "depth": 5,
    "slug": "heading-5",
    "text": "Heading 5"
  }, {
    "depth": 6,
    "slug": "heading-6",
    "text": "Heading 6"
  }, {
    "depth": 3,
    "slug": "paragraph",
    "text": "Paragraph"
  }, {
    "depth": 3,
    "slug": "emphasis",
    "text": "Emphasis"
  }, {
    "depth": 3,
    "slug": "link",
    "text": "Link"
  }, {
    "depth": 3,
    "slug": "ordered-list",
    "text": "Ordered List"
  }, {
    "depth": 3,
    "slug": "unordered-list",
    "text": "Unordered List"
  }, {
    "depth": 3,
    "slug": "code-and-syntax-highlighting",
    "text": "Code and Syntax Highlighting"
  }, {
    "depth": 4,
    "slug": "html",
    "text": "HTML"
  }, {
    "depth": 4,
    "slug": "css",
    "text": "CSS"
  }, {
    "depth": 4,
    "slug": "javascript",
    "text": "JavaScript"
  }, {
    "depth": 3,
    "slug": "button",
    "text": "Button"
  }, {
    "depth": 3,
    "slug": "quote",
    "text": "Quote"
  }, {
    "depth": 3,
    "slug": "notice",
    "text": "Notice"
  }, {
    "depth": 3,
    "slug": "tab",
    "text": "Tab"
  }, {
    "depth": 4,
    "slug": "did-you-come-here-for-something-in-particular",
    "text": "Did you come here for something in particular?"
  }, {
    "depth": 4,
    "slug": "i-wanna-talk-about-the-assassination-attempt",
    "text": "I wanna talk about the assassination attempt"
  }, {
    "depth": 4,
    "slug": "we-know-youre-dealing-in-stolen-ore",
    "text": "We know you\u2019re dealing in stolen ore"
  }, {
    "depth": 3,
    "slug": "table",
    "text": "Table"
  }, {
    "depth": 3,
    "slug": "accordion",
    "text": "Accordion"
  }, {
    "depth": 3,
    "slug": "image",
    "text": "Image"
  }, {
    "depth": 3,
    "slug": "youtube-video",
    "text": "Youtube video"
  }, {
    "depth": 3,
    "slug": "custom-video",
    "text": "Custom video"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    a: "a",
    blockquote: "blockquote",
    code: "code",
    em: "em",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    hr: "hr",
    img: "img",
    li: "li",
    ol: "ol",
    p: "p",
    pre: "pre",
    span: "span",
    strong: "strong",
    table: "table",
    tbody: "tbody",
    td: "td",
    th: "th",
    thead: "thead",
    tr: "tr",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "heading-1",
      children: "Heading 1"
    }), "\n", createVNode(_components.h2, {
      id: "heading-2",
      children: "Heading 2"
    }), "\n", createVNode(_components.h3, {
      id: "heading-3",
      children: "Heading 3"
    }), "\n", createVNode(_components.h4, {
      id: "heading-4",
      children: "Heading 4"
    }), "\n", createVNode(_components.h5, {
      id: "heading-5",
      children: "Heading 5"
    }), "\n", createVNode(_components.h6, {
      id: "heading-6",
      children: "Heading 6"
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "paragraph",
      children: "Paragraph"
    }), "\n", createVNode(_components.p, {
      children: "Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you\u2019re dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Could someone survive inside a transporter buffer for 75 years? Fate. It protects fools, little children, and ships."
    }), "\n", createVNode(_components.p, {
      children: "Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you\u2019re dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Could someone survive inside a transporter buffer for 75 years? Fate. It protects fools, little children, and ships."
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "emphasis",
      children: "Emphasis"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["Did you come here for something in ", createVNode(_components.strong, {
            children: "particular"
          }), " or just general"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["Did you come here for something in ", createVNode("ins", {
            children: "particular"
          })]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: createVNode(_components.em, {
            children: "Did you come here"
          })
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["Did you come here for ", createVNode(_components.strong, {
            children: "something"
          }), " in particular"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Did you come here for something in particular"
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Did you come here for something in particular"
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["URLs and URLs in angle brackets will automatically get turned into links. ", createVNode(_components.a, {
            href: "http://www.example.com",
            children: "http://www.example.com"
          }), " or"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.a, {
            href: "http://www.example.com",
            children: "http://www.example.com"
          }), " and sometimes example.com (but not on Github, for example)."]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "link",
      children: "Link"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "https://www.google.com",
        children: "I\u2019m an inline-style link"
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "https://www.google.com",
        title: "Google's Homepage",
        children: "I\u2019m an inline-style link with title"
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "https://www.themefisher.com",
        children: "I\u2019m a reference-style link"
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "../blob/master/LICENSE",
        children: "I\u2019m a relative reference to a repository file"
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "https://gethugothemes.com",
        children: "You can use numbers for reference-style link definitions"
      })
    }), "\n", createVNode(_components.p, {
      children: ["Or leave it empty and use the ", createVNode(_components.a, {
        href: "https://www.getjekyllthemes.com",
        children: "link text itself"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "example.com (but not on Github, for example)."
    }), "\n", createVNode(_components.p, {
      children: "Some text to show that the reference links can follow later."
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "ordered-list",
      children: "Ordered List"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "List item"
      }), "\n", createVNode(_components.li, {
        children: "List item"
      }), "\n", createVNode(_components.li, {
        children: "List item"
      }), "\n", createVNode(_components.li, {
        children: "List item"
      }), "\n", createVNode(_components.li, {
        children: "List item"
      }), "\n"]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "unordered-list",
      children: "Unordered List"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "List item"
      }), "\n", createVNode(_components.li, {
        children: "List item"
      }), "\n", createVNode(_components.li, {
        children: "List item"
      }), "\n", createVNode(_components.li, {
        children: "List item"
      }), "\n", createVNode(_components.li, {
        children: "List item"
      }), "\n"]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "code-and-syntax-highlighting",
      children: "Code and Syntax Highlighting"
    }), "\n", createVNode(_components.h4, {
      id: "html",
      children: "HTML"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code one-dark-pro",
      style: {
        backgroundColor: "#282c34",
        color: "#abb2bf",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      },
      tabindex: "0",
      "data-language": "html",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "<"
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "ul"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ">"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "  <"
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "li"
          }), createVNode(_components.span, {
            style: {
              color: "#D19A66"
            },
            children: " class"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#98C379"
            },
            children: '"nav-item"'
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ">"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "    <"
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "a"
          }), createVNode(_components.span, {
            style: {
              color: "#D19A66"
            },
            children: " class"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#98C379"
            },
            children: '"nav-link"'
          }), createVNode(_components.span, {
            style: {
              color: "#D19A66"
            },
            children: " href"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#98C379"
            },
            children: '"/"'
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ">Home</"
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "a"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ">"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "  </"
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "li"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ">"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "  <"
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "li"
          }), createVNode(_components.span, {
            style: {
              color: "#D19A66"
            },
            children: " class"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#98C379"
            },
            children: '"nav-item"'
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ">"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "    <"
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "a"
          }), createVNode(_components.span, {
            style: {
              color: "#D19A66"
            },
            children: " class"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#98C379"
            },
            children: '"nav-link"'
          }), createVNode(_components.span, {
            style: {
              color: "#D19A66"
            },
            children: " href"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#98C379"
            },
            children: '"about/"'
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ">About</"
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "a"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ">"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "  </"
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "li"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ">"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "</"
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "ul"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ">"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line"
        })]
      })
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h4, {
      id: "css",
      children: "CSS"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code one-dark-pro",
      style: {
        backgroundColor: "#282c34",
        color: "#abb2bf",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      },
      tabindex: "0",
      "data-language": "css",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "img"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: " {"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "  vertical-align: "
          }), createVNode(_components.span, {
            style: {
              color: "#D19A66"
            },
            children: "middle"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ";"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "  border: "
          }), createVNode(_components.span, {
            style: {
              color: "#D19A66"
            },
            children: "0"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ";"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "  max-width: "
          }), createVNode(_components.span, {
            style: {
              color: "#D19A66"
            },
            children: "100"
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "%"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ";"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "  height: "
          }), createVNode(_components.span, {
            style: {
              color: "#D19A66"
            },
            children: "auto"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ";"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "}"
          })
        }), "\n", createVNode(_components.span, {
          class: "line"
        })]
      })
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h4, {
      id: "javascript",
      children: "JavaScript"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code one-dark-pro",
      style: {
        backgroundColor: "#282c34",
        color: "#abb2bf",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      },
      tabindex: "0",
      "data-language": "javascript",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E5C07B"
            },
            children: "window"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "."
          }), createVNode(_components.span, {
            style: {
              color: "#61AFEF"
            },
            children: "addEventListener"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#98C379"
            },
            children: '"load"'
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ", ("
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75",
              fontStyle: "italic"
            },
            children: "e"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ") "
          }), createVNode(_components.span, {
            style: {
              color: "#C678DD"
            },
            children: "=>"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: " {"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E5C07B"
            },
            children: "  document"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "."
          }), createVNode(_components.span, {
            style: {
              color: "#61AFEF"
            },
            children: "querySelector"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#98C379"
            },
            children: '".preloader"'
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ")."
          }), createVNode(_components.span, {
            style: {
              color: "#E5C07B"
            },
            children: "style"
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "."
          }), createVNode(_components.span, {
            style: {
              color: "#E06C75"
            },
            children: "display"
          }), createVNode(_components.span, {
            style: {
              color: "#56B6C2"
            },
            children: " ="
          }), createVNode(_components.span, {
            style: {
              color: "#98C379"
            },
            children: ' "none"'
          }), createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: ";"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#ABB2BF"
            },
            children: "});"
          })
        }), "\n", createVNode(_components.span, {
          class: "line"
        })]
      })
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "button",
      children: "Button"
    }), "\n", createVNode(Button, {
      label: "Button",
      link: "#",
      style: "solid"
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "quote",
      children: "Quote"
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: "Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once."
      }), "\n"]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "notice",
      children: "Notice"
    }), "\n", createVNode(Notice, {
      type: "note",
      children: "This is a simple note."
    }), "\n", createVNode(Notice, {
      type: "tip",
      children: "This is a simple note."
    }), "\n", createVNode(Notice, {
      type: "info",
      children: "This is a simple note."
    }), "\n", createVNode(Notice, {
      type: "warning",
      children: "This is a simple note."
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "tab",
      children: "Tab"
    }), "\n", createVNode(Tabs, {
      "client:load": true,
      "client:component-path": "@/shortcodes/Tabs",
      "client:component-export": "default",
      "client:component-hydration": true,
      children: [createVNode(Tab, {
        name: "Tab 1",
        children: [createVNode(_components.h4, {
          id: "did-you-come-here-for-something-in-particular",
          children: "Did you come here for something in particular?"
        }), createVNode(_components.p, {
          children: "Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you\u2019re dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf."
        })]
      }), createVNode(Tab, {
        name: "Tab 2",
        children: [createVNode(_components.h4, {
          id: "i-wanna-talk-about-the-assassination-attempt",
          children: "I wanna talk about the assassination attempt"
        }), createVNode(_components.p, {
          children: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        }), createVNode(_components.p, {
          children: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        })]
      }), createVNode(Tab, {
        name: "Tab 3",
        children: [createVNode(_components.h4, {
          id: "we-know-youre-dealing-in-stolen-ore",
          children: "We know you\u2019re dealing in stolen ore"
        }), createVNode(_components.p, {
          children: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        }), createVNode(_components.p, {
          children: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo"
        })]
      })]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "table",
      children: "Table"
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            style: {
              textAlign: "left"
            },
            children: "#"
          }), createVNode(_components.th, {
            style: {
              textAlign: "center"
            },
            children: "First"
          }), createVNode(_components.th, {
            style: {
              textAlign: "center"
            },
            children: "Last"
          }), createVNode(_components.th, {
            style: {
              textAlign: "right"
            },
            children: "Handle"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            style: {
              textAlign: "left"
            },
            children: "1"
          }), createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: "Row:1 Cell:1"
          }), createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: "Row:1 Cell:2"
          }), createVNode(_components.td, {
            style: {
              textAlign: "right"
            },
            children: "Row:1 Cell:3"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            style: {
              textAlign: "left"
            },
            children: "2"
          }), createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: "Row:2 Cell:1"
          }), createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: "Row:2 Cell:2"
          }), createVNode(_components.td, {
            style: {
              textAlign: "right"
            },
            children: "Row:2 Cell:3"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            style: {
              textAlign: "left"
            },
            children: "3"
          }), createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: "Row:3 Cell:1"
          }), createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: "Row:3 Cell:2"
          }), createVNode(_components.td, {
            style: {
              textAlign: "right"
            },
            children: "Row:3 Cell:3"
          })]
        })]
      })]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "accordion",
      children: "Accordion"
    }), "\n", createVNode(Accordion, {
      "client:load": true,
      title: "Why should you need to do this?",
      "client:component-path": "@/shortcodes/Accordion",
      "client:component-export": "default",
      "client:component-hydration": true,
      children: createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n"]
      })
    }), "\n", createVNode(Accordion, {
      "client:load": true,
      title: "How can I adjust Horizontal centering",
      "client:component-path": "@/shortcodes/Accordion",
      "client:component-export": "default",
      "client:component-hydration": true,
      children: createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n"]
      })
    }), "\n", createVNode(Accordion, {
      "client:load": true,
      title: "Should you use Negative margin?",
      "client:component-path": "@/shortcodes/Accordion",
      "client:component-export": "default",
      "client:component-hydration": true,
      children: createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n", createVNode(_components.li, {
          children: "This is a thing."
        }), "\n"]
      })
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "image",
      children: "Image"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "/images/image-placeholder.png",
        alt: "image"
      })
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "youtube-video",
      children: "Youtube video"
    }), "\n", createVNode(Youtube, {
      "client:load": true,
      id: "ZEe-IFezQok",
      title: "Youtube Video Test Title",
      "client:component-path": "@/shortcodes/Youtube",
      "client:component-export": "default",
      "client:component-hydration": true
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "custom-video",
      children: "Custom video"
    }), "\n", createVNode(Video, {
      width: "100%",
      src: "https://joy1.videvo.net/videvo_files/video/free/video0467/large_watermarked/_import_61516692993d77.04238324_preview.mp4"
    })]
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "/elements";
const file = "/Users/mehedi/Development/Projects/mehedisharif.com/src/content/pages/elements.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/mehedi/Development/Projects/mehedisharif.com/src/content/pages/elements.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
