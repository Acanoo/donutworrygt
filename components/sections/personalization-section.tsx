import Image from "next/image";
import { personalization } from "@/lib/site-data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function PersonalizationSection() {
  return (
    <section className="section-space">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/60 shadow-card">
            <Image
              src="/media/10_minidonas.jpg"
              alt="Mini donas con personalización visual"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal>
          <SectionHeading
            eyebrow="Personalización"
            title="Adaptamos cada pedido al estilo de tu empresa o evento"
            description="Desde un detalle elegante hasta una activación completa, podemos llevar tu idea a una presentación coherente, apetecible y lista para compartir."
          />
          <div className="mt-8 grid gap-4">
            {personalization.map((item) => (
              <div
                key={item}
                className="glass-panel rounded-[1.5rem] px-5 py-4 text-sm leading-7 text-cocoa/75 shadow-card"
              >
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
