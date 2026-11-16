import { techStackCategories } from "@/lib/site";
import Reveal from "./Reveal";
import { Cpu, Server, Database, Globe, Bot } from "lucide-react";

const categoryIcons = [
  <Globe key="fe" size={18} className="text-lime" />,
  <Server key="be" size={18} className="text-violet" />,
  <Database key="db" size={18} className="text-lime" />,
  <Cpu key="dep" size={18} className="text-violet" />,
  <Bot key="ai" size={18} className="text-lime" />,
];

export default function TechStack() {
  return (
    <section className="bg-ink py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime">
              Production Capabilities
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-paper sm:text-5xl">
              Technology & Technical Stack
            </h2>
            <p className="mt-4 text-lg text-paper/75">
              We select modern, type-safe, and battle-tested technologies suited for performance, reliability, and long-term business maintainability.
            </p>
            <p className="mt-2 text-xs font-mono text-paper/50">
              * Real production toolchain utilized for client delivery. No artificial percentage bars.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techStackCategories.map((cat, idx) => (
            <Reveal key={cat.category} delay={idx * 0.05}>
              <div className="lift flex h-full flex-col justify-between rounded-3xl border border-paper/10 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                      {categoryIcons[idx % categoryIcons.length]}
                    </div>
                    <h3 className="font-display text-lg font-bold text-paper">
                      {cat.category}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs text-paper/60">
                    {cat.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    {cat.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="rounded-xl border border-paper/10 bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.07]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-lime">
                            {tech.name}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-paper/70">
                          {tech.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
