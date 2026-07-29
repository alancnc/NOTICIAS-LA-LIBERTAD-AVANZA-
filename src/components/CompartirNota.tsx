"use client";

import { useState } from "react";

export function CompartirNota({
  titulo,
  url,
}: {
  titulo: string;
  url: string;
}) {
  const [copiado, setCopiado] = useState(false);

  const enlaces = [
    {
      nombre: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${titulo} ${url}`)}`,
    },
    {
      nombre: "X",
      href: `https://x.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${encodeURIComponent(url)}`,
    },
    {
      nombre: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
  ];

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 rounded-xl border border-borde bg-bg-soft p-4">
      <span className="mr-1 text-sm font-bold text-fg">Compartir:</span>
      {enlaces.map((e) => (
        <a
          key={e.nombre}
          href={e.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-lla-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-lla-700"
        >
          {e.nombre}
        </a>
      ))}
      <button
        type="button"
        onClick={copiar}
        className="rounded-lg border border-borde-fuerte px-3.5 py-2 text-sm font-semibold text-fg transition-colors hover:border-lla-400 hover:text-brand"
      >
        {copiado ? "¡Enlace copiado!" : "Copiar enlace"}
      </button>
    </div>
  );
}
