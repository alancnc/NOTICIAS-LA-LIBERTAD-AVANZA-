import Image from "next/image";
import Link from "next/link";
import type { Noticia } from "@/lib/noticias";
import { AguilaLLA } from "./Logo";

/** Portada: usa la imagen de la nota o un fondo institucional si no hay. */
function Portada({
  noticia,
  prioridad = false,
  sizes,
}: {
  noticia: Noticia;
  prioridad?: boolean;
  sizes: string;
}) {
  if (noticia.imagen) {
    return (
      <Image
        src={noticia.imagen}
        alt={noticia.imagenAlt ?? noticia.titulo}
        fill
        sizes={sizes}
        priority={prioridad}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="degrade-lla absolute inset-0 flex items-center justify-center">
      <AguilaLLA className="h-1/2 w-auto max-h-28 opacity-25 transition-transform duration-500 group-hover:scale-110" />
    </div>
  );
}

function Etiqueta({ noticia }: { noticia: Noticia }) {
  return (
    <span className="font-cabin inline-flex items-center gap-1.5">
      {noticia.urgente && (
        <span className="rounded bg-red-600 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
          Último momento
        </span>
      )}
      <span className="rounded bg-acento px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
        {noticia.categoriaNombre}
      </span>
    </span>
  );
}

/** Tarjeta principal del bloque de apertura. */
export function TarjetaPrincipal({ noticia }: { noticia: Noticia }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-lla-950">
      <div className="relative aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 xl:aspect-16/10">
        <Portada
          noticia={noticia}
          prioridad
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lla-1000 via-lla-1000/70 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
        <Etiqueta noticia={noticia} />
        <h2 className="font-instrument mt-3 text-3xl leading-[1.15] text-white sm:text-4xl lg:text-5xl">
          <Link href={`/noticias/${noticia.slug}`} className="after:absolute after:inset-0">
            {noticia.titulo}
          </Link>
        </h2>
        {noticia.bajada && (
          <p className="font-inter linea-clamp-2 mt-3 max-w-2xl text-sm leading-relaxed text-lla-100 sm:text-base">
            {noticia.bajada}
          </p>
        )}
        <p className="font-manrope mt-4 text-xs font-medium text-lla-300">
          {noticia.fechaLegible} · {noticia.minutosLectura} min de lectura
        </p>
      </div>
    </article>
  );
}

/** Tarjeta estándar de grilla. */
export function TarjetaNoticia({
  noticia,
  prioridad = false,
}: {
  noticia: Noticia;
  prioridad?: boolean;
}) {
  return (
    <article className="vidrio group relative flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-acento/60 hover:shadow-lla">
      <div className="relative aspect-16/9 overflow-hidden bg-lla-950">
        <Portada
          noticia={noticia}
          prioridad={prioridad}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3">
          <Etiqueta noticia={noticia} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-instrument linea-clamp-3 text-xl leading-snug text-white transition-colors group-hover:text-lla-300">
          <Link href={`/noticias/${noticia.slug}`} className="after:absolute after:inset-0">
            {noticia.titulo}
          </Link>
        </h3>
        {noticia.bajada && (
          <p className="font-inter linea-clamp-3 mt-2.5 text-sm leading-relaxed text-fg-muted">
            {noticia.bajada}
          </p>
        )}
        <p className="font-manrope mt-4 border-t border-white/10 pt-3 text-xs font-medium text-fg-subtle">
          {noticia.fechaLegible} · {noticia.minutosLectura} min
        </p>
      </div>
    </article>
  );
}

/** Fila compacta para columnas laterales y listados secundarios. */
export function FilaNoticia({
  noticia,
  numero,
}: {
  noticia: Noticia;
  numero?: number;
}) {
  return (
    <article className="group relative flex gap-4 py-4">
      {numero !== undefined ? (
        <span className="font-instrument shrink-0 text-3xl leading-none text-lla-300 tabular-nums">
          {String(numero).padStart(2, "0")}
        </span>
      ) : (
        <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg bg-lla-950 sm:w-24">
          <Portada noticia={noticia} sizes="96px" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="font-manrope text-[0.65rem] font-bold uppercase tracking-wider text-brand">
          {noticia.categoriaNombre}
        </p>
        <h3 className="font-instrument linea-clamp-3 mt-1 text-lg leading-snug text-white transition-colors group-hover:text-lla-300">
          <Link href={`/noticias/${noticia.slug}`} className="after:absolute after:inset-0">
            {noticia.titulo}
          </Link>
        </h3>
        <p className="font-manrope mt-1.5 text-xs text-fg-subtle">{noticia.fechaLegible}</p>
      </div>
    </article>
  );
}
