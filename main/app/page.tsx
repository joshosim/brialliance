import Link from "next/link";
import { BookingForm } from "./components/booking-form";
import { ContactForm } from "./components/contact-form";
import { ServiceList } from "./components/service-list";
import { Footer, Header } from "./components/site-chrome";

function ServiceIcon({ type }: { type: "car" | "shield" | "escort" | "plane" }) {
  if (type === "shield") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></svg>;
  }

  if (type === "plane") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 16-9-4-9 4 9-13 9 13Z" /><path d="m12 12 3 7-3-1.5L9 19l3-7Z" /></svg>;
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {type === "escort" && <path d="M4 5h8M3 9h5" />}
      <path d="m5 16 1.7-6h10.6L19 16v3H5v-3Z" />
      <path d="M7 10V7h10v3M5 16h14" />
      <circle cx="8" cy="19" r="1.5" />
      <circle cx="16" cy="19" r="1.5" />
    </svg>
  );
}

function CheckIcon() {
  return <svg className="check-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.2 4.2L19 6.5" /></svg>;
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <h1>
                Elite Security &amp; Logistics{" "}
                <span className="highlight">Across Nigeria</span>
              </h1>
              <p>
                We provide executive transport, armed security, VIP escort, and
                professional airport protocol services for individuals,
                corporations, and government clients.
              </p>
              <div className="cta-group">
                <Link className="btn btn-primary" href="/#booking">
                  Book a Service
                </Link>
                <Link className="btn btn-secondary" href="/#services">
                  Explore Services
                </Link>
              </div>
            </div>
            <div className="hero-box">
              <div className="feature"><ServiceIcon type="car" /><span>Executive Car Rentals</span></div>
              <div className="feature"><ServiceIcon type="shield" /><span>Armed &amp; Event Security</span></div>
              <div className="feature"><ServiceIcon type="escort" /><span>Armed Escort Convoys</span></div>
              <div className="feature"><ServiceIcon type="plane" /><span>VIP Airport Protocol</span></div>
            </div>
          </div>
        </section>
        <section id="services" className="page-section">
          <div className="page-intro">
            <div className="container">
              <p className="eyebrow">Our capabilities</p>
              <h1>
                Services designed around
                <br />
                <em>your peace of mind.</em>
              </h1>
              <p>
                Elite transport, security and logistics solutions tailored for
                VIPs, corporations and government clients.
              </p>
            </div>
          </div>
          <div className="section">
            <div className="container">
              <ServiceList />
            </div>
          </div>
        </section>
        <section className="why">
          <div className="container why-grid">
            <div>
              <h2>Why Choose Brilliance Integrated?</h2>
              <ul className="why-list">
                <li><CheckIcon />24/7 Operations &amp; Support</li>
                <li><CheckIcon />Highly Trained Security Personnel</li>
                <li><CheckIcon />Modern &amp; Bulletproof Fleet</li>
                <li><CheckIcon />Trusted by VIP &amp; Corporate Clients</li>
              </ul>
            </div>
            <div className="stats-box">
              <div>
                <strong>24/7</strong>
                <span>Availability</span>
              </div>
              <div>
                <strong>Elite</strong>
                <span>Personnel</span>
              </div>
              <div>
                <strong>Nationwide</strong>
                <span>Coverage</span>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="page-section">
          <div className="page-intro">
            <div className="container">
              <p className="eyebrow">About brilliance</p>
              <h1>
                Built for the journey.
                <br />
                <em>Trusted for the details.</em>
              </h1>
              <p>
                Security and logistics specialists working across Nigeria with
                focus, discretion and client care.
              </p>
            </div>
          </div>
          <div className="section">
            <div className="container editorial">
              <div>
                <p className="eyebrow">Who we are</p>
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
                <Link className="text-link" href="/#contact">
                  Speak to our team <span>↗</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="section values">
            <div className="container">
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
        </section>
        <section id="booking" className="page-section">
          <div className="page-intro short">
            <div className="container">
              <p className="eyebrow">Plan your movement</p>
              <h1>Start a booking.</h1>
              <p>
                Tell us what you need. Our team will respond with a tailored
                plan.
              </p>
            </div>
          </div>
          <div className="section">
            <div className="container form-layout">
              <aside>
                <p className="eyebrow">A thoughtful response</p>
                <h2>
                  Every request gets
                  <br />
                  <em>our full attention.</em>
                </h2>
                <p>
                  For urgent movements, please call us directly. We operate
                  around the clock.
                </p>
                <a className="text-link" href="tel:+2348123596345">
                  +234 812 359 6345 <span>↗</span>
                </a>
              </aside>
              <BookingForm />
            </div>
          </div>
        </section>
        <section id="contact" className="page-section">
          <div className="page-intro short">
            <div className="container">
              <p className="eyebrow">Let&apos;s connect</p>
              <h1>
                We&apos;re ready
                <br />
                <em>when you are.</em>
              </h1>
              <p>
                Available 24/7 to handle your security and logistics
                requirements.
              </p>
            </div>
          </div>
          <div className="section">
            <div className="container contact-layout">
              <div className="contact-details">
                <div>
                  <span>01</span>
                  <h3>Email us</h3>
                  <a href="mailto:brillianceintegrated37@gmail.com">
                    brillianceintegrated37@gmail.com
                  </a>
                </div>
                <div>
                  <span>02</span>
                  <h3>Call us</h3>
                  <a href="tel:+2348123596345">+234 812 359 6345</a>
                  <a href="tel:+2348028105959">+234 802 810 5959</a>
                </div>
                <div>
                  <span>03</span>
                  <h3>Message us</h3>
                  <a
                    href="https://wa.me/2348123596345"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chat on WhatsApp ↗
                  </a>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
