"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Layers,
  Mail,
  Sparkles,
  Tag,
} from "lucide-react";
import { services, site } from "@/lib/site";
import Reveal from "./Reveal";

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime-dark bg-lime/20 px-3 py-1 rounded-full border border-lime/30 inline-block">
                Core Studio Capabilities
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                What AmanDevs Offers
              </h2>
              <p className="mt-4 text-lg text-ink/75">
                Every service is engineered with bespoke, maintainable code designed to help your business acquire customers, automate manual tasks, and grow reliably online.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 py-2 font-mono text-xs font-semibold text-ink shadow-sm">
                <Sparkles size={14} className="text-lime-dark" />
                7 Production Disciplines
              </span>
            </div>
          </div>
        </Reveal>

        {/* Services List / Cards */}
        <div className="mt-14 space-y-6">
          {services.map((service, index) => {
            const isExpanded = expandedId === service.id;

            return (
              <Reveal key={service.id} delay={index * 0.04}>
                <article
                  className={`lift rounded-3xl border transition-all duration-200 ${
                    isExpanded
                      ? "border-ink/30 bg-white shadow-xl ring-1 ring-ink/10"
                      : "border-ink/10 bg-white shadow-sm hover:border-ink/20"
                  }`}
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      {/* Left: Number + Title + Description */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-extrabold text-violet">
                            {service.number}
                          </span>
                          <span className="rounded-full bg-paper px-3 py-1 font-mono text-[11px] font-semibold text-ink/70">
                            {service.visualTag}
                          </span>
                          <span className="hidden text-xs text-ink/40 sm:inline">
                            ·
                          </span>
                          <span className="hidden items-center gap-1 text-xs text-ink/60 sm:inline-flex">
                            <Clock size={13} /> {service.turnaround}
                          </span>
                        </div>

                        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                          {service.title}
                        </h3>

                        <p className="mt-2 text-base text-ink/75 sm:max-w-3xl">
                          {service.shortDesc}
                        </p>

                        {/* Quick preview of deliverables */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {service.deliverables.slice(0, 3).map((d, dIdx) => (
                            <span
                              key={dIdx}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-paper px-3 py-1 text-xs font-medium text-ink/80"
                            >
                              <CheckCircle2 size={13} className="text-lime-hover" />
                              <span>{d}</span>
                            </span>
                          ))}
                          {service.deliverables.length > 3 && (
                            <button
                              type="button"
                              onClick={() => toggleExpand(service.id)}
                              className="text-xs font-semibold text-violet underline underline-offset-2 hover:text-ink"
                            >
                              +{service.deliverables.length - 3} more deliverables
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right: Pricing & CTA block */}
                      <div className="flex flex-col items-start gap-3 rounded-2xl border border-ink/10 bg-paper/60 p-4 sm:flex-row sm:items-center lg:flex-col lg:items-end lg:justify-between">
                        <div className="text-left lg:text-right">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50">
                            Indicative Rate
                          </span>
                          <p className="font-display text-2xl font-bold text-ink">
                            {service.startingPrice}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/services/${service.slug}`}
                            className="press inline-flex items-center gap-1 rounded-full border border-ink/20 bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:border-ink"
                          >
                            <span>Details</span>
                            <ExternalLink size={12} />
                          </Link>

                          <a
                            href={`mailto:${site.email}?subject=${encodeURIComponent(
                              `[Quote Request] ${service.title} — AmanDevs`
                            )}&body=${encodeURIComponent(
                              `Hello AmanDevs Studio,\n\nI would like to request a quote for: ${service.title}\nIndicative Starting Rate: ${service.startingPrice}\n\nName: \nBusiness / Brand: \nPhone / WhatsApp: \nProject Brief / Scope: \n\nThank you!`
                            )}`}
                            className="press inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper shadow-sm hover:bg-ink-light"
                            title={`Send direct email inquiry for ${service.title} to ${site.email}`}
                          >
                            <Mail size={13} className="text-lime" />
                            <span>Quote (Email)</span>
                            <ArrowUpRight size={13} className="text-lime" />
                          </a>

                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            onClick={() => toggleExpand(service.id)}
                            className="rounded-full border border-ink/15 bg-white p-2 text-ink/70 hover:text-ink"
                            title={isExpanded ? "Collapse details" : "Expand details"}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Deep Dive Container */}
                    {isExpanded && (
                      <div className="mt-8 border-t border-ink/10 pt-6 animate-fadeIn">
                        <div className="grid gap-6 md:grid-cols-3">
                          {/* Deliverables column */}
                          <div className="rounded-2xl border border-ink/10 bg-paper/50 p-5">
                            <h4 className="font-display text-sm font-bold text-ink">
                              Full Deliverables
                            </h4>
                            <ul className="mt-3 space-y-2 text-xs text-ink/80">
                              {service.deliverables.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-lime-hover" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Business Benefits */}
                          <div className="rounded-2xl border border-ink/10 bg-paper/50 p-5">
                            <h4 className="font-display text-sm font-bold text-ink">
                              Business Benefits
                            </h4>
                            <ul className="mt-3 space-y-2 text-xs text-ink/80">
                              {service.businessBenefits.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="font-mono text-violet font-bold">›</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Target Audience */}
                          <div className="rounded-2xl border border-ink/10 bg-paper/50 p-5">
                            <h4 className="font-display text-sm font-bold text-ink">
                              Who Needs This
                            </h4>
                            <ul className="mt-3 space-y-2 text-xs text-ink/80">
                              {service.targetAudience.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-ink/40 mt-1.5 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-ink/10 pt-3">
                              <Link
                                href={`/services/${service.slug}`}
                                className="inline-flex items-center gap-1 font-mono text-xs font-bold text-violet hover:underline"
                              >
                                View full dedicated page for {service.title} →
                              </Link>
                              <a
                                href={`/?service=${encodeURIComponent(service.title)}#contact`}
                                className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-ink/70 hover:text-ink hover:underline"
                              >
                                Fill web proposal form →
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
