"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import deepNavyImage from "@/assets/Deep Navy.png";
import carbonBlackImage from "@/assets/Carbon Black.png";
import titaniumSilverImage from "@/assets/Titanium Silver.png";
import vintageRoseImage from "@/assets/Vintage Rose.png";
import Image from "next/image";
import SpecPopup from "./SpecPopup";

const variations = [
  { name: "Deep Navy", color: "bg-blue-900", accent: "text-blue-400", image: deepNavyImage },
  { name: "Carbon Black", color: "bg-zinc-900", accent: "text-zinc-400", image: carbonBlackImage },
  { name: "Titanium Silver", color: "bg-slate-700", accent: "text-slate-300", image: titaniumSilverImage },
  { name: "Vintage Rose", color: "bg-rose-900", accent: "text-rose-400", image: vintageRoseImage },
];

export default function PremiumGallery() {
  const container = useRef<HTMLDivElement>(null);
  const [openSpecIdx, setOpenSpecIdx] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.from(".gallery-card", {
        opacity: 0,
        scale: 0.9,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="bg-black py-40">
      <div className="max-w-7xl mx-auto px-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-blue-500 text-[10px] uppercase tracking-[0.6em] block mb-4">The Collection</span>
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white">
              Explore the <br />
              <span className="italic text-zinc-600 font-extralight">Spectrum.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg md:text-xl font-light max-w-sm mt-8 md:mt-0">
            Four distinct expressions of the same master engineering. Choose your identity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {variations.map((item, idx) => (
            <div
              key={idx}
              className="gallery-card group relative aspect-3/4 overflow-hidden rounded-3xl cursor-pointer"
              onClick={() => setOpenSpecIdx(idx)}
            >
              <div
                className={`absolute inset-0 ${item.color} opacity-40 group-hover:scale-110 transition-transform duration-700`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="w-full aspect-square bg-white/5 rounded-full scale-50 group-hover:scale-100 transition-transform duration-700 flex items-center justify-center border border-white/10 overflow-hidden">
                  <Image
                    height={400}
                    width={400}
                    src={item.image.src}
                    alt={item.name}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              </div>

              <div className="absolute bottom-10 left-10 right-10 flex flex-col items-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className={`text-[10px] uppercase tracking-[0.4em] mb-2 ${item.accent}`}>{item.name}</span>
                <button className="text-white text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 focus:opacity-100 focus:outline-none cursor-pointer">
                  View Specs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Animated Popup/Modal for Specs */}
      {openSpecIdx !== null && <SpecPopup variation={variations[openSpecIdx]} onClose={() => setOpenSpecIdx(null)} />}
    </section>
  );
}
