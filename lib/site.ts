export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDesc: string;
  description: string;
  targetAudience: string[];
  businessBenefits: string[];
  deliverables: string[];
  visualTag: string;
  startingPrice: string;
  turnaround: string;
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  businesses: string[];
  keyFeatures: string[];
  digitalSolution: string;
  outcome: string;
}

export interface ConceptProject {
  id: string;
  title: string;
  brandName: string;
  tagline: string;
  type: string;
  industry: string;
  label: "Concept Design" | "Sample Showcase";
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  gradient: { from: string; to: string; accent: string };
  previewStats: { label: string; value: string }[];
  highlight: string;
}

export interface PricingTier {
  name: string;
  price: string;
  badge?: string;
  tagline: string;
  description: string;
  features: string[];
  scope: string;
  revisions: string;
  turnaround: string;
  featured?: boolean;
}

export const site = {
  name: "AmanDevs",
  founder: "Aman Raj",
  tagline: "Independent Web Development Studio",
  businessType: "Independent Web Development Studio",
  businessModel: "Remote-first",
  location: "India",
  serviceArea: "India and worldwide",
  positioning: {
    badge: "Based in India · Working worldwide",
    tagline: "India-based. Worldwide reach.",
    description:
      "Independent web development studio serving businesses across India and internationally.",
  },
  statement:
    "Independent web development studio serving businesses across India and internationally. We design and build modern websites, e-commerce stores, booking engines, and custom web applications.",
  domain:
    process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("run.place")
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
      : "amandevs-eta.vercel.app",
  url:
    process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("run.place")
      ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "")
      : "https://amandevs-eta.vercel.app",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@amandevs.run.place",
  supportEmail: "hello@amandevs.run.place",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917369083321",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+91 73690 83321",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
    "https://www.instagram.com/amandevs.studio/",
  availability: {
    status: "AVAILABLE FOR SELECT PROJECTS",
    headline: "Let's build something meaningful.",
    supportingText: "Currently welcoming enquiries for new web projects.",
    cta: "Start a conversation",
    href: "/#contact",
  },
};

