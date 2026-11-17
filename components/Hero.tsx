"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  Gauge,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { site } from "@/lib/site";
import Reveal, { ease } from "./Reveal";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
      {/* Background ambient accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-72 h-80 w-80 rounded-full bg-lime/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Studio Pitch */}
          <div className="lg:col-span-7">
            {/* Location & Positioning Pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-1 text-xs font-semibold text-ink/80 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-lime-dark" />
              <span>{site.positioning.badge}</span>
            </motion.div>

            {/* Minimal Editorial Availability Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease, delay: 0.05 }}
              className="mb-8 max-w-xl rounded-2xl border border-white/10 bg-black p-4 sm:p-5 text-white shadow-md"
              aria-label="Studio Availability"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-40" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-lime">
                  {site.availability.status}
                </span>
              </div>

              <div className="mt-2.5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <div>
                  <p className="font-display text-sm font-bold text-white">
                    {site.availability.headline}
                  </p>
                  <p className="mt-0.5 text-xs text-white/70">
                    {site.availability.supportingText}
                  </p>
                </div>

                <a
                  href={site.availability.href}
                  className="press mt-2 sm:mt-0 inline-flex items-center gap-1 font-mono text-xs font-semibold text-lime hover:text-white underline underline-offset-4 transition-colors shrink-0"
                >
                  <span>{site.availability.cta}</span>
                  <ArrowUpRight size={13} className="text-lime" />
                </a>
              </div>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-6xl sm:leading-[1.08] lg:text-7xl">
              Your next website should do{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 bg-lime px-2 py-0.5 rounded-lg text-ink">
                  more than
                </span>
              </span>{" "}
              just look good.
            </h1>

            {/* Supporting Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75 sm:text-xl"
            >
              Independent web development studio serving businesses across India and internationally. We design and build modern websites, online stores and custom digital solutions that help businesses attract customers, simplify operations and grow online.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              <a
                href="#contact"
                className="press inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-paper shadow-md hover:bg-ink-light"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={18} className="text-lime" />
              </a>

              <a
                href="#services"
                className="press inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-4 text-sm font-semibold text-ink shadow-sm hover:border-ink/30"
              >
                <span>Explore Our Services</span>
                <ChevronRight size={18} className="text-ink/50" />
              </a>

              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Aman, I would like to inquire about building a website with AmanDevs.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/80 px-5 py-4 text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
              >
                <MessageCircle size={18} className="text-emerald-600" />
                <span className="hidden xs:inline">Direct WhatsApp</span>
              </a>
            </motion.div>

            {/* Quick trust metrics */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-6">
              <div>
                <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  100%
                </p>
                <p className="mt-0.5 text-xs text-ink/60">
                  Direct Developer Access
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  ₹7,999
                </p>
                <p className="mt-0.5 text-xs text-ink/60">
                  Transparent Starting Rates
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  Fast
                </p>
                <p className="mt-0.5 text-xs text-ink/60">
                  Clean Mobile Code
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Studio Composition Mockup */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Studio Window Card */}
              <div className="relative overflow-hidden rounded-3xl border border-ink/15 bg-ink p-6 text-paper shadow-2xl">
                {/* Header bar */}
                <div className="flex items-center justify-between border-b border-paper/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="ml-2 font-mono text-xs text-paper/50">
                      {site.domain}/studio
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-lime/20 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-lime">
                    <Zap size={11} /> Next.js 15 Ready
                  </span>
                </div>

                {/* Hero Showcase Widget */}
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-paper/10 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-paper/60">
                        Production Standards
                      </span>
                      <span className="font-mono text-xs font-bold text-lime">Next.js 15 App Router</span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl bg-white/5 p-2.5">
                        <span className="text-paper/50">Mobile First</span>
                        <p className="mt-0.5 font-semibold text-paper">Android & iPhone</p>
                      </div>
                      <div className="rounded-xl bg-white/5 p-2.5">
                        <span className="text-paper/50">Lead Routing</span>
                        <p className="mt-0.5 font-semibold text-paper">WhatsApp & Email</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive preview representation */}
                  <div className="rounded-2xl border border-paper/10 bg-white/5 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-card border border-lime/30 text-lime">
                        <Code2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-paper">
                          Developer-Led Studio
                        </h4>
                        <p className="text-xs text-paper/70">
                          Founded by Aman Raj · India-based. Worldwide reach.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 border-t border-paper/10 pt-3 text-xs text-paper/70">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-lime" />
                        <span>Tailored Next.js 15 & React 19 architecture</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-lime" />
                        <span>Integrated WhatsApp enquiry & payment flows</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-lime" />
                        <span>Clear milestones with fixed project quotations</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Action Strip */}
                  <div className="flex items-center justify-between rounded-xl bg-lime px-4 py-3 text-ink">
                    <div className="flex items-center gap-2">
                      <Smartphone size={16} />
                      <span className="text-xs font-bold">Have a project in mind?</span>
                    </div>
                    <a
                      href="#contact"
                      className="font-mono text-xs font-black uppercase tracking-wider underline underline-offset-2 hover:opacity-80"
                    >
                      Inquire Now →
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative mini pill floating */}
              <div className="absolute -bottom-5 -left-4 rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-xl sm:-left-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime/20 text-ink">
                    <Gauge size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-ink/60 uppercase tracking-wider">
                      Speed Optimized
                    </p>
                    <p className="font-display text-sm font-bold text-ink">
                      Clean Mobile UX
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
