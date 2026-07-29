import type { Metadata } from "next";
import Link from "next/link";
import { TarjetaNoticia } from "@/components/TarjetaNoticia";
import { EstadoVacio, Paginacion } from "@/components/ui";
import { CATEGORIAS, NOTICIAS_POR_PAGINA } from "@/lib/config";
import { conteoPorCategoria, obtenerNoticias } from "@/lib/noticias";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Todas las noticias",
  description:
    "Archivo completo de noticias de La Libertad Avanza Misiones: política, provincia, legislatura, economía, municipios y comunicados.",
  alternates: { canonical: "/noticias" },
};

export default async function PaginaNoticias({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string }>;
}) {
  const { pagina } = await searchParams;
  const noticias = obtenerNoticias();
  const conteo = conteoPorCategoria();

  const totalPaginas = Math.max(1, Math.ceil(noticias.length / NOTICIAS_POR_PAGINA));
  const numeroPagina = Math.min(
    Math.max(1, Number.parseInt(pagina ?? "1", 10) || 1),
    totalPaginas,
  );
  const desde = (numeroPagina - 1) * NOTICIAS_POR_PAGINA;
  const visibles = noticias.slice(desde, desde + NOTICIAS_POR_PAGINA);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b-2 border-lla-600 pb-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-brand">
          Archivo
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-fg sm:text-4xl">
          Todas las noticias
        </h1>
        <p className="mt-2 text-sm text-fg-muted">
          {noticias.length} {noticias.length === 1 ? "nota publicada" : "notas publicadas"}
          {totalPaginas > 1 && ` · página ${numeroPagina} de ${totalPaginas}`}
        </p>
      </header>

      {/* Filtro por sección */}
      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Filtrar por sección">
        <span className="rounded-full bg-lla-600 px-4 py-1.5 text-sm font-bold text-white">
          Todas
        </span>
        {CATEGORIAS.filter((c) => (conteo.get(c.clave) ?? 0) > 0).map((c) => (
          <Link
            key={c.clave}
            href={`/categoria/${c.clave}`}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-semibold text-fg-muted transition-colors hover:border-lla-400 hover:text-brand"
          >
            {c.nombre}
            <span className="ml-1.5 text-xs text-fg-subtle">
              {conteo.get(c.clave)}
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        {visibles.length === 0 ? (
          <EstadoVacio
            titulo="Todavía no hay noticias"
            mensaje="Apenas se publique la primera nota va a aparecer en este listado."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((n, i) => (
              <TarjetaNoticia key={n.slug} noticia={n} prioridad={i < 3} />
            ))}
          </div>
        )}
      </div>

      <Paginacion
        paginaActual={numeroPagina}
        totalPaginas={totalPaginas}
        base="/noticias"
      />
    </div>
  );
}
