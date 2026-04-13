"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { galleryImages } from "@/lib/site-data";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WatermarkOverlay } from "@/components/ui/watermark-overlay";

const swipeConfidenceThreshold = 9000;

function swipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity;
}

type CarouselSlide =
  | {
      type: "video";
      src: string;
      title: string;
      eyebrow: string;
    }
  | {
      type: "image";
      src: string;
      title: string;
      eyebrow: string;
      focusProduct?: boolean;
    };

const carouselSlides: CarouselSlide[] = [
  {
    type: "video",
    src: "/media/publicidad_donas_U.mp4",
    title: "Publicidad DonutWorry_GT",
    eyebrow: "Spot promocional"
  },
  ...galleryImages.map((item, index) => ({
    type: "image" as const,
    src: item.src,
    focusProduct: item.focusProduct,
    title: `Galeria visual ${index + 1}`,
    eyebrow: item.focusProduct ? "Enfoque premium" : "Momento dulce"
  }))
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [muted, setMuted] = useState(true);
  const [pauseUntil, setPauseUntil] = useState<number | null>(null);
  const [pauseForVideoSelection, setPauseForVideoSelection] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeSlide = carouselSlides[currentIndex];

  const goToSlide = (index: number, userInitiated = false) => {
    const nextSlide = carouselSlides[index];

    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);

    if (userInitiated) {
      if (nextSlide.type === "video") {
        setPauseForVideoSelection(true);
        setPauseUntil(null);
      } else {
        setPauseForVideoSelection(false);
        setPauseUntil(Date.now() + 9000);
      }
    } else {
      setPauseForVideoSelection(false);
    }
  };

  const goNext = (userInitiated = false) => {
    const nextIndex = (currentIndex + 1) % carouselSlides.length;
    setDirection(1);
    setCurrentIndex(nextIndex);

    if (userInitiated) {
      const nextSlide = carouselSlides[nextIndex];
      if (nextSlide.type === "video") {
        setPauseForVideoSelection(true);
        setPauseUntil(null);
      } else {
        setPauseForVideoSelection(false);
        setPauseUntil(Date.now() + 9000);
      }
    } else {
      setPauseForVideoSelection(false);
    }
  };

  const goPrev = (userInitiated = false) => {
    const prevIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
    setDirection(-1);
    setCurrentIndex(prevIndex);

    if (userInitiated) {
      const prevSlide = carouselSlides[prevIndex];
      if (prevSlide.type === "video") {
        setPauseForVideoSelection(true);
        setPauseUntil(null);
      } else {
        setPauseForVideoSelection(false);
        setPauseUntil(Date.now() + 9000);
      }
    } else {
      setPauseForVideoSelection(false);
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      goNext(true);
      return;
    }

    if (swipe > swipeConfidenceThreshold) {
      goPrev(true);
    }
  };

  useEffect(() => {
    if (pauseForVideoSelection || selectedImage) {
      return;
    }

    const now = Date.now();
    const delay = pauseUntil && pauseUntil > now ? pauseUntil - now : 5000;

    const autoplay = window.setTimeout(() => {
      setDirection(1);
      setCurrentIndex((current) => (current + 1) % carouselSlides.length);
      setPauseUntil(null);
    }, delay);

    return () => window.clearTimeout(autoplay);
  }, [currentIndex, pauseUntil, pauseForVideoSelection, selectedImage]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = muted;
    void video.play().catch(() => {});
  }, [currentIndex, muted]);

  const previewIndexes = useMemo(() => {
    const indexes: number[] = [];
    for (let offset = 1; offset <= 3; offset += 1) {
      indexes.push((currentIndex + offset) % carouselSlides.length);
    }
    return indexes;
  }, [currentIndex]);

  const renderImageSlide = (src: string, title: string) => (
    <button
      type="button"
      onClick={() => {
        setPauseUntil(Date.now() + 12000);
        setSelectedImage(src);
      }}
      className="relative block h-full w-full"
      data-protected-media="true"
      onContextMenu={(event) => event.preventDefault()}
    >
      <Image
        src={src}
        alt={title}
        fill
        quality={40}
        className="protected-media scale-105 object-cover blur-2xl brightness-90"
        draggable={false}
        onContextMenu={(event) => event.preventDefault()}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(255,247,242,0.72)_100%)]" />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] border border-white/70 bg-white/30 shadow-2xl">
          <Image
            src={src}
            alt={title}
            fill
            quality={62}
            className="protected-media object-contain p-2 sm:p-3"
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
          />
        </div>
      </div>
      <WatermarkOverlay />
    </button>
  );

  const renderActiveSlide = () => (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={`${activeSlide.type}-${activeSlide.src}`}
        custom={direction}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={handleDragEnd}
        style={{ touchAction: "pan-y" }}
        initial={{
          opacity: 0,
          x: direction > 0 ? 120 : -120,
          rotate: direction > 0 ? 26 : -26,
          scale: 0.86
        }}
        animate={{
          opacity: 1,
          x: 0,
          rotate: 0,
          scale: 1
        }}
        exit={{
          opacity: 0,
          x: direction > 0 ? -120 : 120,
          rotate: direction > 0 ? -26 : 26,
          scale: 0.88
        }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      >
        {activeSlide.type === "video" ? (
          <div
            className="group relative h-full w-full overflow-hidden"
            data-protected-media="true"
            onContextMenu={(event) => event.preventDefault()}
          >
            <video
              ref={videoRef}
              src={activeSlide.src}
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
            <div className="absolute left-5 top-5 inline-flex items-center rounded-full bg-blush px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-lg">
              Spot promocional
            </div>
            <button
              type="button"
              onClick={() => setMuted((current) => !current)}
              className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-xs font-semibold text-cocoa shadow-lg transition-transform duration-300 hover:-translate-y-1"
              aria-label={muted ? "Activar sonido" : "Silenciar video"}
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {muted ? "Activar sonido" : "Silenciar"}
            </button>
          </div>
        ) : (
          renderImageSlide(activeSlide.src, activeSlide.title)
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/75 via-cocoa/20 to-transparent px-4 pb-4 pt-14 text-white sm:px-6 sm:pb-6 sm:pt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75 sm:text-xs sm:tracking-[0.28em]">
            {activeSlide.eyebrow}
          </p>
          <p className="mt-2 max-w-lg text-lg font-semibold sm:mt-3 sm:text-2xl">
            {activeSlide.type === "video"
              ? activeSlide.title
              : "Mini donas, detalles y momentos que venden por si solos"}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <section id="galeria" className="section-space overflow-hidden">
        <div className="container-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Galeria"
              title="Un carrusel dulce, visual y con movimiento propio"
              description="Integramos fotos y video en una experiencia mas inmersiva, con transiciones fluidas que giran como una dona al cambiar."
              align="center"
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <div className="relative rounded-[2.4rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,247,242,0.95)_0%,rgba(253,234,242,0.92)_100%)] p-4 shadow-glow sm:p-6">
              <div className="space-y-5 lg:hidden">
                <div className="rounded-[1.8rem] border border-white/60 bg-white/80 p-4 shadow-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blush">
                    Carrusel visual
                  </p>
                  <p className="mt-2 text-xl font-semibold leading-tight text-cocoa">
                    Galeria compacta para explorar en movil
                  </p>
                  <p className="mt-2 text-sm leading-7 text-cocoa/70">
                    Desliza con el dedo o usa las miniaturas para ver fotos y video sin perder
                    detalle.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-[1.8rem] bg-white shadow-card">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,168,200,0.32),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(217,166,90,0.2),transparent_25%)]" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem]">
                    {renderActiveSlide()}
                  </div>
                  <div className="absolute inset-y-0 left-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => goPrev(true)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-cocoa shadow-lg backdrop-blur"
                      aria-label="Slide anterior"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => goNext(true)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-cocoa shadow-lg backdrop-blur"
                      aria-label="Siguiente slide"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-white/60 bg-white/80 p-3 shadow-card">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {carouselSlides.map((slide, index) => (
                      <button
                        key={`${slide.type}-${slide.src}-mobile-dot`}
                        type="button"
                        onClick={() => goToSlide(index, true)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === currentIndex ? "w-9 bg-blush" : "w-2.5 bg-blush/25"
                        }`}
                        aria-label={`Ir al slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {carouselSlides.map((slide, index) => (
                      <button
                        key={`${slide.type}-${slide.src}-mobile-thumb`}
                        type="button"
                        onClick={() => goToSlide(index, true)}
                        className={`group min-w-[7.25rem] overflow-hidden rounded-[1.2rem] border p-2 text-left shadow-sm transition-all duration-300 ${
                          index === currentIndex
                            ? "border-blush bg-blush/8 shadow-md"
                            : "border-white/70 bg-white"
                        }`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[0.9rem]">
                          {slide.type === "video" ? (
                            <>
                              <video
                                src={slide.src}
                                className="h-full w-full object-cover"
                                muted
                                playsInline
                                preload="metadata"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-cocoa/15">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-cocoa shadow-lg">
                                  <Play className="ml-0.5 h-3.5 w-3.5" />
                                </span>
                              </div>
                            </>
                          ) : (
                            <Image
                              src={slide.src}
                              alt={slide.title}
                              fill
                              quality={36}
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="px-1 pb-1 pt-2">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cocoa/45">
                            {slide.type === "video" ? "Video" : `Foto ${index + 1}`}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden gap-6 lg:grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="flex flex-col gap-4">
                  <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-card">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,168,200,0.32),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(217,166,90,0.2),transparent_25%)]" />

                    <div className="relative aspect-[4/4.8] overflow-hidden rounded-[2rem]">
                      {renderActiveSlide()}
                    </div>

                    <div className="absolute inset-y-0 left-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => goPrev(true)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-cocoa shadow-lg backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                        aria-label="Slide anterior"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => goNext(true)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-cocoa shadow-lg backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                        aria-label="Siguiente slide"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/60 bg-white/80 p-4 shadow-card">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blush">
                          Tira del carrusel
                        </p>
                        <p className="mt-1 text-sm text-cocoa/65">
                          Explora mas fotos y cambia rapido de toma.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {carouselSlides.map((slide, index) => (
                          <button
                            key={`${slide.type}-${slide.src}-dot`}
                            type="button"
                            onClick={() => goToSlide(index, true)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              index === currentIndex ? "w-10 bg-blush" : "w-2.5 bg-blush/25"
                            }`}
                            aria-label={`Ir al slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {carouselSlides.map((slide, index) => (
                        <button
                          key={`${slide.type}-${slide.src}-thumb`}
                          type="button"
                          onClick={() => goToSlide(index, true)}
                          className={`group relative min-w-[8.75rem] overflow-hidden rounded-[1.3rem] border p-2 text-left shadow-sm transition-all duration-300 ${
                            index === currentIndex
                              ? "border-blush bg-blush/8 shadow-md"
                              : "border-white/70 bg-white hover:-translate-y-1"
                          }`}
                        >
                          <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem]">
                            {slide.type === "video" ? (
                              <>
                                <video
                                  src={slide.src}
                                  className="h-full w-full object-cover"
                                  muted
                                  playsInline
                                  preload="metadata"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-cocoa/15">
                                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-cocoa shadow-lg">
                                    <Play className="ml-0.5 h-4 w-4" />
                                  </span>
                                </div>
                              </>
                            ) : (
                              <Image
                                src={slide.src}
                                alt={slide.title}
                                fill
                                quality={38}
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                              />
                            )}
                          </div>
                          <div className="px-1 pb-1 pt-3">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cocoa/45">
                              {slide.eyebrow}
                            </p>
                            <p className="mt-1 text-xs font-semibold leading-5 text-cocoa">
                              {slide.type === "video" ? "Spot promocional" : `Foto ${index + 1}`}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-[1.8rem] border border-white/60 bg-white/80 p-5 shadow-card">
                    <p className="text-sm font-semibold uppercase tracking-[0.26em] text-blush">
                      Carrusel visual
                    </p>
                    <p className="mt-3 text-2xl font-semibold leading-tight text-cocoa">
                      Cambios con giro suave e identidad mas dinamica
                    </p>
                    <p className="mt-3 text-sm leading-7 text-cocoa/70">
                      Cada cambio rota con una transicion inspirada en una dona para que la galeria
                      se sienta mas viva, moderna y memorable.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    {previewIndexes.map((index) => {
                      const slide = carouselSlides[index];

                      return (
                        <button
                          key={`${slide.type}-${slide.src}`}
                          type="button"
                          onClick={() => goToSlide(index, true)}
                          className="group overflow-hidden rounded-[1.6rem] border border-white/60 bg-white p-2 text-left shadow-card transition-transform duration-300 hover:-translate-y-1"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem]">
                            {slide.type === "video" ? (
                              <>
                                <video
                                  src={slide.src}
                                  className="h-full w-full object-cover"
                                  muted
                                  playsInline
                                  preload="metadata"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-cocoa/20">
                                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-cocoa shadow-lg">
                                    <Play className="ml-0.5 h-4 w-4" />
                                  </span>
                                </div>
                              </>
                            ) : (
                              <Image
                                src={slide.src}
                                alt={slide.title}
                                fill
                                quality={40}
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                              />
                            )}
                          </div>
                          <div className="px-2 pb-2 pt-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cocoa/45">
                              {slide.eyebrow}
                            </p>
                            <p className="mt-2 text-sm font-semibold leading-6 text-cocoa">
                              {slide.type === "video" ? "Ver spot promocional" : "Cambiar a esta toma"}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ImageLightbox
        image={selectedImage}
        alt="Galeria DonutWorry GT"
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
