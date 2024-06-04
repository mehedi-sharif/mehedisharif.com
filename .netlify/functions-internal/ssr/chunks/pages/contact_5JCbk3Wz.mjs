/* empty css                              */
import { e as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead, g as addAttribute, u as unescapeHTML } from '../astro_DG7-IQXY.mjs';
import 'kleur/colors';
import { c as config, m as markdownify, a as $$Base } from './404_B3u-Bemm.mjs';
import { a as getEntry } from './_category__Dih3iAqg.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useRef } from 'react';

const { formsubmit_endpoint } = config.bio;
const ContactForm = () => {
  const [submitted, setSubmitted] = useState(null);
  const [loader, setLoader] = useState(false);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const formHandler = (e) => {
    e.preventDefault();
    const fullName = fullNameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const message = messageRef.current?.value.trim();
    if (!fullName || !email || !message) {
      setSubmitted(false);
      setLoader(false);
      return;
    }
    setLoader(true);
    fetch(`https://formsubmit.co/ajax/${formsubmit_endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _subject: "Message From Personal Website",
        name: fullName,
        email,
        message
      })
    }).then((response) => response.json()).then((data) => {
      setSubmitted(data.success);
      setLoader(false);
      setTimeout(() => {
        setSubmitted(null);
      }, 4e3);
      e.currentTarget.reset();
    }).catch((error) => {
      setSubmitted(error);
      setLoader(false);
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "form",
      {
        className: "text-base sm:text-h4",
        method: "POST",
        onSubmit: formHandler,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "form-inputs mb-16", children: [
            /* @__PURE__ */ jsx("span", { children: "Hi, My Name is" }),
            " ",
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "full_name",
                name: "full_name",
                ref: fullNameRef,
                className: "leading-0 w-full max-w-[300px] border-0 border-b border-black p-0 text-base focus:border-black focus:ring-0 dark:border-white dark:bg-transparent sm:text-h4",
                placeholder: "type here"
              }
            ),
            /* @__PURE__ */ jsx("span", { children: "Here is my Email Address " }),
            " ",
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                id: "email",
                name: "email",
                ref: emailRef,
                className: "leading-0 w-full max-w-[500px] border-0 border-b border-black p-0 text-base focus:border-black focus:ring-0 dark:border-white dark:bg-transparent sm:text-h3",
                placeholder: "type here"
              }
            ),
            " ",
            /* @__PURE__ */ jsx("span", { children: "I would love to get in touch with you....." })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "mb-12 w-full rounded-lg border-black p-4 text-base focus:border-black focus:ring-0 dark:border-white dark:bg-transparent",
              rows: 5,
              id: "message",
              name: "message",
              ref: messageRef,
              placeholder: "Let’s make something awesome together......"
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "btn", type: "submit", disabled: loader, children: loader ? "Submitting.." : "Submit Now" })
        ]
      }
    ),
    submitted !== null && /* @__PURE__ */ jsx(
      "p",
      {
        className: `mt-6 text-base ${submitted ? "text-green-400" : "text-red-400"}`,
        children: submitted ? "Message Submitted Successfully!" : "Something went wrong! Please try again."
      }
    )
  ] });
};

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const contact = await getEntry("contact", "-index");
  const { title, subtitle, description, meta_title, image } = contact.data;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": title, "meta_title": meta_title, "description": description, "image": image }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section mx-auto max-w-[1260px]"> <div class="container mx-auto"> <div class="mb-5 items-center font-primary sm:flex"> <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"${addAttribute(38, "height")}${addAttribute(38, "width")} class="dark:invert"> <path d="M15.162 0.19003C8.77798 1.27303 3.13498 7.18203 1.00698 14.991C0.569977 16.606 0.512977 17.195 0.493977 19.95C0.474977 23.37 0.664977 24.415 1.70998 27.113C3.38198 31.464 7.48598 35.34 12.122 36.955C18.012 39.007 25.023 37.829 30.305 33.877C34.884 30.457 37.316 25.859 37.563 20.14C37.81 14.25 35.682 8.83503 31.559 4.88303C29.279 2.69803 27.189 1.69103 23.541 0.96903C22.458 0.76003 20.976 0.45603 20.235 0.28503C18.829 -0.0189702 16.644 -0.0569702 15.162 0.19003ZM20.235 3.24903C21.071 3.36303 22.135 3.47703 22.61 3.53403C23.731 3.62903 25.878 4.29403 27.056 4.88303C30.457 6.61203 32.908 9.89903 34.333 14.63C34.979 16.815 35.15 20.748 34.694 22.838C33.459 28.405 28.595 33.136 22.401 34.808C20.311 35.378 16.34 35.416 14.44 34.884C10.431 33.782 6.82098 31.179 4.88298 28.006C3.68598 26.011 3.19198 24.187 3.07798 21.375C2.98298 18.392 3.30598 16.264 4.27498 13.566C5.92798 8.93003 9.46198 5.01603 13.376 3.51503C14.345 3.13503 14.877 3.05903 16.625 3.05903C17.784 3.05903 19.399 3.15403 20.235 3.24903Z" fill="black"></path> <path d="M12.844 14.687C11.875 15.656 12.426 17.176 13.756 17.176C14.668 17.176 15.105 16.72 15.105 15.77C15.105 14.896 14.782 14.497 13.927 14.326C13.433 14.231 13.224 14.307 12.844 14.687Z" fill="black"></path> <path d="M23.009 14.763C21.945 15.656 22.553 17.29 23.94 17.29C24.491 17.29 24.757 17.176 24.966 16.872C25.954 15.485 24.282 13.718 23.009 14.763Z" fill="black"></path> <path d="M10.944 22.439C10.678 22.762 10.45 23.085 10.45 23.18C10.45 23.978 12.141 25.479 14.193 26.524C18.259 28.557 22.895 27.911 26.201 24.833C27.417 23.712 27.417 22.762 26.22 22.135C25.555 21.793 25.232 21.888 24.13 22.8C22.173 24.415 19.855 25.118 17.822 24.7C16.416 24.434 14.877 23.674 13.528 22.629C12.312 21.66 11.647 21.603 10.944 22.439Z" fill="black"></path> </svg> <h2 class="section-title sm:ml-3 sm:mt-0 mt-3">${unescapeHTML(markdownify(title))}</h2> </div> <h3 class="relative mb-16 inline-block text-[1.5rem] font-semibold lg:text-[2rem] xl:text-[2.9rem]"> <svg class="absolute left-full -mt-5 origin-left scale-[.60] dark:invert sm:scale-100" width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0015 33.3355C10.7417 34.0597 11.9749 34.0015 12.756 33.2056C19.2162 26.6222 25.3652 19.779 31.491 12.9615C32.2707 12.0937 33.05 11.2264 33.8295 10.3601C34.5753 9.53132 34.551 8.30305 33.7753 7.61671C32.9995 6.93036 31.7661 7.04584 31.0203 7.87464C30.2388 8.74316 29.4588 9.61118 28.6797 10.4783C22.5462 17.3041 16.4642 24.0727 10.0755 30.5831C9.29439 31.379 9.26126 32.6114 10.0015 33.3355Z" fill="black"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M58.2564 19.4483C57.6674 18.4866 56.4242 18.1616 55.4797 18.7222C53.6973 19.7801 51.9178 20.8392 50.1396 21.8973C39.7478 28.0817 29.4044 34.2371 18.8194 39.9837C17.8535 40.508 17.5191 41.7291 18.0725 42.711C18.6259 43.6929 19.8575 44.0638 20.8233 43.5395C31.4814 37.7533 41.8986 31.5537 52.2877 25.3709C54.0632 24.3143 55.8379 23.2581 57.6128 22.2046C58.5573 21.644 58.8455 20.4099 58.2564 19.4483Z" fill="black"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M57.1663 52.8267C57.0505 51.7587 56.0914 50.9813 55.0242 51.0903L20.217 54.6435C19.1497 54.7524 18.3785 55.7065 18.4943 56.7745C18.6101 57.8424 19.5691 58.6198 20.6364 58.5109L55.4435 54.9577C56.5108 54.8487 57.2821 53.8947 57.1663 52.8267Z" fill="black"></path> </svg> <span>${unescapeHTML(markdownify(subtitle))}</span> </h3> ${renderComponent($$result2, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/mehedi/Development/Projects/mehedisharif.com/src/layouts/helpers/ContactForm", "client:component-export": "default" })} </div> </section> ` })}`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/contact.astro", void 0);

const $$file = "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/contact.astro";
const $$url = "/contact";

export { $$Contact as default, $$file as file, $$url as url };
