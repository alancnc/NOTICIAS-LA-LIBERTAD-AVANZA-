"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LeonLLA } from "./Logo";
import { CATEGORIAS } from "@/lib/config";

/**
 * Video de referencia (placeholder técnico). Reemplazar por material propio
 * del espacio en Misiones —una recorrida, un acto, imágenes de la provincia—
 * apenas esté disponible: es un cambio de una sola línea.
 */
const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4";

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

function LogoHero() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="La Libertad Avanza Misiones — Inicio">
      <LeonLLA className="h-9 w-9 shrink-0" />
      <span className="font-manrope leading-none">
        <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/70">
          La Libertad Avanza
        </span>
        <span className="mt-0.5 block text-base font-extrabold uppercase tracking-tight text-white">
          Misiones
        </span>
      </span>
    </Link>
  );
}

export function Hero() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-lla-1000">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Navbar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-[120px]">
        <LogoHero />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {ENLACES_NAV.map((item) =>
            item.desplegable ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 font-manrope text-sm font-medium text-white opacity-100 transition-opacity hover:opacity-80"
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
            className="rounded-lg bg-[#7b39fc] px-4 py-2 font-manrope text-sm font-semibold text-[#fafafa] shadow-lla transition-colors hover:bg-[#6c28f0]"
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
        <div className="fixed inset-0 z-30 flex flex-col bg-black lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <LogoHero />
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
                onClick={() => setMenuAbierto(false)}
                className="font-manrope text-2xl font-semibold text-white"
              >
                {item.etiqueta}
              </Link>
            ))}
            <div className="mt-4 flex flex-col items-center gap-4">
              <Link
                href="/contacto"
                onClick={() => setMenuAbierto(false)}
                className="rounded-lg border border-[#d4d4d4] bg-white px-8 py-3 font-manrope text-sm font-semibold text-[#171717]"
              >
                Prensa
              </Link>
              <Link
                href="/contacto"
                onClick={() => setMenuAbierto(false)}
                className="rounded-lg bg-[#7b39fc] px-8 py-3 font-manrope text-sm font-semibold text-[#fafafa]"
              >
                Sumate
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Contenido central */}
      <div className="relative z-10 mt-20 flex flex-col items-center px-6 text-center sm:mt-28 lg:mt-32">
        <div className="inline-flex h-[38px] items-center gap-2 rounded-[10px] border border-[rgba(164,132,215,0.5)] bg-[rgba(85,80,110,0.4)] px-3 backdrop-blur-md">
          <span className="rounded-[6px] bg-[#7b39fc] px-2 py-0.5 font-cabin text-xs font-medium text-white">
            Nuevo
          </span>
          <span className="font-cabin text-sm font-medium text-white">
            Así avanza la libertad en Misiones
          </span>
        </div>

        <h1 className="font-instrument mt-6 max-w-5xl text-5xl leading-[1.1] text-white sm:text-6xl lg:text-[96px]">
          Libertad, progreso{" "}
          <span className="italic" style={{ marginInline: "0.08em" }}>
            y
          </span>{" "}
          futuro para toda Misiones
        </h1>

        <p className="font-inter mt-6 max-w-[662px] text-lg font-normal text-white/70">
          Seguí toda la actividad de La Libertad Avanza en la provincia: propuestas
          legislativas, recorridas territoriales y comunicados oficiales, la agenda
          completa en un solo lugar.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/noticias"
            className="rounded-[10px] bg-[#7b39fc] px-7 py-3.5 font-cabin text-base font-medium text-white transition-colors hover:bg-[#8f52ff]"
          >
            Ver últimas noticias
          </Link>
          <Link
            href="/el-espacio"
            className="rounded-[10px] bg-[#2b2344] px-7 py-3.5 font-cabin text-base font-medium text-[#f6f7f9] transition-colors hover:bg-[#382c58]"
          >
            Conocé el espacio
          </Link>
        </div>
      </div>
    </section>
  );
}
