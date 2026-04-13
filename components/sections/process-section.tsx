import { processSteps } from "@/lib/site-data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProcessSection() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Proceso"
            title="Una cotización clara y un pedido sin complicaciones"
            description="Hicimos el proceso simple para que tu equipo solo piense en disfrutar el resultado final."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal key={step.title} delay={index * 0.05}>
                <article className="relative h-full rounded-[1.8rem] border border-white/60 bg-white p-6 shadow-card">
                  <span className="absolute right-5 top-5 text-sm font-semibold text-blush">
                    0{index + 1}
                  </span>
                  <div className="inline-flex rounded-2xl bg-blush-bg p-3 text-blush">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-cocoa">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-cocoa/70">{step.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
