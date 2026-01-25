import WatchScene from "@/components/WatchScene";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import SpecsSection from "@/components/SpecsSection";
import HeritageSection from "@/components/HeritageSection";
import PremiumGallery from "@/components/PremiumGallery";
import ExclusiveCTA from "@/components/ExclusiveCTA";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="bg-black text-white selection:bg-blue-500/30">
      {/* 1. Intro Hero Section */}
      <HeroSection />

      {/* 2. The Interactive Product Experience (Sticky) */}
      <WatchScene />

      {/* 3. Craftsmanship (Horizontal Scroll) */}
      <CraftsmanshipSection />

      {/* 4. Technical Specifications */}
      <SpecsSection />

      {/* 5. Brand Heritage (Parallax) */}
      <HeritageSection />

      {/* 6. Product Gallery */}
      <PremiumGallery />

      {/* 7. Final Premium CTA */}
      <ExclusiveCTA />

      {/* Footer */}
      <footer className="py-20 text-center border-t border-white/5 text-[10px] uppercase tracking-[0.6em] text-zinc-800 bg-black font-tech">
        &copy; 2026 Aethelgard Horology. All Rights Reserved.
      </footer>
    </main>
  );
}
