"use client";

import { FormEvent, useState } from "react";
import { buildMailto, openMailClient } from "../lib/mailto";
import { contact } from "../lib/site";
import { ArrowRight } from "./icons";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    openMailClient(
      buildMailto({
        to: contact.email,
        subject: "Website Enquiry — Brilliance Integrated Services",
        body: `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
      }),
    );
    setSent(true);
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <p className="eyebrow">Send an enquiry</p>
      <h3>How can we help?</h3>
      <div className="form-grid">
        <label>
          Your name
          <input name="name" required placeholder="Full name" />
        </label>
        <label>
          Email address
          <input
            name="email"
            required
            type="email"
            placeholder="you@example.com"
          />
        </label>
        <label className="full">
          Message
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Tell us a little about what you need…"
          />
        </label>
      </div>
      <button className="button button-primary">
        Send message <ArrowRight aria-hidden="true" />
      </button>
      {sent && (
        <p className="form-message" role="status">
          Your email client is opening with your message.
        </p>
      )}
    </form>
  );
}
