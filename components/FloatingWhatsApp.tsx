"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { site } from "@/lib/site";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = encodeURIComponent(
    "Hello Aman, I am exploring your studio website (AmanDevs) and would like to ask a question about building a project."
  );

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2">
      {/* Small dismissable tooltip banner */}
      {showTooltip && (
        <div className="relative hidden max-w-xs items-center gap-2 rounded-2xl border border-ink/10 bg-white p-3 shadow-xl sm:flex">
          <div className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <p className="text-xs text-ink/80">
            Have a project question? Chat directly with <strong>Aman Raj</strong>.
          </p>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close notification"
            className="ml-1 text-ink/40 hover:text-ink"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${site.whatsapp}?text=${defaultMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp chat with Aman Raj"
        className="press group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-emerald-500 ring-2 ring-white" />
        </span>
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
}
