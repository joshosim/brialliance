"use client";
import { FormEvent, useState } from "react";
const options: Record<string, string[]> = {
  rental: [
    "Toyota Prado",
    "Lexus GX / LX",
    "Land Cruiser",
    "Hiace Bus",
    "Coaster Bus",
  ],
  escort: ["Premium Armed Escort", "Tactical Escort Team", "MOPOL Escort"],
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
    "Visa-on-Arrival Support",
  ],
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
    const subject = encodeURIComponent(
      "New Booking Request — Brilliance Integrated Services",
    );
    const body = encodeURIComponent(
      `BOOKING REQUEST\n\nFull Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nMovement date: ${data.get("date")}\nPickup location: ${data.get("location")}\n\nServices:\n${serviceList}\n\nDetails:\n${data.get("details")}`,
    );
    window.location.href = `mailto:brillianceintegrated37@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return (
    <form className="booking-form" onSubmit={submit}>
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
                  {key === "rental"
                    ? "Executive car rental"
                    : key === "airport"
                      ? "Airport protocol"
                      : key === "escort"
                        ? "Armed escort"
                        : "Event security"}
                </label>
                {selected.includes(key) && (
                  <select name={`item-${key}`} defaultValue="">
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
        Submit booking request <span>→</span>
      </button>
      {sent && (
        <p className="form-message">
          Your email client is opening with your booking request.
        </p>
      )}
    </form>
  );
}
