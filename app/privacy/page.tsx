import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data handling principles for AmanDevs.",
  alternates: {
    canonical: `${site.url}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy — AmanDevs",
    description: "Privacy policy and data handling principles for AmanDevs.",
    url: `${site.url}/privacy`,
    siteName: "AmanDevs",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/10 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/80 hover:text-ink"
          >
            <ArrowLeft size={16} /> Back to AmanDevs
          </Link>
          <span className="font-display font-bold tracking-tight">
            {site.name}<span className="text-lime-dark">.</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink/70">
          <Shield size={14} className="text-violet" /> Legal & Transparency
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Last revised: November 2026 · Effective for AmanDevs (`{site.domain}`)
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-ink/80">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              1. Overview
            </h2>
            <p>
              AmanDevs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), founded by Aman Raj, operates as an independent digital web development studio. We respect the confidentiality and privacy of our visitors and clients. This Privacy Policy outlines what information we collect when you visit `{site.domain}` or submit project inquiries, and how we handle that data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              2. Information We Collect
            </h2>
            <p>
              We only collect information voluntarily provided by you through our project enquiry form, email correspondence, or direct WhatsApp conversations. This may include:
            </p>
            <ul className="list-disc space-y-1.5 pl-6">
              <li>Your name and business or organization name</li>
              <li>Your email address and phone/WhatsApp number</li>
              <li>Project scope, budget range, and timeline expectations</li>
              <li>Reference URLs and project documentation you provide</li>
            </ul>
            <p>
              We do not sell, rent, or trade your contact details or project briefs with third-party advertising networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              3. How We Use Your Information
            </h2>
            <p>Information gathered is used exclusively to:</p>
            <ul className="list-disc space-y-1.5 pl-6">
              <li>Evaluate project requirements and formulate formal proposals or quotations</li>
              <li>Communicate directly regarding timelines, milestones, and development updates</li>
              <li>Deliver agreed web development services and post-launch technical support</li>
              <li>Comply with legitimate tax and invoicing requirements under Indian law</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              4. Client Confidentiality & Non-Disclosure
            </h2>
            <p>
              We treat all client business logic, commercial proposals, proprietary workflows, and unreleased product roadmaps as strictly confidential. If required by commercial clients, AmanDevs routinely executes mutual Non-Disclosure Agreements (NDAs) prior to formal architectural discovery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              5. Data Storage & Security
            </h2>
            <p>
              We employ industry-standard transport layer encryption (HTTPS/TLS) across all interactions on `{site.domain}`. Inquiries are stored in secure, access-controlled repositories. While no electronic transmission is 100% invulnerable, we take all reasonable precautions to safeguard your business data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              6. Third-Party Services
            </h2>
            <p>
              Our website may utilize trusted infrastructure providers for hosting (such as Netlify or Vercel) and domain DNS routing (such as Cloudflare). These services adhere to stringent international security and privacy benchmarks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              7. Contacting Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request the deletion of your enquiry data, please contact Aman Raj directly at{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-violet underline underline-offset-4"
              >
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-ink/10 bg-white py-8 text-center text-sm text-ink/60">
        <p>© {new Date().getFullYear()} AmanDevs. Founded by Aman Raj · Based in India · Working worldwide.</p>
      </footer>
    </div>
  );
}
