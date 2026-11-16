"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Instagram, Menu, MessageCircle, X } from "lucide-react";
import { site } from "@/lib/site";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Solutions", href: "/#solutions" },
  { name: "What We Build", href: "/#work" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Process", href: "/#process" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-ink/10 bg-paper/90 shadow-sm backdrop-blur-md"
          : "border-b border-ink/5 bg-paper/75 backdrop-blur-sm"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-paper shadow-sm transition-transform duration-200 group-hover:scale-105">
            <span className="font-display text-lg font-black tracking-tighter text-lime">
              A
            </span>
            <span className="font-display text-xs font-bold text-paper">D</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-ink">
              AmanDevs<span className="text-lime-dark">.</span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink/50 sm:block">
              Digital Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-ink/75 transition-colors duration-150 hover:text-ink hover:font-semibold"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Aman, I would like to discuss a project with AmanDevs.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 py-2 text-xs font-semibold text-ink shadow-sm hover:border-ink/30"
          >
            <MessageCircle size={14} className="text-emerald-600" />
            <span>WhatsApp</span>
          </a>
          <a
            href="/#contact"
            className="press inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-paper shadow-sm hover:bg-ink-light"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={14} className="text-lime" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="press rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-paper"
          >
            Inquire
          </a>
          <button
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="press rounded-xl border border-ink/15 bg-white p-2 text-ink shadow-sm"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-ink/10 bg-paper px-6 py-6 md:hidden"
          >
            <div className="mb-4 flex items-center justify-between border-b border-ink/10 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-ink/60">
                Menu & Directory
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-black px-2.5 py-0.5 text-[10px] font-mono font-bold text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                {site.availability.status}
              </span>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="press flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-white"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={16} className="text-ink/40" />
                </a>
              ))}
            </nav>

            <div className="mt-6 space-y-2.5 border-t border-ink/10 pt-5">
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="press flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 text-sm font-semibold text-paper"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={16} className="text-lime" />
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Aman, I would like to discuss a project with AmanDevs.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="press flex w-full items-center justify-center gap-2 rounded-2xl border border-ink/15 bg-white py-3 text-sm font-medium text-ink"
              >
                <MessageCircle size={18} className="text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
              {site.instagram && (
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="press flex w-full items-center justify-center gap-2 rounded-2xl border border-pink-500/20 bg-pink-50/50 py-3 text-sm font-medium text-ink"
                >
                  <Instagram size={18} className="text-pink-600" />
                  <span>Instagram: @amandevs.studio</span>
                </a>
              )}
            </div>

            <div className="mt-4 text-center">
              <p className="font-mono text-xs text-ink/50">
                Founder: Aman Raj · Based in India · Working worldwide
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
