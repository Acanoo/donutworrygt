"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import { WelcomeGate } from "@/components/welcome-gate";
import { Navbar } from "@/components/sections/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { CatalogSection } from "@/components/sections/catalog-section";
import { BusinessSection } from "@/components/sections/business-section";
import { PersonalizationSection } from "@/components/sections/personalization-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ProcessSection } from "@/components/sections/process-section";
import { QuoteFormSection } from "@/components/sections/quote-form-section";
import { FooterSection } from "@/components/sections/footer-section";
import { ScrollDonut } from "@/components/scroll-donut";

export function HomeExperience() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const hasEntered = window.sessionStorage.getItem("dw-entered");
    if (hasEntered === "true") {
      setEntered(true);
    }

    const preventProtectedActions = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.closest("img") || target.closest("[data-protected-media='true']")) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventProtectedActions);
    document.addEventListener("dragstart", preventProtectedActions);

    return () => {
      document.removeEventListener("contextmenu", preventProtectedActions);
      document.removeEventListener("dragstart", preventProtectedActions);
    };
  }, []);

  const handleEnter = () => {
    window.sessionStorage.setItem("dw-entered", "true");
    setEntered(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="gate"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <WelcomeGate onEnter={handleEnter} />
          </motion.div>
        ) : (
          <motion.main
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <HeroSection />
            <BenefitsSection />
            <CatalogSection />
            <BusinessSection />
            <PersonalizationSection />
            <GallerySection />
            <TestimonialsSection />
            <ProcessSection />
            <QuoteFormSection />
            <FooterSection />
            <ScrollDonut />
            <FloatingWhatsApp />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
