import { Footer, Header } from "../components/site-chrome";
import { ServiceList } from "../components/service-list";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-intro">
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
        </section>
        <section className="section">
          <div className="container">
            <ServiceList />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
