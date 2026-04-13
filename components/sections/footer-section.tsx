import Image from "next/image";
import { Instagram, Mail, MessageCircleMore, Phone } from "lucide-react";
import { navLinks, whatsappUrl } from "@/lib/site-data";

export function FooterSection() {
  return (
    <footer className="border-t border-white/50 bg-cream py-10">
      <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.7fr_0.7fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-blush/20 bg-white">
              <Image src="/media/logo.jpg" alt="DonutWorry GT" fill className="object-cover" />
            </div>
            <div>
              <p className="font-title text-2xl text-cocoa">DonutWorry_GT</p>
              <p className="text-sm text-cocoa/60">Mini donas que enamoran</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-cocoa/70">
            Diseñado para convertir visitas en cotizaciones con una propuesta visual premium, clara
            y enfocada en ventas empresariales.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa-soft">Enlaces</p>
          <div className="mt-4 grid gap-3 text-sm text-cocoa/70">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-blush">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa-soft">Contacto</p>
          <div className="mt-4 grid gap-4 text-sm text-cocoa/70">
            <a
              href="https://www.instagram.com/donutworry_gt/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 transition-colors hover:text-blush"
            >
              <Instagram className="h-4 w-4" />
              @donutworry_gt
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 transition-colors hover:text-blush"
            >
              <MessageCircleMore className="h-4 w-4" />
              WhatsApp
            </a>
            <span className="inline-flex items-center gap-3">
              <Phone className="h-4 w-4" />
              3468-2894
            </span>
            <a href="mailto:donutworrygt@gmail.com" className="inline-flex items-center gap-3">
              <Mail className="h-4 w-4" />
              donutworrygt@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
