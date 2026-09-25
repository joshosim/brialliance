import Image from "next/image";
import { BookingForm } from "./components/booking-form";
import { ContactForm } from "./components/contact-form";
import { ServiceList } from "./components/service-list";
import { SiteEffects } from "./components/site-effects";
import { StatsBand } from "./components/stats-band";
import { Footer, Header } from "./components/site-chrome";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ServiceIcon,
} from "./components/icons";
import {
  advantages,
  capabilities,
  fleet,
  galleryImages,
  services,
} from "./lib/services";
import { contact } from "./lib/site";

/**
 * The whole site. Every service, every image and both forms live here — there
 * is no second page to navigate to. Legacy URLs redirect into these anchors
 * (see `next.config.ts`).
 */
export default function Home() {
  return (
    <>
      <SiteEffects />
      <Header />
      <main>
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow">Elite Private and Corporate Security and Transport/Logistics Solutions across Nigeria</p>
              <h1>
                Elite Security &amp; Logistics{" "}
                <span className="highlight">Across Nigeria</span>
              </h1>
              <p className="hero-tagline">
                BISL is your trusted partner for Journey Management / Secured Executive Car Rentals &nbsp;|&nbsp; Armed Escort &nbsp;|&nbsp; Events &amp; Corporate Security &nbsp;|&nbsp; Consultancy &nbsp;|&nbsp; General Supplies services, headquartered in Lagos, Nigeria. We pair practical local expertise with a high standard of presentation and communication. From the first call to final arrival, our team manages the details so you can focus on what matters.
              </p>
              <div className="cta-group">
                <a className="btn btn-primary" href="/#booking">
                  Book a Service <ArrowRight aria-hidden="true" />
                </a>
                <a className="btn btn-secondary" href="/#services">
                  Explore Services
                </a>
              </div>
            </div>
            <div className="hero-box">
              {capabilities.map(({ icon, label }) => (
                <div className="feature" key={label}>
                  <ServiceIcon name={icon} className="feature-icon" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsBand />

        <section id="services" className="page-section">
          <div className="section">
            <div className="container section-head">
              <p className="eyebrow">Our capabilities</p>
              <h2>
                Services designed around
                <br />
                <em>your peace of mind.</em>
              </h2>
              <p>
                Elite transport, security and logistics solutions tailored for
                VIPs and private and corporate organisations.
              </p>
            </div>
            <div className="container">
              <ServiceList />
            </div>
          </div>
        </section>

        {services.map((service, index) => (
          <section
            id={service.anchor}
            className={
              index % 2 === 1
                ? "page-section service-detail is-reversed"
                : "page-section service-detail"
            }
            key={service.anchor}
          >
            <div className="section">
              <div className="container service-detail-layout">
                <div className="service-detail-copy">
                  <p className="eyebrow">
                    {service.number} — {service.title}
                  </p>
                  <h2>{service.heading}</h2>
                  <p className="service-detail-intro">{service.intro}</p>
                  <p>{service.text}</p>
                  <ul className="service-detail-points">
                    {service.items.map((item) => (
                      <li key={item}>
                        <Check aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a className="button button-primary" href="/#booking">
                    {service.action} <ArrowRight aria-hidden="true" />
                  </a>
                </div>
                <div className="service-detail-media">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={640}
                    height={480}
                    sizes="(max-width: 800px) 100vw, 46vw"
                  />
                </div>
              </div>
              {service.gallery.length > 0 && (
                <div className="container service-detail-gallery">
                  {service.gallery.map((image) => (
                    <Image
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      width={420}
                      height={300}
                      sizes="(max-width: 520px) 100vw, 33vw"
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        <section id="fleet" className="page-section fleet-section">
          <div className="section">
            <div className="container">
              <div className="section-head">
                <p className="eyebrow">Available vehicles</p>
                <h2>Choose the right vehicle for your movement.</h2>
                <p>
                  Every vehicle is provided with a professional chauffeur and
                  tailored to your itinerary.
                </p>
              </div>
              <div className="fleet-grid">
                {fleet.map((vehicle) => (
                  <article className="fleet-card" key={vehicle.src}>
                    <Image
                      src={vehicle.src}
                      alt={vehicle.alt}
                      width={400}
                      height={280}
                      sizes="(max-width: 520px) 100vw, (max-width: 1080px) 50vw, 33vw"
                    />
                    <div className="fleet-info">
                      <h3>{vehicle.name}</h3>
                      <p>{vehicle.description}</p>
                      <a
                        className="text-link"
                        href={contact.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Book this vehicle{" "}
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="page-section why">
          <div className="section">
            <div className="container why-grid">
              <div>
                <p className="eyebrow">Why choose us</p>
                <h2>Why clients choose Brilliance Integrated.</h2>
                <ul className="why-list">
                  {advantages.map((advantage) => (
                    <li key={advantage}>
                      <Check aria-hidden="true" />
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* <section id="about" className="page-section about-section">
          <div className="section">
            <div className="container editorial">
              <div>
                <p className="eyebrow">About brilliance</p>
                <h2>
                  Movement should feel
                  <br />
                  effortless.
                </h2>
              </div>
              <div>
                <p>
                  Brilliance Integrated Services Ltd provides premium security,
                  transport and logistics support to discerning individuals,
                  corporate organisations and government clients.
                </p>
                <p>
                  We pair practical local expertise with a high standard of
                  presentation and communication. From the first call to final
                  arrival, our team manages the details so you can focus on what
                  matters.
                </p>
                <a className="text-link" href="/#contact">
                  Speak to our team <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="container values">
              <p className="eyebrow">Why clients choose us</p>
              <div className="values-grid">
                <div>
                  <b>01</b>
                  <h3>Always responsive</h3>
                  <p>
                    Round-the-clock operations and clear communication when time
                    matters.
                  </p>
                </div>
                <div>
                  <b>02</b>
                  <h3>Proven personnel</h3>
                  <p>
                    Experienced, properly presented teams selected for your
                    specific brief.
                  </p>
                </div>
                <div>
                  <b>03</b>
                  <h3>Modern fleet</h3>
                  <p>
                    Reliable, well-maintained vehicles appropriate for every
                    occasion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section id="booking" className="page-section booking-section">
          <div className="section">
            <div className="container section-head">
              <p className="eyebrow">Plan your movement</p>
              <h2>Start booking.</h2>
              <p>
                Tell us what you need. Our team will respond with a tailored
                plan.
              </p>
            </div>
            <div className="container booking-layout">
              <aside>
                <p className="eyebrow">A thoughtful response</p>
                <h3>
                  Every request gets
                  <br />
                  <em>our full attention.</em>
                </h3>
                <p>
                  For urgent movements, please call us directly. We operate
                  around the clock.
                </p>
                <a className="text-link" href={contact.phones[0].href}>
                  {contact.phones[0].label} <ArrowUpRight aria-hidden="true" />
                </a>
              </aside>
              <BookingForm />
            </div>
          </div>
        </section>

        <section id="contact" className="page-section contact-section">
          <div className="section">
            <div className="container section-head">
              <p className="eyebrow">Let&apos;s connect</p>
              <h2>
                We&apos;re ready
                <br />
                <em>when you are.</em>
              </h2>
              <p>
                Available 24/7 to handle your security and logistics
                requirements.
              </p>
            </div>
            <div className="container contact-layout">
              <div className="contact-details">
                <div>
                  <span>01</span>
                  <h3>Email us</h3>
                  <a href={`mailto:${contact.email}`}>
                    <Mail aria-hidden="true" />
                    {contact.email}
                  </a>
                </div>
                <div>
                  <span>02</span>
                  <h3>Call us</h3>
                  {contact.phones.map((phone) => (
                    <a key={phone.href} href={phone.href}>
                      <Phone aria-hidden="true" />
                      {phone.label}
                    </a>
                  ))}
                </div>
                <div>
                  <span>03</span>
                  <h3>Message us</h3>
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                    <MessageCircle aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                </div>
                <div>
                  <span>04</span>
                  <h3>Coverage</h3>
                  <p className="contact-static">
                    <MapPin aria-hidden="true" />
                    Nationwide, Nigeria
                  </p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container cta-inner">
            <h2>
              Need professional support
              <br />
              <em>for your next movement?</em>
            </h2>
            <a
              className="button button-inverse"
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Request a booking <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
