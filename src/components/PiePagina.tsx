import Link from "next/link";
import { LogoCompleto } from "./Logo";
import { CATEGORIAS, SITIO } from "@/lib/config";

const REDES = [
  { nombre: "Instagram", href: SITIO.redes.instagram, d: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1Zm0 3.9a5.9 5.9 0 1 0 0 11.8 5.9 5.9 0 0 0 0-11.8Zm0 9.7a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6Zm7.5-9.9a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0Z" },
  { nombre: "Facebook", href: SITIO.redes.facebook, d: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z" },
  { nombre: "WhatsApp", href: SITIO.redes.whatsapp, d: "M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C10 9 9.5 7.7 9.3 7.2c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Z" },
];

export function PiePagina() {
  const anio = new Date().getFullYear();

  return (
    <footer className="font-manrope mt-20 degrade-lla text-lla-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <LogoCompleto className="h-20 w-auto sm:h-24" />
            <p className="font-inter mt-4 text-sm leading-relaxed text-lla-200">
              Portal de noticias del espacio en la provincia de {SITIO.provincia}.
              Toda la actividad política, legislativa y territorial en un solo lugar.
            </p>
            <div className="mt-5 flex gap-2">
              {REDES.map((red) => (
                <a
                  key={red.nombre}
                  href={red.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={red.nombre}
                  className="rounded-lg bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={red.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Secciones */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Secciones
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIAS.map((c) => (
                <li key={c.clave}>
                  <Link
                    href={`/categoria/${c.clave}`}
                    className="text-lla-200 transition-colors hover:text-oro-400"
                  >
                    {c.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Institucional
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/el-espacio" className="text-lla-200 transition-colors hover:text-oro-400">
                  El espacio en Misiones
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-lla-200 transition-colors hover:text-oro-400">
                  Todas las noticias
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-lla-200 transition-colors hover:text-oro-400">
                  Contacto y prensa
                </Link>
              </li>
              <li>
                <a href="/rss.xml" className="text-lla-200 transition-colors hover:text-oro-400">
                  Feed RSS
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Prensa
            </h2>
            <p className="font-inter mt-4 text-sm leading-relaxed text-lla-200">
              ¿Tenés información, una denuncia o querés difundir una actividad?
              Escribinos y nos ponemos en contacto.
            </p>
            <div className="font-cabin mt-4 flex flex-wrap gap-2">
              <a
                href={`mailto:${SITIO.email}`}
                className="inline-flex items-center gap-2 rounded-[10px] bg-oro-500 px-4 py-2.5 text-sm font-medium text-lla-950 transition-colors hover:bg-oro-400"
              >
                Escribir a prensa
              </a>
              <a
                href={SITIO.redes.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                WhatsApp
              </a>
            </div>
            <a
              href={SITIO.redes.grupoWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter mt-3 inline-block text-sm text-lla-200 underline decoration-lla-500 underline-offset-2 hover:text-oro-400"
            >
              Sumate al grupo de WhatsApp →
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-lla-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {anio} {SITIO.nombre} · {SITIO.provincia}, Argentina. Todos los derechos reservados.
          </p>
          <p>Las opiniones publicadas representan la posición del espacio.</p>
        </div>
      </div>
    </footer>
  );
}
