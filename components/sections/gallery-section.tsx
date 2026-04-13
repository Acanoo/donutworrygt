"use client";

import { useState } from "react";
import { galleryImages } from "@/lib/site-data";
import { GalleryVideoTile } from "@/components/ui/gallery-video-tile";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { ProtectedImageTile } from "@/components/ui/protected-image-tile";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="galeria" className="section-space">
        <div className="container-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Galeria"
              title="Un look visualmente apetitoso y listo para compartir"
              description="Fotografias que ayudan a vender la experiencia: presentaciones limpias, detalles cercanos y composicion premium."
              align="center"
            />
          </Reveal>

          <div className="masonry-grid mt-12">
            <Reveal delay={0.02} className="masonry-item">
              <GalleryVideoTile
                src="/media/publicidad_donas_U.mp4"
                title="Publicidad DonutWorry_GT"
              />
            </Reveal>
            {galleryImages.map((item, index) => (
              <Reveal key={item.src} delay={index * 0.04} className="masonry-item">
                <div className="overflow-hidden rounded-[1.8rem] border border-white/60 bg-white shadow-card">
                  <ProtectedImageTile
                    src={item.src}
                    alt="Galeria DonutWorry GT"
                    aspectClassName="aspect-[3/4]"
                    imageClassName="object-cover"
                    focusProduct={item.focusProduct}
                    posterStyle={!item.focusProduct}
                    onOpen={() => setSelectedImage(item.src)}
                  />
                </div>
              </Reveal>
            ))}
          </div>
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
