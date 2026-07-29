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
    <div className="font-cabin vidrio mt-8 flex flex-wrap items-center gap-2 rounded-xl p-4">
      <span className="font-manrope mr-1 text-sm font-bold text-white">Compartir:</span>
      {enlaces.map((e) => (
        <a
          key={e.nombre}
          href={e.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[10px] bg-acento px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8f52ff]"
        >
          {e.nombre}
        </a>
      ))}
      <button
        type="button"
        onClick={copiar}
        className="rounded-[10px] border border-white/15 px-3.5 py-2 text-sm font-medium text-fg transition-colors hover:border-acento hover:text-brand"
      >
        {copiado ? "¡Enlace copiado!" : "Copiar enlace"}
      </button>
    </div>
  );
}
