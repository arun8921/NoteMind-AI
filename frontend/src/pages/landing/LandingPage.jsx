import { C } from "../../services/theme";
import { LandingNav } from "./LandingNav";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { PricingSection } from "./PricingSection";
import { CTASection } from "./CTASection";
import { LandingFooter } from "./LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-y-auto" style={{ background: C.bg, scrollbarWidth: "none" }}>
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
