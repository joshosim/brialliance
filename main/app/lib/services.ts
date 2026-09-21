/**
 * Single source of truth for every piece of content on the one-page site.
 *
 * The page at `app/page.tsx` renders straight from these exports, and the test
 * suite reads the same exports, so content can never drift from what is tested.
 */

export type IconKey = "car" | "shield" | "escort" | "plane";

export type Image = {
  readonly src: string;
  readonly alt: string;
};

export type Vehicle = Image & {
  readonly name: string;
  readonly description: string;
};

export type Service = {
  /** Section id on the page, and the target of the legacy `/services/<anchor>` redirect. */
  readonly anchor: string;
  readonly number: string;
  readonly title: string;
  readonly icon: IconKey;
  /** Meta description, kept for the redirect-era search results. */
  readonly description: string;
  readonly intro: string;
  readonly heading: string;
  readonly text: string;
  readonly items: readonly string[];
  readonly image: Image;
  readonly action: string;
  readonly gallery: readonly Image[];
};

export const services: readonly Service[] = [
  {
    anchor: "car-rentals",
    number: "01",
    title: "Executive Car Rentals",
    icon: "car",
    description:
      "Luxury SUVs, bulletproof vehicles and professional chauffeurs for executive transport across Nigeria.",
    intro:
      "Premium vehicles with professional chauffeurs for secure and comfortable movement.",
    heading: "Our executive fleet",
    text: "Choose from a carefully maintained fleet for VIP movement, corporate travel and group transport. Every vehicle is provided with a professional chauffeur and tailored to your itinerary.",
    items: [
      "Luxury SUVs and saloon cars",
      "Bulletproof Land Cruiser options",
      "Toyota Hiace and Coaster buses",
      "Professional chauffeurs",
    ],
    image: { src: "/images/cruser.jpg", alt: "Toyota Prado luxury SUV" },
    action: "Book a vehicle",
    gallery: [],
  },
  {
    anchor: "event-security",
    number: "02",
    title: "Event Security",
    icon: "shield",
    description:
      "Professional event security services for VIP events, corporate gatherings, concerts and private functions.",
    intro:
      "Professional crowd control, VIP protection and full event risk management.",
    heading: "Comprehensive event protection",
    text: "Our highly trained personnel keep events safe and running smoothly, from pre-event planning through on-site delivery.",
    items: [
      "Armed mobile security and close protection officers",
      "Professional bouncers and ushers",
      "Concert and festival crowd control",
      "Access control and screening",
      "Emergency response planning",
    ],
    image: {
      src: "/images/event-security.jpg",
      alt: "Professional event security team",
    },
    action: "Request security coverage",
    gallery: [
      {
        src: "/images/security-training.jpg",
        alt: "Security team crowd-control training",
      },
    ],
  },
  {
    anchor: "armed-escort",
    number: "03",
    title: "Armed Escort",
    icon: "escort",
    description:
      "Secure armed escort services for VIPs, executives and high-value movements across Nigeria.",
    intro:
      "Maximum protection for sensitive movements and high-risk environments.",
    heading: "High-security escort operations",
    text: "Our armed escort unit provides tactical protection for individuals, corporate assets and sensitive logistics requiring an enhanced security presence.",
    items: [
      "VIP and executive escort",
      "Secure convoy operations",
      "High-value asset protection",
      "Route risk assessment",
      "MOPOL teams and commanders",
    ],
    image: {
      src: "/images/Armed-Escort.webp",
      alt: "Armed escort security team convoy",
    },
    action: "Request armed escort",
    gallery: [
      { src: "/images/exsort.jpg", alt: "Security convoy on the road" },
      {
        src: "/images/vip-security.webp",
        alt: "Close-protection officers on duty",
      },
    ],
  },
  {
    anchor: "airport-support",
    number: "04",
    title: "Airport Support & Protocol",
    icon: "plane",
    description:
      "VIP airport meet and greet, protocol handling, visa-on-arrival support and logistics assistance in Nigeria.",
    intro:
      "A seamless VIP arrival and departure experience with professional coordination.",
    heading: "A stress-free airport experience",
    text: "We coordinate every stage of your arrival or departure so VIPs, executives, delegations and international travellers move smoothly and securely.",
    items: [
      "VIP meet and greet",
      "Visa-on-arrival support",
      "Immigration and customs assistance",
      "Airport transfer coordination",
      "Protocol officers and escort",
    ],
    image: {
      src: "/images/air 2.jpg",
      alt: "VIP airport meet and greet service",
    },
    action: "Request airport support",
    gallery: [],
  },
];

/**
 * The complete fleet. Rendered once in the `#fleet` section of the single page.
 */
