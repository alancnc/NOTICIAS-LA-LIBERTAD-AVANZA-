import type { Metadata, Viewport } from "next";
import { Encabezado } from "@/components/Encabezado";
import { PiePagina } from "@/components/PiePagina";
import { SITIO } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: {
    default: SITIO.titulo,
    template: `%s | ${SITIO.nombreCorto}`,
  },
  description: SITIO.descripcion,
  applicationName: SITIO.nombre,
  keywords: [
    "La Libertad Avanza",
    "Misiones",
    "noticias",
    "Posadas",
    "política",
    "LLA Misiones",
  ],
  authors: [{ name: SITIO.nombre }],
  openGraph: {
    type: "website",
    locale: SITIO.locale,
    url: SITIO.url,
    siteName: SITIO.nombre,
    title: SITIO.titulo,
    description: SITIO.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: SITIO.titulo,
    description: SITIO.descripcion,
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${SITIO.url}/rss.xml` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6b20cd" },
    { media: "(prefers-color-scheme: dark)", color: "#120a20" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-lla-700 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          Saltar al contenido
        </a>
        <Encabezado />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <PiePagina />
      </body>
    </html>
  );
}
