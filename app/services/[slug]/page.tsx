import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Mail, MessageCircle, Sparkles, Tag } from "lucide-react";
import { services, site } from "@/lib/site";
import type { Metadata } from "next";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  const canonicalUrl = `${site.url}/services/${slug}`;

  return {
    title: `${service.title} Services | India & Worldwide`,
    description: `${service.shortDesc} Provided by AmanDevs, an independent remote-first web development studio based in India, serving clients worldwide. Starting at ${service.startingPrice}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.title} — AmanDevs`,
      description: `${service.shortDesc} Remote-first web development studio based in India, serving businesses internationally.`,
      url: canonicalUrl,
      images: [
        {
          url: `${site.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${service.title} — AmanDevs`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — AmanDevs`,
      description: service.shortDesc,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const emailQuerySubject = `[Project Inquiry] ${service.title} — AmanDevs`;
  const emailQueryBody = `Hello AmanDevs Studio,

I would like to inquire about: ${service.title}
Indicative Starting Price: ${service.startingPrice}
Estimated Turnaround: ${service.turnaround}

My Details:
- Name: 
- Business / Organization: 
- Phone / WhatsApp: 
- Target Timeline: 
- Project Brief / Special Requirements: 

Looking forward to your response.`;

  const emailQueryLink = `mailto:${site.email}?subject=${encodeURIComponent(
    emailQuerySubject
  )}&body=${encodeURIComponent(emailQueryBody)}`;

  const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Hello Aman, I am interested in ${service.title} (Starting ${service.startingPrice}). Let's discuss!`
  )}`;

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/80 transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} /> All Services
          </Link>
          <Link href="/" className="font-display text-lg font-bold tracking-tight">
            {site.name}<span className="text-lime-dark">.</span>
          </Link>
          <a
            href={emailQueryLink}
            className="press inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper hover:bg-ink-light"
          >
            <Mail size={13} className="text-lime" />
            <span>Email Quote</span>
          </a>
        </div>
      </header>

      {/* Hero header */}
      <div className="border-b border-ink/10 bg-white/60 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-ink/70">
            <span className="font-mono text-violet font-bold">{service.number}</span>
            <span>{service.visualTag}</span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {service.title}
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-ink/75">
            {service.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-ink/10 pt-6 text-sm">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-violet" />
              <span className="text-ink/60">Starting at:</span>
              <strong className="text-base font-bold text-ink">{service.startingPrice}</strong>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-violet" />
              <span className="text-ink/60">Turnaround:</span>
              <strong className="font-semibold text-ink">{service.turnaround}</strong>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-lime-hover" />
              <span className="text-ink/60">Quality:</span>
              <span className="font-semibold text-ink">Bespoke Code, No Templates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body content */}
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main 2-column content */}
          <div className="space-y-12 lg:col-span-2">
            {/* What is included */}
            <section className="rounded-3xl border border-ink/10 bg-white p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                What is Included
              </h2>
              <p className="mt-2 text-sm text-ink/70">
                Every project is delivered production-ready with strict standards for performance, security, and responsiveness.
              </p>
              <ul className="mt-6 space-y-4">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-lime-hover" />
                    <span className="text-sm font-medium leading-normal text-ink/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Business Benefits */}
            <section className="rounded-3xl border border-ink/10 bg-white p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                Business Benefits
              </h2>
              <p className="mt-2 text-sm text-ink/70">
                Why investing in professional development pays for itself in measurable customer engagement.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.businessBenefits.map((benefit, idx) => (
                  <div key={idx} className="rounded-2xl border border-ink/10 bg-paper/60 p-5">
                    <span className="font-mono text-xs font-bold text-violet">0{idx + 1}</span>
                    <p className="mt-2 text-sm font-semibold text-ink">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Target Audience */}
            <section className="rounded-3xl border border-ink/10 bg-white p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                Who Needs This Service?
              </h2>
              <ul className="mt-4 divide-y divide-ink/10">
                {service.targetAudience.map((audience, idx) => (
                  <li key={idx} className="flex items-center gap-3 py-3 text-sm font-medium text-ink/80">
                    <span className="h-2 w-2 rounded-full bg-violet" />
                    {audience}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar CTA Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-ink/10 bg-ink p-7 text-paper">
              <span className="inline-block rounded-full bg-lime px-3 py-1 font-mono text-xs font-bold uppercase text-ink">
                Direct Developer
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold">
                Hire AmanDevs for {service.title}
              </h3>
              <p className="mt-3 text-sm text-paper/70">
                Discuss your business requirements directly with Aman Raj. We provide fixed-scope proposals with transparent timelines.
              </p>

              <div className="mt-6 border-t border-paper/15 pt-6">
                <p className="text-xs uppercase tracking-wider text-paper/50">Indicative Pricing</p>
                <p className="mt-1 font-display text-3xl font-bold text-lime">{service.startingPrice}</p>
                <p className="text-xs text-paper/60">Estimated turnaround: {service.turnaround}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={emailQueryLink}
                  className="press flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3.5 text-sm font-bold text-ink shadow-md hover:bg-lime-hover"
                >
                  <Mail size={16} />
                  <span>Start Project Inquiry (Email)</span>
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-white/10 px-5 py-3 text-sm font-medium text-paper hover:bg-white/15"
                >
                  <MessageCircle size={16} className="text-emerald-400" />
                  <span>Quick WhatsApp Chat</span>
                </a>
                <Link
                  href={`/?service=${encodeURIComponent(service.title)}#contact`}
                  className="press flex items-center justify-center gap-1.5 rounded-full border border-paper/15 bg-transparent px-5 py-2.5 text-xs font-medium text-paper/75 hover:bg-white/5 hover:text-paper"
                >
                  <span>Or Fill Online Proposal Form</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="mt-6 rounded-2xl bg-white/5 p-4 text-xs text-paper/70">
                <p className="font-semibold text-paper">Guaranteed Direct Contact:</p>
                <p className="mt-1">
                  You work directly with lead developer Aman Raj throughout discovery, design, development, and launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <footer className="border-t border-ink/10 bg-white py-8 text-center text-sm text-ink/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5">
          <Link href="/" className="font-display font-bold text-ink">
            {site.name}<span className="text-lime-dark">.</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/#services" className="hover:text-ink">Services</Link>
            <Link href="/#solutions" className="hover:text-ink">Solutions</Link>
            <Link href="/#pricing" className="hover:text-ink">Pricing</Link>
            <Link href="/#contact" className="hover:text-ink">Contact</Link>
          </div>
          <p>© {new Date().getFullYear()} AmanDevs Digital Studio</p>
        </div>
      </footer>
    </div>
  );
}
