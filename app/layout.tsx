import type { Metadata } from "next";
import { Pacifico, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const titleFont = Pacifico({
  subsets: ["latin"],
  variable: "--font-title",
  weight: "400"
});

const bodyFont = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "DonutWorry_GT | Mini donas por mayor para empresas y eventos",
  description:
    "Mini donas premium en Guatemala para empresas, eventos corporativos, coffee breaks, ferias y regalos empresariales.",
  keywords: [
    "mini donas Guatemala",
    "donas por mayor",
    "donas para eventos",
    "donas para empresas",
    "catering dulce"
  ],
  openGraph: {
    title: "DonutWorry_GT",
    description:
      "Mini donas premium para empresas, activaciones, oficinas y celebraciones corporativas."
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" className={`${titleFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
