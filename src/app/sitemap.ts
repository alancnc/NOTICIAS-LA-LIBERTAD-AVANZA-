import type { MetadataRoute } from "next";
import { CATEGORIAS, SITIO } from "@/lib/config";
import { obtenerNoticias } from "@/lib/noticias";

export default function sitemap(): MetadataRoute.Sitemap {
  const noticias = obtenerNoticias();
  const ultimaActualizacion = noticias[0]
    ? new Date(noticias[0].fecha)
    : new Date();

  const fijas: MetadataRoute.Sitemap = [
    { url: SITIO.url, lastModified: ultimaActualizacion, changeFrequency: "hourly", priority: 1 },
    { url: `${SITIO.url}/noticias`, lastModified: ultimaActualizacion, changeFrequency: "hourly", priority: 0.9 },
    { url: `${SITIO.url}/el-espacio`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITIO.url}/contacto`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const categorias: MetadataRoute.Sitemap = CATEGORIAS.map((c) => ({
    url: `${SITIO.url}/categoria/${c.clave}`,
    lastModified: ultimaActualizacion,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const notas: MetadataRoute.Sitemap = noticias.map((n) => ({
    url: `${SITIO.url}/noticias/${n.slug}`,
    lastModified: new Date(n.fecha),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...fijas, ...categorias, ...notas];
}
