import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Commercial project terms and client engagement conditions for AmanDevs.",
  alternates: {
    canonical: `${site.url}/terms`,
  },
  openGraph: {
    title: "Terms and Conditions — AmanDevs",
    description: "Commercial project terms and client engagement conditions for AmanDevs.",
    url: `${site.url}/terms`,
    siteName: "AmanDevs",
  },
};

export default function TermsPage() {
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
          <Scale size={14} className="text-violet" /> Business Agreement
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Last revised: November 2026 · Governing client engagements for AmanDevs
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-ink/80">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              1. Engagement Model
            </h2>
            <p>
              AmanDevs operates as an independent, developer-led digital studio founded by Aman Raj. All web development, e-commerce, application, and maintenance projects are governed by a mutually agreed Statement of Work (SOW) or written project milestone agreement detailing deliverables, timeline, and fees.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              2. Transparent Pricing & Quotations
            </h2>
            <ul className="list-disc space-y-1.5 pl-6">
              <li>
                <strong>Indicative Rates:</strong> Package starting prices displayed on `{site.domain}` (e.g. Launch ₹7,999, Business ₹14,999, Advanced ₹29,999) represent baseline starting rates for standard scope. Final binding quotations depend on your specific functional and architectural requirements.
              </li>
              <li>
                <strong>Third-Party Costs:</strong> Domain registration fees, paid third-party hosting, SSL certificates from premium authorities, and external subscription APIs (such as payment gateways, SMS/WhatsApp APIs, or LLM tokens) are direct client expenses and are separate from AmanDevs development fees.
              </li>
              <li>
                <strong>Milestone Payments:</strong> Standard projects typically require a 50% upfront deposit upon discovery sign-off, with the remaining 50% due upon successful staging review and prior to final production domain deployment.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              3. Scope & Revision Rounds
            </h2>
            <p>
              To maintain timely project velocity, every engagement defines a structured number of revision rounds (1 round for Launch, 2 rounds for Business, 3 rounds for Advanced). A revision consists of constructive design feedback, typography adjustments, content layout tweaks, and color balancing within the agreed functional boundary. Out-of-scope structural redesigns or new feature additions are quoted separately via an agreed Change Request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              4. Code Ownership & Intellectual Property
            </h2>
            <p>
              Upon receipt of full final payment, 100% of the custom design files, source code, and assets developed specifically for the client are assigned to the client. AmanDevs retains the right to display the completed public project in our portfolio showcase as an example of our development capability unless explicitly prohibited by an executed Non-Disclosure Agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              5. Warranty & Post-Launch Support
            </h2>
            <p>
              Every completed website includes an agreed post-launch warranty window (30 days for Business websites, 60 days for Advanced projects) covering bug remediation and unexpected defects stemming from our code. Ongoing maintenance, continuous feature additions, and platform monitoring are provided via our monthly maintenance retainers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              6. Client Responsibilities
            </h2>
            <p>
              Project timelines rely on prompt client feedback and the timely provision of high-resolution logos, brand copy, product photography, and account access credentials. Delays in providing necessary assets will proportionally extend project completion milestones.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">
              7. Governing Law
            </h2>
            <p>
              These terms are governed in accordance with the laws of India. For inquiries regarding project agreements, contact Aman Raj directly at{" "}
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
