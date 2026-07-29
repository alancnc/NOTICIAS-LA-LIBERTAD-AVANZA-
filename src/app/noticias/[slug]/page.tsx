import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeonLLA } from "@/components/Logo";
import { TarjetaNoticia } from "@/components/TarjetaNoticia";
import { TituloSeccion } from "@/components/ui";
import { CompartirNota } from "@/components/CompartirNota";
import { SITIO } from "@/lib/config";
import {
  extracto,
  noticiasRelacionadas,
  obtenerNoticia,
  obtenerSlugs,
} from "@/lib/noticias";

export const revalidate = 60;

export function generateStaticParams() {
  return obtenerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await obtenerNoticia(slug);
  if (!noticia) return { title: "Nota no encontrada" };

  const descripcion = extracto(noticia);
  const url = `${SITIO.url}/noticias/${noticia.slug}`;

  return {
    title: noticia.titulo,
    description: descripcion,
    alternates: { canonical: `/noticias/${noticia.slug}` },
    openGraph: {
      type: "article",
      url,
      title: noticia.titulo,
      description: descripcion,
      siteName: SITIO.nombre,
      locale: SITIO.locale,
      publishedTime: noticia.fecha,
      authors: [noticia.autor],
      section: noticia.categoriaNombre,
      tags: noticia.etiquetas,
      ...(noticia.imagen ? { images: [{ url: noticia.imagen }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: noticia.titulo,
      description: descripcion,
      ...(noticia.imagen ? { images: [noticia.imagen] } : {}),
    },
  };
}

export default async function PaginaNota({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const noticia = await obtenerNoticia(slug);
  if (!noticia) notFound();

  const relacionadas = noticiasRelacionadas(noticia, 3);
  const url = `${SITIO.url}/noticias/${noticia.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: noticia.titulo,
    description: extracto(noticia),
    datePublished: noticia.fecha,
    dateModified: noticia.fecha,
    author: { "@type": "Organization", name: noticia.autor },
    publisher: {
      "@type": "Organization",
      name: SITIO.nombre,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: noticia.categoriaNombre,
    inLanguage: SITIO.idioma,
    ...(noticia.imagen ? { image: [noticia.imagen] } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Cabecera */}
        <header className="degrade-lla">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-lla-200">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link href="/noticias" className="hover:text-white">Noticias</Link>
              <span aria-hidden="true">/</span>
              <Link
                href={`/categoria/${noticia.categoria}`}
                className="text-oro-400 hover:text-oro-500"
              >
                {noticia.categoriaNombre}
              </Link>
            </nav>

            {noticia.urgente && (
              <span className="mt-5 inline-block rounded bg-red-600 px-2.5 py-1 text-[0.7rem] font-black uppercase tracking-wider text-white">
                Último momento
              </span>
            )}

            <h1 className="mt-4 text-3xl font-black leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.85rem]">
              {noticia.titulo}
            </h1>

            {noticia.bajada && (
              <p className="mt-5 text-lg leading-relaxed text-lla-100">
                {noticia.bajada}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/15 pt-5 text-sm text-lla-200">
              <LeonLLA className="h-8 w-8" />
              <span className="font-semibold text-white">{noticia.autor}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={noticia.fecha}>{noticia.fechaLegible}</time>
              <span aria-hidden="true">·</span>
              <span>{noticia.minutosLectura} min de lectura</span>
            </div>
          </div>
        </header>

        {/* Imagen destacada */}
        {noticia.imagen && (
          <figure className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="relative -mt-8 aspect-16/9 overflow-hidden rounded-xl bg-lla-950 shadow-lla">
              <Image
                src={noticia.imagen}
                alt={noticia.imagenAlt ?? noticia.titulo}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                priority
                className="object-cover"
              />
            </div>
            {noticia.credito && (
              <figcaption className="mt-2 text-xs text-fg-subtle">
                {noticia.credito}
              </figcaption>
            )}
          </figure>
        )}

        {/* Cuerpo */}
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <div
            className="nota-cuerpo"
            dangerouslySetInnerHTML={{ __html: noticia.contenidoHtml }}
          />

          {noticia.etiquetas.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-borde pt-6">
              <span className="text-xs font-black uppercase tracking-wider text-fg-subtle">
                Temas
              </span>
              {noticia.etiquetas.map((e) => (
                <span
                  key={e}
                  className="rounded-full bg-bg-soft px-3 py-1 text-xs font-semibold text-fg-muted"
                >
                  #{e}
                </span>
              ))}
            </div>
          )}

          <CompartirNota titulo={noticia.titulo} url={url} />
        </div>
      </article>

      {/* Relacionadas */}
      {relacionadas.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <TituloSeccion href="/noticias">Seguí leyendo</TituloSeccion>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relacionadas.map((n) => (
              <TarjetaNoticia key={n.slug} noticia={n} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
