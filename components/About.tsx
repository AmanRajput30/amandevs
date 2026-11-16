import {
  Code2,
  Compass,
  FileCheck,
  Layers,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

const studioPillars = [
  {
    title: "Direct Developer Communication",
    description:
      "You collaborate directly with founder and lead developer Aman Raj throughout discovery, development, and launch. No account managers, middle layers, or miscommunicated instructions.",
    icon: MessageSquare,
  },
  {
    title: "Attention to Detail",
    description:
      "Every pixel, button tap state, responsive breakpoint, and database query is crafted with care. We sweat the small details so your website functions flawlessly under pressure.",
    icon: Sparkles,
  },
  {
    title: "Custom Solutions",
    description:
      "No generic, one-size-fits-all page builder templates. We write bespoke, type-safe code tailored to your exact industry workflows and customer conversion points.",
    icon: Layers,
  },
  {
    title: "Practical Functionality",
    description:
      "We prioritize features that move the needle for your business: instant WhatsApp inquiry triggers, fast UPI checkouts, real-time availability checks, and clean admin dashboards.",
    icon: Zap,
  },
  {
    title: "Transparent Delivery",
    description:
      "Fixed milestone pricing, clearly documented scope, and structured revision rounds. You know exactly what is being built, when it will be delivered, and what it costs.",
    icon: FileCheck,
  },
  {
    title: "Business-Focused Development",
    description:
      "A website is a commercial asset. We measure success by how effectively your digital presence converts traffic into paying customers and simplifies your daily operations.",
    icon: Compass,
  },
];

export default function About() {
  return (
    <section id="about" className="border-t border-ink/10 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime-dark bg-lime/20 px-3 py-1 rounded-full border border-lime/30 inline-block">
                Independent Web Development Studio
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                About AmanDevs
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/80">
                <p className="font-medium text-ink text-lg leading-relaxed">
                  &ldquo;AmanDevs is an independent web development studio serving businesses across India and internationally. Based in India · Working worldwide, we combine thoughtful design, modern development technologies and business-focused functionality to create experiences that work beautifully and serve a real purpose.&rdquo;
                </p>

                <p>
                  Founded by <strong>Aman Raj</strong>, AmanDevs operates as a remote-first studio providing businesses with direct access to modern, high-standard web engineering without the excessive overhead, bureaucracy, and slow delivery cycles of conventional agencies.
                </p>

                <p>
                  <strong>India-based. Worldwide reach.</strong> When you hire AmanDevs, you don&apos;t get passed off to junior contractors—you work directly with the developer building your software from day one.
                </p>
              </div>

              {/* Studio Info Card */}
              <div className="mt-8 rounded-2xl border border-ink/10 bg-paper p-5">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50">
                      Founder & Lead Dev
                    </span>
                    <p className="mt-0.5 font-bold text-ink">{site.founder}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50">
                      Business Model
                    </span>
                    <p className="mt-0.5 font-bold text-ink">{site.businessModel}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50">
                      Location
                    </span>
                    <p className="mt-0.5 font-bold text-ink">{site.location}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50">
                      Service Area
                    </span>
                    <p className="mt-0.5 font-bold text-ink">India & Worldwide</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 6 Studio Pillars */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/60">
                Guiding Principles
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                How We Deliver Value to Clients
              </h3>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {studioPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="lift rounded-2xl border border-ink/10 bg-paper p-6 shadow-sm transition-all hover:bg-white"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-lime">
                        <Icon size={18} />
                      </div>
                      <h4 className="mt-4 font-display text-base font-bold text-ink">
                        {pillar.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-ink/70 sm:text-sm">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
