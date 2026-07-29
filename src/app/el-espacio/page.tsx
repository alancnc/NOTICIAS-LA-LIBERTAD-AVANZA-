import type { Metadata } from "next";
import Link from "next/link";
import { LogoCompleto } from "@/components/Logo";
import { CATEGORIAS, SITIO } from "@/lib/config";

export const metadata: Metadata = {
  title: "El espacio en Misiones",
  description:
    "Quiénes somos, qué defendemos y cómo trabaja La Libertad Avanza en la provincia de Misiones.",
  alternates: { canonical: "/el-espacio" },
};

const PILARES = [
  {
    titulo: "Libertad económica",
    texto:
      "Menos impuestos, menos trabas y reglas claras para que el que produce en Misiones pueda crecer, contratar e invertir sin pedir permiso.",
  },
  {
    titulo: "Transparencia y control",
    texto:
      "Cada peso público debe poder rastrearse. Impulsamos la publicación abierta de la ejecución presupuestaria y el control real del gasto político.",
  },
  {
    titulo: "Instituciones fuertes",
    texto:
      "Respeto irrestricto por la Constitución, división de poderes y una Justicia independiente. Idoneidad como requisito para la función pública.",
  },
  {
    titulo: "Territorio y trabajo",
    texto:
      "Presencia permanente en toda la provincia. Escuchar en cada municipio y convertir esos reclamos en propuestas concretas.",
  },
];

export default function ElEspacio() {
  return (
    <>
      <header className="relative degrade-lla">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <LogoCompleto className="mx-auto h-28 w-auto sm:h-36" />
          <h1 className="font-instrument mt-8 text-4xl text-white sm:text-6xl">
            El espacio en {SITIO.provincia}
          </h1>
          <p className="font-inter mx-auto mt-5 max-w-2xl text-base leading-relaxed text-lla-100 sm:text-lg">
            Somos el espacio que lleva las ideas de la libertad a cada rincón de la
            provincia. Este portal reúne toda nuestra actividad política, legislativa
            y territorial.
          </p>
        </div>
      </header>

      <div className="relative mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <section>
          <h2 className="font-instrument text-3xl text-white sm:text-4xl">
            Nuestros pilares
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {PILARES.map((p) => (
              <div
                key={p.titulo}
                className="vidrio rounded-xl p-6 transition-colors hover:border-acento/60"
              >
                <h3 className="font-instrument text-lg text-lla-300">{p.titulo}</h3>
                <p className="font-inter mt-2.5 text-sm leading-relaxed text-fg-muted">
                  {p.texto}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-instrument text-3xl text-white sm:text-4xl">
            Qué vas a encontrar acá
          </h2>
          <p className="font-inter mt-3 text-base leading-relaxed text-fg-muted">
            Publicamos todo lo que hace el espacio en la provincia, organizado por
            secciones para que encuentres rápido lo que buscás:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {CATEGORIAS.map((c) => (
              <li key={c.clave}>
                <Link
                  href={`/categoria/${c.clave}`}
                  className="vidrio block rounded-lg p-4 transition-colors hover:border-acento/60"
                >
                  <span className="font-manrope font-bold text-white">{c.nombre}</span>
                  <span className="font-inter mt-1 block text-sm leading-relaxed text-fg-muted">
                    {c.descripcion}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-2xl degrade-lla p-8 text-center sm:p-12">
          <h2 className="font-instrument text-3xl text-white sm:text-4xl">
            ¿Querés sumarte?
          </h2>
          <p className="font-inter mx-auto mt-3 max-w-xl text-base leading-relaxed text-lla-100">
            Si compartís nuestras ideas y querés participar de las actividades en tu
            municipio, escribinos. Nos ponemos en contacto.
          </p>
          <Link
            href="/contacto"
            className="font-cabin mt-7 inline-block rounded-[10px] bg-oro-500 px-7 py-3 text-sm font-medium text-lla-950 transition-transform hover:scale-105"
          >
            Contactanos
          </Link>
        </section>
      </div>
    </>
  );
}
