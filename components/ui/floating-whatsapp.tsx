"use client";

import { MessageCircleMore } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/lib/site-data";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-2xl transition-transform duration-300 hover:-translate-y-1"
    >
      <MessageCircleMore className="h-5 w-5" />
      WhatsApp
    </motion.a>
  );
}
