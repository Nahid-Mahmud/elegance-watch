"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import heartBitImage from "@/assets/heartbit.png";
import shappireShieldImage from "@/assets/shield.png";
import handPolishedImage from "@/assets/handpolished.png";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Details = [
  {
    title: "The Heartbeat",
    description: "Our in-house caliber features 28,800 vibrations per hour, ensuring surgical precision.",
    color: "bg-blue-500/10",
    image: heartBitImage,
  },
  {
    title: "Sapphire Shield",
    description: "Double-domed sapphire crystal with five layers of anti-reflective coating.",
    color: "bg-indigo-500/10",
    image: shappireShieldImage,
  },
  {
    title: "Hand-Polished",
    description: "Each case undergoes 40 hours of artisanal mirror-polishing by master craftsmen.",
    color: "bg-slate-500/10",
    image: handPolishedImage,
  },
];

export default function CraftsmanshipSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".craft-item");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          // Calculate end based on content width for smoother scrolling
          end: () => "+=" + container.current?.offsetWidth,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: container },
  );

  return (
    // h-screen ensures the section stays fixed in the viewport while pinned
    <section ref={container} className="bg-black h-screen flex flex-col overflow-hidden">
      {/* Header: Static within the pinned container */}
      <div className="pt-16 pb-8 px-10 text-center flex-shrink-0">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-4 font-serif text-white">
          Uncompromising <span className="text-blue-500 italic">Craft</span>
        </h2>
        <div className="w-24 h-[1px] bg-blue-500 mx-auto" />
      </div>

      {/* Horizontal Slider Wrapper */}
      <div className="flex flex-nowrap h-full">
        {Details.map((item, idx) => (
          <div
            key={idx}
            className="craft-item w-screen flex-shrink-0 h-full flex items-start justify-center px-6 md:px-20 pb-10"
          >
            <div
              className={`relative w-full max-w-6xl h-fit md:h-[60vh] rounded-3xl overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12 border border-white/5 ${item.color} backdrop-blur-3xl`}
            >
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-full aspect-square max-h-[300px] md:max-h-none bg-gradient-to-br from-white/10 to-transparent rounded-2xl flex items-center justify-center border border-white/5">
                  <Image src={item.image} alt={item.title} fill className="object-contain p-4" />
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                <h3 className="text-2xl md:text-5xl font-light tracking-tight text-white font-serif">{item.title}</h3>
                <p className="text-base md:text-xl text-zinc-400 font-light leading-relaxed">{item.description}</p>
                <div className="flex gap-4">
                  <div className="px-3 py-1.5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-zinc-500">
                    Precision
                  </div>
                  <div className="px-3 py-1.5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-zinc-500">
                    Innovation
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