export const services: ServiceItem[] = [
  {
    id: "business-websites",
    slug: "business-websites",
    number: "01",
    title: "Business Website Development",
    shortDesc:
      "High-converting, mobile-responsive company websites designed to turn visitors into enquiries.",
    description:
      "A slow or outdated website costs your business potential clients every day. We design and develop bespoke, high-performance websites tailored to your brand identity, optimized for search engines, and engineered to turn traffic into actionable enquiries.",
    targetAudience: [
      "Small and medium enterprises",
      "Local service companies",
      "Consulting and professional practices",
      "Growing companies establishing market presence",
    ],
    businessBenefits: [
      "Establish immediate authority and credibility",
      "Capture qualified inquiries 24/7",
      "Fast page loads across mobile networks",
      "Full ownership of your digital asset with no vendor lock-in",
    ],
    deliverables: [
      "Custom responsive design (Mobile, Tablet, Desktop)",
      "Multi-page architecture (Home, About, Services, Case Studies, Contact)",
      "Lead generation forms with email & WhatsApp notification",
      "Technical SEO structure (schema, meta tags, XML sitemaps)",
      "SSL, domain setup and lightning-fast cloud hosting configuration",
    ],
    visualTag: "Lead-Generation Engine",
    startingPrice: "₹7,999",
    turnaround: "5 to 10 days",
  },
  {
    id: "ecommerce-development",
    slug: "ecommerce-development",
    number: "02",
    title: "E-commerce Development",
    shortDesc:
      "Fast, elegant online stores with frictionless checkout and intuitive product management.",
    description:
      "Sell directly to your customers with zero platform percentage fees. We build streamlined online stores and product catalogues with seamless payment integration, responsive product galleries, and real-time inventory management.",
    targetAudience: [
      "D2C brands and boutique makers",
      "Local retailers moving into digital commerce",
      "Wholesale and B2B catalogue businesses",
      "Product creators looking for direct customer relationships",
    ],
    businessBenefits: [
      "Frictionless checkout experience reducing cart abandonment",
      "Direct UPI, Card, NetBanking & International payment processing",
      "Zero monthly marketplace commission penalties",
      "Mobile-optimized catalog browsing on 4G/5G connections",
    ],
    deliverables: [
      "Product catalogue with search, filter, and sorting",
      "Product detail pages with variations and high-res imagery",
      "Slide-over cart and streamlined single-page checkout",
      "Payment gateway integration (Razorpay / Stripe / Cashfree)",
      "Automated order confirmation via WhatsApp and Email",
    ],
    visualTag: "Zero-Commission Commerce",
    startingPrice: "₹24,999",
    turnaround: "14 to 24 days",
  },
  {
    id: "booking-reservation",
    slug: "booking-reservation",
    number: "03",
    title: "Booking and Reservation Systems",
    shortDesc:
      "Direct reservation engines for hospitality, tourism, clinics, and appointment providers.",
    description:
      "Stop losing 15-25% commission to third-party booking portals. We engineer direct booking workflows with interactive date selection, room/service availability checks, instant deposit handling, and automated customer confirmations.",
    targetAudience: [
      "Hotels, boutique resorts, homestays, and guest houses",
      "Tour and travel package operators",
      "Wellness clinics, salons, and medical specialists",
      "Professional advisors and coaching practices",
    ],
    businessBenefits: [
      "Retain 100% of guest revenue by accepting direct bookings",
      "Cut down repetitive phone calls with transparent availability",
      "Collect upfront deposits or instant WhatsApp reservations",
      "Deliver automated confirmation details directly to client phones",
    ],
    deliverables: [
      "Interactive calendar and date picker interfaces",
      "Room, suite, or service package detail presentations",
      "Direct WhatsApp booking routing with pre-filled guest details",
      "Automated confirmation email workflows",
      "Admin view for tracking incoming reservations and status",
    ],
    visualTag: "Direct Booking Engine",
    startingPrice: "₹19,999",
    turnaround: "10 to 18 days",
  },
  {
    id: "custom-web-applications",
    slug: "custom-web-applications",
    number: "04",
    title: "Custom Web Applications",
    shortDesc:
      "Scalable web software, customer portals, and internal business platforms built for purpose.",
    description:
      "When standard website templates or off-the-shelf software can't meet your business workflow, we build purpose-fit web applications. Built on modern React, Next.js, and robust relational databases, our apps scale as you grow.",
    targetAudience: [
      "Early-stage startups building their MVP",
      "Businesses replacing chaotic spreadsheets with structured software",
      "Agencies needing client communication and proofing portals",
      "Enterprises requiring internal operational utilities",
    ],
    businessBenefits: [
      "Automate manual business steps into deterministic software",
      "Secure role-based access for staff and external clients",
      "Real-time data synchronization with PostgreSQL or SQLite",
      "Complete ownership of code, data, and intellectual property",
    ],
    deliverables: [
      "Secure user authentication (JWT, OAuth, Magic Links)",
      "Relational database design (PostgreSQL / MySQL / Supabase)",
      "Role-based permission systems (Superadmin, Staff, Client)",
      "Responsive, clean UI engineered for daily productivity",
      "Production deployment with automated CI/CD and backups",
    ],
    visualTag: "Tailored Architecture",
    startingPrice: "₹29,999",
    turnaround: "3 to 5 weeks",
  },
  {
    id: "ai-integration-automation",
    slug: "ai-integration-automation",
    number: "05",
    title: "AI Integration and Automation",
    shortDesc:
      "Practical AI assistants, automated inquiry triaging, and repetitive workflow automation.",
    description:
      "Harness practical AI capabilities without the hype. We integrate tailored AI chatbots, automated lead qualification, smart document extraction, and workflow webhooks that save your team dozens of manual hours every week.",
    targetAudience: [
      "Customer support teams managing high enquiry volume",
      "Lead generation firms wanting instant lead qualification",
      "Content teams needing automated summarization or draft pipelines",
      "Operations teams eliminating duplicate data entry",
    ],
    businessBenefits: [
      "Answer customer queries 24/7 within 5 seconds",
      "Qualify leads automatically before routing to sales personnel",
      "Reduce human data entry errors across connected tools",
      "Predictable API costs without bloated enterprise licensing",
    ],
    deliverables: [
      "Context-aware website chatbot connected to your business FAQs",
      "Automated lead classification and CRM/Email dispatch",
      "Document ingestion and key-field extraction pipelines",
      "Webhook integrations connecting website events to your tools",
      "Usage monitoring and safeguards to keep API costs strictly bounded",
    ],
    visualTag: "Smart Workflows",
    startingPrice: "₹21,999",
    turnaround: "10 to 18 days",
  },
  {
    id: "dashboards-business-tools",
    slug: "dashboards-business-tools",
    number: "06",
    title: "Dashboards and Business Tools",
    shortDesc:
      "Clean visual reporting, KPI tracking, and operational control panels that drive decisions.",
    description:
      "Transform messy operational data into crystal-clear visual dashboards. We construct fast, interactive interfaces that consolidate key metrics, sales figures, and operational milestones so your leadership team can act decisively.",
    targetAudience: [
      "Business owners tracking multi-channel sales and leads",
      "Operations managers overseeing daily output metrics",
      "Financial consultants providing client portfolio summaries",
      "Logistics and service teams needing live status boards",
    ],
    businessBenefits: [
      "Single-screen visibility into company health and metrics",
      "Exportable data summaries for meetings and accounting",
      "Interactive filtering by date, category, and sales channel",
      "Protected, encrypted access ensuring company confidentiality",
    ],
    deliverables: [
      "Visual chart components (timeseries, revenue trends, status gauges)",
      "Real-time KPI metric cards with delta indicators",
      "Tabular data viewers with search, sorting, and CSV export",
      "Custom filter presets for quick departmental reviews",
      "Mobile-optimized dashboard view for on-the-go checks",
    ],
    visualTag: "Data Clarity",
    startingPrice: "₹22,999",
    turnaround: "12 to 20 days",
  },
  {
    id: "website-maintenance-support",
    slug: "website-maintenance-support",
    number: "07",
    title: "Website Maintenance & Technical Support",
    shortDesc:
      "Reliable ongoing care, security updates, speed optimization, and developer support.",
    description:
      "Websites require regular upkeep to remain secure, fast, and compatible with evolving web standards. We provide straightforward, agreed maintenance retainers covering routine updates, emergency bug fixes, and performance tuning.",
    targetAudience: [
      "Businesses without an in-house technical web developer",
      "Companies with existing sites suffering from slow loading times",
      "Founders needing a reliable partner on retainer for updates",
      "Brands wanting guaranteed uptime and security monitoring",
    ],
    businessBenefits: [
      "Prevent costly downtime and unpatched security vulnerabilities",
      "Keep Core Web Vitals green for sustained SEO rankings",
      "Direct WhatsApp and email priority access to your developer",
      "Predictable maintenance costs without sudden emergency invoices",
    ],
    deliverables: [
      "Regular dependency upgrades and security patch application",
      "Continuous Core Web Vitals and page speed monitoring",
      "SSL certificate and domain renewal supervision",
      "Scheduled cloud database and code backups",
      "Allocated monthly developer hours for copy & feature updates",
    ],
    visualTag: "Continuous Care",
    startingPrice: "₹3,499 / mo",
    turnaround: "Ongoing Retainer",
  },
];

