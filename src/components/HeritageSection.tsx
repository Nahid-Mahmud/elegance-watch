"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeritageSection() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".heritage-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(textRef.current, {
        opacity: 0,
        y: 100,
        filter: "blur(20px)",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="relative h-[120vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Parallax Background */}
      <div className="heritage-bg absolute inset-0 w-full h-[150%] opacity-40 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <h2 className="text-[20vw] font-black uppercase tracking-tighter select-none">Heritage</h2>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        </div>
      </div>

      <div ref={textRef} className="relative z-10 text-center px-10 max-w-4xl">
        <span className="text-[10px] uppercase tracking-[1em] text-blue-500 mb-8 block font-medium">Est. 1924</span>
        <h2 className="text-5xl md:text-8xl font-thin tracking-tighter text-white mb-12 leading-tight">
          A Century of <br />
          <span className="italic font-normal">Silent Innovation.</span>
        </h2>
        <p className="text-zinc-500 text-lg md:text-2xl font-light leading-relaxed mb-16">
          Founded in the glacial valleys of the North, Aethelgard has spent 100 years perfecting the balance between
          mechanical integrity and artistic expression. We don&apos;t just build watches; we forge legacies.
        </p>
        <button
          onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
          className="group relative px-12 py-5 overflow-hidden border border-white/20 transition-all duration-500 hover:border-blue-500"
        >
          <span className="relative z-10 text-[10px] uppercase tracking-[0.5em] text-white">Discover the Legacy</span>
          <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </button>
      </div>
    </section>
  );
}
