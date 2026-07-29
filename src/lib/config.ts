/**
 * Configuración central del sitio.
 * Editar acá los datos institucionales, redes y contacto.
 */

export const SITIO = {
  nombre: "Libertad Avanza Noticias",
  nombreCorto: "LLA Noticias",
  provincia: "Misiones",
  titulo: "Libertad Avanza Noticias | Misiones",
  descripcion:
    "Portal oficial de noticias de La Libertad Avanza en la provincia de Misiones. Actualidad, comunicados, actividad legislativa y territorial del espacio.",
  // Cambiar por el dominio propio una vez configurado en Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://libertadavanzamisiones.vercel.app",
  idioma: "es-AR",
  locale: "es_AR",
  email: "prensa@libertadavanzamisiones.com.ar",
  telefono: "+54 9 376 432-5224",
  redes: {
    instagram: "https://www.instagram.com/lalibertadavanzamisiones/",
    facebook: "https://www.facebook.com/share/19ES7BM8Eo/?mibextid=wwXIfr",
    whatsapp: "https://wa.me/5493764325224",
    grupoWhatsapp:
      "https://chat.whatsapp.com/JAD2ROWTt8D0yCpEw8vXRX?s=cl&p=i&ilr=0&amv=0",
  },
} as const;

export type ClaveCategoria =
  | "politica"
  | "provincia"
  | "legislatura"
  | "economia"
  | "municipios"
  | "comunicados"
  | "agenda";

export interface Categoria {
  clave: ClaveCategoria;
  nombre: string;
  descripcion: string;
}

export const CATEGORIAS: Categoria[] = [
  {
    clave: "politica",
    nombre: "Política",
    descripcion:
      "Análisis, definiciones y posicionamientos políticos de La Libertad Avanza Misiones.",
  },
  {
    clave: "provincia",
    nombre: "Provincia",
    descripcion:
      "La actualidad de Misiones: gestión, obras, servicios y los temas que afectan a los misioneros.",
  },
  {
    clave: "legislatura",
    nombre: "Legislatura",
    descripcion:
      "Proyectos, sesiones y trabajo parlamentario de nuestros representantes.",
  },
  {
    clave: "economia",
    nombre: "Economía",
    descripcion:
      "Impuestos, producción, empleo y el impacto de las reformas en la economía provincial.",
  },
  {
    clave: "municipios",
    nombre: "Municipios",
    descripcion:
      "Lo que pasa en Posadas, Oberá, Eldorado, Iguazú y cada rincón de la provincia.",
  },
  {
    clave: "comunicados",
    nombre: "Comunicados",
    descripcion:
      "Declaraciones y comunicados oficiales del espacio en Misiones.",
  },
  {
    clave: "agenda",
    nombre: "Agenda",
    descripcion:
      "Actividades, recorridas y encuentros militantes en todo el territorio.",
  },
];

export const MAPA_CATEGORIAS = new Map<string, Categoria>(
  CATEGORIAS.map((c) => [c.clave, c]),
);

export function nombreCategoria(clave: string): string {
  return MAPA_CATEGORIAS.get(clave)?.nombre ?? "General";
}

export const NAVEGACION = [
  { etiqueta: "Inicio", href: "/" },
  { etiqueta: "Noticias", href: "/noticias" },
  ...CATEGORIAS.slice(0, 4).map((c) => ({
    etiqueta: c.nombre,
    href: `/categoria/${c.clave}`,
  })),
  { etiqueta: "El espacio", href: "/el-espacio" },
  { etiqueta: "Contacto", href: "/contacto" },
];

export const NOTICIAS_POR_PAGINA = 9;
