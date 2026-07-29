import Link from "next/link";
import { TarjetaNoticia, TarjetaPrincipal, FilaNoticia } from "@/components/TarjetaNoticia";
import { CintaUrgente, EstadoVacio, TituloSeccion } from "@/components/ui";
import { CATEGORIAS, SITIO } from "@/lib/config";
import {
  conteoPorCategoria,
  noticiasPorCategoria,
  noticiasUrgentes,
  obtenerNoticias,
} from "@/lib/noticias";

export const revalidate = 60;

export default function Inicio() {
  const noticias = obtenerNoticias();
  const urgentes = noticiasUrgentes();
  const conteo = conteoPorCategoria();

  if (noticias.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <EstadoVacio
          titulo="Todavía no hay noticias publicadas"
          mensaje="Cuando se publique la primera nota va a aparecer acá automáticamente."
        />
      </div>
    );
  }

  const ordenadas = [
    ...noticias.filter((n) => n.destacada),
    ...noticias.filter((n) => !n.destacada),
  ];
  const [apertura, ...restantes] = ordenadas;
  const columna = restantes.slice(0, 4);
  const grilla = restantes.slice(4, 10);
  const masLeidas = noticias.slice(0, 5);

  return (
    <>
      <CintaUrgente noticias={urgentes} />

      {/* Apertura */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TarjetaPrincipal noticia={apertura} />
          </div>

          <aside className="lg:col-span-1">
            <h2 className="mb-1 border-b-2 border-lla-600 pb-3 text-xl font-black uppercase tracking-tight text-fg">
              Lo último
            </h2>
            <div className="divide-y divide-borde">
              {columna.map((n) => (
                <FilaNoticia key={n.slug} noticia={n} />
              ))}
            </div>
            <Link
              href="/noticias"
              className="mt-4 block rounded-lg border border-borde py-2.5 text-center text-sm font-bold text-brand transition-colors hover:border-lla-400 hover:bg-bg-soft"
            >
              Ver todas las noticias →
            </Link>
          </aside>
        </div>
      </section>

      {/* Grilla general */}
      {grilla.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <TituloSeccion href="/noticias">Últimas noticias</TituloSeccion>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grilla.map((n) => (
              <TarjetaNoticia key={n.slug} noticia={n} />
            ))}
          </div>
        </section>
      )}

      {/* Franja institucional */}
      <section className="degrade-lla my-10">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-lla-300">
            La Libertad Avanza · {SITIO.provincia}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            Las ideas de la libertad, en cada rincón de la provincia
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-lla-100">
            Seguí toda la actividad del espacio en Misiones: propuestas legislativas,
            recorridas territoriales, comunicados oficiales y la agenda de cada semana.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/el-espacio"
              className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-lla-800 transition-transform hover:scale-105"
            >
              Conocé el espacio
            </Link>
            <Link
              href="/contacto"
              className="rounded-lg border-2 border-white/40 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Sumate o escribinos
            </Link>
          </div>
        </div>
      </section>

      {/* Secciones + más leídas */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TituloSeccion>Por sección</TituloSeccion>
            <div className="grid gap-6 sm:grid-cols-2">
              {CATEGORIAS.filter((c) => (conteo.get(c.clave) ?? 0) > 0)
                .slice(0, 4)
                .map((c) => {
                  const ultima = noticiasPorCategoria(c.clave)[0];
                  return (
                    <div key={c.clave}>
                      <Link
                        href={`/categoria/${c.clave}`}
                        className="text-sm font-black uppercase tracking-wider text-brand hover:opacity-70"
                      >
                        {c.nombre}
                        <span className="ml-2 font-medium text-fg-subtle">
                          ({conteo.get(c.clave)})
                        </span>
                      </Link>
                      <div className="mt-2">
                        <FilaNoticia noticia={ultima} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <TituloSeccion>Más leídas</TituloSeccion>
            <div className="divide-y divide-borde">
              {masLeidas.map((n, i) => (
                <FilaNoticia key={n.slug} noticia={n} numero={i + 1} />
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
