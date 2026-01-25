"use client";

import InteractiveParticles from "./InteractiveParticles";

const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center p-10 text-center relative overflow-hidden bg-black text-white">
      <InteractiveParticles />
      {/* The Grid Overlay */}
      <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 2px, transparent 2px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Refined Typography */}
      <div className="relative z-10">
        <span className="text-blue-500 uppercase tracking-[0.3em] text-xs font-bold mb-4 block font-tech">
          Est. 2024 — Engineering Archive
        </span>
        <h1 className="text-7xl md:text-9xl font-extralight tracking-tighter mb-8 leading-none">
          The{" "}
          <span className="font-serif italic font-medium text-blue-400">
            Aethelgard
          </span>{" "}
          <br /> Collection
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
          Where <span className="text-white">heritage</span> meets{" "}
          <span className="text-white italic">hyperscale</span>. A master
          blueprint for those who define the horizon.
        </p>

        <button className="mt-12 px-8 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-blue-500 hover:text-white transition-all duration-500 cursor-pointer">
          Explore the Blueprint
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
