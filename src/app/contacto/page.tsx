import type { Metadata } from "next";
import { SITIO } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contacto y prensa",
  description:
    "Canales de contacto de La Libertad Avanza Misiones para prensa, vecinos y militancia.",
  alternates: { canonical: "/contacto" },
};

const CANALES = [
  {
    titulo: "Prensa y medios",
    texto:
      "Solicitudes de entrevistas, acreditaciones y material institucional para medios de comunicación.",
    accion: `mailto:${SITIO.email}`,
    etiqueta: SITIO.email,
  },
  {
    titulo: "Vecinos y denuncias",
    texto:
      "¿Tenés un reclamo en tu barrio o querés acercarnos información? Contanos tu caso y le damos seguimiento.",
    accion: `mailto:${SITIO.email}?subject=${encodeURIComponent("Reclamo de vecino")}`,
    etiqueta: "Enviar tu reclamo",
  },
  {
    titulo: "Sumate al espacio",
    texto:
      "Participá de las actividades en tu municipio y de los encuentros de formación que organizamos en toda la provincia.",
    accion: `mailto:${SITIO.email}?subject=${encodeURIComponent("Quiero sumarme")}`,
    etiqueta: "Quiero sumarme",
  },
];

export default function Contacto() {
  return (
    <>
      <header className="degrade-lla">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-lla-300">
            Estamos para escucharte
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Contacto y prensa
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-lla-100">
            Escribinos por el canal que corresponda y te respondemos a la brevedad.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {CANALES.map((c) => (
            <div
              key={c.titulo}
              className="flex flex-col rounded-xl border border-borde bg-bg-elev p-6"
            >
              <h2 className="text-lg font-bold text-fg">{c.titulo}</h2>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-muted">
                {c.texto}
              </p>
              <a
                href={c.accion}
                className="mt-5 block break-words rounded-lg bg-lla-600 px-4 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-lla-700"
              >
                {c.etiqueta}
              </a>
            </div>
          ))}
        </div>

        <section className="mt-12 rounded-xl border border-borde bg-bg-soft p-8">
          <h2 className="text-xl font-black tracking-tight text-fg">
            Seguinos en redes
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            Toda la actividad del espacio, también en nuestras redes oficiales.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {Object.entries(SITIO.redes).map(([nombre, href]) => (
              <a
                key={nombre}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-borde-fuerte px-4 py-2 text-sm font-semibold capitalize text-fg transition-colors hover:border-lla-400 hover:text-brand"
              >
                {nombre}
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
