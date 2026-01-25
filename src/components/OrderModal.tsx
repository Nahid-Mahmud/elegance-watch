"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { toast } from "sonner";

interface OrderModalProps {
  onClose: () => void;
}

export default function OrderModal({ onClose }: OrderModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Disable background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.8, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" },
    );
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 40,
      duration: 0.3,
      ease: "power3.in",
      onComplete: onClose,
    });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    toast.success("Reservation submitted!");
    handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative bg-zinc-900 rounded-3xl shadow-2xl p-10 w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold focus:outline-none h-8 w-8 transition-all duration-300 hover:scale-110"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-3xl font-light text-white mb-6 text-center">Reserve Your Watch</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Preferred Variation</label>
            <select className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors">
              <option value="">Select a variation</option>
              <option value="Deep Navy">Deep Navy</option>
              <option value="Carbon Black">Carbon Black</option>
              <option value="Titanium Silver">Titanium Silver</option>
              <option value="Vintage Rose">Vintage Rose</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Reservation
          </button>
        </form>
      </div>
    </div>
  );
}
