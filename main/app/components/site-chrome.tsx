import Link from "next/link";
import { Navigation } from "./navigation";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Brilliance home">
      BRILLIANCE INTEGRATED <br /> SERVICES LTD
    </Link>
  );
}
export function Header() {
  return (
    <header id="header">
      <nav className="container">
        <Logo />
        <Navigation />
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-bottom">
        <p>© 2026 Brilliance Integrated Services Ltd</p>
        <p>We pride in your satisfaction!</p>
      </div>
    </footer>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p>{text}</p>
    </div>
  );
}
