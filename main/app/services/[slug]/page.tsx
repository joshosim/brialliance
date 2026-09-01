import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../components/site-chrome";

type Vehicle = {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
};

type ServiceImage = {
  image: string;
  imageAlt: string;
};

type ServicePage = {
  title: string;
  description: string;
  intro: string;
  heading: string;
  text: string;
  image: string;
  imageAlt: string;
  items: readonly string[];
  action: string;
  vehicles?: readonly Vehicle[];
  gallery?: readonly ServiceImage[];
};

const servicePages: Record<string, ServicePage> = {
  "car-rentals": {
    title: "Executive Car Rentals",
    description:
      "Luxury SUVs, bulletproof vehicles and professional chauffeurs for executive transport across Nigeria.",
    intro:
      "Premium vehicles with professional chauffeurs for secure and comfortable movement.",
    heading: "Our executive fleet",
    text: "Choose from a carefully maintained fleet for VIP movement, corporate travel and group transport.",
    image: "/images/cruser.jpg",
    imageAlt: "Toyota Prado luxury SUV",
    items: [
      "Luxury SUVs and saloon cars",
      "Bulletproof Land Cruiser options",
      "Toyota Hiace and Coaster buses",
      "Professional chauffeurs",
    ],
    action: "Book a vehicle",
    vehicles: [
      {
        name: "Toyota Prado",
        description: "Luxury SUV · 2018–2024",
        image: "/images/prado.jpg",
        imageAlt: "Toyota Prado luxury SUV",
      },
      {
        name: "Lexus GX / LX",
        description: "Premium comfort · VIP movement",
        image: "/images/Lexus_LXI.jpg",
        imageAlt: "Lexus luxury SUV",
      },
      {
        name: "Toyota Land Cruiser",
        description: "Armoured options available",
        image: "/images/landcruiser.jpg",
        imageAlt: "Toyota Land Cruiser SUV",
      },
      {
        name: "Toyota Hilux",
        description: "Reliable VIP and field movement",
        image: "/images/hilux.jpg",
        imageAlt: "Toyota Hilux vehicle",
      },
      {
        name: "GAC M8 Master",
        description: "Premium executive comfort",
        image: "/images/GAC.jpg",
        imageAlt: "GAC M8 Master executive vehicle",
      },
      {
        name: "Toyota Camry",
        description: "Executive saloon comfort",
        image: "/images/camry.jpg",
        imageAlt: "Toyota Camry executive saloon",
      },
      {
        name: "Coaster Bus",
        description: "Comfortable corporate group transport",
        image: "/images/Coaster bus.jpg",
        imageAlt: "Toyota Coaster bus",
      },
      {
        name: "Toyota Hiace Bus",
        description: "Flexible group and corporate trips",
        image: "/images/Toyota Hiace Bus.jpg",
        imageAlt: "Toyota Hiace bus",
      },
    ],
  },
  "event-security": {
    title: "Event Security Services",
    description:
      "Professional event security services for VIP events, corporate gatherings, concerts and private functions.",
    intro:
      "Professional crowd control, VIP protection and full event risk management.",
    heading: "Comprehensive event protection",
    text: "Our highly trained personnel keep events safe and running smoothly, from pre-event planning through on-site delivery.",
    image: "/images/event-security.jpg",
    imageAlt: "Professional event security team",
    items: [
      "Corporate event security",
      "VIP and celebrity protection",
      "Concert and festival crowd control",
      "Access control and screening",
      "Emergency response planning",
    ],
    action: "Request security coverage",
    gallery: [
      // {
      //   image: "/images/event-security.jpg",
      //   imageAlt: "Security personnel at an event",
      // },
      // {
      //   image: "/images/vip-security.webp",
      //   imageAlt: "VIP close-protection officers",
      // },
      {
        image: "/images/security-training.jpg",
        imageAlt: "Security team crowd-control training",
      },
    ],
  },
  "armed-escort": {
    title: "Armed Escort Services",
    description:
      "Secure armed escort services for VIPs, executives and high-value movements across Nigeria.",
    intro:
      "Maximum protection for sensitive movements and high-risk environments.",
    heading: "High-security escort operations",
    text: "Our armed escort unit provides tactical protection for individuals, corporate assets and sensitive logistics requiring enhanced security presence.",
    image: "/images/Armed-Escort.webp",
    imageAlt: "Armed escort security team convoy",
    items: [
      "VIP and executive escort",
      "Secure convoy operations",
      "High-value asset protection",
      "Route risk assessment",
      "Emergency tactical response",
    ],
    action: "Request armed escort",
    gallery: [
      // {
      //   image: "/images/Armed-Escort.webp",
      //   imageAlt: "Armed escort team beside a security vehicle",
      // },
      {
        image: "/images/exsort.jpg",
        imageAlt: "Security convoy on the road",
      },
      {
        image: "/images/vip-security.webp",
        imageAlt: "Close-protection officers on duty",
      },
    ],
  },
  "airport-support": {
    title: "Airport Protocol & Support",
    description:
      "VIP airport meet and greet, protocol handling, visa-on-arrival support and logistics assistance in Nigeria.",
    intro:
      "A seamless VIP arrival and departure experience with professional coordination.",
    heading: "A stress-free airport experience",
    text: "We coordinate every stage of your arrival or departure so VIPs, executives, delegations and international travellers move smoothly and securely.",
    image: "/images/air 2.jpg",
    imageAlt: "VIP airport meet and greet service",
    items: [
      "VIP meet and greet",
      "Visa-on-arrival support",
      "Immigration and customs assistance",
      "Airport transfer coordination",
      "Protocol officers and escort",
    ],
    action: "Request airport support",
  },
};

