import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TarjetaNoticia } from "@/components/TarjetaNoticia";
import { EstadoVacio } from "@/components/ui";
import { CATEGORIAS, MAPA_CATEGORIAS } from "@/lib/config";
import { conteoPorCategoria, noticiasPorCategoria } from "@/lib/noticias";

export const revalidate = 60;

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ clave: c.clave }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clave: string }>;
}): Promise<Metadata> {
  const { clave } = await params;
  const categoria = MAPA_CATEGORIAS.get(clave);
  if (!categoria) return { title: "Sección no encontrada" };

  return {
    title: categoria.nombre,
    description: categoria.descripcion,
    alternates: { canonical: `/categoria/${categoria.clave}` },
    openGraph: {
      title: `${categoria.nombre} | LLA Noticias Misiones`,
      description: categoria.descripcion,
      type: "website",
    },
  };
}

export default async function PaginaCategoria({
  params,
}: {
  params: Promise<{ clave: string }>;
}) {
  const { clave } = await params;
  const categoria = MAPA_CATEGORIAS.get(clave);
  if (!categoria) notFound();

  const noticias = noticiasPorCategoria(clave);
  const conteo = conteoPorCategoria();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b-2 border-lla-600 pb-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-brand">
          Sección
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-fg sm:text-4xl">
          {categoria.nombre}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
          {categoria.descripcion}
        </p>
      </header>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Filtrar por sección">
        <Link
          href="/noticias"
          className="rounded-full border border-borde px-4 py-1.5 text-sm font-semibold text-fg-muted transition-colors hover:border-lla-400 hover:text-brand"
        >
          Todas
        </Link>
        {CATEGORIAS.map((c) => (
          <Link
            key={c.clave}
            href={`/categoria/${c.clave}`}
            aria-current={c.clave === clave ? "page" : undefined}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              c.clave === clave
                ? "bg-lla-600 text-white"
                : "border border-borde text-fg-muted hover:border-lla-400 hover:text-brand"
            }`}
          >
            {c.nombre}
            {(conteo.get(c.clave) ?? 0) > 0 && (
              <span
                className={`ml-1.5 text-xs ${
                  c.clave === clave ? "text-lla-200" : "text-fg-subtle"
                }`}
              >
                {conteo.get(c.clave)}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        {noticias.length === 0 ? (
          <EstadoVacio
            titulo={`Todavía no hay notas en ${categoria.nombre}`}
            mensaje="Esta sección está creada y lista: apenas se publique una nota acá, va a aparecer automáticamente."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((n, i) => (
              <TarjetaNoticia key={n.slug} noticia={n} prioridad={i < 3} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
