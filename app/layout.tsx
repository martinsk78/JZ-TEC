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
   title: "Alonso Informática | Tienda de Informática en Santa Fe Capital",
  description: "Tienda de informática en Santa Fe Capital. Repuestos, reparación de PC, notebooks y consolas. 25 de Mayo 2818 · 0342 454-1001",
  keywords: ["tienda informatica santa fe", "repuestos pc santa fe", "alonso informatica santa fe capital"],
  openGraph: {
    title: "Alonso Informatica | Tienda de informática en Santa Fe Capital",
    description: "Componentes electronicos, para pc, celulares, etc.",
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
