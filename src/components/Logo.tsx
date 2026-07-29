const MELENA =
  "M50.00 3.00L55.73 17.50L66.07 5.83L66.50 21.42L80.21 14.00L75.28 28.79L90.70 26.50L81.01 38.71L96.29 41.84L83.00 50.00L96.29 58.16L81.01 61.29L90.70 73.50L75.28 71.21L80.21 86.00L66.50 78.58L66.07 94.17L55.73 82.50L50.00 97.00L44.27 82.50L33.93 94.17L33.50 78.58L19.79 86.00L24.72 71.21L9.30 73.50L18.99 61.29L3.71 58.16L17.00 50.00L3.71 41.84L18.99 38.71L9.30 26.50L24.72 28.79L19.79 14.00L33.50 21.42L33.93 5.83L44.27 17.50Z";

/**
 * Emblema del león. Diseño propio, pensado como marcador de posición:
 * para usar el isotipo oficial del partido, reemplazar este componente
 * por un <Image> apuntando a /public/logo-oficial.svg (ver README).
 */
export function LeonLLA({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Emblema de La Libertad Avanza"
      className={className}
    >
      <defs>
        <linearGradient id="lla-melena" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4aeff" />
          <stop offset="55%" stopColor="#8b52f6" />
          <stop offset="100%" stopColor="#6b20cd" />
        </linearGradient>
        <linearGradient id="lla-rostro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f2ff" />
          <stop offset="100%" stopColor="#ddd2ff" />
        </linearGradient>
      </defs>

      {/* Melena */}
      <path d={MELENA} fill="url(#lla-melena)" />
      <circle cx="50" cy="50" r="34" fill="#4a1a86" opacity="0.35" />

      {/* Rostro */}
      <path
        d="M50 22c-13.5 0-23 9.2-23 22 0 13.6 10.3 24 23 24s23-10.4 23-24c0-12.8-9.5-22-23-22Z"
        fill="url(#lla-rostro)"
      />

      {/* Orejas */}
      <path d="M31 27c4.4-1.6 8 .6 9.2 4.6-3.6.4-6.9 1.9-9.6 4.3-.9-3.2-.7-6.2.4-8.9Z" fill="#c4aeff" />
      <path d="M69 27c-4.4-1.6-8 .6-9.2 4.6 3.6.4 6.9 1.9 9.6 4.3.9-3.2.7-6.2-.4-8.9Z" fill="#c4aeff" />

      {/* Ojos */}
      <path d="M36.5 42.5c2.9-2.2 6.4-2.2 9.3 0-2.2 2.9-7.1 2.9-9.3 0Z" fill="#2e0d5c" />
      <path d="M54.2 42.5c2.9-2.2 6.4-2.2 9.3 0-2.2 2.9-7.1 2.9-9.3 0Z" fill="#2e0d5c" />

      {/* Hocico */}
      <path d="M50 49.5l5.4 4.2c0 3.1-2.4 5.2-5.4 5.2s-5.4-2.1-5.4-5.2L50 49.5Z" fill="#6b20cd" />
      <path d="M50 58.9v4.4" stroke="#6b20cd" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M50 63.3c-2.4 2.6-6 2.4-7.7-.4M50 63.3c2.4 2.6 6 2.4 7.7-.4"
        stroke="#6b20cd"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bigotes */}
      <g stroke="#8b52f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.8">
        <path d="M42 54.5 32 52.6M42 57 32.5 57.8M58 54.5 68 52.6M58 57 67.5 57.8" />
      </g>
    </svg>
  );
}

export function Logo({
  compacto = false,
  className = "",
}: {
  compacto?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LeonLLA className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      {!compacto && (
        <span className="flex flex-col leading-none">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-lla-300">
            La Libertad Avanza
          </span>
          <span className="mt-1 text-[1.05rem] font-black uppercase leading-none tracking-tight text-white sm:text-xl">
            Noticias
            <span className="ml-1.5 text-oro-400">Misiones</span>
          </span>
        </span>
      )}
    </span>
  );
}
