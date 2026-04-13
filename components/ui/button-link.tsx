"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "whatsapp";
  className?: string;
  target?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  target
}: ButtonLinkProps) {
  const variants = {
    primary:
      "bg-blush text-white shadow-glow hover:-translate-y-1 hover:bg-[#e54c8d]",
    secondary:
      "bg-white text-cocoa border border-blush/20 hover:-translate-y-1 hover:border-blush/40 hover:bg-blush-bg",
    ghost:
      "bg-white/12 text-white border border-white/25 hover:-translate-y-1 hover:bg-white/20",
    whatsapp:
      "bg-[#25D366] text-white shadow-[0_16px_30px_rgba(37,211,102,0.28)] hover:-translate-y-1 hover:bg-[#1fb859]"
  };

  return (
    <Link
      href={href}
      target={target}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300",
        variants[variant],
        className
      )}
    >
      {variant === "whatsapp" ? <MessageCircleMore className="mr-2 h-4 w-4" /> : null}
      {children}
    </Link>
  );
}
