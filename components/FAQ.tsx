"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { faqs } from "@/lib/site";
import Reveal from "./Reveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="border-t border-ink/10 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime-dark bg-lime/20 px-3 py-1 rounded-full border border-lime/30 inline-block">
              Clear Answers
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base text-ink/75 sm:text-lg">
              Everything you need to know about working with AmanDevs before starting your project.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <Reveal key={idx} delay={idx * 0.03}>
                <div
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-ink/30 bg-paper/60 shadow-sm"
                      : "border-ink/10 bg-white hover:border-ink/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-display text-base font-bold text-ink sm:text-lg">
                      {faq.q}
                    </span>
                    <span className="ml-4 shrink-0 rounded-full border border-ink/10 bg-white p-1 text-ink/70">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-ink/10 px-6 pb-6 pt-3 text-sm leading-relaxed text-ink/75">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
