"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Info,
  Layers,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { conceptProjects, site, type ConceptProject } from "@/lib/site";
import Reveal, { ease } from "./Reveal";

const categories = [
  "All Demonstrations",
  "Hospitality & Stays",
  "Travel & Tourism",
  "Retail & E-commerce",
  "Professional Services",
  "Startups & Technology",
  "Health & Wellness",
] as const;

export default function Work() {
  const [filter, setFilter] = useState<string>("All Demonstrations");
  const [activeModalProject, setActiveModalProject] = useState<ConceptProject | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalProject(null);
      }
    };
    if (activeModalProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalProject]);

  const filteredProjects =
    filter === "All Demonstrations"
      ? conceptProjects
      : conceptProjects.filter((p) => p.industry === filter);

  return (
    <section id="work" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime-dark bg-lime/20 px-3 py-1 rounded-full border border-lime/30 inline-block">
                What We Can Build For You
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Demonstration Showcase
              </h2>
              <p className="mt-4 text-lg text-ink/75">
                Explore original interactive design and development concepts built by AmanDevs to demonstrate the quality, performance, and commercial functionality we deliver.
              </p>
            </div>

            {/* Disclaimer pill */}
            <div className="mt-6 md:mt-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3.5 py-1.5 font-mono text-[11px] font-semibold text-ink/70 shadow-sm">
                <Info size={13} className="text-violet" />
                Original Architectural Concepts
              </span>
            </div>
          </div>
        </Reveal>

        {/* Filter categories */}
        <div className="mt-12 flex flex-wrap gap-2" role="tablist">
          {categories.map((c) => {
            const isSelected = filter === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setFilter(c)}
                className={`press rounded-full border px-4 py-2 text-xs font-semibold sm:text-sm ${
                  isSelected
                    ? "border-ink bg-ink text-paper shadow-sm"
                    : "border-ink/15 bg-white text-ink/75 hover:border-ink/40"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease }}
                className="lift flex flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm"
              >
                {/* Visual mockup banner */}
                <div>
                  <div
                    className="relative p-6 text-paper"
                    style={{
                      background: `linear-gradient(135deg, ${project.gradient.from}, ${project.gradient.to})`,
                    }}
                  >
                    {/* Concept badge */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-lime backdrop-blur-md">
                        <Sparkles size={10} /> {project.label}
                      </span>
                      <span className="font-mono text-[11px] text-paper/60">
                        {project.industry}
                      </span>
                    </div>

                    {/* Window UI Representation */}
                    <div className="mt-5 rounded-2xl border border-white/15 bg-black/40 p-4 shadow-xl backdrop-blur-sm">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-white/30" />
                          <span className="h-2 w-2 rounded-full bg-white/30" />
                          <span className="h-2 w-2 rounded-full bg-white/30" />
                        </div>
                        <span className="font-mono text-[10px] text-white/50">
                          {project.brandName.toLowerCase().replace(/[^a-z0-9]/g, "")}.demo
                        </span>
                      </div>

                      <div className="mt-3">
                        <h4 className="font-display text-base font-bold text-white">
                          {project.brandName}
                        </h4>
                        <p className="mt-0.5 line-clamp-1 text-xs text-white/70">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Mockup stats */}
                      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-2.5 text-[11px]">
                        {project.previewStats.map((stat, sIdx) => (
                          <div key={sIdx}>
                            <p className="font-mono text-[10px] text-white/50">{stat.label}</p>
                            <p className="font-bold text-lime">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <span className="font-mono text-xs font-semibold text-violet">
                      {project.type}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-ink">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-xs leading-relaxed text-ink/75 sm:text-sm">
                      {project.problem}
                    </p>

                    <div className="mt-4 rounded-xl bg-paper/80 p-3 text-xs text-ink/80 border border-ink/5">
                      <strong className="text-ink font-semibold">Solution: </strong>
                      {project.solution}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-ink/10 bg-paper px-2 py-0.5 font-mono text-[11px] text-ink/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="border-t border-ink/10 p-5 bg-paper/30">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="press inline-flex items-center gap-1.5 text-xs font-bold text-violet hover:text-ink"
                    >
                      <span>Explore Concept</span>
                      <ArrowUpRight size={14} />
                    </button>

                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent(
                        `[Concept Build Inquiry] ${project.title} (${project.industry}) — AmanDevs`
                      )}&body=${encodeURIComponent(
                        `Hello AmanDevs Studio,\n\nI am interested in building a project similar to the "${project.title}" demonstration (${project.industry}).\n\nName: \nBusiness / Brand: \nPhone / WhatsApp: \nProject Notes / Scope: \n\nThank you!`
                      )}`}
                      className="press rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-paper hover:bg-ink-light"
                      title={`Send email inquiry to ${site.email}`}
                    >
                      Inquire Similar
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-ink/50 max-w-xl mx-auto">
            All showcase projects are proprietary demonstration concepts authored by AmanDevs to illustrate design fidelity, system speed, and commercial conversion patterns.
          </p>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-ink/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease }}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-ink/15 bg-white shadow-2xl"
            >
              {/* Modal header banner */}
              <div
                className="p-6 text-paper sm:p-8"
                style={{
                  background: `linear-gradient(135deg, ${activeModalProject.gradient.from}, ${activeModalProject.gradient.to})`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-lime">
                    {activeModalProject.label}
                  </span>
                  <button
                    onClick={() => setActiveModalProject(null)}
                    aria-label="Close demonstration modal"
                    className="press rounded-full bg-white/20 p-1.5 text-paper hover:bg-white/30"
                  >
                    <X size={18} />
                  </button>
                </div>

                <h3 id="modal-project-title" className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                  {activeModalProject.brandName}
                </h3>
                <p className="mt-1 text-sm text-paper/80">{activeModalProject.tagline}</p>
              </div>

              {/* Modal content */}
              <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-violet">
                    Commercial Challenge
                  </h4>
                  <p className="mt-1.5 text-sm text-ink/80 leading-relaxed">
                    {activeModalProject.problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-violet">
                    Engineered Solution
                  </h4>
                  <p className="mt-1.5 text-sm text-ink/80 leading-relaxed">
                    {activeModalProject.solution}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-violet">
                    Key Features Developed
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {activeModalProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-ink/85 sm:text-sm">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-lime-hover" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-violet">
                    Architectural Stack
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeModalProject.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-ink/10 bg-paper px-3 py-1 font-mono text-xs font-medium text-ink"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-ink/10 bg-paper/60 p-5 flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs text-ink/60">
                  Ready to build something like this?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="press rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink hover:bg-white"
                  >
                    Close
                  </button>
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent(
                      `[Concept Build Inquiry] ${activeModalProject.title} — AmanDevs`
                    )}&body=${encodeURIComponent(
                      `Hello AmanDevs Studio,\n\nI am interested in building something similar to the "${activeModalProject.title}" concept (${activeModalProject.industry}).\n\nName: \nBusiness / Organization: \nPhone / WhatsApp: \nTarget Timeline: \n\nThank you!`
                    )}`}
                    onClick={() => setActiveModalProject(null)}
                    className="press rounded-full bg-ink px-5 py-2 text-xs font-semibold text-paper hover:bg-ink-light"
                  >
                    Request Similar Build (Email) →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
