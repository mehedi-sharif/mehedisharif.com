/* empty css                              */
import { e as createComponent, r as renderTemplate, h as renderComponent } from '../astro_DG7-IQXY.mjs';
import 'kleur/colors';
import { a as $$Base } from './404_B3u-Bemm.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { d as dateFormat } from './_category__Dih3iAqg.mjs';
import cryptoJs from 'crypto-js';
import { useState, useRef, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const ImageUploader = ({ onImageSelect, onPreviewUrlChange, value }) => {
  const [width] = useState(800);
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef(null);
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile)
      return;
    processImage(imageFile);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    if (!imageFile)
      return;
    processImage(imageFile);
  };
  const processImage = (imageFile) => {
    onImageSelect(imageFile);
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = width / image.width;
        canvas.width = width;
        canvas.height = image.height * ratio;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const newImageUrl = canvas.toDataURL("image/jpeg", 0.98);
        setPreviewUrl(newImageUrl);
        if (onPreviewUrlChange) {
          onPreviewUrlChange(newImageUrl);
        }
        const imageFileWithActualName = urlToFile(imageFile.name, newImageUrl);
        onImageSelect(imageFileWithActualName);
      };
    };
  };
  const urlToFile = (filename, url) => {
    const arr = url.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const data = atob(arr[1]);
    const n = data.length;
    const dataArr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      dataArr[i] = data.charCodeAt(i);
    }
    return new File([dataArr], filename, { type: mime });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-5 cursor-pointer transition duration-300 hover:border-gray-400",
      onClick: () => inputRef.current.click(),
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      children: [
        /* @__PURE__ */ jsx("label", { className: "text-lg text-gray-600 mb-2", children: value ? "Click or drag and drop to update the image" : "Click or drag and drop an image here" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            ref: inputRef,
            accept: ".jpg, .jpeg, .png",
            onChange: handleImageChange,
            className: "hidden"
          }
        ),
        (previewUrl || value) && /* @__PURE__ */ jsx(
          "img",
          {
            src: previewUrl || value,
            alt: "Preview",
            className: "w-15 rounded-md mt-4"
          }
        )
      ]
    }
  );
};

const TimelineSkeleton = () => {
  return /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "py-16", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs("ul", { className: "relative border-l border-border pl-0 dark:border-darkmode-border", children: [
    /* @__PURE__ */ jsx("h2", { className: "skeleton-loader-text mb-6 h-8 w-64 animate-pulse bg-gray-200 dark:bg-darkmode-border" }),
    [...Array(5)].map((_, index) => /* @__PURE__ */ jsxs("li", { className: "mb-12 ml-4", children: [
      /* @__PURE__ */ jsx("div", { className: "skeleton-loader-image absolute -left-1.5 mt-2 h-3 w-3 animate-pulse rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-darkmode-border" }),
      /* @__PURE__ */ jsx("h3", { className: "skeleton-loader-heading mt-0 mb-1 w-64 animate-pulse text-lg font-semibold" }),
      /* @__PURE__ */ jsx("p", { className: "skeleton-description skeleton-loader-text mb-4 mt-2 w-1/2 animate-pulse text-sm font-normal" }),
      /* @__PURE__ */ jsx("p", { className: "skeleton-description skeleton-loader-text mb-4 mt-2 animate-pulse text-sm font-normal" })
    ] }, index)),
    /* @__PURE__ */ jsx("button", { className: "skeleton-loader-text absolute -left-[20px] h-8 w-8 animate-pulse rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-darkmode-border", children: /* @__PURE__ */ jsx("span", { className: "text-white dark:text-dark", children: "+" }) })
  ] }) }) }) });
};

