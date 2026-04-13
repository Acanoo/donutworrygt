"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { WatermarkOverlay } from "@/components/ui/watermark-overlay";

type ProtectedImageTileProps = {
  src: string;
  alt: string;
  aspectClassName?: string;
  imageClassName?: string;
  wrapperClassName?: string;
  focusProduct?: boolean;
  posterStyle?: boolean;
  onOpen: () => void;
};

export function ProtectedImageTile({
  src,
  alt,
  aspectClassName = "aspect-[4/3]",
  imageClassName,
  wrapperClassName,
  focusProduct = false,
  posterStyle = false,
  onOpen
}: ProtectedImageTileProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onContextMenu={(event) => event.preventDefault()}
      className={cn(
        "group/image relative block w-full overflow-hidden bg-cream text-left",
        wrapperClassName
      )}
      data-protected-media="true"
      aria-label={`Ampliar imagen de ${alt}`}
    >
      <div className={cn("relative w-full", aspectClassName)}>
        {focusProduct ? (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              quality={42}
              className="protected-media scale-110 object-cover blur-2xl brightness-95"
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_26%,rgba(255,247,242,0.76)_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
              <div className="relative h-full w-full overflow-hidden rounded-[1.45rem] border border-white/70 bg-white/35 shadow-2xl">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  quality={58}
                  className={cn(
                    "protected-media object-cover transition-transform duration-500 group-hover/image:scale-[1.02]",
                    imageClassName
                  )}
                  draggable={false}
                  onContextMenu={(event) => event.preventDefault()}
                />
              </div>
            </div>
          </>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            quality={58}
            className={cn(
              posterStyle
                ? "protected-media object-cover object-center transition-transform duration-500 group-hover/image:scale-[1.02]"
                : "protected-media object-contain p-3 transition-transform duration-500 group-hover/image:scale-[1.02]",
              imageClassName
            )}
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
          />
        )}
        <WatermarkOverlay />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/image:opacity-100" />
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/88 px-3 py-2 text-xs font-semibold text-cocoa opacity-0 shadow-lg transition-all duration-300 group-hover/image:translate-y-0 group-hover/image:opacity-100">
          <Expand className="h-3.5 w-3.5" />
          Ver imagen
        </span>
      </div>
    </button>
  );
}
