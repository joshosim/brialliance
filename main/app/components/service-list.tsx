import { services } from "../lib/services";
import { ArrowRight, Check, ServiceIcon } from "./icons";

/**
 * Overview cards for the four services. Each one links to that service's
 * full section further down the same page.
 */
export function ServiceList() {
  return (
    <div className="service-list">
      {services.map((service) => (
        <article className="detailed-service" key={service.anchor}>
          <span className="service-number">{service.number}</span>
          <div className="service-head">
            <ServiceIcon name={service.icon} className="service-icon" />
            <h3>{service.title}</h3>
          </div>
          <ul>
            {service.items.slice(0, 4).map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <a
            className="round-link"
            href={`/#${service.anchor}`}
            aria-label={`See ${service.title} in detail`}
          >
            <ArrowRight aria-hidden="true" />
          </a>
        </article>
      ))}
    </div>
  );
}
