"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      "Website Enquiry — Brilliance Integrated Services",
    );
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
    );

    window.location.href = `mailto:brillianceintegrated37@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <p className="eyebrow">Send an enquiry</p>
      <h2>How can we help?</h2>
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
        Send message <span>→</span>
      </button>
      {sent && (
        <p className="form-message">
          Your email client is opening with your message.
        </p>
      )}
    </form>
  );
}
