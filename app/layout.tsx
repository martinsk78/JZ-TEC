import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Servicio Técnico de Computadoras en Santa Fe Capital | JZ-TEC",
  description: "Reparación de PC, notebooks, Smart TV y consolas en Santa Fe Capital. Diagnóstico sin cargo y garantía escrita. Más de 10 años de experiencia.",
  keywords: ["servicio técnico Santa Fe", "reparación computadoras Santa Fe", "técnico PC Santa Fe Capital", "reparación notebooks Santa Fe"],
  openGraph: {
    title: "JZ-TEC | Servicio Técnico en Santa Fe Capital",
    description: "Reparación profesional de computadoras, notebooks, Smart TV y consolas.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
