"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircleMore } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { WatermarkOverlay } from "@/components/ui/watermark-overlay";
import { whatsappUrl } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="container-shell section-space grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="glass-panel inline-flex rounded-full px-4 py-2 text-sm font-semibold text-cocoa-soft">
            Soluciones dulces para ventas B2B, oficinas y eventos corporativos
          </span>
          <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-tight text-cocoa sm:text-6xl">
            Mini donas por mayor para <span className="font-title text-blush">empresas</span> y
            eventos
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cocoa/75">
            Sorprende a tus clientes y colaboradores con una experiencia dulce, memorable y lista
            para entregar con presentación premium.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#cotizacion">
              Solicitar cotización <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={whatsappUrl} target="_blank" variant="secondary">
              Pedir por WhatsApp <MessageCircleMore className="ml-2 h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              ["Respuesta ágil", "Ideal para equipos y compras empresariales"],
              ["Presentación premium", "Boxes y bandejas listas para impresionar"],
              ["Entrega coordinada", "Planificación para eventos y oficinas"]
            ].map(([title, text]) => (
              <div key={title} className="glass-panel rounded-3xl p-4 shadow-card">
                <p className="text-sm font-semibold text-cocoa">{title}</p>
                <p className="mt-2 text-sm leading-6 text-cocoa/65">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white p-3 shadow-glow">
            <div className="relative aspect-[4/4.8] overflow-hidden rounded-[1.6rem]">
              <Image
                src="/media/15_minidonas.jpg"
                alt="Mini donas DonutWorry GT"
                fill
                priority
                quality={65}
                className="object-cover"
              />
              <WatermarkOverlay />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/75 via-cocoa/20 to-transparent p-6 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-white/75">Edición premium</p>
                <p className="mt-2 text-2xl font-semibold">Bandejas apetitosas para marcas y eventos</p>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel absolute -left-5 top-10 rounded-3xl p-4 shadow-card"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cocoa-soft">
              Venta por mayor
            </p>
            <p className="mt-2 text-lg font-semibold text-cocoa">Cotizaciones para empresas</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 right-0 rounded-3xl bg-cocoa px-5 py-4 text-white shadow-card"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-white/65">Coffee breaks</p>
            <p className="mt-2 text-lg font-semibold">Regalos corporativos y ferias</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
