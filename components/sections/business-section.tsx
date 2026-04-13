import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { businessUseCases } from "@/lib/site-data";

export function BusinessSection() {
  return (
    <section id="empresas" className="section-space">
      <div className="container-shell">
        <div className="grid gap-8 rounded-[2rem] bg-cocoa px-6 py-10 text-white shadow-card sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-12 lg:py-14">
          <Reveal>
            <SectionHeading
              eyebrow="Empresas"
              title="Una experiencia dulce que también comunica tu marca"
              description="Creamos entregas pensadas para contextos B2B: reuniones, activaciones, ferias y celebraciones empresariales donde cada detalle cuenta."
              theme="dark"
            />
            <ButtonLink href="#cotizacion" className="mt-8 bg-white text-cocoa hover:bg-cream">
              Solicita una propuesta para tu empresa
            </ButtonLink>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {businessUseCases.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                    <Icon className="h-8 w-8 text-gold" />
                    <p className="mt-4 text-lg font-semibold">{item.title}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
