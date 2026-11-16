"use client";

import { useState, useEffect } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

const serviceOptions = [
  "Business Website Development",
  "E-commerce Development",
  "Booking and Reservation Systems",
  "Custom Web Applications",
  "AI Integration and Automation",
  "Dashboards and Business Tools",
  "Website Maintenance & Technical Support",
  "Other / Custom Consultation",
];

const budgetOptions = [
  "₹7,999 – ₹14,999 (Launch / Small Business)",
  "₹15,000 – ₹29,999 (Business Tier / Booking)",
  "₹30,000 – ₹59,999 (Advanced / Custom Web App)",
  "₹60,000+ (Custom Enterprise / SaaS)",
  "Flexible / Need Consultation",
];

const timelineOptions = [
  "Immediate (Within 1-2 weeks)",
  "Within 1 month",
  "Within 2-3 months",
  "Flexible planning phase",
];

export default function Contact() {
  const [inquiryMode, setInquiryMode] = useState<"quick" | "full">("quick");
  const [formData, setFormData] = useState({
    _hp: "", // Honeypot spam defense
    name: "",
    businessName: "",
    email: "",
    phone: "",
    service: serviceOptions[0],
    budget: budgetOptions[1],
    timeline: timelineOptions[1],
    description: "",
    referenceUrl: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedId, setConfirmedId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Check URL parameters to pre-fill service/package/concept if linked from cards
  useEffect(() => {
    if (typeof window !== "undefined") {
      const parseParams = () => {
        const hash = window.location.hash;
        const search = window.location.search;
        let params = new URLSearchParams(search);

        if (hash.includes("?")) {
          const queryPart = hash.split("?")[1];
          params = new URLSearchParams(queryPart);
        }

        const s = params.get("service");
        const p = params.get("package");
        const c = params.get("concept");
        const ind = params.get("industry");

        if (s) {
          const match = serviceOptions.find((opt) =>
            opt.toLowerCase().includes(s.toLowerCase())
          );
          if (match) setFormData((prev) => ({ ...prev, service: match }));
          setInquiryMode("full");
        } else if (p) {
          setFormData((prev) => ({
            ...prev,
            description: `Inquiring about the ${p} package.`,
          }));
          setInquiryMode("full");
        } else if (c) {
          setFormData((prev) => ({
            ...prev,
            description: `Inquiring about building something similar to the "${c}" demonstration.`,
          }));
          setInquiryMode("full");
        } else if (ind) {
          setFormData((prev) => ({
            ...prev,
            description: `Inquiring about digital solutions for the ${ind} sector.`,
          }));
          setInquiryMode("full");
        }

        if (
          hash.startsWith("#contact") ||
          search.includes("service=") ||
          search.includes("package=") ||
          search.includes("industry=")
        ) {
          const el = document.getElementById("contact");
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth" });
            }, 120);
          }
        }
      };

      parseParams();
      window.addEventListener("hashchange", parseParams);
      return () => window.removeEventListener("hashchange", parseParams);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const copyInquiryId = () => {
    if (!confirmedId) return;
    navigator.clipboard.writeText(confirmedId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          mode: inquiryMode,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit enquiry.");
      }

      setConfirmedId(result.inquiryId || "AD-" + Date.now().toString().slice(-6));
      setStatus("success");
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMessage(errorStr);
      setStatus("error");
    }
  };

  // WhatsApp quick link generator with pre-filled message
  const whatsappMessage = encodeURIComponent(
    `Hello Aman,\nI am reaching out regarding a project with AmanDevs.\n\n` +
      `*Name:* ${formData.name || "Prospective Client"}\n` +
      `*Business:* ${formData.businessName || "Not specified"}\n` +
      `*Service:* ${formData.service}\n` +
      `*Budget:* ${formData.budget}\n` +
      (confirmedId ? `*Reference ID:* ${confirmedId}\n` : "") +
      `*Details:* ${formData.description || "Looking for a scope and quotation."}`
  );

  // Mailto fallback generator addressed directly to hello@amandevs.run.place
  const mailtoLink = `mailto:${site.email}?subject=${encodeURIComponent(
    `[Project Inquiry] ${formData.service} — ${formData.name || "New Client"}`
  )}&body=${encodeURIComponent(
    `Hello AmanDevs Team,\n\nI am inquiring about web development services.\n\n` +
      `Name: ${formData.name}\n` +
      `Business: ${formData.businessName || "N/A"}\n` +
      `Phone/WhatsApp: ${formData.phone}\n` +
      `Service: ${formData.service}\n` +
      `Budget Range: ${formData.budget}\n` +
      `Target Timeline: ${formData.timeline}\n\n` +
      `Project Brief:\n${formData.description}\n\n` +
      `Reference URL: ${formData.referenceUrl || "N/A"}\n`
  )}`;

  return (
    <section id="contact" className="border-t border-ink/10 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Contact Narrative & Quick Touchpoints */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime-dark bg-lime/20 px-3 py-1 rounded-full border border-lime/30 inline-block">
                Direct Contact & Support
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Start a Conversation with AmanDevs
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg">
                Independent web development studio serving businesses across India and internationally. Founder Aman Raj reviews every brief personally and will respond within 24 hours with an actionable scope, transparent pricing, and timeline.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-1 text-xs font-semibold text-ink/70">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-dark" />
                <span>Remote-first studio · Based in India · Working worldwide</span>
              </div>

              {/* Direct channels */}
              <div className="mt-8 space-y-4">
                {/* Primary Support & Contact Email */}
                <a
                  href={`mailto:${site.email}`}
                  className="press flex items-center justify-between rounded-2xl border border-ink/10 bg-white p-4.5 shadow-sm transition-all hover:border-ink/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-lime shadow-sm">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/60">
                        Primary Support & Contact Email
                      </span>
                      <p className="font-display text-base font-bold text-ink">
                        {site.email}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-ink/60" />
                </a>

                {/* Direct WhatsApp */}
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press flex items-center justify-between rounded-2xl border border-emerald-600/20 bg-emerald-50/70 p-4.5 transition-all hover:bg-emerald-100"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                        Direct WhatsApp Line · Quick Discussion
                      </span>
                      <p className="font-display text-base font-bold text-emerald-950">
                        WhatsApp: +91 73690 83321
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-emerald-700" />
                </a>

                {/* Direct Phone */}
                {site.phone && (
                  <a
                    href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}
                    className="press flex items-center justify-between rounded-2xl border border-ink/10 bg-white p-4.5 transition-all hover:border-ink/30"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-ink border border-ink/10">
                        <Phone size={18} />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/50">
                          Direct Telephone Line
                        </span>
                        <p className="font-display text-base font-bold text-ink">
                          {site.phone}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-ink/60" />
                  </a>
                )}

                {/* Direct Instagram */}
                {site.instagram && (
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press flex items-center justify-between rounded-2xl border border-pink-500/20 bg-pink-50/40 p-4.5 transition-all hover:bg-pink-50/80"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-sm">
                        <Instagram size={20} />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-pink-800">
                          Instagram Profile
                        </span>
                        <p className="font-display text-base font-bold text-ink">
                          @amandevs.studio
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-pink-700" />
                  </a>
                )}
              </div>

              {/* Developer Pledge Card */}
              <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-lime/30 p-2 text-ink">
                    <Sparkles size={16} />
                  </div>
                  <div className="text-xs text-ink/80 leading-relaxed">
                    <strong className="text-ink font-semibold">Direct Developer Guarantee:</strong>
                    <p className="mt-1">
                      All inquiries route directly to <strong>{site.email}</strong>. As an independent, remote-first studio based in India, we work directly with clients across India and internationally with zero agency overhead.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Lead Intake Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-ink/15 bg-white p-7 sm:p-10 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-ink">
                      Project Enquiry & Consultation
                    </h3>
                    <p className="mt-1 text-xs text-ink/60">
                      Direct review by founder Aman Raj · Response within 24 hours.
                    </p>
                  </div>
                  <span className="hidden sm:inline-block rounded-full bg-lime/20 border border-lime/40 px-3 py-1 font-mono text-[11px] font-semibold text-ink">
                    24h Response
                  </span>
                </div>

                {/* Dual Mode Selector */}
                {status !== "success" && (
                  <div className="mt-6 flex rounded-xl border border-ink/10 bg-paper p-1">
                    <button
                      type="button"
                      onClick={() => setInquiryMode("quick")}
                      className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition-all ${
                        inquiryMode === "quick"
                          ? "bg-ink text-paper shadow-sm"
                          : "text-ink/70 hover:text-ink"
                      }`}
                    >
                      ⚡ Quick Callback / WhatsApp (30s)
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryMode("full")}
                      className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition-all ${
                        inquiryMode === "full"
                          ? "bg-ink text-paper shadow-sm"
                          : "text-ink/70 hover:text-ink"
                      }`}
                    >
                      📋 Full Project Scope
                    </button>
                  </div>
                )}

                {/* Form states */}
                {status === "success" ? (
                  <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-50 p-6 text-emerald-950 animate-fadeIn">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
                      <h4 className="font-display text-lg font-bold">
                        Enquiry Successfully Logged!
                      </h4>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                      Thank you, <strong>{formData.name}</strong>. Your project enquiry has been recorded in our system and forwarded to <strong>{site.email}</strong>. Aman Raj will review your requirements for <strong>{formData.service}</strong> and contact you within 24 hours.
                    </p>

                    {/* Reference ID Pill */}
                    {confirmedId && (
                      <div className="mt-4 flex items-center justify-between rounded-xl bg-white/80 p-3.5 border border-emerald-600/20 text-xs">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-800">
                            Your Reference ID
                          </span>
                          <p className="font-mono text-base font-bold text-emerald-950">
                            {confirmedId}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={copyInquiryId}
                          className="press flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-200"
                        >
                          {copied ? (
                            <>
                              <Check size={14} className="text-emerald-700" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>Copy ID</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={`https://wa.me/${site.whatsapp}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-800"
                      >
                        <MessageCircle size={15} /> Confirm on WhatsApp with ID
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          setConfirmedId("");
                          setFormData({
                            _hp: "",
                            name: "",
                            businessName: "",
                            email: "",
                            phone: "",
                            service: serviceOptions[0],
                            budget: budgetOptions[1],
                            timeline: timelineOptions[1],
                            description: "",
                            referenceUrl: "",
                          });
                        }}
                        className="press rounded-full border border-emerald-700/20 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    {/* Hidden Honeypot Field */}
                    <input
                      type="text"
                      name="_hp"
                      value={formData._hp}
                      onChange={handleChange}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {status === "error" && (
                      <div className="rounded-xl border border-rose-500/20 bg-rose-50 p-4 text-xs font-medium text-rose-800 flex items-start gap-2.5">
                        <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Submission notice</p>
                          <p className="mt-0.5">{errorMessage || "Something went wrong. Please connect with us directly on WhatsApp."}</p>
                          <div className="mt-2 flex gap-3">
                            <a
                              href={mailtoLink}
                              className="font-bold underline hover:text-rose-950"
                            >
                              Send via Email ({site.email})
                            </a>
                            <span>·</span>
                            <a
                              href={`https://wa.me/${site.whatsapp}?text=${whatsappMessage}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold underline hover:text-rose-950"
                            >
                              Chat on WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Mode Layout */}
                    {inquiryMode === "quick" ? (
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="quick-name"
                              className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                            >
                              Your Name *
                            </label>
                            <input
                              id="quick-name"
                              name="name"
                              type="text"
                              required
                              autoComplete="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="e.g. Rahul Sharma"
                              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="quick-phone"
                              className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                            >
                              WhatsApp / Phone Number *
                            </label>
                            <input
                              id="quick-phone"
                              name="phone"
                              type="tel"
                              required
                              autoComplete="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+91 98765 43210"
                              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="quick-service"
                            className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                          >
                            Service of Interest
                          </label>
                          <select
                            id="quick-service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm font-medium text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                          >
                            {serviceOptions.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="quick-desc"
                            className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                          >
                            Short Note or Specific Questions (Optional)
                          </label>
                          <input
                            id="quick-desc"
                            name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="e.g. Looking for a hotel booking site or e-commerce store with UPI."
                            className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="press flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-4 text-sm font-bold uppercase tracking-wider text-paper shadow-md transition-colors hover:bg-surface disabled:opacity-60"
                          >
                            {status === "submitting" ? (
                              <span>Submitting Callback Request...</span>
                            ) : (
                              <>
                                <span>Request Quick Callback (Aman Raj)</span>
                                <Zap size={16} className="text-lime" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Full Qualification Form */
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="full-name"
                              className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                            >
                              Your Name *
                            </label>
                            <input
                              id="full-name"
                              name="name"
                              type="text"
                              required
                              autoComplete="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="e.g. Rahul Sharma"
                              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="businessName"
                              className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                            >
                              Business / Brand Name
                            </label>
                            <input
                              id="businessName"
                              name="businessName"
                              type="text"
                              autoComplete="organization"
                              value={formData.businessName}
                              onChange={handleChange}
                              placeholder="e.g. Apex Hospitality / Clinic"
                              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                            >
                              Email Address *
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              autoComplete="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="rahul@example.com"
                              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="full-phone"
                              className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                            >
                              WhatsApp / Phone *
                            </label>
                            <input
                              id="full-phone"
                              name="phone"
                              type="tel"
                              required
                              autoComplete="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+91 98765 43210"
                              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                          <div>
                            <label
                              htmlFor="service"
                              className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                            >
                              Service Required
                            </label>
                            <select
                              id="service"
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-3 py-3 text-xs font-medium text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                            >
                              {serviceOptions.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="budget"
                              className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                            >
                              Budget Range
                            </label>
                            <select
                              id="budget"
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-3 py-3 text-xs font-medium text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                            >
                              {budgetOptions.map((b) => (
                                <option key={b} value={b}>
                                  {b}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="timeline"
                              className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                            >
                              Target Timeline
                            </label>
                            <select
                              id="timeline"
                              name="timeline"
                              value={formData.timeline}
                              onChange={handleChange}
                              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-3 py-3 text-xs font-medium text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                            >
                              {timelineOptions.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="description"
                            className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                          >
                            Project Description & Requirements *
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tell us about what you want to achieve, features required (e.g. WhatsApp booking, payments, custom design), and your target audience."
                            className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="referenceUrl"
                            className="block text-xs font-bold uppercase tracking-wider text-ink/70"
                          >
                            Reference Website or Inspiration (Optional)
                          </label>
                          <input
                            id="referenceUrl"
                            name="referenceUrl"
                            type="url"
                            value={formData.referenceUrl}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="press flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-4 text-sm font-bold uppercase tracking-wider text-paper shadow-md transition-colors hover:bg-surface disabled:opacity-60"
                          >
                            {status === "submitting" ? (
                              <span>Dispatching Brief to {site.email}...</span>
                            ) : (
                              <>
                                <span>Send Complete Project Brief</span>
                                <Send size={16} className="text-lime" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-[11px] text-ink/50 font-mono">
                      <span>Primary Support: <a href={`mailto:${site.email}`} className="text-ink underline">{site.email}</a></span>
                      <span>Governed by our <a href="/privacy" className="underline hover:text-ink">Privacy Policy</a></span>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
