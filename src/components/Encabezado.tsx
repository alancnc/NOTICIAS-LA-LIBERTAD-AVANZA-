"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AguilaLLA } from "./Logo";
import { CATEGORIAS } from "@/lib/config";

const ENLACES_NAV = [
  { etiqueta: "Inicio", href: "/" },
  { etiqueta: "Noticias", href: "/noticias", desplegable: true },
  { etiqueta: "Institucional", href: "/el-espacio" },
  { etiqueta: "Contacto", href: "/contacto" },
];

function ChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:rotate-180"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/**
 * En la barra el wordmark va en HTML y no como parte del PNG: el logo
 * original es muy ancho y su texto quedaría ilegible a esta altura.
 */
function LogoEncabezado() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="La Libertad Avanza Misiones — Inicio"
    >
      <AguilaLLA className="h-10 w-auto shrink-0 sm:h-12" />
      <span className="font-manrope leading-none">
        <span className="block text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/75">
          La
        </span>
        <span className="mt-0.5 block text-lg font-extrabold uppercase leading-none tracking-tight text-white sm:text-xl">
          Libertad Avanza
        </span>
        <span className="mt-0.5 block text-[0.68rem] font-bold uppercase tracking-[0.3em] text-oro-400">
          Misiones
        </span>
      </span>
    </Link>
  );
}

export function Encabezado() {
  const ruta = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const enInicio = ruta === "/";

  useEffect(() => setMenuAbierto(false), [ruta]);

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  const esActiva = (href: string) =>
    href === "/" ? ruta === "/" : ruta.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 ${
        enInicio ? "bg-transparent" : "border-b border-white/10 bg-[#1c0740]/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-6 py-4 lg:px-[120px]">
        <LogoEncabezado />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {ENLACES_NAV.map((item) =>
            item.desplegable ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={esActiva(item.href) ? "page" : undefined}
                  className="flex items-center gap-1 px-3 py-2 font-manrope text-sm font-medium text-white transition-opacity hover:opacity-80"
                >
                  {item.etiqueta}
                  <ChevronDown />
                </Link>
                <div className="invisible absolute left-0 top-full w-56 -translate-y-1 rounded-xl border border-white/10 bg-lla-950/95 p-2 opacity-0 shadow-lla backdrop-blur transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {CATEGORIAS.slice(0, 5).map((c) => (
                    <Link
                      key={c.clave}
                      href={`/categoria/${c.clave}`}
                      className="block rounded-lg px-3 py-2 font-manrope text-sm text-lla-100 hover:bg-white/10 hover:text-white"
                    >
                      {c.nombre}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={esActiva(item.href) ? "page" : undefined}
                className="px-3 py-2 font-manrope text-sm font-medium text-white transition-opacity hover:opacity-80"
              >
                {item.etiqueta}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contacto"
            className="rounded-lg border border-[#d4d4d4] bg-white px-4 py-2 font-manrope text-sm font-semibold text-[#171717] transition-colors hover:bg-white/90"
          >
            Prensa
          </Link>
          <Link
            href="/contacto"
            className="rounded-lg bg-acento px-4 py-2 font-manrope text-sm font-semibold text-[#fafafa] shadow-lla transition-colors hover:bg-[#8f52ff]"
          >
            Sumate
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuAbierto(true)}
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          className="text-white lg:hidden"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {/* Menú móvil a pantalla completa */}
      {menuAbierto && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <LogoEncabezado />
            <button
              type="button"
              onClick={() => setMenuAbierto(false)}
              aria-label="Cerrar menú"
              className="text-white"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {ENLACES_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={esActiva(item.href) ? "page" : undefined}
                className="font-manrope text-2xl font-semibold text-white"
              >
                {item.etiqueta}
              </Link>
            ))}
            <div className="mt-4 flex flex-col items-center gap-4">
              <Link
                href="/contacto"
                className="rounded-lg border border-[#d4d4d4] bg-white px-8 py-3 font-manrope text-sm font-semibold text-[#171717]"
              >
                Prensa
              </Link>
              <Link
                href="/contacto"
                className="rounded-lg bg-acento px-8 py-3 font-manrope text-sm font-semibold text-[#fafafa]"
              >
                Sumate
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