type ServiceSlug = keyof typeof servicePages;

function isServiceSlug(slug: string): slug is ServiceSlug {
  return slug in servicePages;
}

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};

  const service = servicePages[slug];
  return {
    title: `${service.title} | Brilliance Integrated Services`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  const service = servicePages[slug];
  return (
    <>
      <Header />
      <main>
        <section className="page-intro service-detail-intro">
          <div className="container">
            <p className="eyebrow">Our services</p>
            <h1>{service.title}</h1>
            <p>{service.intro}</p>
          </div>
        </section>
        <section className="section">
          <div className="container service-detail-layout">
            <div>
              <p className="eyebrow">Tailored support</p>
              <h2>{service.heading}</h2>
              <p className="service-detail-copy">{service.text}</p>
              <ul className="service-detail-points">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="button button-primary" href="/#booking">
                {service.action} <span>→</span>
              </Link>
            </div>
            <Image
              className="service-detail-image"
              src={service.image}
              alt={service.imageAlt}
              width={300}
              height={250}
              style={{ objectFit: "contain" }}
            />
          </div>
        </section>
        {service.gallery && (
          <section className="section service-gallery-section">
            <div className="container">
              <p className="eyebrow">Security in action</p>
              <h2>Prepared for every movement.</h2>
              <div className="service-gallery">
                {service.gallery.map((galleryImage) => (
                  <Image
                    className="service-gallery-image"
                    key={galleryImage.image}
                    src={galleryImage.image}
                    alt={galleryImage.imageAlt}
                    width={300}
                    height={250}
                    style={{ objectFit: "cover" }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
        {service.vehicles && (
          <section className="section fleet-section">
            <div className="container">
              <div className="fleet-heading">
                <div>
                  <p className="eyebrow">Available vehicles</p>
                  <h2>Choose the right vehicle for your movement.</h2>
                </div>
                <p>
                  Every vehicle is provided with a professional chauffeur and
                  tailored to your itinerary.
                </p>
              </div>
              <div className="fleet-grid">
                {service.vehicles.map((vehicle) => (
                  <article className="vehicle-card" key={vehicle.name}>
                    <Image
                      src={vehicle.image}
                      alt={vehicle.imageAlt}
                      width={300}
                      height={250}
                      style={{ objectFit: "cover" }}
                    />
                    <div className="vehicle-info">
                      <h3>{vehicle.name}</h3>
                      <p>{vehicle.description}</p>
                      <span>Available on request</span>
                      <Link className="text-link" href="https://wa.me/2348123596345" target="_blank" rel="noreferrer" >
                        Book this vehicle <span>→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="cta compact">
          <div className="container cta-inner">
            <h2>
              Need professional support
              <br />
              <em>for your next movement?</em>
            </h2>
            <Link className="button button-primary" href="https://wa.me/2348123596345" target="_blank" rel="noreferrer">
              Request a booking <span>→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
