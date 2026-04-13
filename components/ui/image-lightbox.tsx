"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { WatermarkOverlay } from "@/components/ui/watermark-overlay";

type ImageLightboxProps = {
  image: string | null;
  alt: string;
  onClose: () => void;
};

export function ImageLightbox({ image, alt, onClose }: ImageLightboxProps) {
  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/88 px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onContextMenu={(event) => event.preventDefault()}
          data-protected-media="true"
        >
          <motion.button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white backdrop-blur"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <X className="h-5 w-5" />
          </motion.button>

          <motion.div
            className="relative flex h-[78vh] w-full max-w-5xl items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md sm:p-6"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.28 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="100vw"
                quality={62}
                className="protected-media object-contain"
                draggable={false}
                onContextMenu={(event) => event.preventDefault()}
              />
              <WatermarkOverlay subtle={false} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
