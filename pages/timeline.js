import Base from "@layouts/Baseof";
import cryptoJs from "crypto-js";
import { useEffect, useRef, useState } from "react";

const Timeline = ({ encrypted }) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const [loading, setLoading] = useState(true);
  const [getSecret, setSecret] = useState("");
  const [timelineEvent, setTimelineEvent] = useState([]);
  const [addEventForm, setAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: "",
    heading: "",
    description: "",
  });
  const [form, setForm] = useState(true);
  const inputEl = useRef(null);

  // Encrypt secretKey to set on localStorage
  const secretKeyEncrypted = cryptoJs.AES.encrypt(
    secretKey,
    secretKey
  ).toString();

  useEffect(() => {
    const localSecret = localStorage.getItem("secret");

    if (localSecret) {
      const secretKeyDecrypted = cryptoJs.AES.decrypt(
        localSecret,
        secretKey
      ).toString(cryptoJs.enc.Utf8);
      if (secretKey === secretKeyDecrypted) {
        setForm(false);
        setLoading(false);
        const decryptedData = cryptoJs.AES.decrypt(
          encrypted,
          secretKey
        ).toString(cryptoJs.enc.Utf8);

        try {
          const parsedData = JSON.parse(decryptedData);
          setTimelineEvent(parsedData);
        } catch (error) {
          // console.error("Failed to parse decrypted data", error);
        }
      }
    } else {
      setLoading(false);
      setForm(true);
    }
  }, [encrypted, secretKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (getSecret === secretKey) {
      setForm(false);
      localStorage.setItem("secret", secretKeyEncrypted);
      setLoading(false);
      const decryptedData = cryptoJs.AES.decrypt(encrypted, secretKey).toString(
        cryptoJs.enc.Utf8
      );

      try {
        const parsedData = JSON.parse(decryptedData);
        setTimelineEvent(parsedData);
      } catch (error) {
        console.error("Failed to parse decrypted data", error);
      }
    } else {
      document.getElementById("incorrect").innerHTML = "Incorrect Key";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/timeline");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const encryptedData = await response.text();
        const decryptedData = cryptoJs.AES.decrypt(
          encryptedData,
          secretKey
        ).toString(cryptoJs.enc.Utf8);

        try {
          const parsedData = JSON.parse(decryptedData);
          setTimelineEvent(parsedData);
        } catch (error) {
          console.error("Failed to parse decrypted data", error);
        }

        setLoading(false);
      } catch (error) {
        // console.error("Failed to fetch or decrypt data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [secretKey, encrypted]);

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
        const encryptedData = await response.text();
        const decryptedData = cryptoJs.AES.decrypt(
          encryptedData,
          secretKey
        ).toString(cryptoJs.enc.Utf8);

        try {
          const parsedData = JSON.parse(decryptedData);
          setTimelineEvent(parsedData);
          setAddEventForm(false);
          setNewEvent({ date: "", heading: "", description: "" });
        } catch (error) {
          console.error("Failed to parse decrypted data", error);
        }
      } else {
        throw new Error("Failed to add event");
      }
    } catch (error) {
      console.error("Failed to add event", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Base>
      {form ? (
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="password"
            name="secret"
            placeholder="Enter Secret Key"
            ref={inputEl}
            onChange={(e) => setSecret(e.target.value)}
          />
          <label id="incorrect"></label>
        </form>
      ) : (
        <div className="flex justify-center py-16">
          <ul className="relative list-none border-l border-border pl-0 dark:border-darkmode-border">
            {timelineEvent.map((event, index) => (
              <li key={`${event.heading}-${index}`} className="mb-12 ml-4">
                <div className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full border border-white bg-gradient-to-r from-secondary to-secondary dark:border-gray-900 dark:bg-darkmode-border"></div>
                <h3 className="mt-0 mb-1 text-lg font-semibold text-dark dark:text-darkmode-dark">
                  {event.heading}
                </h3>
                <time className="mb-1 text-sm font-normal leading-none text-text dark:text-darkmode-text">
                  {event.date}
                </time>
                <p className="mb-4 mt-2 text-base font-normal text-text dark:text-darkmode-text">
                  {event.description}
                </p>
              </li>
            ))}

            <button
              onClick={() => setAddEventForm(true)}
              className="absolute -left-[20px] h-8 w-8 rounded-full border border-white bg-gradient-to-r from-secondary to-secondary dark:border-gray-900 dark:bg-darkmode-border"
            >
              <span>+</span>
            </button>
          </ul>

          {/* Modal */}
          <div
            className={`fixed top-0 left-0 z-[99999] h-screen w-screen backdrop-blur backdrop-brightness-75 ${
              addEventForm ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <span
              className="absolute top-0 left-0 -z-[1] h-full w-full"
              onClick={() => setAddEventForm(false)}
            />
            <div className="overflow-hidden">
              <div className="absolute left-1/2 top-1/2 w-[96%] max-w-[700px] -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-secondary">
                {addEventForm && (
                  <div className="max-h-[calc(100vh_-_300px)] overflow-y-auto px-6 py-8 md:px-8">
                    <form
                      className="flex flex-col space-y-4"
                      onSubmit={handleAddEventSubmit}
                    >
                      <input
                        type="date"
                        className="rounded-md bg-body shadow-lg dark:bg-darkmode-body"
                        placeholder="Date"
                        value={newEvent.date}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, date: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        className="rounded-md bg-body shadow-lg dark:bg-darkmode-body"
                        placeholder="Heading"
                        value={newEvent.heading}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, heading: e.target.value })
                        }
                      />
                      <textarea
                        rows={5}
                        type="text"
                        className="rounded-md bg-body shadow-lg dark:bg-darkmode-body"
                        placeholder="Description"
                        value={newEvent.description}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            description: e.target.value,
                          })
                        }
                      />
                      <button type="submit" className="btn btn-effect-0">
                        Add Event
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Base>
  );
};

export default Timeline;

export const getServerSideProps = async () => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/timeline`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const allTimelineEvent = await response.json();
    const encrypted = cryptoJs.AES.encrypt(
      JSON.stringify(allTimelineEvent),
      secretKey
    ).toString();
    return {
      props: {
        encrypted,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        encrypted: "",
      },
    };
  }
};
