import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, MessageCircle, Sparkles, Building2, Mail } from "lucide-react";
import { industries, site } from "@/lib/site";
import type { Metadata } from "next";

export function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return { title: "Solution Not Found" };

  const canonicalUrl = `${site.url}/solutions/${slug}`;

  return {
    title: `${industry.title} Digital Solutions`,
    description: `${industry.tagline} Custom web development for ${industry.title} businesses by AmanDevs. India-based, serving clients worldwide.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${industry.title} Digital Solutions — AmanDevs`,
      description: `${industry.tagline} Remote web development services for businesses across India and worldwide.`,
      url: canonicalUrl,
      images: [
        {
          url: `${site.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${industry.title} Solutions — AmanDevs`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} Solutions — AmanDevs`,
      description: industry.tagline,
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const emailQuerySubject = `[Industry Solution Inquiry] ${industry.title} — AmanDevs`;
  const emailQueryBody = `Hello AmanDevs Studio,

I am interested in digital solutions for the ${industry.title} sector.

My Details:
- Name: 
- Business / Organization: 
- Phone / WhatsApp: 
- Project Requirements: 
- Preferred Timeline: 

Looking forward to your response.`;

  const emailQueryLink = `mailto:${site.email}?subject=${encodeURIComponent(
    emailQuerySubject
  )}&body=${encodeURIComponent(emailQueryBody)}`;

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link
            href="/#solutions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/80 transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} /> All Solutions
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

      {/* Hero Header */}
      <div className="border-b border-ink/10 bg-white/60 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-ink/70">
            <Building2 size={14} className="text-violet" />
            <span>Industry Solution · {industry.category}</span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Digital Solutions for {industry.title}
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-ink/75">
            {industry.tagline}
          </p>

          <p className="mt-4 max-w-3xl text-base text-ink/70 leading-relaxed">
            {industry.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            {/* The Digital Solution */}
            <section className="rounded-3xl border border-ink/10 bg-white p-8">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-violet">
                Engineered for Your Workflow
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
                What AmanDevs Builds For This Sector
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                {industry.digitalSolution}
              </p>
              <div className="mt-6 rounded-2xl bg-paper/70 p-5 border border-ink/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                  Target Business Outcome
                </span>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {industry.outcome}
                </p>
              </div>
            </section>

            {/* Key Features Included */}
            <section className="rounded-3xl border border-ink/10 bg-white p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                Essential Features Included
              </h2>
              <p className="mt-2 text-sm text-ink/70">
                Tailored capabilities designed to streamline customer inquiries and reduce manual overhead.
              </p>
              <ul className="mt-6 space-y-4">
                {industry.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-lime-hover" />
                    <span className="text-sm font-medium leading-normal text-ink/90">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Specific businesses in this category */}
            <section className="rounded-3xl border border-ink/10 bg-white p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                Business Models We Support
              </h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {industry.businesses.map((biz, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm font-medium text-ink"
                  >
                    {biz}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Action Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-ink/10 bg-ink p-7 text-paper">
              <span className="inline-block rounded-full bg-lime px-3 py-1 font-mono text-xs font-bold uppercase text-ink">
                Custom Proposal
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold">
                Get a Solution for {industry.title}
              </h3>
              <p className="mt-3 text-sm text-paper/70">
                Discuss your business specifics directly with Aman Raj. We provide sample walkthroughs and a fixed quotation.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={emailQueryLink}
                  className="press flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3.5 text-sm font-bold text-ink shadow-md hover:bg-lime-hover"
                >
                  <Mail size={16} />
                  <span>Request Industry Quote (Email)</span>
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hello Aman, I run a business in ${industry.title} and want to discuss building a website/system with AmanDevs.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-white/10 px-5 py-3 text-sm font-medium text-paper hover:bg-white/15"
                >
                  <MessageCircle size={16} className="text-emerald-400" />
                  <span>Quick WhatsApp Inquiry</span>
                </a>
                <Link
                  href={`/?industry=${encodeURIComponent(industry.title)}#contact`}
                  className="press flex items-center justify-center gap-1.5 rounded-full border border-paper/15 bg-transparent px-5 py-2.5 text-xs font-medium text-paper/75 hover:bg-white/5 hover:text-paper"
                >
                  <span>Or Fill Online Proposal Form</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="mt-6 rounded-2xl bg-white/5 p-4 text-xs text-paper/70">
                <p className="font-semibold text-paper">Important Clarification:</p>
                <p className="mt-1">
                  We present industry solutions to showcase our development architecture. We never misrepresent fictional demonstrations as previous clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-ink/10 bg-white py-8 text-center text-sm text-ink/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5">
          <Link href="/" className="font-display font-bold text-ink">
            {site.name}<span className="text-violet">.</span>
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
