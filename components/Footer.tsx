import Link from "next/link";
import { ArrowUp, ArrowUpRight, Heart, Instagram, Mail, MessageCircle, Phone, Shield } from "lucide-react";
import { site, services, industries } from "@/lib/site";

export default function Footer() {
  return (
    <footer
      className="border-t border-paper/10 bg-ink pt-16 pb-12 text-paper sm:pt-20"
      style={{ paddingBottom: "max(3rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Col 1: Studio Brand & Statement */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lime font-display font-black text-lg">
                AD
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-paper">
                AmanDevs<span className="text-lime">.</span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-paper/75">
              {site.statement}
            </p>

            <div className="mt-6 space-y-2 text-xs text-paper/60">
              <p>
                <strong className="text-paper">Founder:</strong> {site.founder}
              </p>
              <p>
                <strong className="text-paper">Studio Model:</strong> {site.businessType} ({site.businessModel})
              </p>
              <p>
                <strong className="text-paper">Location:</strong> {site.location}
              </p>
              <p>
                <strong className="text-paper">Service Area:</strong> {site.serviceArea}
              </p>
              <p>
                <strong className="text-paper">Identity:</strong> {site.positioning.badge}
              </p>
              <p>
                <strong className="text-paper">Domain:</strong> {site.domain}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center gap-1.5 rounded-full border border-paper/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-paper hover:bg-white/10"
              >
                <MessageCircle size={14} className="text-lime" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="press inline-flex items-center gap-1.5 rounded-full border border-paper/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-paper hover:bg-white/10"
              >
                <Mail size={14} className="text-lime" />
                <span>Email</span>
              </a>
              {site.instagram && (
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex items-center gap-1.5 rounded-full border border-paper/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-paper hover:bg-white/10"
                >
                  <Instagram size={14} className="text-pink-400" />
                  <span>Instagram</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime">
              Studio Services
            </span>
            <ul className="mt-4 space-y-2.5 text-xs">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-paper/70 transition-colors hover:text-paper hover:underline"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Industry Solutions */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-violet">
              Industry Solutions
            </span>
            <ul className="mt-4 space-y-2.5 text-xs">
              {industries.map((ind) => (
                <li key={ind.id}>
                  <Link
                    href={`/solutions/${ind.slug}`}
                    className="text-paper/70 transition-colors hover:text-paper hover:underline"
                  >
                    {ind.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Legal */}
          <div className="lg:col-span-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-paper/50">
              Quick Links
            </span>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <a href="/#work" className="text-paper/70 hover:text-paper">
                  What We Build
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-paper/70 hover:text-paper">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="/#process" className="text-paper/70 hover:text-paper">
                  7-Step Process
                </a>
              </li>
              <li>
                <a href="/#about" className="text-paper/70 hover:text-paper">
                  About AmanDevs
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-paper/70 hover:text-paper">
                  Start Project
                </a>
              </li>
              <li className="pt-2">
                <Link href="/privacy" className="text-paper/50 hover:text-paper">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-paper/50 hover:text-paper">
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="#top"
                className="press inline-flex items-center gap-1.5 font-mono text-xs text-lime hover:underline"
              >
                <span>Back to Top</span>
                <ArrowUp size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 text-xs text-paper/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} AmanDevs. Founded by Aman Raj · Based in India · Working worldwide.
          </p>
          <p className="font-mono text-[11px]">
            Designed & Engineered with Next.js 15, React 19 & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
