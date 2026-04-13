"use client";

import { FormEvent, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { whatsappUrl } from "@/lib/site-data";

const initialForm = {
  nombre: "",
  empresa: "",
  telefono: "",
  correo: "",
  tipoEvento: "",
  fecha: "",
  cantidad: "",
  mensaje: ""
};

export function QuoteFormSection() {
  const [form, setForm] = useState(initialForm);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent("Cotización DonutWorry_GT");
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nEmpresa: ${form.empresa}\nTeléfono: ${form.telefono}\nCorreo: ${form.correo}\nTipo de evento: ${form.tipoEvento}\nFecha: ${form.fecha}\nCantidad: ${form.cantidad}\nMensaje: ${form.mensaje}`
    );

    window.location.href = `mailto:donutworrygt@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="cotizacion" className="section-space">
      <div className="container-shell">
        <div className="grid gap-10 rounded-[2rem] bg-[linear-gradient(135deg,#4A2A24_0%,#6A3A31_100%)] px-6 py-10 text-white shadow-card sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-14">
          <Reveal>
            <SectionHeading
              eyebrow="Cotización"
              title="Hablemos de tu próximo pedido corporativo"
              description="Compártenos los detalles y prepararemos una propuesta alineada a tu evento, cantidades y tipo de presentación."
              theme="dark"
            />
            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/8 p-6">
              <p className="text-lg font-semibold">Atención por WhatsApp siempre visible</p>
              <p className="mt-3 text-sm leading-7 text-white/75">
                Si tu pedido es urgente o ya tienes claros los volúmenes, puedes escribirnos y
                avanzar más rápido.
              </p>
              <ButtonLink href={whatsappUrl} target="_blank" className="mt-5 bg-white text-cocoa">
                WhatsApp
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal>
            <form
              onSubmit={onSubmit}
              className="grid gap-4 rounded-[1.8rem] bg-white p-6 text-cocoa shadow-card sm:grid-cols-2"
            >
              {[
                ["Nombre", "nombre", "text"],
                ["Empresa", "empresa", "text"],
                ["Teléfono", "telefono", "tel"],
                ["Correo", "correo", "email"],
                ["Tipo de evento", "tipoEvento", "text"],
                ["Fecha", "fecha", "date"],
                ["Cantidad", "cantidad", "number"]
              ].map(([label, name, type]) => (
                <label
                  key={name}
                  className={`text-sm font-medium ${name === "cantidad" ? "sm:col-span-2" : ""}`}
                >
                  <span className="mb-2 block">{label}</span>
                  <input
                    type={type}
                    value={form[name as keyof typeof form]}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        [name]: event.target.value
                      }))
                    }
                    className="w-full rounded-2xl border border-blush/20 bg-cream px-4 py-3 outline-none transition-colors focus:border-blush"
                    required={["nombre", "telefono", "correo", "tipoEvento"].includes(name)}
                  />
                </label>
              ))}

              <label className="text-sm font-medium sm:col-span-2">
                <span className="mb-2 block">Mensaje</span>
                <textarea
                  value={form.mensaje}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      mensaje: event.target.value
                    }))
                  }
                  rows={5}
                  className="w-full rounded-2xl border border-blush/20 bg-cream px-4 py-3 outline-none transition-colors focus:border-blush"
                  placeholder="Cuéntanos el tipo de evento, el estilo deseado o cualquier detalle importante."
                />
              </label>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-blush px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-1"
                >
                  Solicitar cotización
                </button>
                <ButtonLink href={whatsappUrl} target="_blank" variant="secondary">
                  WhatsApp
                </ButtonLink>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
