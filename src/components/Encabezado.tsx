"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NAVEGACION, SITIO } from "@/lib/config";

function fechaDeHoy() {
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date());
}

export function Encabezado() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [fecha, setFecha] = useState("");

  useEffect(() => setFecha(fechaDeHoy()), []);
  useEffect(() => setAbierto(false), [ruta]);

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const esActiva = (href: string) =>
    href === "/" ? ruta === "/" : ruta.startsWith(href);

  return (
    <header className="sticky top-0 z-50 degrade-lla shadow-lg shadow-lla-950/20">
      {/* Barra superior */}
      <div className="hidden border-b border-white/10 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-lla-200 sm:px-6 lg:px-8">
          <span className="capitalize">{fecha || " "}</span>
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline">
              Prensa {SITIO.provincia} · {SITIO.email}
            </span>
            <Link href="/contacto" className="font-semibold text-white hover:text-oro-400">
              Enviá tu información
            </Link>
          </div>
        </div>
      </div>

      {/* Barra principal */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Link href="/" aria-label={`${SITIO.nombre} — Inicio`}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Principal">
            {NAVEGACION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={esActiva(item.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  esActiva(item.href)
                    ? "bg-white/15 text-white"
                    : "text-lla-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.etiqueta}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {abierto ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {abierto && (
        <div
          id="menu-movil"
          className="border-t border-white/10 bg-lla-950/98 backdrop-blur lg:hidden"
        >
          <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6" aria-label="Móvil">
            {NAVEGACION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={esActiva(item.href) ? "page" : undefined}
                className={`block rounded-lg px-3 py-3 text-base font-semibold ${
                  esActiva(item.href)
                    ? "bg-white/15 text-white"
                    : "text-lla-100 hover:bg-white/10"
                }`}
              >
                {item.etiqueta}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
