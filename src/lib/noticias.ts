import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { nombreCategoria, type ClaveCategoria } from "./config";

const DIRECTORIO = path.join(process.cwd(), "content", "noticias");

export interface Noticia {
  slug: string;
  titulo: string;
  bajada: string;
  fecha: string;
  fechaLegible: string;
  categoria: ClaveCategoria | string;
  categoriaNombre: string;
  autor: string;
  imagen?: string;
  imagenAlt?: string;
  credito?: string;
  destacada: boolean;
  urgente: boolean;
  etiquetas: string[];
  contenidoMd: string;
  minutosLectura: number;
}

export interface NoticiaCompleta extends Noticia {
  contenidoHtml: string;
}

const FORMATO_FECHA = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Argentina/Buenos_Aires",
});

function formatearFecha(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return FORMATO_FECHA.format(d);
}

function calcularMinutos(texto: string): number {
  const palabras = texto.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

function existeDirectorio(): boolean {
  try {
    return fs.statSync(DIRECTORIO).isDirectory();
  } catch {
    return false;
  }
}

function leerArchivo(nombreArchivo: string): Noticia | null {
  const slug = nombreArchivo.replace(/\.mdx?$/, "");
  const crudo = fs.readFileSync(path.join(DIRECTORIO, nombreArchivo), "utf8");
  const { data, content } = matter(crudo);

  if (data.borrador === true) return null;

  const titulo = String(data.titulo ?? data.title ?? slug);
  const fecha = String(data.fecha ?? data.date ?? new Date().toISOString());
  const categoria = String(data.categoria ?? "politica");

  return {
    slug,
    titulo,
    bajada: String(data.bajada ?? data.resumen ?? "").trim(),
    fecha,
    fechaLegible: formatearFecha(fecha),
    categoria,
    categoriaNombre: nombreCategoria(categoria),
    autor: String(data.autor ?? "Prensa LLA Misiones"),
    imagen: data.imagen ? String(data.imagen) : undefined,
    imagenAlt: data.imagenAlt ? String(data.imagenAlt) : undefined,
    credito: data.credito ? String(data.credito) : undefined,
    destacada: data.destacada === true,
    urgente: data.urgente === true,
    etiquetas: Array.isArray(data.etiquetas) ? data.etiquetas.map(String) : [],
    contenidoMd: content,
    minutosLectura: calcularMinutos(content),
  };
}

/** Todas las noticias publicadas, de la más nueva a la más vieja. */
export function obtenerNoticias(): Noticia[] {
  if (!existeDirectorio()) return [];

  return fs
    .readdirSync(DIRECTORIO)
    .filter((f) => /\.mdx?$/.test(f))
    .map(leerArchivo)
    .filter((n): n is Noticia => n !== null)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function obtenerSlugs(): string[] {
  return obtenerNoticias().map((n) => n.slug);
}

export async function obtenerNoticia(
  slug: string,
): Promise<NoticiaCompleta | null> {
  const noticia = obtenerNoticias().find((n) => n.slug === slug);
  if (!noticia) return null;

  const procesado = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(noticia.contenidoMd);

  return { ...noticia, contenidoHtml: procesado.toString() };
}

export function noticiasPorCategoria(categoria: string): Noticia[] {
  return obtenerNoticias().filter((n) => n.categoria === categoria);
}

export function noticiasDestacadas(cantidad = 4): Noticia[] {
  const todas = obtenerNoticias();
  const destacadas = todas.filter((n) => n.destacada);
  const resto = todas.filter((n) => !n.destacada);
  return [...destacadas, ...resto].slice(0, cantidad);
}

export function noticiasUrgentes(): Noticia[] {
  return obtenerNoticias().filter((n) => n.urgente);
}

/** Notas relacionadas: misma categoría primero, luego las más recientes. */
export function noticiasRelacionadas(actual: Noticia, cantidad = 3): Noticia[] {
  const otras = obtenerNoticias().filter((n) => n.slug !== actual.slug);
  const mismaCategoria = otras.filter((n) => n.categoria === actual.categoria);
  const resto = otras.filter((n) => n.categoria !== actual.categoria);
  return [...mismaCategoria, ...resto].slice(0, cantidad);
}

export function conteoPorCategoria(): Map<string, number> {
  const conteo = new Map<string, number>();
  for (const n of obtenerNoticias()) {
    conteo.set(n.categoria, (conteo.get(n.categoria) ?? 0) + 1);
  }
  return conteo;
}

export function todasLasEtiquetas(): string[] {
  const set = new Set<string>();
  for (const n of obtenerNoticias()) n.etiquetas.forEach((e) => set.add(e));
  return [...set].sort((a, b) => a.localeCompare(b, "es"));
}

/** Texto plano de la nota, para descripciones SEO cuando no hay bajada. */
export function extracto(noticia: Noticia, largo = 160): string {
  if (noticia.bajada) return noticia.bajada;
  const plano = noticia.contenidoMd
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plano.length > largo ? `${plano.slice(0, largo).trimEnd()}…` : plano;
}
