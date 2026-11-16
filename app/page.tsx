import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Work from "@/components/Work";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Services />
        <Solutions />
        <Work />
        <About />
        <TechStack />
        <Process />
        <Pricing />
        <WhyUs />
        <FAQ />
        <Contact />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
