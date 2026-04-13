import { benefits } from "@/lib/site-data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function BenefitsSection() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Beneficios"
            title="Una propuesta dulce con enfoque empresarial"
            description="Cada pedido está pensado para verse bien, entregarse fácil y dejar una impresión positiva en clientes, invitados y colaboradores."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="glass-panel group h-full rounded-[1.8rem] p-6 shadow-card transition-transform duration-300 hover:-translate-y-2">
                  <div className="inline-flex rounded-2xl bg-blush-bg p-3 text-blush">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-cocoa">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-cocoa/70">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
