import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description:
    "The page or digital solution you are looking for has moved or does not exist on AmanDevs. Return to home or contact our studio.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-paper px-6 py-20 text-center">
      <div className="mx-auto max-w-md">
        <span className="font-display text-8xl font-black tracking-tight text-ink/20">
          404
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-ink/70">
          The page or digital solution you are looking for has moved, or does not exist on AmanDevs.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="press inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper"
          >
            <Home size={16} /> Back to Home
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Aman, I was browsing AmanDevs and need assistance.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-semibold text-ink"
          >
            <MessageCircle size={16} /> WhatsApp Aman
          </a>
        </div>
      </div>
    </div>
  );
}
