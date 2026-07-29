import Link from "next/link";
import type { Noticia } from "@/lib/noticias";

export function TituloSeccion({
  children,
  href,
  enlaceTexto = "Ver todo",
}: {
  children: React.ReactNode;
  href?: string;
  enlaceTexto?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-white/15 pb-3">
      <h2 className="font-instrument text-2xl text-white sm:text-3xl">
        {children}
      </h2>
      {href && (
        <Link
          href={href}
          className="font-manrope shrink-0 text-sm font-semibold text-brand transition-opacity hover:opacity-70"
        >
          {enlaceTexto} →
        </Link>
      )}
    </div>
  );
}

/** Cinta de último momento. Sólo se muestra si hay notas marcadas como urgentes. */
export function CintaUrgente({ noticias }: { noticias: Noticia[] }) {
  if (noticias.length === 0) return null;

  const items = [...noticias, ...noticias];

  return (
    <div className="relative border-b border-red-800 bg-red-700 text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <span className="font-manrope shrink-0 py-2.5 text-xs font-bold uppercase tracking-wider">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-white align-middle" />
          Último momento
        </span>
        <div className="marquesina-contenedor relative flex-1 overflow-hidden">
          <div className="marquesina flex w-max gap-8 py-2.5">
            {items.map((n, i) => (
              <Link
                key={`${n.slug}-${i}`}
                href={`/noticias/${n.slug}`}
                className="font-inter whitespace-nowrap text-sm font-medium hover:underline"
              >
                {n.titulo}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Paginacion({
  paginaActual,
  totalPaginas,
  base,
}: {
  paginaActual: number;
  totalPaginas: number;
  base: string;
}) {
  if (totalPaginas <= 1) return null;

  const href = (p: number) => (p === 1 ? base : `${base}?pagina=${p}`);
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1).filter(
    (p) =>
      p === 1 ||
      p === totalPaginas ||
      Math.abs(p - paginaActual) <= 1,
  );

  return (
    <nav className="font-manrope mt-12 flex items-center justify-center gap-2" aria-label="Paginación">
      {paginaActual > 1 && (
        <Link
          href={href(paginaActual - 1)}
          rel="prev"
          className="rounded-lg border border-borde px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-lla-400 hover:text-brand"
        >
          ← Anterior
        </Link>
      )}

      {paginas.map((p, i) => {
        const anterior = paginas[i - 1];
        const salto = anterior !== undefined && p - anterior > 1;
        return (
          <span key={p} className="flex items-center gap-2">
            {salto && <span className="px-1 text-fg-subtle">…</span>}
            <Link
              href={href(p)}
              aria-current={p === paginaActual ? "page" : undefined}
              className={`min-w-10 rounded-lg px-3.5 py-2 text-center text-sm font-bold transition-colors ${
                p === paginaActual
                  ? "bg-lla-600 text-white"
                  : "border border-borde text-fg hover:border-lla-400 hover:text-brand"
              }`}
            >
              {p}
            </Link>
          </span>
        );
      })}

      {paginaActual < totalPaginas && (
        <Link
          href={href(paginaActual + 1)}
          rel="next"
          className="rounded-lg border border-borde px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-lla-400 hover:text-brand"
        >
          Siguiente →
        </Link>
      )}
    </nav>
  );
}

export function EstadoVacio({
  titulo,
  mensaje,
}: {
  titulo: string;
  mensaje: string;
}) {
  return (
    <div className="vidrio rounded-2xl px-6 py-16 text-center">
      <h3 className="font-instrument text-xl text-white">{titulo}</h3>
      <p className="font-inter mx-auto mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
        {mensaje}
      </p>
      <Link
        href="/noticias"
        className="font-cabin mt-6 inline-block rounded-[10px] bg-acento px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#8f52ff]"
      >
        Ver todas las noticias
      </Link>
    </div>
  );
}
