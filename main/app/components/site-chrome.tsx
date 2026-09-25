import { navLinks } from "../lib/nav";
import { contact, siteName } from "../lib/site";
import { Mail, MessageCircle, Phone } from "./icons";
import { Navigation } from "./navigation";

export function Logo() {
  return (
    <a href="/#home" className="logo" aria-label={`${siteName} home`}>
      <span style={{ fontSize: "1.2rem", lineHeight: "1.2rem", padding: "0.9rem 0.3rem", display: "inline-block", }}>
        BRILLIANCE INTEGRATED <br /> SERVICES LTD -- RC:7435287
      </span>
    </a>
  );
}

export function Header() {
  return (
    <header id="header">
      <nav className="container" aria-label="Primary">
        <Logo />
        <Navigation />
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{siteName}</p>
          <p className="footer-note">
            Elite private and corporate security, transport and logistics solutions across Nigeria.
          </p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="footer-contact">
          <a href={`mailto:${contact.email}`}>
            <Mail aria-hidden="true" />
            {contact.email}
          </a>
          {contact.phones.map((phone) => (
            <a key={phone.href} href={phone.href}>
              <Phone aria-hidden="true" />
              {phone.label}
            </a>
          ))}
          <a href={contact.whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 {siteName}</p>
        <p>We pride in your satisfaction!</p>
      </div>
    </footer>
  );
}
