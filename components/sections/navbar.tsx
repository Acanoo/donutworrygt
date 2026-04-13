"use client";

import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { navLinks, whatsappUrl } from "@/lib/site-data";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/50 bg-cream/80 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between gap-4 py-3">
        <a href="#inicio" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-blush/20 bg-white">
            <Image src="/media/logo.jpg" alt="DonutWorry GT" fill className="object-cover" />
          </div>
          <div>
            <p className="font-title text-2xl text-cocoa">DonutWorry_GT</p>
            <p className="-mt-1 text-xs font-medium uppercase tracking-[0.22em] text-cocoa/50">
              Mini donas premium
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cocoa/70 transition-colors hover:text-blush"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ButtonLink href={whatsappUrl} target="_blank" className="hidden sm:inline-flex">
          WhatsApp
        </ButtonLink>
      </div>
    </header>
  );
}
