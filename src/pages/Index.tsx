import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoTicker from "@/components/LogoTicker";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useSEO({
    title: "Prototype Media — Multicam & Content Production, Dubai",
    description:
      "Specialist multicam production studio for nightlife and events in Dubai. Multicam recordings, aftermovies, photography, and short-form content, delivered in under 8 hours.",
    path: "/",
  });

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`min-h-screen bg-background text-foreground overflow-x-hidden transition-opacity duration-[1500ms] ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <LogoTicker />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
