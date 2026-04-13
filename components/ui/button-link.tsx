"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
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
      "bg-white/12 text-white border border-white/25 hover:-translate-y-1 hover:bg-white/20"
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
      {children}
    </Link>
  );
}
