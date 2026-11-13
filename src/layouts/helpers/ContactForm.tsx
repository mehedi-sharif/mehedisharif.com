import React, { useState } from "react";

type FormCopy = {
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  message_label: string;
  message_placeholder: string;
  submit_label: string;
  sending_label: string;
  success_message: string;
  error_message: string;
  email_subject: string;
};
const ContactForm: React.FC<{ copy: FormCopy }> = ({ copy }) => {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get("full_name") || "").trim();
    const email = String(fields.get("email") || "").trim();
    const message = String(fields.get("message") || "").trim();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          website: String(fields.get("website") || ""),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  return (
    <form
      className="contact-form"
      method="POST"
      action="/api/contact"
      onSubmit={formHandler}
      aria-busy={status === "sending"}
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: -10000, width: 1, height: 1, opacity: 0 }}
      />
      <div className="contact-field">
        <label htmlFor="full_name">{copy.name_label}</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          autoComplete="name"
          placeholder={copy.name_placeholder}
          required
        />
      </div>
      <div className="contact-field">
        <label htmlFor="email">{copy.email_label}</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={copy.email_placeholder}
          required
        />
      </div>
      <div className="contact-field">
        <label htmlFor="message">{copy.message_label}</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={copy.message_placeholder}
          required
        />
      </div>
      <button
        className="contact-submit"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? copy.sending_label : copy.submit_label}
        <span aria-hidden="true">↗</span>
      </button>
      <p
        className={`contact-status ${status}`}
        role="status"
        aria-live="polite"
      >
        {status === "success"
          ? copy.success_message
          : status === "error"
            ? copy.error_message
            : ""}
      </p>
    </form>
  );
};
export default ContactForm;
