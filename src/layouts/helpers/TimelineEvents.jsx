import dateFormat from "@/lib/utils/dateFormat";
import cryptoJs from "crypto-js";
import React, { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import ImageUploader from "./ImageUploader";
import TimelineSkeleton from "./TimelineSkeleton";

const TimelineEvents = ({ secretKey }) => {
  const [loading, setLoading] = useState(true);
  const [getSecret, setSecret] = useState("");
  const [timelineEvent, setTimelineEvent] = useState([]);
  const [addEventForm, setAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: new Date().toISOString().slice(0, 10),
    heading: "",
    description: "",
    image: "",
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
        secretKey,
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
        cryptoJs.AES.encrypt(secretKey, secretKey).toString(),
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editEvent._id, ...editEvent }),
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
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
        image: newUrl,
      });
    } else if (editEvent) {
      setEditEvent({
        ...editEvent,
        image: newUrl,
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

  return (
    <>
      {loading ? (
        <TimelineSkeleton />
      ) : (
        <div>
          {form ? (
            <form
              className="form bg-body dark:bg-darkmode-body"
              onSubmit={handleSubmit}
            >
              <input
                type="password"
                name="secret"
                placeholder="Enter Secret Key"
                ref={inputEl}
                onChange={(e) => setSecret(e.target.value)}
                className="timeline-form-input"
              />
              <label id="incorrect"></label>
            </form>
          ) : (
            <div className="container">
              <div className="py-16">
                <div className="content flex items-center justify-center">
                  <ul className="relative list-none border-l border-border pl-0 dark:border-darkmode-border max-w-[32rem]">
                    <h2 className="mt-0 -translate-x-3 bg-body dark:bg-darkmode-body">
                      My Timeline
                    </h2>
                    {timelineEvent.map((event) => (
                      <li key={event._id} className="mb-12 ml-4">
                        <div className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full border border-white dark:border-dark bg-darkmode-body dark:bg-body"></div>
                        <h3 className="group relative mt-0 mb-1 flex items-center text-lg font-semibold text-dark dark:text-darkmode-dark">
                          <span>{event.heading}</span>
                          <button
                            className="ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            onClick={() => setEditEvent(event)}
                          >
                            <CiEdit className="text-lg" />
                          </button>
                        </h3>
                        <time className="text-xs font-normal leading-none text-text/70 dark:text-darkmode-text/70">
                          {dateFormat(event.date)}
                        </time>
                        <p className="mb-4 mt-2 text-sm font-normal text-text dark:text-darkmode-text text-balance">
                          {event.description}
                        </p>
                        {event.image && (
                          <img
                            className="rounded-md w-[200px] cursor-pointer"
                            src={`${event.image}`}
                            alt={event.heading}
                            onClick={() => setModalImage(event.image)}
                          />
                        )}
                      </li>
                    ))}
                    <button
                      onClick={() => setAddEventForm(true)}
                      className="absolute -left-[20px] h-8 w-8 rounded-full border dark:border-white bg-darkmode-body border-gray-900 dark:bg-body"
                    >
                      <span className="text-white dark:text-dark">+</span>
                    </button>
                  </ul>
                  <div
                    className={`fixed top-0 left-0 z-[99999] h-screen w-screen backdrop-blur backdrop-brightness-75 ${
                      addEventForm || editEvent
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    }`}
                  >
                    <span
                      className="absolute top-0 left-0 -z-[1] h-full w-full"
                      onClick={() => {
                        setAddEventForm(false);
                        setEditEvent(null);
                      }}
                    />
                    <div className="overflow-hidden">
                      <div className="absolute left-1/2 top-1/2 w-[96%] max-w-[700px] -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-body dark:bg-darkmode-body">
                        {(addEventForm || editEvent) && (
                          <div className="max-h-[calc(100vh_-_300px)] overflow-y-auto px-6 py-8 md:p-10">
                            {showDeleteConfirm ? (
                              <div className="flex flex-col items-center space-y-4">
                                <p>
                                  Are you sure you want to delete this event?
                                </p>
                                <div className="flex justify-center space-x-4">
                                  <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowDeleteConfirm(false)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={confirmDelete}
                                  >
                                    Confirm
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div
                                  className={`mb-4 flex ${
                                    editEvent
                                      ? "justify-between"
                                      : "justify-end"
                                  } `}
                                >
                                  {editEvent && (
                                    <button
                                      className="border-red flex h-6 w-6 items-center justify-center rounded-full border border-red-400 text-red-400"
                                      onClick={() =>
                                        handleDeleteClick(editEvent)
                                      }
                                    >
                                      <FaRegTrashAlt className="text-sm" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => {
                                      setAddEventForm(false);
                                      setEditEvent(null);
                                    }}
                                    className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-dark dark:text-white"
                                  >
                                    <MdClose />
                                  </button>
                                </div>
                                <form
                                  className="flex flex-col space-y-4"
                                  onSubmit={
                                    addEventForm
                                      ? handleAddEventSubmit
                                      : handleUpdateEventSubmit
                                  }
                                >
                                  <input
                                    type="date"
                                    required
                                    className="timeline-form-input"
                                    placeholder="Date"
                                    value={
                                      addEventForm
                                        ? newEvent.date
                                        : editEvent.date
                                    }
                                    onChange={(e) =>
                                      addEventForm
                                        ? setNewEvent({
                                            ...newEvent,
                                            date: e.target.value,
                                          })
                                        : setEditEvent({
                                            ...editEvent,
                                            date: e.target.value,
                                          })
                                    }
                                  />
                                  <input
                                    type="text"
                                    required
                                    className="timeline-form-input"
                                    placeholder="Heading"
                                    value={
                                      addEventForm
                                        ? newEvent.heading
                                        : editEvent.heading
                                    }
                                    onChange={(e) =>
                                      addEventForm
                                        ? setNewEvent({
                                            ...newEvent,
                                            heading: e.target.value,
                                          })
                                        : setEditEvent({
                                            ...editEvent,
                                            heading: e.target.value,
                                          })
                                    }
                                  />
                                  <textarea
                                    rows={5}
                                    type="text"
                                    className="timeline-form-input"
                                    placeholder="Description"
                                    value={
                                      addEventForm
                                        ? newEvent.description
                                        : editEvent.description
                                    }
                                    onChange={(e) =>
                                      addEventForm
                                        ? setNewEvent({
                                            ...newEvent,
                                            description: e.target.value,
                                          })
                                        : setEditEvent({
                                            ...editEvent,
                                            description: e.target.value,
                                          })
                                    }
                                  />
                                  <ImageUploader
                                    onImageSelect={setSelectedImage}
                                    onPreviewUrlChange={handlePreviewUrlChange}
                                    value={
                                      addEventForm
                                        ? newEvent.image
                                        : editEvent.image
                                    }
                                  />
                                  <button
                                    type="submit"
                                    className="btn btn-effect-0"
                                  >
                                    {addEventForm
                                      ? "Add Event"
                                      : "Update Event"}
                                  </button>
                                  <label id="incorrectInput"></label>
                                </form>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {modalImage && (
        <div
          className={`fixed inset-0 z-[100000] flex items-center justify-center bg-black bg-opacity-75 ${modalImage ? "animate-fade-in" : "animate-fade-out"}`}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setModalImage(null)}
          >
            <MdClose size={32} />
          </button>
          <img
            src={modalImage}
            alt="Full Size"
            className={`max-w-full max-h-full rounded ${modalImage ? "animate-fade-in" : "animate-fade-out"}`}
          />
        </div>
      )}
    </>
  );
};

export default TimelineEvents;
