const items = [
  "Bespoke Web Development",
  "Next.js 15 & React 19",
  "High-Converting Landing Pages",
  "E-Commerce & UPI Checkouts",
  "Hospitality & Hotel Bookings",
  "Tour & Travel Engines",
  "Custom Web Applications",
  "Direct WhatsApp Inquiries",
  "Sub-2s Mobile Loading",
  "Zero Agency Bureaucracy",
  "Direct Developer Access",
  "Production-Grade TypeScript",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-ink/10 bg-ink py-4 text-paper"
    >
      <div className="flex w-max animate-marquee items-center gap-10 font-display text-sm tracking-wide sm:text-base">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-medium text-paper/90">{t}</span>
            <span className="text-lime text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
