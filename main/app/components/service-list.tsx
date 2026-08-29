import Link from "next/link";

const services = [
  [
    "01",
    "Executive car rentals",
    "car-rentals",
    [
      "Luxury SUVs and saloon cars",
      "Bulletproof Land Cruisers",
      "Toyota Hiace & Coaster buses",
      "Professional chauffeurs",
    ],
  ],
  [
    "02",
    "Event security",
    "event-security",
    [
      "Armed mobile security / CPO",
      "Professional bouncers & ushers",
      "Crowd control management",
      "VIP close protection",
    ],
  ],
  [
    "03",
    "Armed escort",
    "armed-escort",
    [
      "Full armed escort teams",
      "MOPOL teams & commanders",
      "Professional armed drivers",
      "Convoy security planning",
    ],
  ],
  [
    "04",
    "Airport support & protocol",
    "airport-support",
    [
      "VIP meet & greet",
      "Visa-on-arrival support",
      "Airport transfer logistics",
      "Protocol officers",
    ],
  ],
] as const;

export function ServiceList() {
  return (
    <div className="service-list">
      {services.map(([number, title, slug, points]) => (
        <article className="detailed-service" key={number}>
          <span>{number}</span>
          <div>
            <h2>{title}</h2>
          </div>
          <ul>
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link
            className="round-link"
            href={`/services/${slug}`}
            aria-label={`Learn more about ${title}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </article>
      ))}
    </div>
  );
}
