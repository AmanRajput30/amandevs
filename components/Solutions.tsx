"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Compass,
  ExternalLink,
  HeartPulse,
  Hotel,
  Rocket,
  ShoppingBag,
  Briefcase,
  Mail,
} from "lucide-react";
import { industries, site } from "@/lib/site";
import Reveal from "./Reveal";

const iconMap: Record<string, React.ReactNode> = {
  hospitality: <Hotel size={20} className="text-violet" />,
  "travel-tourism": <Compass size={20} className="text-violet" />,
  "retail-ecommerce": <ShoppingBag size={20} className="text-violet" />,
  "professional-services": <Briefcase size={20} className="text-violet" />,
  "health-wellness": <HeartPulse size={20} className="text-violet" />,
  startups: <Rocket size={20} className="text-violet" />,
};

export default function Solutions() {
  const [activeTab, setActiveTab] = useState(industries[0].id);
  const activeIndustry =
    industries.find((i) => i.id === activeTab) || industries[0];

  return (
    <section id="solutions" className="border-t border-ink/10 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime-dark bg-lime/20 px-3 py-1 rounded-full border border-lime/30 inline-block">
              Industry-Specific Solutions
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Solutions Tailored to Your Industry
            </h2>
            <p className="mt-4 text-lg text-ink/75">
              Every sector has distinct customer journeys and operational bottlenecks. Here is how AmanDevs engineers high-performing digital systems for specific business models.
            </p>
            <p className="mt-2 text-xs font-medium text-ink/50">
              * Note: Architectural capability demonstrations for prospective commercial clients.
            </p>
          </div>
        </Reveal>

        {/* Industry Pill Navigation */}
        <div className="mt-12 flex flex-wrap gap-2.5" role="tablist">
          {industries.map((ind) => {
            const isSelected = activeTab === ind.id;
            return (
              <button
                key={ind.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(ind.id)}
                className={`press flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold sm:text-sm ${
                  isSelected
                    ? "border-ink bg-ink text-paper shadow-md"
                    : "border-ink/15 bg-paper/60 text-ink/80 hover:border-ink/40"
                }`}
              >
                <span>{ind.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div className="mt-8 rounded-3xl border border-ink/10 bg-paper p-6 sm:p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left 7 cols: Problem, Digital Solution, Outcome */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-ink/10">
                  {iconMap[activeIndustry.id] || <Building2 size={20} className="text-violet" />}
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/60">
                    Category: {activeIndustry.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    {activeIndustry.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-base font-medium text-ink/80">
                {activeIndustry.tagline}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {activeIndustry.description}
              </p>

              {/* Proposed Digital Architecture */}
              <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-violet">
                  How We Solve This
                </span>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/85">
                  {activeIndustry.digitalSolution}
                </p>

                <div className="mt-4 rounded-xl bg-lime/20 p-3 text-xs font-semibold text-ink">
                  Expected Impact: {activeIndustry.outcome}
                </div>
              </div>

              {/* Supported business models */}
              <div className="mt-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/60">
                  Typical Businesses in This Sector:
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {activeIndustry.businesses.map((b, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-ink/10 bg-white px-3 py-1 text-xs font-medium text-ink/80"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Key Features List + Actions */}
            <div className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-white p-6 shadow-sm lg:col-span-5">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/60">
                  Specialized Features Included
                </span>
                <h4 className="mt-2 font-display text-lg font-bold text-ink">
                  Built for {activeIndustry.title}
                </h4>

                <ul className="mt-5 space-y-3">
                  {activeIndustry.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-lime-hover" />
                      <span className="text-xs font-medium text-ink/85 sm:text-sm">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-ink/10 pt-6">
                <div className="flex flex-col gap-2.5">
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent(
                      `[Industry Proposal Request] ${activeIndustry.title} — AmanDevs`
                    )}&body=${encodeURIComponent(
                      `Hello AmanDevs Studio,\n\nI would like to request a proposal for our business in the ${activeIndustry.title} sector.\n\nName: \nBusiness / Brand: \nPhone / WhatsApp: \nProject Objectives: \n\nThank you!`
                    )}`}
                    className="press flex items-center justify-center gap-2 rounded-xl bg-ink py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-sm hover:bg-ink-light"
                    title={`Send email inquiry to ${site.email}`}
                  >
                    <Mail size={14} className="text-lime" />
                    <span>Request {activeIndustry.title} Proposal</span>
                    <ArrowUpRight size={14} className="text-lime" />
                  </a>

                  <Link
                    href={`/solutions/${activeIndustry.slug}`}
                    className="press flex items-center justify-center gap-1.5 rounded-xl border border-ink/15 bg-paper py-2.5 text-xs font-semibold text-ink hover:border-ink/40"
                  >
                    <span>View In-Depth Solution Guide</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
