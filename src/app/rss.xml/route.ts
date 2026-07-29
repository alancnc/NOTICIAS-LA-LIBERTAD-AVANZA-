import { SITIO } from "@/lib/config";
import { extracto, obtenerNoticias } from "@/lib/noticias";

export const revalidate = 300;

function escapar(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const noticias = obtenerNoticias();
  const actualizado = noticias[0]
    ? new Date(noticias[0].fecha).toUTCString()
    : new Date().toUTCString();

  const items = noticias
    .map((n) => {
      const url = `${SITIO.url}/noticias/${n.slug}`;
      return `    <item>
      <title>${escapar(n.titulo)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapar(extracto(n, 300))}</description>
      <category>${escapar(n.categoriaNombre)}</category>
      <pubDate>${new Date(n.fecha).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapar(SITIO.nombre)}</title>
    <link>${SITIO.url}</link>
    <description>${escapar(SITIO.descripcion)}</description>
    <language>${SITIO.idioma}</language>
    <lastBuildDate>${actualizado}</lastBuildDate>
    <atom:link href="${SITIO.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=300",
    },
  });
}
