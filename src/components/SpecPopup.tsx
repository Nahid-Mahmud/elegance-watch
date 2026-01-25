import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface SpecPopupProps {
  variation: {
    name: string;
    color: string;
    accent: string;
    image: { src: string };
  };
  onClose: () => void;
}

const specs: Record<string, string[]> = {
  "Deep Navy": ["Case: Stainless Steel", "Dial: Navy Blue", "Water Resistance: 100m", "Movement: Automatic"],
  "Carbon Black": ["Case: Carbon Fiber", "Dial: Matte Black", "Water Resistance: 100m", "Movement: Quartz"],
  "Titanium Silver": ["Case: Titanium", "Dial: Silver", "Water Resistance: 200m", "Movement: Automatic"],
  "Vintage Rose": ["Case: Rose Gold", "Dial: Vintage Rose", "Water Resistance: 50m", "Movement: Quartz"],
};

export default function SpecPopup({ variation, onClose }: SpecPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Disable background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    gsap.fromTo(
      popupRef.current,
      { opacity: 0, scale: 0.8, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" },
    );
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Animate close then call onClose
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    gsap.to(popupRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 40,
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => {
        onClose();
      },
    });
  };

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={popupRef}
        className="relative bg-zinc-900 rounded-3xl shadow-2xl p-10 w-full max-w-md mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold focus:outline-none h-8 w-8 transition-all duration-300 hover:scale-110"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="mb-6 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 mb-4 flex items-center justify-center bg-white/5">
            <Image
              src={variation.image.src}
              alt={variation.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <span className={`text-[12px] uppercase tracking-[0.4em] mb-2 ${variation.accent}`}>{variation.name}</span>
        </div>
        <ul className="text-white text-sm space-y-2 mb-4 w-full">
          {specs[variation.name]?.map((spec, i) => (
            <li key={i} className="border-b border-zinc-700 pb-2 last:border-none">
              {spec}
            </li>
          ))}
        </ul>
        <button
          className="mt-2 px-6 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
