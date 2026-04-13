"use client";

import { FormEvent, useMemo, useState } from "react";
import { Package2, ShoppingBag, Sparkles, X } from "lucide-react";
import { buildProductWhatsappUrl, products, type Product } from "@/lib/site-data";
import { ButtonLink } from "@/components/ui/button-link";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { ProtectedImageTile } from "@/components/ui/protected-image-tile";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type QuoteState = {
  nombre: string;
  empresa: string;
  telefono: string;
  correo: string;
  cantidad: string;
  mensaje: string;
};

const initialQuoteState: QuoteState = {
  nombre: "",
  empresa: "",
  telefono: "",
  correo: "",
  cantidad: "",
  mensaje: ""
};

function ProductQuoteModal({
  product,
  onClose
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState<QuoteState>(initialQuoteState);

  const mailtoHref = useMemo(() => {
    if (!product) {
      return "#";
    }

    const subject = encodeURIComponent(`Cotizacion de ${product.title}`);
    const body = encodeURIComponent(
      `Producto: ${product.title}\nPrecio referencial: ${product.priceLabel}\nNombre: ${form.nombre}\nEmpresa: ${form.empresa}\nTelefono: ${form.telefono}\nCorreo: ${form.correo}\nCantidad solicitada: ${form.cantidad}\nMensaje: ${form.mensaje}`
    );

    return `mailto:donutworrygt@gmail.com?subject=${subject}&body=${body}`;
  }, [form, product]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = mailtoHref;
  };

  if (!product) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/80 px-4 py-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blush-bg text-cocoa"
          aria-label="Cerrar formulario"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blush">Cotizar</p>
        <h3 className="mt-3 text-3xl font-semibold text-cocoa">{product.title}</h3>
        <p className="mt-2 text-sm text-cocoa/65">Precio referencial: {product.priceLabel}</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["Nombre", "nombre", "text"],
            ["Empresa", "empresa", "text"],
            ["Telefono", "telefono", "tel"],
            ["Correo", "correo", "email"],
            ["Cantidad", "cantidad", "number"]
          ].map(([label, name, type]) => (
            <label key={name} className={`text-sm font-medium ${name === "cantidad" ? "sm:col-span-2" : ""}`}>
              <span className="mb-2 block text-cocoa">{label}</span>
              <input
                type={type}
                value={form[name as keyof QuoteState]}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    [name]: event.target.value
                  }))
                }
                className="w-full rounded-2xl border border-blush/20 bg-cream px-4 py-3 outline-none transition-colors focus:border-blush"
                required={["nombre", "telefono", "correo"].includes(name)}
              />
            </label>
          ))}

          <label className="text-sm font-medium sm:col-span-2">
            <span className="mb-2 block text-cocoa">Mensaje</span>
            <textarea
              rows={4}
              value={form.mensaje}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  mensaje: event.target.value
                }))
              }
              className="w-full rounded-2xl border border-blush/20 bg-cream px-4 py-3 outline-none transition-colors focus:border-blush"
              placeholder="Cuentalos detalles de tu pedido o evento."
            />
          </label>

          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-blush px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-1"
            >
              Enviar cotizacion
            </button>
            <ButtonLink href={buildProductWhatsappUrl(product.title, product.priceLabel)} target="_blank" variant="secondary">
              Consultar por WhatsApp
            </ButtonLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CatalogSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openImage = (image: string, alt: string) => {
    setSelectedImage(image);
    setSelectedAlt(alt);
  };

  return (
    <>
      <section id="catalogo" className="section-space">
        <div className="container-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Catalogo"
              title="Opciones disenadas para vender, regalar y compartir"
              description="Mini donas y presentaciones pensadas para oficinas, ferias, activaciones y eventos corporativos donde la imagen importa."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.title} delay={index * 0.05}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-card">
                  <ProtectedImageTile
                    src={product.image}
                    alt={product.title}
                    aspectClassName="aspect-[5/4]"
                    wrapperClassName="border-b border-blush/10 bg-[linear-gradient(180deg,#fff7f2_0%,#fdeaf2_100%)]"
                    posterStyle
                    onOpen={() => openImage(product.image, product.title)}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-h-[12.5rem] flex-1 flex-col">
                        <h3 className="text-xl font-semibold text-cocoa">{product.title}</h3>
                        {product.packageDetails?.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {product.packageDetails.map((detail, detailIndex) => {
                              const Icon = detailIndex === 0 ? Package2 : Sparkles;

                              return (
                                <span
                                  key={detail}
                                  className="inline-flex items-center gap-2 rounded-full border border-blush/15 bg-cocoa/5 px-3 py-1.5 text-xs font-semibold text-cocoa/75"
                                >
                                  <Icon className="h-3.5 w-3.5 text-blush" />
                                  {detail}
                                </span>
                              );
                            })}
                          </div>
                        ) : null}
                        <p className="mt-3 line-clamp-4 text-sm leading-7 text-cocoa/70">
                          {product.description}
                        </p>
                      </div>
                      <div className="shrink-0 rounded-2xl bg-blush-bg px-4 py-2 text-right">
                        <p className="text-xs uppercase tracking-[0.22em] text-cocoa/55">Precio</p>
                        <p className="text-xl font-semibold text-blush">{product.priceLabel}</p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="inline-flex items-center justify-center rounded-full border border-blush/20 bg-white px-5 py-3 text-sm font-semibold text-cocoa transition-all duration-300 hover:-translate-y-1 hover:border-blush/40 hover:bg-blush-bg"
                      >
                        Cotizar
                      </button>
                      <ButtonLink
                        href={buildProductWhatsappUrl(product.title, product.priceLabel)}
                        target="_blank"
                        className="w-full"
                      >
                        Comprar <ShoppingBag className="ml-2 h-4 w-4" />
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ImageLightbox image={selectedImage} alt={selectedAlt} onClose={() => setSelectedImage(null)} />
      <ProductQuoteModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
