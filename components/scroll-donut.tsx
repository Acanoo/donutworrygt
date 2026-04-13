"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const drizzleLines = [
  { top: "16%", left: "4%", rotate: "20deg", width: "92%" },
  { top: "28%", left: "1%", rotate: "-12deg", width: "96%" },
  { top: "41%", left: "5%", rotate: "14deg", width: "88%" },
  { top: "55%", left: "2%", rotate: "-18deg", width: "94%" },
  { top: "68%", left: "6%", rotate: "10deg", width: "86%" }
];

export function ScrollDonut() {
  const prefersReducedMotion = useReducedMotion();
  const [rotation, setRotation] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let previousY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;

      setRotation((current) => current + delta * 0.35);
      setOffsetY(currentY * 0.04);
      previousY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-28 right-10 z-20 hidden xl:block xl:right-14"
      animate={{
        rotate: rotation,
        y: offsetY > 18 ? 18 : offsetY
      }}
      transition={{ type: "spring", stiffness: 75, damping: 18, mass: 0.8 }}
    >
      <div className="relative h-24 w-24 rounded-full bg-[#d8904f] shadow-[0_18px_40px_rgba(74,42,36,0.18)] xl:h-28 xl:w-28">
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_38%_30%,rgba(255,255,255,0.96),rgba(255,255,255,0.92)_32%,#f8ecd9_68%,#f3ddbf_100%)]" />
        <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle_at_42%_35%,#fff8ef_0%,#f0d4ae_55%,#cd955f_100%)] shadow-[inset_0_6px_10px_rgba(0,0,0,0.14)]" />

        {drizzleLines.map((line, index) => (
          <span
            key={index}
            className="absolute h-2 rounded-full bg-[linear-gradient(180deg,#8a4d2f_0%,#9f5a36_100%)] opacity-95 shadow-[0_1px_4px_rgba(74,42,36,0.18)]"
            style={{
              top: line.top,
              left: line.left,
              width: line.width,
              transform: `rotate(${line.rotate})`
            }}
          />
        ))}

        {[
          { top: "18%", left: "14%" },
          { top: "22%", right: "18%" },
          { top: "44%", left: "9%" },
          { top: "51%", right: "10%" },
          { bottom: "17%", left: "20%" },
          { bottom: "22%", right: "24%" }
        ].map((dot, index) => (
          <span
            key={`dot-${index}`}
            className="absolute h-2 w-2 rounded-full bg-[#b56b3f] shadow-[0_1px_2px_rgba(74,42,36,0.18)]"
            style={dot}
          />
        ))}
      </div>
    </motion.div>
  );
}
