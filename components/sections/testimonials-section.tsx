import { testimonials } from "@/lib/site-data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function TestimonialsSection() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonios"
            title="Confianza, presentación y sabor en cada entrega"
            description="Datos demo editables para que luego puedas reemplazarlos por testimonios reales de clientes y empresas."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.06}>
              <article className="glass-panel h-full rounded-[2rem] p-6 shadow-card">
                <p className="text-base leading-8 text-cocoa/75">“{item.quote}”</p>
                <div className="mt-8 border-t border-blush/15 pt-5">
                  <p className="text-lg font-semibold text-cocoa">{item.name}</p>
                  <p className="text-sm text-cocoa/60">{item.role}</p>
                  <p className="mt-2 text-sm font-medium text-blush">{item.company}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
