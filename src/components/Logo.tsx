import Image from "next/image";

/**
 * Isotipo oficial: el águila de La Libertad Avanza Misiones.
 * PNG con fondo transparente, pensado para fondos violeta u oscuros.
 */
export function AguilaLLA({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/aguila-lla.png"
      alt="Emblema de La Libertad Avanza"
      width={560}
      height={651}
      priority
      className={className}
    />
  );
}

/** Logo completo: águila + "LA LIBERTAD AVANZA MISIONES". */
export function LogoCompleto({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo-lla-misiones.png"
      alt="La Libertad Avanza Misiones"
      width={1312}
      height={651}
      priority
      className={className}
    />
  );
}

export function Logo({
  compacto = false,
  className = "",
}: {
  compacto?: boolean;
  className?: string;
}) {
  if (compacto) {
    return <AguilaLLA className={`h-10 w-auto ${className}`} />;
  }
  return <LogoCompleto className={`h-10 w-auto ${className}`} />;
}
