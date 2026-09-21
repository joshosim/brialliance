import { Footer, Header } from "./components/site-chrome";
import { ArrowRight } from "./components/icons";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="page-section not-found">
          <div className="container">
            <p className="eyebrow">404 error</p>
            <h1>That page is not available.</h1>
            <p>
              Everything we do now lives on a single page. Head back home to
              browse our services, fleet and gallery.
            </p>
            <a className="button button-primary" href="/#home">
              Return home <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
