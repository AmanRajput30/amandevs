import { ArrowUpRight, Check, HelpCircle, Mail, Sparkles } from "lucide-react";
import { pricingTiers, site } from "@/lib/site";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-ink/10 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime-dark bg-lime/20 px-3 py-1 rounded-full border border-lime/30 inline-block">
                Transparent Rates · Indian Market Pricing
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Simple, Honest Starting Rates
              </h2>
              <p className="mt-4 text-lg text-ink/75">
                Every project is quoted with fixed scope, clear milestone stages, and zero hidden costs.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-4 py-2 font-mono text-xs font-semibold text-ink">
                <Sparkles size={14} className="text-lime-dark" />
                No Agency Markups
              </span>
            </div>
          </div>
        </Reveal>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-4">
          {pricingTiers.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 0.05}>
              <div
                className={`lift flex h-full flex-col justify-between rounded-3xl p-7 transition-all duration-200 ${
                  tier.featured
                    ? "border-2 border-ink bg-ink text-paper shadow-2xl relative"
                    : "border border-ink/10 bg-paper text-ink shadow-sm"
                }`}
              >
                {/* Featured Badge */}
                {tier.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-lime px-4 py-1 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-sm">
                    {tier.badge || "Most Popular"}
                  </span>
                )}

                <div>
                  {!tier.featured && tier.badge && (
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-violet">
                      {tier.badge}
                    </span>
                  )}

                  <h3 className="font-display text-2xl font-bold">
                    {tier.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold tracking-tight">
                      {tier.price}
                    </span>
                    {tier.price.startsWith("₹") && (
                      <span
                        className={`text-xs font-medium ${
                          tier.featured ? "text-paper/60" : "text-ink/60"
                        }`}
                      >
                        starting
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-2 text-xs leading-relaxed ${
                      tier.featured ? "text-paper/75" : "text-ink/70"
                    }`}
                  >
                    {tier.tagline}
                  </p>

                  <div
                    className={`mt-6 border-t pt-5 ${
                      tier.featured ? "border-paper/15" : "border-ink/10"
                    }`}
                  >
                    <p
                      className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                        tier.featured ? "text-lime" : "text-violet"
                      }`}
                    >
                      Included Features:
                    </p>

                    <ul className="mt-3.5 space-y-2.5 text-xs">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check
                            size={15}
                            className={`mt-0.5 shrink-0 ${
                              tier.featured ? "text-lime" : "text-emerald-600"
                            }`}
                          />
                          <span
                            className={
                              tier.featured ? "text-paper/90" : "text-ink/85"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 border-t border-current/10 pt-5">
                  <div
                    className={`mb-4 space-y-1 font-mono text-[11px] ${
                      tier.featured ? "text-paper/70" : "text-ink/60"
                    }`}
                  >
                    <p>Revisions: {tier.revisions}</p>
                    <p>Delivery: {tier.turnaround}</p>
                  </div>

                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent(
                      `[Quotation Request] ${tier.name} Package (${tier.price}) — AmanDevs`
                    )}&body=${encodeURIComponent(
                      `Hello AmanDevs Studio,\n\nI would like to request a quotation for the ${tier.name} Package (${tier.price}).\n\nName: \nBusiness / Organization: \nPhone / WhatsApp: \nProject Scope / Target Timeline: \n\nThank you!`
                    )}`}
                    className={`press flex w-full items-center justify-center gap-1.5 rounded-full py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                      tier.featured
                        ? "bg-lime text-ink hover:bg-lime-hover shadow-md"
                        : "bg-ink text-paper hover:bg-ink-light"
                    }`}
                    title={`Send quotation email for ${tier.name} package to ${site.email}`}
                  >
                    <Mail size={13} />
                    <span>Request Quote (Email)</span>
                    <ArrowUpRight size={14} />
                  </a>

                  <a
                    href={`/?package=${encodeURIComponent(tier.name)}#contact`}
                    className={`mt-2 block text-center font-mono text-[10px] underline transition-opacity ${
                      tier.featured ? "text-paper/70 hover:text-paper" : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    or fill online web form →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pricing Terms & Policies Box */}
        <div className="mt-14 rounded-3xl border border-ink/10 bg-paper p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <HelpCircle size={18} className="text-violet" />
            <h4 className="font-display text-base font-bold text-ink">
              Important Pricing & Engagement Guidelines
            </h4>
          </div>

          <div className="mt-4 grid gap-4 text-xs leading-relaxed text-ink/75 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-ink/5 bg-white p-3.5">
              <strong className="text-ink">Indicative Starting Rates:</strong>
              <p className="mt-1">
                Prices shown are baseline starting fees. Final binding quotations depend on specific functional requirements and page counts.
              </p>
            </div>
            <div className="rounded-xl border border-ink/5 bg-white p-3.5">
              <strong className="text-ink">Domain & Hosting Separate:</strong>
              <p className="mt-1">
                Domain registration (e.g. .com/.in) and third-party hosting accounts belong to you and are billed directly by those platforms.
              </p>
            </div>
            <div className="rounded-xl border border-ink/5 bg-white p-3.5">
              <strong className="text-ink">Third-Party APIs:</strong>
              <p className="mt-1">
                Any third-party subscription costs (WhatsApp API, SMS gateways, payment gateway fees, LLM API keys) are direct client subscriptions.
              </p>
            </div>
            <div className="rounded-xl border border-ink/5 bg-white p-3.5">
              <strong className="text-ink">Structured Revision Limits:</strong>
              <p className="mt-1">
                Each package outlines exact revision rounds to ensure delivery speed. Additional redesigns or post-launch features are quoted on request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
