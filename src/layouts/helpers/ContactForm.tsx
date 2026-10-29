import React, { useState } from "react";
import config from "@/config/config.json";

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get("full_name") || "").trim();
    const email = String(fields.get("email") || "").trim();
    const message = String(fields.get("message") || "").trim();
    if (!name || !email || !message) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${config.bio.formsubmit_endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _subject: "Message From Personal Website", name, email, message }),
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === "true")) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch { setStatus("error"); }
  };
  return (
    <form className="contact-form" method="POST" onSubmit={formHandler} aria-busy={status === "sending"}>
      <div className="contact-field">
        <label htmlFor="full_name">Name</label>
        <input id="full_name" name="full_name" type="text" autoComplete="name" placeholder="Your full name" required />
      </div>
      <div className="contact-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </div>
      <div className="contact-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} placeholder="Tell me about your project, idea, or what’s on your mind…" required />
      </div>
      <button className="contact-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Get in touch"}<span aria-hidden="true">↗</span>
      </button>
      <p className={`contact-status ${status}`} role="status" aria-live="polite">
        {status === "success" ? "Thanks! Your message has been sent." : status === "error" ? "Your message couldn’t be sent. Please check the fields and try again." : ""}
      </p>
    </form>
  );
};
export default ContactForm;