export const industries: IndustryItem[] = [
  {
    id: "hospitality",
    slug: "hospitality",
    title: "Hospitality & Stays",
    category: "Hospitality",
    tagline: "Direct reservations, zero OTA commissions, and captivating visual storytelling.",
    description:
      "Hotels, boutique guest houses, homestays, and resorts often surrender up to 25% of each booking to intermediary platforms. We engineer digital presences that showcase your property with high-resolution visual tours, highlight amenities, and convert visitors into direct reservations with upfront deposits.",
    businesses: [
      "Boutique hotels & luxury villas",
      "Heritage guest houses & bed & breakfasts",
      "Homestays and eco-lodges",
      "Resorts and wellness retreats",
      "Fine dining and destination restaurants",
    ],
    keyFeatures: [
      "Interactive room & suite galleries with floor plans",
      "Direct date-range selection and availability enquiry",
      "One-tap WhatsApp reservation routing",
      "Curated local guide and nearby attractions map",
      "Dining menu presentation and table enquiry form",
    ],
    digitalSolution:
      "A fast, immersive property website featuring high-speed image compression, instant inquiry routing to the front desk WhatsApp, and automated email confirmation.",
    outcome:
      "Higher direct revenue margin per room, decreased dependency on external booking engines, and personal pre-arrival contact with guests.",
  },
  {
    id: "travel-tourism",
    slug: "travel-tourism",
    title: "Travel & Tourism",
    category: "Travel",
    tagline: "Inspiring itineraries, clear tour packages, and frictionless quote requests.",
    description:
      "Travelers make booking decisions based on clarity, trust, and ease of communication. We develop travel websites that present curated itineraries, transparent day-by-day plans, inclusions/exclusions, and immediate quotation workflows.",
    businesses: [
      "Tour operators & excursion companies",
      "Regional travel agencies & trip planners",
      "Car rental and private taxi networks",
      "Adventure sports & trekking guides",
      "Corporate travel & MICE coordinators",
    ],
    keyFeatures: [
      "Day-by-day interactive itinerary breakdowns",
      "Tiered package comparisons (Standard, Deluxe, Luxury)",
      "Instant WhatsApp trip quotation generator",
      "Customer inquiry modal capturing group size & preferred travel dates",
      "Downloadable PDF itineraries generated on the fly",
    ],
    digitalSolution:
      "A responsive travel portal organizing destinations into intuitive collections, paired with a quick 3-step quote request system that delivers customer travel dates directly to your sales desk.",
    outcome:
      "Faster sales turnaround, higher lead qualification, and a professional look that wins high-ticket custom vacation packages.",
  },
  {
    id: "retail-ecommerce",
    slug: "retail-ecommerce",
    title: "Retail & E-commerce",
    category: "Retail",
    tagline: "Fast storefronts that turn browsers into buyers with seamless UPI & Card checkout.",
    description:
      "Modern shoppers expect lightning-fast browsing and instantaneous checkout. We build custom e-commerce experiences tailored to Indian and international buyers, featuring UPI QR codes, instant cards, and mobile-first product discovery.",
    businesses: [
      "D2C fashion & apparel brands",
      "Home decor & artisan craft workshops",
      "Specialty coffee, tea, and food brands",
      "Electronics, accessories, and gadget retailers",
      "Local merchants going digital across India",
    ],
    keyFeatures: [
      "Sub-second catalog browsing and instant search filters",
      "High-converting single-page cart and checkout",
      "Indian payment gateway integrations (Razorpay, Cashfree, UPI)",
      "Customer order tracking and automated WhatsApp notifications",
      "Zero monthly marketplace listing commissions",
    ],
    digitalSolution:
      "A bespoke Next.js storefront paired with a headless backend or lightweight inventory engine that loads 3x faster than heavy off-the-shelf templates.",
    outcome:
      "Higher mobile checkout completion rates, lower bounce rates on cellular data, and full direct ownership of customer relationships.",
  },
  {
    id: "professional-services",
    slug: "professional-services",
    title: "Professional Services",
    category: "Services",
    tagline: "Authority-building websites that turn high-intent searchers into scheduled consultations.",
    description:
      "High-value clients evaluate your website before they ever pick up the phone. We build sleek, authoritative digital presences for consultants, legal advisors, architects, and specialized agencies that clearly articulate your value proposition and streamline consultation bookings.",
    businesses: [
      "Management consultants & financial advisors",
      "Legal practices & corporate compliance firms",
      "Architecture & interior design studios",
      "Coaching academies & specialized training institutes",
      "Marketing, creative, and PR agencies",
    ],
    keyFeatures: [
      "Clear service capability matrices and engagement models",
      "Structured client case studies highlighting strategic methodology",
      "Direct consultation scheduling calendar integration",
      "Downloadable whitepapers and lead capture funnels",
      "Interactive fee calculator or scope estimator",
    ],
    digitalSolution:
      "An editorial-grade studio website emphasizing depth of expertise, transparent engagement tiers, and an intelligent intake questionnaire that qualifies leads before your discovery call.",
    outcome:
      "Consistent pipeline of qualified business inquiries and clear positioning that justifies premium professional billing.",
  },
  {
    id: "health-wellness",
    slug: "health-wellness",
    title: "Health & Wellness",
    category: "Healthcare",
    tagline: "Welcoming clinic websites with friction-free appointment scheduling.",
    description:
      "Patients and wellness seekers require immediate clarity regarding treatments, practitioner credentials, and available consultation slots. We build accessible, trustworthy websites with clean appointment booking workflows.",
    businesses: [
      "Dental clinics & cosmetic practices",
      "Physiotherapy & rehabilitation centres",
      "Yoga, Pilates, and personal training studios",
      "Dermatology & aesthetic skincare clinics",
      "Mental health and wellness counseling practices",
    ],
    keyFeatures: [
      "Treatment directory with clear descriptions & recovery notes",
      "Practitioner credentials, specializations, and bios",
      "Online appointment slot selection with SMS/WhatsApp confirmation",
      "Pre-visit preparation guides and clinic location directions",
      "Secure patient inquiry workflows adhering to privacy guidelines",
    ],
    digitalSolution:
      "A calm, clean digital clinic interface with instant WhatsApp scheduling and comprehensive treatment guides answering common patient concerns.",
    outcome:
      "Reduced reception desk phone congestion, fewer appointment no-shows, and improved patient confidence before entering your clinic.",
  },
  {
    id: "startups-growing-businesses",
    slug: "startups",
    title: "Startups & Growing Businesses",
    category: "Technology",
    tagline: "High-velocity MVPs, customer dashboards, and high-converting product landing pages.",
    description:
      "Startups need to test hypotheses and acquire early customers rapidly without incurring technical debt. We partner with founders to construct crisp marketing launch pages, interactive SaaS onboarding funnels, and robust MVPs built to scale.",
    businesses: [
      "Early-stage SaaS & software ventures",
      "Tech-enabled service companies",
      "B2B workflow tools and micro-apps",
      "Product incubators and venture studios",
      "Bootstrapped founders launching MVPs",
    ],
    keyFeatures: [
      "High-converting waitlist and product launch landing pages",
      "Interactive product feature demos and animated mockups",
      "Authentication and multi-tenant customer dashboards",
      "Stripe and subscription billing integration",
      "Clean REST/GraphQL API integration with scalable databases",
    ],
    digitalSolution:
      "A modern, type-safe Next.js + React architecture engineered with production-ready patterns, clean component boundaries, and rapid deployment pipelines.",
    outcome:
      "Launch your product weeks ahead of schedule with code you can confidently extend, maintain, and raise capital on.",
  },
];

