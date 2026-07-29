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
      "¿Tenés un reclamo en tu barrio o querés acercarnos información? Escribinos directo por WhatsApp.",
    accion: SITIO.redes.whatsapp,
    etiqueta: "Escribir por WhatsApp",
    externo: true,
  },
  {
    titulo: "Sumate al espacio",
    texto:
      "Participá de las actividades en tu municipio y enterate de todo en nuestro grupo de WhatsApp.",
    accion: SITIO.redes.grupoWhatsapp,
    etiqueta: "Unirme al grupo",
    externo: true,
  },
];

const REDES_LISTADO = [
  { nombre: "Instagram", href: SITIO.redes.instagram },
  { nombre: "Facebook", href: SITIO.redes.facebook },
  { nombre: "WhatsApp", href: SITIO.redes.whatsapp },
  { nombre: "Grupo de WhatsApp", href: SITIO.redes.grupoWhatsapp },
];

export default function Contacto() {
  return (
    <>
      <header className="relative degrade-lla">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <p className="font-manrope text-xs font-bold uppercase tracking-[0.25em] text-lla-300">
            Estamos para escucharte
          </p>
          <h1 className="font-instrument mt-3 text-4xl text-white sm:text-5xl">
            Contacto y prensa
          </h1>
          <p className="font-inter mt-4 max-w-2xl text-base leading-relaxed text-lla-100">
            Escribinos por el canal que corresponda y te respondemos a la brevedad.
          </p>
        </div>
      </header>

      <div className="relative mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {CANALES.map((c) => (
            <div key={c.titulo} className="vidrio flex flex-col rounded-xl p-6">
              <h2 className="font-instrument text-xl text-white">{c.titulo}</h2>
              <p className="font-inter mt-2.5 flex-1 text-sm leading-relaxed text-fg-muted">
                {c.texto}
              </p>
              <a
                href={c.accion}
                target={c.externo ? "_blank" : undefined}
                rel={c.externo ? "noopener noreferrer" : undefined}
                className="font-cabin mt-5 block break-words rounded-[10px] bg-acento px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#8f52ff]"
              >
                {c.etiqueta}
              </a>
            </div>
          ))}
        </div>

        <section className="vidrio mt-12 rounded-xl p-8">
          <h2 className="font-instrument text-2xl text-white">Seguinos en redes</h2>
          <p className="font-inter mt-2 text-sm leading-relaxed text-fg-muted">
            Toda la actividad del espacio, también en nuestros canales oficiales.
            Teléfono de contacto: {SITIO.telefono}.
          </p>
          <div className="font-manrope mt-5 flex flex-wrap gap-3">
            {REDES_LISTADO.map((r) => (
              <a
                key={r.nombre}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-acento hover:text-brand"
              >
                {r.nombre}
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
