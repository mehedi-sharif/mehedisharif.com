import React, { useState } from "react";
import config from "@/config/config.json";

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
      const response = await fetch(
        `https://formsubmit.co/ajax/${config.bio.formsubmit_endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _subject: copy.email_subject,
            name,
            email,
            message,
          }),
        },
      );
      const result = await response.json();
      if (
        !response.ok ||
        !(result.success === true || result.success === "true")
      )
        throw new Error("Submission failed");
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
      onSubmit={formHandler}
      aria-busy={status === "sending"}
    >
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