export const conceptProjects: ConceptProject[] = [
  {
    id: "azure-bay",
    title: "Luxury Hospitality Showcase",
    brandName: "The Azure Bay Resort & Suites",
    tagline: "A direct-booking luxury destination experience",
    type: "Hospitality Web Platform",
    industry: "Hospitality & Stays",
    label: "Concept Design",
    problem:
      "Independent luxury resorts lose 18-25% in commissions to OTAs while struggling to convey their property's bespoke atmosphere through generic listing portals.",
    solution:
      "A bespoke high-performance web platform featuring panoramic room showcases, an intuitive date-selection booking flow, automated WhatsApp concierge integration, and zero intermediary fees.",
    features: [
      "Interactive 360° room and villa showcases with amenity tags",
      "Direct room availability engine with seasonal pricing calculation",
      "WhatsApp concierge booking button with pre-filled check-in dates",
      "Curated dining and wellness itinerary explorer",
      "Next.js optimized asset pipeline with responsive image compression",
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    gradient: { from: "#000000", to: "#0B120E", accent: "#D2F946" },
    previewStats: [
      { label: "Architecture", value: "Next.js 15 App Router" },
      { label: "Booking Mode", value: "Direct WhatsApp Flow" },
      { label: "Media Handling", value: "Next/Image Responsive" },
    ],
    highlight: "Showcasing high-resolution villa suites and instant WhatsApp reservation routing.",
  },
  {
    id: "wander-voyage",
    title: "Tour & Expeditions Portal",
    brandName: "WanderVoyage Expeditions",
    tagline: "Tailored adventure and luxury tour planning",
    type: "Travel Platform & Quote Engine",
    industry: "Travel & Tourism",
    label: "Concept Design",
    problem:
      "Travel agencies spend hours on back-and-forth emails answering repetitive itinerary questions before discovering the customer's budget does not fit.",
    solution:
      "An interactive travel experience featuring day-by-day expedition timelines, transparent package tier comparisons, and a 3-step quote generator capturing group details upfront.",
    features: [
      "Day-by-day interactive itinerary viewer with elevation and transit details",
      "Tiered package breakdown: Standard, Explorer, and Luxury",
      "Interactive cost estimator based on travel party size and season",
      "Dynamic WhatsApp quote generator with selected tour pre-filled",
      "Downloadable printable PDF brochure dynamically formatted",
    ],
    stack: ["Next.js 15", "React 19", "Tailwind CSS", "Lucide React"],
    gradient: { from: "#000000", to: "#0B120E", accent: "#D2F946" },
    previewStats: [
      { label: "Workflow", value: "3-Step Quote Funnel" },
      { label: "Itinerary Engine", value: "Interactive Timelines" },
      { label: "Lead Routing", value: "Automated WhatsApp API" },
    ],
    highlight: "Interactive day-by-day Himalayan and coastal itinerary explorer with instant quote generation.",
  },
  {
    id: "aura-botanicals",
    title: "Direct-to-Consumer Storefront",
    brandName: "Aura Botanical Living",
    tagline: "Artisan organic skincare & wellness essentials",
    type: "E-commerce Storefront",
    industry: "Retail & E-commerce",
    label: "Concept Design",
    problem:
      "D2C brands suffer from high mobile cart abandonment rates due to clunky template checkouts and slow-loading image galleries on mobile cellular data.",
    solution:
      "A fast headless storefront with instantaneous slide-over cart, instant UPI one-click payment preview, ingredient transparency accordions, and customer reviews.",
    features: [
      "Sub-second catalog browsing with real-time skin-type filtering",
      "Instant slide-over drawer cart with free shipping progress bar",
      "Optimized single-screen checkout with UPI QR and card options",
      "Ingredient breakdown and dermatological certification badges",
      "Automated order confirmation dispatch to customer's WhatsApp",
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    gradient: { from: "#000000", to: "#0B120E", accent: "#D2F946" },
    previewStats: [
      { label: "Cart Architecture", value: "Sub-Second Slide Drawer" },
      { label: "Checkout Mode", value: "Single-Screen UPI Ready" },
      { label: "Product Filtering", value: "Client-Side Facets" },
    ],
    highlight: "Ultra-fast headless commerce layout with instant slide-over cart and UPI checkout flow.",
  },
  {
    id: "apex-horizon",
    title: "Strategic Advisory Platform",
    brandName: "Apex Horizon Advisory",
    tagline: "Management consulting and corporate finance advisory",
    type: "Corporate Authority Site",
    industry: "Professional Services",
    label: "Concept Design",
    problem:
      "Corporate advisory firms struggle to differentiate from competitors using generic corporate WordPress templates that fail to convey modern analytical capability.",
    solution:
      "An editorial, minimalist corporate website featuring structured service matrices, interactive industry focus filters, thought leadership briefs, and confidential inquiry routing.",
    features: [
      "Editorial typography with generous whitespace and confident layout",
      "Structured advisory capability framework (M&A, Restructuring, Strategy)",
      "Interactive methodology tabs explaining client engagement phases",
      "Secure confidential consultation booking form with NDA request toggle",
      "Compliance-ready responsive design optimized for C-suite readability",
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Lucide React"],
    gradient: { from: "#000000", to: "#0B120E", accent: "#D2F946" },
    previewStats: [
      { label: "Design System", value: "Editorial High-Contrast" },
      { label: "Inquiry Security", value: "Encrypted Route" },
      { label: "Capability Matrix", value: "Structured Services" },
    ],
    highlight: "Editorial design system built for institutional trust, featuring service matrices and confidential inquiry forms.",
  },
  {
    id: "metric-flow",
    title: "Operational Telemetry Platform",
    brandName: "MetricFlow Analytics",
    tagline: "Real-time revenue, conversion, and pipeline visibility",
    type: "SaaS Dashboard & Portal",
    industry: "Startups & Technology",
    label: "Concept Design",
    problem:
      "Business operators struggle with disjointed spreadsheets and bloated software that is too slow to check on mobile devices.",
    solution:
      "A streamlined telemetry dashboard displaying real-time revenue velocity, conversion funnels, regional customer heatmaps, and customizable alert thresholds.",
    features: [
      "Live KPI metric cards with 30-day velocity trends and delta pills",
      "Interactive revenue distribution chart by acquisition channel",
      "Real-time incoming transaction ledger with status filters",
      "Role-based permission view toggle (Executive, Finance, Support)",
      "Instant CSV export and webhook alert trigger simulation",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
    gradient: { from: "#000000", to: "#0B120E", accent: "#D2F946" },
    previewStats: [
      { label: "Visualization", value: "Interactive Chart Suite" },
      { label: "Data Structure", value: "Realtime Telemetry Ledger" },
      { label: "Access Roles", value: "Executive & Finance Views" },
    ],
    highlight: "Sleek dark-mode operational dashboard with animated KPI meters and revenue breakdown charts.",
  },
  {
    id: "lumiere-studio",
    title: "Clinic & Appointment Platform",
    brandName: "Lumière Aesthetic Studio",
    tagline: "Bespoke dermatology, aesthetics & wellness treatments",
    type: "Booking & Clinical Platform",
    industry: "Health & Wellness",
    label: "Concept Design",
    problem:
      "Medical aesthetics clinics waste significant administrative time answering treatment pricing questions and managing manual phone bookings.",
    solution:
      "An elegant clinical website with an interactive treatment selector, specialist doctor profiles, transparent consultation fees, and an online appointment reservation workflow.",
    features: [
      "Treatment directory categorizing procedures with preparation guidance",
      "Interactive specialist selector showing qualifications and availability",
      "Slot-booking calendar with direct WhatsApp confirmation",
      "Pre-appointment digital intake checklist for new patients",
      "Verified before/after showcase layout with privacy safeguards",
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    gradient: { from: "#000000", to: "#0B120E", accent: "#D2F946" },
    previewStats: [
      { label: "Appointment Flow", value: "2-Step Slot Selector" },
      { label: "Intake System", value: "Digital Pre-Checklist" },
      { label: "Mobile UX", value: "Touch-First Treatment Map" },
    ],
    highlight: "Refined aesthetic clinical layout featuring treatment explorer and streamlined slot booking.",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Launch",
    price: "₹7,999",
    badge: "Fastest Turnaround",
    tagline: "Essential online presence for local businesses, clinics, and professionals.",
    description:
      "Ideal for single-location businesses, solo consultants, doctors, and emerging brands that need an authoritative, fast, mobile-first presence to start receiving genuine inquiries immediately.",
    features: [
      "Single-page high-converting business layout (5-6 sections)",
      "100% mobile-responsive design (phones, tablets, laptops)",
      "Direct WhatsApp chat and click-to-call action buttons",
      "Contact enquiry form routing directly to your email",
      "Google Maps location and business hours embed",
      "Foundational technical SEO (Meta tags, Open Graph, Sitemap)",
      "Free SSL certificate and high-speed cloud edge hosting setup",
      "1 comprehensive revision round included",
    ],
    scope: "1 High-Impact Long Landing Page (5-6 sections)",
    revisions: "1 Revision Round",
    turnaround: "5 to 7 Days",
  },
  {
    name: "Business",
    price: "₹14,999",
    badge: "Most Popular",
    featured: true,
    tagline: "Comprehensive multi-page website engineered to drive customer leads.",
    description:
      "Designed for established businesses, private clinics, travel firms, and schools that want dedicated pages for services, case highlights, detailed FAQs, team bios, and a lead capture workflow.",
    features: [
      "Multi-page architecture (Up to 5 custom-designed pages)",
      "Dedicated pages: Home, About Us, Services, Portfolio/Cases, Contact",
      "Custom visual design aligned with your brand identity (No generic templates)",
      "Interactive enquiry form with real-time field validation",
      "Direct WhatsApp floating button with pre-filled message generator",
      "Detailed service breakdown cards with expandable sections",
      "Advanced technical SEO & structured business schema markup",
      "Performance optimization targeting 90+ Google PageSpeed",
      "2 comprehensive revision rounds included",
      "30 days post-launch technical support and minor tweaks",
    ],
    scope: "Up to 5 Custom Pages (Home, About, Services, Work, Contact)",
    revisions: "2 Revision Rounds",
    turnaround: "8 to 14 Days",
  },
  {
    name: "Advanced",
    price: "₹29,999",
    badge: "Custom Logic & Features",
    tagline: "Bespoke web applications, booking portals, and advanced functionality.",
    description:
      "For companies requiring custom functional capabilities such as direct reservation workflows, user portals, database integration, or API-powered business tools.",
    features: [
      "Custom web application or large multi-page portal",
      "Relational database integration (PostgreSQL, Supabase or SQLite)",
      "Secure user authentication (Staff, Admin, or Client accounts)",
      "Custom booking, reservation or quotation calculation engines",
      "Automated email and WhatsApp notification workflows",
      "Internal administrative dashboard for lead/booking management",
      "Third-party API integrations (Payment gateways, CRMs, Maps)",
      "Comprehensive performance and security audit",
      "3 structured revision rounds during design & development",
      "60 days post-launch support and maintenance warranty",
    ],
    scope: "Custom Scope Defined in Milestone Project Agreement",
    revisions: "3 Revision Rounds",
    turnaround: "3 to 5 Weeks",
  },
  {
    name: "Custom Solutions",
    price: "Custom Quote",
    badge: "Tailored Architecture",
    tagline: "Enterprise platforms, D2C e-commerce, SaaS MVPs, and AI workflows.",
    description:
      "When your business requires a specialized digital solution with unique business logic, high-traffic scalability, or deep AI and automation integration.",
    features: [
      "D2C e-commerce stores with payment gateways (Razorpay, Stripe, UPI)",
      "AI chat assistants connected to your knowledge base and FAQs",
      "Operational dashboards with live metric visualization and CSV export",
      "Automated multi-tool business pipelines and webhooks",
      "Micro-SaaS and MVP development for early-stage founders",
      "Architecture design, cloud infrastructure, and CI/CD pipelines",
      "Dedicated developer communication directly with Aman Raj",
      "Custom maintenance retainers and ongoing feature iteration",
    ],
    scope: "Tailored Milestone Deliverables based on detailed technical specification",
    revisions: "Iterative Milestones",
    turnaround: "Based on Project Scope",
  },
];

export const processSteps = [
  {
    step: "01",
    name: "Discovery",
    title: "Understanding Your Business",
    description:
      "We begin with a focused conversation to understand your target audience, core offerings, competitors, and exact business goals. No generic templates—every project begins with your specific commercial objective.",
    deliverable: "Project Scope Document & Requirements Brief",
    iconName: "Search",
  },
  {
    step: "02",
    name: "Planning",
    title: "Architecture & Scope Definition",
    description:
      "We outline the site hierarchy, user journeys, required technical integrations, and a clear project milestone schedule with transparent pricing. You approve the scope before any code is written.",
    deliverable: "Sitemap, Functional Checklist & Fixed Timeline",
    iconName: "FileText",
  },
  {
    step: "03",
    name: "Design",
    title: "Visual Identity & Layouts",
    description:
      "We develop clean, editorial interface designs that reflect your brand authority. Every layout is crafted for readability, fast mobile navigation, and effortless conversion.",
    deliverable: "Responsive Layout Previews & Component System",
    iconName: "Palette",
  },
  {
    step: "04",
    name: "Development",
    title: "Modern, Type-Safe Code",
    description:
      "We build your site using Next.js 15, React 19, TypeScript, and Tailwind CSS. The codebase is clean, accessible, and structured for maximum performance on mobile networks.",
    deliverable: "Production-Grade Clean Codebase on Private Git Repository",
    iconName: "Code2",
  },
  {
    step: "05",
    name: "Testing",
    title: "Cross-Device Verification",
    description:
      "We test rigorously across real physical devices: 360px budget phones, modern 390px iPhones, 768px tablets, and 1440px desktop screens. We verify form validation, speed, and responsiveness.",
    deliverable: "Cross-Browser & Performance Verification Audit",
    iconName: "CheckCircle2",
  },
  {
    step: "06",
    name: "Launch",
    title: "Domain Setup & HTTPS Deployment",
    description:
      "We connect your custom domain, configure SSL encryption, register XML sitemaps with Google Search Console, and deploy your site to global high-speed edge infrastructure.",
    deliverable: "Live Website on Your Custom Domain with Active SSL",
    iconName: "Rocket",
  },
  {
    step: "07",
    name: "Support",
    title: "Post-Launch Warranty & Care",
    description:
      "Our relationship does not end at launch. Every project includes an agreed post-launch support window to address tweaks, answer questions, and ensure your site operates seamlessly.",
    deliverable: "Agreed Support Period + Full Code Ownership Handover",
    iconName: "ShieldCheck",
  },
];

export const techStackCategories = [
  {
    category: "Frontend Development",
    description: "Modern, type-safe client interfaces built for speed and responsiveness.",
    technologies: [
      { name: "Next.js 15", desc: "React framework with Server Components & SSR" },
      { name: "React 19", desc: "Modern component-driven UI architecture" },
      { name: "TypeScript", desc: "Strict type safety preventing runtime crashes" },
      { name: "Tailwind CSS", desc: "Utility-first styling with zero runtime overhead" },
      { name: "Framer Motion", desc: "Subtle, hardware-accelerated animations" },
      { name: "HTML5 & CSS3", desc: "Semantic markup and modern CSS standards" },
    ],
  },
  {
    category: "Backend & APIs",
    description: "Reliable application backends and performant REST endpoints.",
    technologies: [
      { name: "Node.js", desc: "High-performance JavaScript runtime" },
      { name: "Express", desc: "Lightweight and robust backend routing" },
      { name: "Python", desc: "Data processing, scripts, and AI pipelines" },
      { name: "FastAPI", desc: "High-speed typed Python API framework" },
      { name: "Next.js Route Handlers", desc: "Serverless edge and Node API routes" },
      { name: "REST APIs", desc: "Clean, well-documented resource interfaces" },
    ],
  },
  {
    category: "Databases & Storage",
    description: "Battle-tested relational databases ensuring data integrity.",
    technologies: [
      { name: "PostgreSQL", desc: "Advanced enterprise relational database" },
      { name: "MySQL", desc: "Proven relational storage for web platforms" },
      { name: "SQLite", desc: "Lightweight, zero-latency local database engine" },
      { name: "Supabase", desc: "PostgreSQL with authentication and instant APIs" },
    ],
  },
  {
    category: "Deployment & Infrastructure",
    description: "Global CDN delivery, automated builds, and rock-solid security.",
    technologies: [
      { name: "Git & GitHub", desc: "Version control and collaborative code review" },
      { name: "Vercel", desc: "Edge serverless cloud platform for Next.js" },
      { name: "Netlify", desc: "High-speed Jamstack and static web hosting" },
      { name: "Docker", desc: "Containerized environments for consistent deploys" },
      { name: "Cloudflare", desc: "DNS management, SSL, and DDoS mitigation" },
    ],
  },
  {
    category: "AI & Workflow Integrations",
    description: "Practical automation connecting web events to business tools.",
    technologies: [
      { name: "OpenAI / Claude APIs", desc: "Context-aware chatbots & text extraction" },
      { name: "WhatsApp Business API", desc: "Direct customer messaging & booking links" },
      { name: "Payment Gateways", desc: "Razorpay, Stripe, Cashfree, UPI QR flows" },
      { name: "Webhooks & Automation", desc: "Connecting forms to Google Sheets, CRMs, Email" },
    ],
  },
];

export const whyChooseUs = [
  {
    title: "Direct Developer Communication",
    description:
      "You speak directly with Aman Raj, the developer building your project. No account managers, no lost-in-translation requirements, and no bureaucratic agency delays.",
    icon: "Users",
  },
  {
    title: "Personalized Development",
    description:
      "Every project is crafted specifically for your business model. We do not use bloated, generic WordPress templates or lock you into proprietary drag-and-drop builders.",
    icon: "Sliders",
  },
  {
    title: "Mobile-First Architecture",
    description:
      "Over 75% of Indian web traffic happens on mobile devices. We test every layout on real phones, ensuring sub-2-second loads on mobile 4G/5G connections.",
    icon: "Smartphone",
  },
  {
    title: "Modern, Maintainable Stack",
    description:
      "Built with Next.js 15, React 19, and TypeScript. You receive clean, modular code that your team or future developers can easily maintain and extend.",
    icon: "Layers",
  },
  {
    title: "Clear Project Scope",
    description:
      "We define exact milestones, deliverables, and revision rounds upfront before any invoice is issued. No surprise charges or vague timelines.",
    icon: "FileCheck",
  },
  {
    title: "Transparent Starting Prices",
    description:
      "Clear starting rates starting from ₹7,999. You know what you're paying for, what is included, and what external costs (domains/hosting) apply.",
    icon: "Tag",
  },
  {
    title: "Practical Business Integrations",
    description:
      "We focus on functionality that generates revenue: instant WhatsApp enquiry routing, UPI payment triggers, click-to-call buttons, and Google Maps embeds.",
    icon: "Zap",
  },
  {
    title: "Agreed Post-Launch Support",
    description:
      "We stand behind our work. Every project includes an agreed warranty window to fix unforeseen bugs and ensure your website runs seamlessly.",
    icon: "ShieldAlert",
  },
];

export const faqs = [
  {
    q: "How much does a website development project cost?",
    a: "Our packages start at ₹7,999 for a high-converting one-page business website (Launch tier) and ₹14,999 for a comprehensive multi-page company website (Business tier). Custom applications, booking engines, and e-commerce stores start from ₹19,999 to ₹29,999+ based on your exact feature specifications.",
  },
  {
    q: "What is the typical project turnaround time?",
    a: "A Launch one-page website is typically delivered within 5 to 7 business days. A multi-page Business website takes 8 to 14 days. Complex custom applications and e-commerce portals take 3 to 5 weeks depending on scope.",
  },
  {
    q: "Are domain and hosting costs included in the price?",
    a: "Domain registration charges (e.g. .com or .in from Namecheap or GoDaddy) and paid cloud hosting subscriptions belong to you and are billed directly by those providers. We handle 100% of the technical setup, DNS configuration, and SSL deployment for you at no extra configuration charge.",
  },
  {
    q: "How do customer inquiries reach me?",
    a: "Depending on your workflow, inquiries can be routed directly to your personal or business WhatsApp with a pre-filled customer message, delivered straight to your email inbox, or saved into a shared Google Sheet or CRM.",
  },
  {
    q: "Will my website look good and load fast on mobile phones?",
    a: "Yes. Every website we build follows a mobile-first philosophy. We test on real Android and iOS devices across budget and flagship screen sizes, optimizing image sizes to ensure smooth loading even on everyday 4G cellular data.",
  },
  {
    q: "Do I own the website code once the project is finished?",
    a: "Yes, 100%. Upon final project sign-off and payment, you receive full intellectual property ownership of your website source code, assets, and deployment access. We do not lock you into proprietary hosting platforms.",
  },
  {
    q: "What happens if I need changes after the website is live?",
    a: "Every project includes an agreed post-launch warranty period (30 days on Business packages, 60 days on Advanced) to fix bugs and make agreed minor adjustments. For ongoing updates and maintenance, we offer flexible monthly maintenance retainers starting from ₹3,499/month.",
  },
  {
    q: "How do we get started?",
    a: "Fill out the project inquiry form below or send a quick message via WhatsApp (+91 73690 83321) with your business details. Aman Raj will review your requirements and respond within 24 hours with an actionable scope and timeline.",
  },
];
