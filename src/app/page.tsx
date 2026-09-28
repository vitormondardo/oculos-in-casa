import { Hero } from "@/components/sections/Hero";
import { ProductSection } from "@/components/sections/ProductSection";
import { LensesSection } from "@/components/sections/LensesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductSection />
      <LensesSection />
      <ServicesSection />
      <HowItWorksSection />
      <CtaSection />
    </>
  );
}
