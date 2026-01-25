"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const specs = [
  { label: "Movement", value: "A-901 Automatic" },
  { label: "Reserve", value: "72 Hours" },
  { label: "Case", value: "Grade 5 Titanium" },
  { label: "Water", value: "300 Meters" },
  { label: "Crystal", value: "Box-Shape Sapphire" },
  { label: "Strap", value: "FKM Rubber / Steel" },
];

export default function SpecsSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".spec-item", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-zinc-950 pt-12 pb-32 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] -translate-y-1/2 translate-x-1/2" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 blur-[150px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-6xl mx-auto px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-7xl font-extralight tracking-tighter mb-4 text-white">
              Technical <span className="font-semibold text-blue-500 italic">Genetics.</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-2xl max-w-xl font-light">
              Engineering that defies the standard. Every component is optimized for performance and longevity.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md px-6 py-4 border border-white/10 rounded-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-blue-400 block mb-2">Build Quality</span>
            <span className="text-2xl font-light text-white">ISO 6425 Certified</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
          {specs.map((spec, idx) => (
            <div key={idx} className="spec-item p-8 border-l border-white/5 hover:border-blue-500/50 transition-colors duration-500 group">
              <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 block mb-4 group-hover:text-blue-500 transition-colors">
                {spec.label}
              </span>
              <span className="text-xl md:text-3xl font-light text-white">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
