import Link from "next/link";
import { AguilaLLA } from "@/components/Logo";

export default function NoEncontrado() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <AguilaLLA className="h-28 w-auto opacity-70" />
      <p className="font-instrument mt-8 text-7xl text-brand">404</p>
      <h1 className="font-instrument mt-4 text-3xl text-white sm:text-4xl">
        No encontramos esta página
      </h1>
      <p className="font-inter mt-3 max-w-md text-base leading-relaxed text-fg-muted">
        Puede que la nota haya cambiado de dirección o que el enlace esté mal
        escrito. Probá desde el listado completo de noticias.
      </p>
      <div className="font-cabin mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-[10px] bg-acento px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#8f52ff]"
        >
          Ir al inicio
        </Link>
        <Link
          href="/noticias"
          className="rounded-[10px] border border-white/15 px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-acento hover:text-brand"
        >
          Ver todas las noticias
        </Link>
      </div>
    </div>
  );
}
