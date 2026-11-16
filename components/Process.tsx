import {
  CheckCircle2,
  Code2,
  FileText,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
} from "lucide-react";
import { processSteps } from "@/lib/site";
import Reveal from "./Reveal";

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search size={20} className="text-violet" />,
  FileText: <FileText size={20} className="text-violet" />,
  Palette: <Palette size={20} className="text-violet" />,
  Code2: <Code2 size={20} className="text-violet" />,
  CheckCircle2: <CheckCircle2 size={20} className="text-violet" />,
  Rocket: <Rocket size={20} className="text-violet" />,
  ShieldCheck: <ShieldCheck size={20} className="text-violet" />,
};

export default function Process() {
  return (
    <section id="process" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime-dark bg-lime/20 px-3 py-1 rounded-full border border-lime/30 inline-block">
              Clear & Transparent Execution
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Our 7-Step Development Process
            </h2>
            <p className="mt-4 text-lg text-ink/75">
              From our first discovery conversation through post-launch care, every milestone is structured, predictable, and transparent.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {processSteps.map((step, idx) => (
            <Reveal key={step.step} delay={idx * 0.04}>
              <div className="lift flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-extrabold text-violet/40">
                      {step.step}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-paper">
                      {iconMap[step.iconName] || <CheckCircle2 size={18} />}
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-ink">
                    {step.title}
                  </h3>
                  <span className="font-mono text-xs font-semibold text-violet">
                    Phase: {step.name}
                  </span>

                  <p className="mt-3 text-xs leading-relaxed text-ink/75 sm:text-sm">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-ink/10 pt-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/50">
                    Milestone Deliverable
                  </span>
                  <p className="mt-0.5 text-xs font-medium text-ink">
                    {step.deliverable}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