export const fleet: readonly Vehicle[] = [
  {
    name: "Toyota Prado",
    description: "Luxury SUV · 2018–2024",
    src: "/images/prado.jpg",
    alt: "Toyota Prado luxury SUV",
  },
  {
    name: "Lexus GX / LX",
    description: "Premium comfort · VIP movement",
    src: "/images/Lexus_LXI.jpg",
    alt: "Lexus luxury SUV",
  },
  {
    name: "Toyota Land Cruiser",
    description: "Armoured options available",
    src: "/images/landcruiser.jpg",
    alt: "Toyota Land Cruiser SUV",
  },
  {
    name: "Land Cruiser Display",
    description: "Showroom-ready executive trim",
    src: "/images/landcruiser-display.jpg",
    alt: "Toyota Land Cruiser on display",
  },
  {
    name: "Toyota Hilux",
    description: "Reliable VIP and field movement",
    src: "/images/hilux.jpg",
    alt: "Toyota Hilux vehicle",
  },
  {
    name: "GAC M8 Master",
    description: "Premium executive comfort",
    src: "/images/GAC.jpg",
    alt: "GAC M8 Master executive vehicle",
  },
  {
    name: "Toyota Camry",
    description: "Executive saloon comfort",
    src: "/images/camry.jpg",
    alt: "Toyota Camry executive saloon",
  },
  {
    name: "Toyota Sienna",
    description: "Spacious family and corporate travel",
    src: "/images/Toyota Sienna.jpg",
    alt: "Toyota Sienna people carrier",
  },
  {
    name: "Coaster Bus",
    description: "Comfortable corporate group transport",
    src: "/images/Coaster bus.jpg",
    alt: "Toyota Coaster bus",
  },
  {
    name: "Toyota Hiace Bus",
    description: "Flexible group and corporate trips",
    src: "/images/Toyota Hiace Bus.jpg",
    alt: "Toyota Hiace bus",
  },
];

/**
 * Every image shipped in `public/images`, so the single page really does carry
 * all of them. `armoured-land-cruiser` is the WebP twin of the JPEG above.
 */
export const galleryImages: readonly Image[] = [
  { src: "/images/landcruser.webp", alt: "Armoured Land Cruiser in service" },
  { src: "/images/Event.jpg", alt: "Guests arriving at a secured event" },
  { src: "/images/event-security.jpg", alt: "Event security team on duty" },
  { src: "/images/security-training.jpg", alt: "Crowd-control training drill" },
  { src: "/images/vip-security.webp", alt: "VIP close-protection officers" },
  { src: "/images/Armed-Escort.webp", alt: "Armed escort convoy" },
  { src: "/images/exsort.jpg", alt: "Escort vehicle on the highway" },
  { src: "/images/air 2.jpg", alt: "Airport protocol meet and greet" },
  { src: "/images/cruser.jpg", alt: "Toyota Prado luxury SUV" },
  { src: "/images/prado.jpg", alt: "Toyota Prado exterior" },
  { src: "/images/landcruiser.jpg", alt: "Toyota Land Cruiser SUV" },
  { src: "/images/landcruiser-display.jpg", alt: "Land Cruiser on display" },
  { src: "/images/Lexus_LXI.jpg", alt: "Lexus luxury SUV" },
  { src: "/images/hilux.jpg", alt: "Toyota Hilux pickup" },
  { src: "/images/GAC.jpg", alt: "GAC M8 Master executive vehicle" },
  { src: "/images/camry.jpg", alt: "Toyota Camry executive saloon" },
  { src: "/images/Toyota Sienna.jpg", alt: "Toyota Sienna people carrier" },
  { src: "/images/Coaster bus.jpg", alt: "Toyota Coaster bus" },
  { src: "/images/Toyota Hiace Bus.jpg", alt: "Toyota Hiace bus" },
];

/** The four capabilities shown in the hero and the marquee band. */
export const capabilities: readonly { readonly icon: IconKey; readonly label: string }[] =
  [
    { icon: "car", label: "Executive Car Rentals" },
    { icon: "shield", label: "Armed & Event Security" },
    { icon: "escort", label: "Armed Escort Convoys" },
    { icon: "plane", label: "VIP Airport Protocol" },
  ];

/** Reasons to choose the company, rendered as a tick list. */
export const advantages: readonly string[] = [
  "24/7 Operations & Support",
  "Highly Trained Security Personnel",
  "Modern & Bulletproof Fleet",
  "Trusted by VIP & Corporate Clients",
];

/** Headline numbers for the count-up band. */
export const stats: readonly {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}[] = [
  { value: 24, suffix: "/7", label: "Availability" },
  { value: 120, suffix: "+", label: "Vehicles & Personnel" },
  { value: 36, suffix: "", label: "States Covered" },
  { value: 15, suffix: "+", label: "Years of Service" },
];
