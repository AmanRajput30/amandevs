import {
  FileCheck,
  Layers,
  ShieldCheck,
  Sliders,
  Smartphone,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import { whyChooseUs } from "@/lib/site";
import Reveal from "./Reveal";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users size={20} className="text-violet" />,
  Sliders: <Sliders size={20} className="text-violet" />,
  Smartphone: <Smartphone size={20} className="text-violet" />,
  Layers: <Layers size={20} className="text-violet" />,
  FileCheck: <FileCheck size={20} className="text-violet" />,
  Tag: <Tag size={20} className="text-violet" />,
  Zap: <Zap size={20} className="text-violet" />,
  ShieldAlert: <ShieldCheck size={20} className="text-violet" />,
};

export default function WhyUs() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime-dark bg-lime/20 px-3 py-1 rounded-full border border-lime/30 inline-block">
              Honest Client Value
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Why Partner with AmanDevs
            </h2>
            <p className="mt-4 text-lg text-ink/75">
              We don&apos;t make exaggerated promises or fabricate awards. We offer real, dependable engineering advantages that make working with an independent developer a superior commercial choice.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.04}>
              <div className="lift flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper">
                    {iconMap[item.icon] || <ShieldCheck size={20} />}
                  </div>

                  <h3 className="mt-4 font-display text-base font-bold text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-ink/70 sm:text-sm">
                    {item.description}
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
