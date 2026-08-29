import Link from "next/link";
import { Footer, Header } from "./components/site-chrome";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="page-intro short">
          <div className="container">
            <p className="eyebrow">404 error</p>
            <h1>That page is not available.</h1>
            <p>
              The page may have moved, or the address may be incorrect. Return
              home to continue exploring our services.
            </p>
            <Link className="button button-primary" href="/">
              Return home <span>→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

