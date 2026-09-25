"use client";
import { FormEvent, useState } from "react";
import { buildMailto, openMailClient } from "../lib/mailto";
import { contact } from "../lib/site";
import { ArrowRight } from "./icons";

const options: Record<string, string[]> = {
  rental: [
    "Toyota Prado",
    "Lexus GX / LX",
    "Land Cruiser",
    "Hiace Bus",
    "Coaster Bus",
  ],
  escort: ["Premium Armed Escort", "Close Protection Officer (CPO)", "Tactical Escort Team", "MOPOL Escort"],
  security: [
    "VIP Bodyguard",
    "Professional Bouncers",
    "Armed Security",
    "Crowd Control Team",
  ],
  airport: [
    "VIP Meet & Greet",
    "Protocol Officer",
    "Airport Transfer",
    "Immigration Assistance",
    "E-Visa / Visa-on-Arrival Support",
  ],
  consultancy: [
    "Security Risk Assessment",
    "Corporate Security Planning",
    "Personnel Training & Deployment",
    "General Supplies & Procurement",
  ],
};

const labels: Record<string, string> = {
  rental: "Journey Management / Executive Car Rentals",
  escort: "Armed Escort / CPO",
  security: "Events & Corporate Security",
  airport: "VIP Airport Protocols",
  consultancy: "Consultancy / General Supplies",
};

export function BookingForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const serviceList = selected
      .map((s) => `${s}: ${data.get(`item-${s}`) || "Not specified"}`)
      .join("\n");

    openMailClient(
      buildMailto({
        to: contact.email,
        subject: "New Booking Request — Brilliance Integrated Services",
        body: `BOOKING REQUEST\n\nFull Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nMovement date: ${data.get("date")}\nPickup location: ${data.get("location")}\n\nServices:\n${serviceList}\n\nDetails:\n${data.get("details")}`,
      }),
    );
    setSent(true);
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <p className="eyebrow">Plan your movement</p>
      <h3>Start booking</h3>
      <div className="form-grid">
        <label>
          Full name
          <input required name="name" placeholder="Your full name" />
        </label>
        <label>
          Email address
          <input
            required
            type="email"
            name="email"
            placeholder="you@example.com"
          />
        </label>
        <label>
          Phone number
          <input
            required
            type="tel"
            name="phone"
            placeholder="+234 800 000 0000"
          />
        </label>
        <label>
          Movement date
          <input type="date" name="date" />
        </label>
        <fieldset className="full">
          <legend>Services needed</legend>
          <div className="service-checks">
            {Object.entries(options).map(([key, values]) => (
              <div key={key}>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={selected.includes(key)}
                    onChange={() =>
                      setSelected((prev) =>
                        prev.includes(key)
                          ? prev.filter((x) => x !== key)
                          : [...prev, key],
                      )
                    }
                  />
                  {labels[key]}
                </label>
                {selected.includes(key) && (
                  <select
                    name={`item-${key}`}
                    defaultValue=""
                    aria-label={`${labels[key]} option`}
                  >
                    <option value="">Select service option</option>
                    {values.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </fieldset>
        <label>
          Pickup location
          <input name="location" placeholder="City or address" />
        </label>
        <label className="full">
          Special requests or details
          <textarea
            name="details"
            rows={5}
            placeholder="Number of persons, duration, special instructions…"
          />
        </label>
      </div>
      <button className="button button-primary" type="submit">
        Submit request <ArrowRight aria-hidden="true" />
      </button>
      {sent && (
        <p className="form-message" role="status">
          Your email client is opening with your booking request.
        </p>
      )}
    </form>
  );
}
