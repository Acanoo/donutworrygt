"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { WatermarkOverlay } from "@/components/ui/watermark-overlay";

type GalleryVideoTileProps = {
  src: string;
  title: string;
};

export function GalleryVideoTile({ src, title }: GalleryVideoTileProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = muted;
    void video.play().catch(() => {});
  }, [muted]);

  const toggleSound = () => {
    setMuted((current) => !current);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-[1.8rem] border border-blush/20 bg-white shadow-card ring-1 ring-blush/10"
      data-protected-media="true"
      onContextMenu={(event) => event.preventDefault()}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cocoa">
        <video
          ref={videoRef}
          src={src}
          className="protected-media h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
          onContextMenu={(event) => event.preventDefault()}
        />
        <WatermarkOverlay />
        <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-blush px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-lg">
          Spot promocional
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/70 via-cocoa/20 to-transparent px-4 pb-4 pt-12 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/75">Nuevo video</p>
          <p className="mt-2 text-lg font-semibold">{title}</p>
        </div>
        <button
          type="button"
          onClick={toggleSound}
          className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-cocoa shadow-lg transition-transform duration-300 hover:-translate-y-1"
          aria-label={muted ? "Activar sonido" : "Silenciar video"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {muted ? "Activar sonido" : "Silenciar"}
        </button>
      </div>
    </div>
  );
}
