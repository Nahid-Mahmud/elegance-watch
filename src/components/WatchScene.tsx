"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger safely for Next.js SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WatchScene() {
  const container = useRef<HTMLDivElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const hourHandRef = useRef<SVGRectElement>(null);
  const minuteHandRef = useRef<SVGRectElement>(null);
  const secondHandRef = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      // Create a timeline linked to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=4000", // Length of the scroll experience
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Scale the product up from 0.5 to 1
      tl.fromTo(
        watchRef.current,
        { scale: 0.5, rotate: -10, opacity: 0.5 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1 },
        0,
      );

      // 2. Animate 4 floating background elements (Parallax)
      tl.to(".blob-1", { x: -300, y: -150, scale: 1.5, opacity: 0.6, duration: 1 }, 0);
      tl.to(".blob-2", { x: 300, y: 200, scale: 1.2, opacity: 0.4, duration: 1 }, 0);
      tl.to(".blob-3", { x: -200, y: 300, scale: 1.8, rotate: 90, opacity: 0.5, duration: 1 }, 0);
      tl.to(".blob-4", { x: 400, y: -300, scale: 0.8, opacity: 0.2, duration: 1 }, 0);

      // 3. Trigger "fade-in" text cards at specific milestones

      // Milestone 25%
      tl.fromTo(
        ".card-1",
        { opacity: 0, y: 100, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.2 },
        0.2,
      );
      tl.to(".card-1", { opacity: 0, y: -100, filter: "blur(10px)", duration: 0.2 }, 0.35);

      // Milestone 50%
      tl.fromTo(
        ".card-2",
        { opacity: 0, y: 100, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.2 },
        0.45,
      );
      tl.to(".card-2", { opacity: 0, y: -100, filter: "blur(10px)", duration: 0.2 }, 0.6);

      // Milestone 75%
      tl.fromTo(
        ".card-3",
        { opacity: 0, y: 100, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.2 },
        0.7,
      );

      // --- CLOCK LOGIC ---
      const updateClock = () => {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        // Calculate rotations
        const secRotation = (seconds / 60) * 360;
        const minRotation = ((minutes + seconds / 60) / 60) * 360;
        const hourRotation = (((hours % 12) + minutes / 60) / 12) * 360;

        // Animate hands
        gsap.to(hourHandRef.current, {
          rotate: hourRotation,
          duration: 1,
          ease: "none",
          transformOrigin: "50% 100%",
        });
        gsap.to(minuteHandRef.current, {
          rotate: minRotation,
          duration: 1,
          ease: "none",
          transformOrigin: "50% 100%",
        });

        // The "Ticking" effect for second hand
        // We use a slight overshoot/elastic feel for realism
        gsap.to(secondHandRef.current, {
          rotate: secRotation,
          duration: 0.4,
          ease: "elastic.out(1, 0.75)",
          transformOrigin: "50% 85%", // Rotate from near the bottom of the line
        });
      };

      // Initial call
      updateClock();

      // Update every second
      const timer = setInterval(updateClock, 1000);

      return () => clearInterval(timer);
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Parallax Background Elements */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob-1 absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="blob-2 absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[150px]" />
        <div className="blob-3 absolute top-1/2 left-1/3 w-64 h-64 bg-slate-800/30 rounded-full blur-[80px]" />
        <div className="blob-4 absolute top-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
      </div> */}

      {/* Main Product Container */}
      <div ref={watchRef} className="relative z-10 w-full max-w-[600px] aspect-square flex items-center justify-center">
        <div className="relative w-full h-full p-12">
          {/* Simple but Elegant SVG Watch Representation */}
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_80px_rgba(255,255,255,0.15)]">
            <defs>
              <linearGradient id="caseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#222" />
                <stop offset="50%" stopColor="#444" />
                <stop offset="100%" stopColor="#111" />
              </linearGradient>
            </defs>
            {/* Watch Case */}
            <circle cx="200" cy="200" r="160" fill="url(#caseGradient)" stroke="#333" strokeWidth="2" />
            <circle cx="200" cy="200" r="145" fill="#050505" stroke="#1a1a1a" strokeWidth="4" />

            {/* Dial Details */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="200"
                y1="70"
                x2="200"
                y2="90"
                stroke={i % 3 === 0 ? "#fff" : "#444"}
                strokeWidth={i % 3 === 0 ? "3" : "1"}
                transform={`rotate(${i * 30} 200 200)`}
              />
            ))}

            {/* Hands */}
            {/* Hour Hand */}
            <rect
              ref={hourHandRef}
              x="197"
              y="110"
              width="6"
              height="90"
              rx="3"
              fill="#fff"
              style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.3))" }}
            />
            {/* Minute Hand */}
            <rect ref={minuteHandRef} x="198" y="80" width="4" height="120" rx="2" fill="#eee" />
            {/* Second Hand */}
            <line
              ref={secondHandRef}
              x1="200"
              y1="220"
              x2="200"
              y2="70"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Center Cap */}
            <circle cx="200" cy="200" r="7" fill="#222" stroke="#444" strokeWidth="1" />
            <circle cx="200" cy="200" r="3" fill="#3b82f6" />
          </svg>
        </div>
      </div>

      {/* Narrative Cards - Using absolute positioning for overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="card-1 absolute text-center px-10">
          <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tighter text-white">
            Absolute <span className="text-blue-500 font-tech">Precision</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-lg mx-auto font-light leading-relaxed">
            Every movement is a masterpiece of engineering, calibrated to the micro-second.
          </p>
        </div>

        <div className="card-2 absolute text-center px-10">
          <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tighter text-white">
            Deep Sea <span className="text-indigo-400 font-tech">Resilience</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-lg mx-auto font-light leading-relaxed">
            Tested in extreme pressures, designed for those who explore the unknown.
          </p>
        </div>

        <div className="card-3 absolute text-center px-10">
          <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tighter text-white">
            The <span className="text-zinc-500 font-tech">Master</span> Blueprint
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-lg mx-auto font-light leading-relaxed">
            Elevate your collection with the pinnacle of luxury watchmaking.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
