"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button-link";
import { whatsappUrl } from "@/lib/site-data";

type WelcomeGateProps = {
  onEnter: () => void;
};

const sprinkles = [
  { top: "18%", left: "28%", rotate: "-22deg", color: "#FFF7F2" },
  { top: "24%", right: "20%", rotate: "15deg", color: "#D9A65A" },
  { top: "35%", left: "14%", rotate: "35deg", color: "#7A4A3A" },
  { top: "32%", right: "14%", rotate: "-28deg", color: "#FFF7F2" },
  { top: "52%", left: "17%", rotate: "22deg", color: "#D9A65A" },
  { top: "58%", right: "17%", rotate: "-16deg", color: "#7A4A3A" },
  { bottom: "18%", left: "27%", rotate: "22deg", color: "#FFF7F2" },
  { bottom: "22%", right: "28%", rotate: "-18deg", color: "#D9A65A" }
];

export function WelcomeGate({ onEnter }: WelcomeGateProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-hero-wash">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.42),transparent_38%)]" />
      <div className="container-shell relative z-10 grid items-center gap-14 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-cocoa-soft">
            Bienvenido a DonutWorry_GT
          </p>
          <h1 className="font-title text-5xl leading-tight text-cocoa sm:text-6xl">
            Mini donas que enamoran
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-cocoa/80">
            Mini donas pensadas para vender, compartir y sorprender en empresas, eventos y
            celebraciones, con una presentacion dulce, moderna y lista para dejar huella.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onEnter}
              className="inline-flex items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-1"
            >
              Entrar al sitio
            </button>
            <ButtonLink href={whatsappUrl} target="_blank" variant="secondary">
              Pedir por WhatsApp
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto flex w-full max-w-md items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="donut-orb"
          >
            <div className="donut-hole" />
            {sprinkles.map((sprinkle, index) => (
              <span
                key={index}
                className="sprinkle"
                style={{
                  ...sprinkle,
                  background: sprinkle.color,
                  transform: `rotate(${sprinkle.rotate})`
                }}
              />
            ))}
          </motion.div>
          <div className="absolute -bottom-2 h-10 w-52 rounded-full bg-cocoa/10 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
