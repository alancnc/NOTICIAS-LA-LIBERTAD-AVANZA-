import Link from "next/link";

/**
 * Video de referencia (placeholder técnico). Reemplazar por material propio
 * del espacio en Misiones —una recorrida, un acto, imágenes de la provincia—
 * apenas esté disponible: es un cambio de una sola línea.
 */
const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4";

export function Hero() {
  return (
    <>
      {/* Fijo: queda detrás de toda la portada, no solo del primer tramo */}
      <video
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-16 text-center">
        <div className="inline-flex h-[38px] items-center gap-2 rounded-[10px] border border-[rgba(164,132,215,0.5)] bg-[rgba(85,80,110,0.4)] px-3 backdrop-blur-md">
          <span className="rounded-[6px] bg-acento px-2 py-0.5 font-cabin text-xs font-medium text-white">
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
            className="rounded-[10px] bg-acento px-7 py-3.5 font-cabin text-base font-medium text-white transition-colors hover:bg-[#8f52ff]"
          >
            Ver últimas noticias
          </Link>
          <Link
            href="/el-espacio"
            className="rounded-[10px] bg-acento-oscuro px-7 py-3.5 font-cabin text-base font-medium text-[#f6f7f9] transition-colors hover:bg-[#382c58]"
          >
            Conocé el espacio
          </Link>
        </div>
      </section>
    </>
  );
}