const TimelineEvents = ({ secretKey }) => {
  const [loading, setLoading] = useState(true);
  const [getSecret, setSecret] = useState("");
  const [timelineEvent, setTimelineEvent] = useState([]);
  const [addEventForm, setAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    heading: "",
    description: "",
    image: ""
  });
  const [editEvent, setEditEvent] = useState(null);
  const [form, setForm] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const inputEl = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/timeline");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTimelineEvent(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    const localSecret = localStorage.getItem("secret");
    if (localSecret) {
      const secretKeyDecrypted = cryptoJs.AES.decrypt(
        localSecret,
        secretKey
      ).toString(cryptoJs.enc.Utf8);
      if (secretKey === secretKeyDecrypted) {
        setForm(false);
        setLoading(false);
        fetchData();
      }
    } else {
      setLoading(false);
      setForm(true);
    }
  }, [secretKey]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (getSecret === secretKey) {
      setForm(false);
      localStorage.setItem(
        "secret",
        cryptoJs.AES.encrypt(secretKey, secretKey).toString()
      );
      setLoading(false);
      fetchData();
    } else {
      document.getElementById("incorrect").innerHTML = "Incorrect Key";
    }
  };
  const handleAddEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/timeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
      });
      if (response.ok) {
        setNewEvent({ date: "", heading: "", description: "", image: "" });
        setAddEventForm(false);
        fetchData();
      } else {
        throw new Error("Failed to add event");
      }
    } catch (error) {
      console.error("Failed to add event", error);
    }
  };
  const handleUpdateEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/timeline", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: editEvent._id, ...editEvent })
      });
      if (response.ok) {
        setEditEvent(null);
        fetchData();
      } else {
        const errorData = await response.json();
        console.error("Failed to update event", errorData);
        throw new Error(errorData.error || "Failed to update event");
      }
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };
  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch("/api/timeline", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      if (response.ok) {
        fetchData();
      } else {
        throw new Error("Failed to delete event");
      }
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };
  const handleDeleteClick = (event) => {
    setEditEvent(event);
    setShowDeleteConfirm(true);
  };
  const confirmDelete = () => {
    handleDeleteEvent(editEvent._id);
    setShowDeleteConfirm(false);
    setEditEvent(null);
  };
  const handlePreviewUrlChange = (newUrl) => {
    if (addEventForm) {
      setNewEvent({
        ...newEvent,
        image: newUrl
      });
    } else if (editEvent) {
      setEditEvent({
        ...editEvent,
        image: newUrl
      });
    }
    setSelectedImage(newUrl);
  };
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setModalImage(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    loading ? /* @__PURE__ */ jsx(TimelineSkeleton, {}) : /* @__PURE__ */ jsx("div", { children: form ? /* @__PURE__ */ jsxs(
      "form",
      {
        className: "form bg-body dark:bg-darkmode-body",
        onSubmit: handleSubmit,
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              name: "secret",
              placeholder: "Enter Secret Key",
              ref: inputEl,
              onChange: (e) => setSecret(e.target.value),
              className: "timeline-form-input"
            }
          ),
          /* @__PURE__ */ jsx("label", { id: "incorrect" })
        ]
      }
    ) : /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "content flex items-center justify-center", children: [
      /* @__PURE__ */ jsxs("ul", { className: "relative list-none border-l border-border pl-0 dark:border-darkmode-border max-w-[32rem]", children: [
        /* @__PURE__ */ jsx("h2", { className: "mt-0 -translate-x-3 bg-body dark:bg-darkmode-body", children: "My Timeline" }),
        timelineEvent.map((event) => /* @__PURE__ */ jsxs("li", { className: "mb-12 ml-4", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -left-1.5 mt-2 h-3 w-3 rounded-full border border-white dark:border-dark bg-darkmode-body dark:bg-body" }),
          /* @__PURE__ */ jsxs("h3", { className: "group relative mt-0 mb-1 flex items-center text-lg font-semibold text-dark dark:text-darkmode-dark", children: [
            /* @__PURE__ */ jsx("span", { children: event.heading }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                onClick: () => setEditEvent(event),
                children: /* @__PURE__ */ jsx(CiEdit, { className: "text-lg" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("time", { className: "text-xs font-normal leading-none text-text/70 dark:text-darkmode-text/70", children: dateFormat(event.date) }),
          /* @__PURE__ */ jsx("p", { className: "mb-4 mt-2 text-sm font-normal text-text dark:text-darkmode-text text-balance", children: event.description }),
          event.image && /* @__PURE__ */ jsx(
            "img",
            {
              className: "rounded-md w-[200px] cursor-pointer",
              src: `${event.image}`,
              alt: event.heading,
              onClick: () => setModalImage(event.image)
            }
          )
        ] }, event._id)),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setAddEventForm(true),
            className: "absolute -left-[20px] h-8 w-8 rounded-full border dark:border-white bg-darkmode-body border-gray-900 dark:bg-body",
            children: /* @__PURE__ */ jsx("span", { className: "text-white dark:text-dark", children: "+" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `fixed top-0 left-0 z-[99999] h-screen w-screen backdrop-blur backdrop-brightness-75 ${addEventForm || editEvent ? "visible opacity-100" : "invisible opacity-0"}`,
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "absolute top-0 left-0 -z-[1] h-full w-full",
                onClick: () => {
                  setAddEventForm(false);
                  setEditEvent(null);
                }
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 w-[96%] max-w-[700px] -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-body dark:bg-darkmode-body", children: (addEventForm || editEvent) && /* @__PURE__ */ jsx("div", { className: "max-h-[calc(100vh_-_300px)] overflow-y-auto px-6 py-8 md:p-10", children: showDeleteConfirm ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
              /* @__PURE__ */ jsx("p", { children: "Are you sure you want to delete this event?" }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-center space-x-4", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "btn btn-secondary",
                    onClick: () => setShowDeleteConfirm(false),
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "btn btn-danger",
                    onClick: confirmDelete,
                    children: "Confirm"
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `mb-4 flex ${editEvent ? "justify-between" : "justify-end"} `,
                  children: [
                    editEvent && /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "border-red flex h-6 w-6 items-center justify-center rounded-full border border-red-400 text-red-400",
                        onClick: () => handleDeleteClick(editEvent),
                        children: /* @__PURE__ */ jsx(FaRegTrashAlt, { className: "text-sm" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => {
                          setAddEventForm(false);
                          setEditEvent(null);
                        },
                        className: "flex h-6 w-6 items-center justify-center rounded-full border border-border text-dark dark:text-white",
                        children: /* @__PURE__ */ jsx(MdClose, {})
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "form",
                {
                  className: "flex flex-col space-y-4",
                  onSubmit: addEventForm ? handleAddEventSubmit : handleUpdateEventSubmit,
                  children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        required: true,
                        className: "timeline-form-input",
                        placeholder: "Date",
                        value: addEventForm ? newEvent.date : editEvent.date,
                        onChange: (e) => addEventForm ? setNewEvent({
                          ...newEvent,
                          date: e.target.value
                        }) : setEditEvent({
                          ...editEvent,
                          date: e.target.value
                        })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        required: true,
                        className: "timeline-form-input",
                        placeholder: "Heading",
                        value: addEventForm ? newEvent.heading : editEvent.heading,
                        onChange: (e) => addEventForm ? setNewEvent({
                          ...newEvent,
                          heading: e.target.value
                        }) : setEditEvent({
                          ...editEvent,
                          heading: e.target.value
                        })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        rows: 5,
                        type: "text",
                        className: "timeline-form-input",
                        placeholder: "Description",
                        value: addEventForm ? newEvent.description : editEvent.description,
                        onChange: (e) => addEventForm ? setNewEvent({
                          ...newEvent,
                          description: e.target.value
                        }) : setEditEvent({
                          ...editEvent,
                          description: e.target.value
                        })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ImageUploader,
                      {
                        onImageSelect: setSelectedImage,
                        onPreviewUrlChange: handlePreviewUrlChange,
                        value: addEventForm ? newEvent.image : editEvent.image
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        className: "btn btn-effect-0",
                        children: addEventForm ? "Add Event" : "Update Event"
                      }
                    ),
                    /* @__PURE__ */ jsx("label", { id: "incorrectInput" })
                  ]
                }
              )
            ] }) }) }) })
          ]
        }
      )
    ] }) }) }) }),
    modalImage && /* @__PURE__ */ jsxs("div", { className: `fixed inset-0 z-[100000] flex items-center justify-center bg-black bg-opacity-75 ${modalImage ? "animate-fade-in" : "animate-fade-out"}`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "absolute top-4 right-4 text-white",
          onClick: () => setModalImage(null),
          children: /* @__PURE__ */ jsx(MdClose, { size: 32 })
        }
      ),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: modalImage,
          alt: "Full Size",
          className: `max-w-full max-h-full rounded ${modalImage ? "animate-fade-in" : "animate-fade-out"}`
        }
      )
    ] })
  ] });
};

const $$Timeline = createComponent(($$result, $$props, $$slots) => {
  const secretKey = "kitkat";
  return renderTemplate`${renderComponent($$result, "Base", $$Base, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TimelineEvents", TimelineEvents, { "secretKey": secretKey, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/mehedi/Development/Projects/mehedisharif.com/src/layouts/helpers/TimelineEvents", "client:component-export": "default" })} ` })}`;
}, "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/timeline.astro", void 0);
const $$file = "/Users/mehedi/Development/Projects/mehedisharif.com/src/pages/timeline.astro";
const $$url = "/timeline";

export { $$Timeline as default, $$file as file, $$url as url };
