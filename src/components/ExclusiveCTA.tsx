"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import OrderModal from "./OrderModal";
import ContactModal from "./ContactModal";

export default function ExclusiveCTA() {
  const container = useRef<HTMLDivElement>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useGSAP(
    () => {
      gsap.to(".cta-orb", {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Animated Orbs */}
      <div className="cta-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="cta-orb absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-indigo-900/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 text-center px-10 max-w-5xl border border-white/5 bg-white/5 backdrop-blur-3xl py-32 rounded-[4rem]">
        <h2 className="text-5xl md:text-9xl font-extralight tracking-tighter text-white mb-8">
          Own the <span className="italic font-normal text-blue-500">Silence.</span>
        </h2>
        <p className="text-zinc-500 text-lg md:text-3xl font-light mb-16 max-w-2xl mx-auto leading-relaxed">
          The 2026 Batch is limited to 100 timepieces. Secure your place in the waitlist.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button
            className="px-16 py-6 bg-white text-black font-semibold uppercase tracking-[0.3em] text-xs hover:bg-blue-500 hover:text-white transition-all duration-500"
            onClick={() => setShowOrderModal(true)}
          >
            Reserve Yours
          </button>
          <button
            className="px-16 py-6 border border-white/20 text-white font-semibold uppercase tracking-[0.3em] text-xs hover:border-blue-500 transition-all duration-500"
            onClick={() => setShowContactModal(true)}
          >
            Contact Concierge
          </button>
        </div>

        <div className="mt-20 flex items-center justify-center gap-12 opacity-30">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-light text-white">4.9/5</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Collector Rating</span>
          </div>
          <div className="w-[1px] h-10 bg-white/20" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-light text-white">100</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Units Crafted</span>
          </div>
        </div>
      </div>
      {showOrderModal && <OrderModal onClose={() => setShowOrderModal(false)} />}
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </section>
  );
}
