import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const interBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AmanDevs — Independent Web Development Studio | India & Worldwide",
    template: "%s | AmanDevs",
  },
  description:
    "Independent web development studio based in India, serving clients worldwide. AmanDevs designs and builds modern business websites, e-commerce stores, booking systems, and custom web applications.",
  keywords: [
    "web development studio in India",
    "website development services India",
    "remote web development services",
    "e-commerce website development",
    "custom web application development",
    "web developer for businesses",
    "AmanDevs",
    "Aman Raj",
    "independent web development studio",
    "Next.js web developer India",
    "hotel booking system development",
    "business website development",
    "website maintenance services",
  ],
  authors: [{ name: "Aman Raj", url: site.url }],
  creator: "Aman Raj",
  publisher: "AmanDevs",
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: "AmanDevs",
    title: "AmanDevs — Independent Web Development Studio | India & Worldwide",
    description:
      "India-based. Worldwide reach. We design and build modern websites, online stores and custom digital solutions for growing businesses.",
    images: [
      {
        url: `${site.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "AmanDevs — Independent Web Development Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AmanDevs — Independent Web Development Studio",
    description:
      "Independent web development studio based in India, serving clients worldwide.",
    creator: "@amandevs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: site.url,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000000",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AmanDevs",
  legalName: "AmanDevs",
  url: site.url,
  logo: `${site.url}/icon.svg`,
  image: `${site.url}/opengraph-image`,
  description:
    "Independent web development studio based in India, serving clients worldwide.",
  email: site.email,
  telephone: site.phone,
  sameAs: [site.instagram],
  founder: {
    "@type": "Person",
    name: "Aman Raj",
    jobTitle: "Founder & Lead Developer",
    url: site.url,
  },
  areaServed: [
    {
      "@type": "Country",
      name: "India",
    },
  ],
  knowsAbout: [
    "Web Development",
    "Next.js Development",
    "React",
    "TypeScript",
    "E-commerce Website Development",
    "Custom Web Applications",
    "Booking and Reservation Systems",
    "Business Website Development",
    "Website Maintenance & Technical Support",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: site.email,
    telephone: site.phone,
    availableLanguage: ["English", "Hindi"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${interDisplay.variable} ${interBody.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body selection:bg-lime selection:text-black antialiased bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
