import Link from "next/link";
import { LeonLLA } from "@/components/Logo";

export default function NoEncontrado() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <LeonLLA className="h-24 w-24 opacity-70" />
      <p className="mt-8 text-6xl font-black tracking-tight text-brand">404</p>
      <h1 className="mt-4 text-2xl font-black tracking-tight text-fg sm:text-3xl">
        No encontramos esta página
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-fg-muted">
        Puede que la nota haya cambiado de dirección o que el enlace esté mal
        escrito. Probá desde el listado completo de noticias.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-lla-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-lla-700"
        >
          Ir al inicio
        </Link>
        <Link
          href="/noticias"
          className="rounded-lg border border-borde px-6 py-3 text-sm font-bold text-fg transition-colors hover:border-lla-400 hover:text-brand"
        >
          Ver todas las noticias
        </Link>
      </div>
    </div>
  );
}
