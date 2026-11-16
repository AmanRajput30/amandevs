# AmanDevs — Independent Web Development Studio

> **"We build digital experiences that help businesses grow, connect with customers and work smarter."**

AmanDevs is an independent, developer-led web development studio founded by **Aman Raj**. This website is engineered for commercial freelance operations, designed to showcase architectural capabilities, communicate transparent starting pricing, and generate qualified commercial client inquiries.

---

## 🚀 Live Studio Information

- **Production Domain:** [https://amandevs.run.place](https://amandevs.run.place)
- **Founder & Lead Developer:** Aman Raj
- **Studio Model:** Independent Developer-Led Studio
- **Primary Market:** India (with capability to serve international clients)
- **Direct Contact & Primary Support:** [hello@amandevs.run.place](mailto:hello@amandevs.run.place)
- **WhatsApp:** [+91 73690 83321](https://wa.me/917369083321) (Direct pre-filled customer inquiries enabled)
- **Phone:** +91 73690 83321
- **Instagram:** [@amandevs.studio](https://www.instagram.com/amandevs.studio?mdxt=eWx6cTd6dWF4cGM5)

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Runtime:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) (Strict mode)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations:** [Framer Motion 11](https://www.framer.com/motion/) (Hardware-accelerated, reduced-motion aware)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** `Space Grotesk` (Editorial display) & `Inter` (Readable body)

---

## 📐 Architecture & Website Structure

1. **Header & Navigation (`components/Nav.tsx`)**
   - Brand logo mark for AmanDevs
   - Smooth desktop link navigation (`#services`, `#solutions`, `#work`, `#pricing`, `#process`, `#about`, `#contact`)
   - "Start a Project" CTA and direct WhatsApp trigger
   - Responsive mobile navigation drawer with backdrop blur and touch-optimized links

2. **Hero Section (`components/Hero.tsx`)**
   - Headline: *"Your next website should do more than just look good."*
   - Supporting narrative on conversion, operations, and business growth
   - Live availability beacon (indicating current client intake status)
   - Interactive visual studio composition showing production standards, sub-second speed, and WhatsApp lead routing

3. **Services (`components/Services.tsx` & `/services/[slug]`)**
   - **01. Business Website Development** — High-converting corporate and local business presence
   - **02. E-commerce Development** — Zero-commission online stores with UPI and Card checkout
   - **03. Booking and Reservation Systems** — Direct booking engines for hospitality, clinics, and tours
   - **04. Custom Web Applications** — Purpose-built SaaS MVPs, admin dashboards, and client portals
   - **05. AI Integration and Automation** — Practical conversational assistants and lead qualification
   - **06. Dashboards and Business Tools** — Operational telemetry, real-time KPI metrics, and reporting
   - **07. Website Maintenance & Support** — Speed optimization, security updates, and code backups
   - Dynamic SSG detail pages with full deliverables, target audience, and business benefits

4. **Industry Solutions (`components/Solutions.tsx` & `/solutions/[slug]`)**
   - Dedicated modules for:
     - **Hospitality & Stays** (Hotels, villas, homestays, resorts, restaurants)
     - **Travel & Tourism** (Tour agencies, trip planners, adventure guides)
     - **Retail & E-commerce** (D2C brands, apparel, electronics, local retailers)
     - **Professional Services** (Consultants, lawyers, accountants, agencies)
     - **Health & Wellness** (Clinics, aesthetic studios, fitness centres)
     - **Startups & Technology** (SaaS ventures, product MVPs, waitlist portals)
   - Real-world digital solution mapping without implying previous client relationships

5. **"What We Can Build" Showcase (`components/Work.tsx`)**
   - 6 original architectural demonstration concepts (clearly labelled as "Concept Design"):
     1. *The Azure Bay Resort & Suites* (Hospitality)
     2. *WanderVoyage Expeditions* (Travel)
     3. *Aura Botanical Living* (E-commerce)
     4. *Apex Horizon Advisory* (Corporate Advisory)
     5. *MetricFlow Analytics* (SaaS Dashboard)
     6. *Lumière Aesthetic Studio* (Clinic & Appointments)
   - Interactive inspection modal displaying commercial challenge, proposed solution, key features, and technology stack

6. **Studio Narrative & Values (`components/About.tsx`)**
   - Focus on direct developer access, attention to detail, transparent delivery, and custom code
   - Strictly free of student, college, or internship portfolio references

7. **Technology & Toolchain (`components/TechStack.tsx`)**
   - Frontend, Backend, Databases, Infrastructure, and AI categories
   - Capability-driven presentation without arbitrary percentage bars

8. **7-Step Development Roadmap (`components/Process.tsx`)**
   - Discovery → Planning → Design → Development → Testing → Launch → Support

9. **Transparent Pricing (`components/Pricing.tsx`)**
   - **Launch (₹7,999):** Single-page high-converting business presence
   - **Business (₹14,999):** Up to 5 custom-designed pages with lead routing (Featured)
   - **Advanced (₹29,999):** Custom web application, portals, and database features
   - **Custom Solutions:** E-commerce, SaaS MVPs, dashboards, AI workflows
   - Clear terms outlining separate domain/hosting costs and revision boundaries

10. **Client Assurance (`components/WhyUs.tsx` & `components/FAQ.tsx`)**
    - 8 genuine developer-led advantages
    - Comprehensive FAQ covering costs, timelines, hosting, code ownership, and warranties

11. **Lead Generation & Contact System (`components/Contact.tsx` & `/api/enquiry`)**
    - Full lead qualification form (Name, Business Name, Email, WhatsApp, Service, Budget, Timeline, Description, Reference URL)
    - Real-time client-side validation and server-side verification via `/api/enquiry`
    - Automated pre-filled WhatsApp enquiry generator
    - Direct phone, email, and Instagram channels

12. **Compliance, SEO & Utility Routes**
    - Privacy Policy (`/privacy`)
    - Terms and Conditions (`/terms`)
    - Custom Branded 404 (`app/not-found.tsx`)
    - Dynamic XML Sitemap (`app/sitemap.ts`)
    - Search Engine Crawl Directives (`app/robots.ts`)
    - JSON-LD Structured Data Schema (`ProfessionalService`)

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js:** v18.18.0 or newer (tested with v24.12.0)
- **npm:** v9.0.0 or newer

### 2. Clone & Install
```bash
# Navigate to the project directory
cd aman-raj-portfolio

# Install production and development dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your contact information and target domain:
```env
NEXT_PUBLIC_SITE_URL=https://amandevs.run.place
NEXT_PUBLIC_CONTACT_EMAIL=hello@amandevs.run.place
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
NEXT_PUBLIC_PHONE_NUMBER=+91 99999 99999
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/amandevs.studio?mdxt=eWx6cTd6dWF4cGM5
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Test
```bash
# Verify TypeScript strict typing
npx tsc --noEmit

# Compile static assets and server routes
npm run build

# Preview production build locally
npm run start
```

---

## 🌐 Netlify Deployment Guide

This project is optimized for deployment to **Netlify** or **Vercel**.

### Step 1: Push Repository to GitHub
Ensure all files are committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "feat: complete AmanDevs Digital Studio enhancement"
git push origin main
```

### Step 2: Connect to Netlify
1. Log in to [Netlify](https://app.netlify.com/).
2. Click **"Add new site"** > **"Import an existing project"**.
3. Select **GitHub** and authorize access to your repository.
4. Netlify will automatically detect Next.js. Configure the build settings:
   - **Base directory:** Leave blank (or `aman-raj-portfolio` if in a subfolder)
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Under **Environment variables**, add the keys defined in your `.env.local`:
   - `NEXT_PUBLIC_SITE_URL`: `https://amandevs.run.place`
   - `NEXT_PUBLIC_CONTACT_EMAIL`: Your operational email address
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Your business WhatsApp number (with country code, e.g. `917369083321`)
   - `NEXT_PUBLIC_PHONE_NUMBER`: Your display phone number (e.g. `+91 73690 83321`)
   - `NEXT_PUBLIC_INSTAGRAM_URL`: Your studio social profile
6. Click **Deploy Site**. Netlify automatically installs the `@netlify/plugin-nextjs` and builds the static and serverless routes.

---

## 🔗 Connecting `amandevs.run.place` Custom Domain

1. In your **Netlify** project dashboard:
   - Navigate to **Site configuration** → **Domain management**.
   - Click **"Add a domain"** and enter `amandevs.run.place`.
2. Netlify will display the required DNS records:
   - **For apex domain (`amandevs.run.place`):** Add an **A Record** pointing to `75.2.60.5` (Netlify's load balancer IP), or use Netlify DNS nameservers.
   - **For subdomain (`www.amandevs.run.place`):** Add a **CNAME Record** pointing to your Netlify site URL (e.g. `<site-name>.netlify.app`).
3. Once DNS propagates (typically 5 to 30 minutes), Netlify will automatically provision a free Let's Encrypt **SSL/TLS certificate** for HTTPS security.

---

## ⚙️ Configuration Values You Need to Provide

To make the studio 100% operational for your real commercial inquiries, update the following values in your deployment dashboard or `.env.local`:

| Variable Name | Description | Example / Recommended Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical domain of the studio | `https://amandevs.run.place` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Official inbox for receiving leads & support | `hello@amandevs.run.place` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number for direct chats (digits only, include country code) | `917369083321` |
| `NEXT_PUBLIC_PHONE_NUMBER` | Display phone number shown in the header/footer | `+91 73690 83321` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Studio Instagram profile link | `https://www.instagram.com/amandevs.studio?mdxt=eWx6cTd6dWF4cGM5` |
| `CONTACT_NOTIFICATION_WEBHOOK` *(Optional)* | Webhook URL to forward leads into Slack, Discord, or Google Sheets | `https://hooks.zapier.com/...` |

---

## 🔑 External Services & Accounts Required

1. **Domain Registrar (for `amandevs.run.place`):**
   - Access to DNS records to point the A/CNAME record to your hosting provider.
2. **Hosting Provider:**
   - [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/) (Free tier is more than adequate for initial commercial traffic).
3. **WhatsApp Business Account:**
   - Active phone number configured on WhatsApp to receive incoming one-tap pre-filled project inquiries.
4. **Email Provider:**
   - Professional Google Workspace, Zoho Mail, or Proton Mail address matching your domain.
5. **(Optional) Payment Gateway:**
   - Razorpay or Stripe account when onboarding e-commerce clients.

---

## 🧪 Verification & Quality Assurance Summary

The codebase has undergone full automated validation:

- **TypeScript Compilation (`npx tsc --noEmit`):** ✅ Passed with 0 errors.
- **Production Build (`npm run build`):** ✅ Passed cleanly in 14.7 seconds.
- **Static Page Generation:** ✅ 23 of 23 routes successfully prerendered (including 7 service detail pages and 6 industry solution pages).
- **Responsive Layout Testing:** Validated for mobile viewports (360px, 390px), tablets (768px), and high-resolution displays (1024px, 1440px).
- **Accessibility:** Reduced-motion media query support, high-contrast text ratios, explicit focus rings, and semantic landmarks (`main`, `header`, `footer`, `nav`, `section`, `article`).
- **SEO & Search Indexing:** Open Graph cards, dynamic XML sitemaps, robots.txt directives, and `ProfessionalService` JSON-LD schema.

---

© 2026 AmanDevs Digital Studio. Founded by Aman Raj.
