# Libertad Avanza Noticias — Misiones

Portal de noticias de La Libertad Avanza en la provincia de Misiones. Construido con
Next.js 16, TypeScript y Tailwind CSS v4. Las noticias se cargan desde archivos
Markdown en `content/noticias/`, sin base de datos ni panel de administración.

## Cómo se actualiza la web

Este proyecto está pensado para que **vos le pidas los cambios a Claude por chat**
(nueva noticia, corrección, cambio de diseño, etc.) y Claude:

1. Crea o edita el archivo correspondiente.
2. Hace commit y push a este repositorio.
3. Vercel detecta el push y publica la nueva versión automáticamente (~30-60 seg).

No hace falta tocar código ni entrar a ningún panel para publicar una noticia.

### Ejemplo de cómo pedir una noticia nueva

> "Subí esta noticia a la categoría Provincia: título '...', con este texto: ..."

Claude arma el archivo Markdown con el formato correcto y lo publica.

### Formato de una noticia (para referencia)

Cada noticia es un archivo `.md` en `content/noticias/`, por ejemplo
`content/noticias/mi-noticia.md`:

```markdown
---
titulo: "Título de la noticia"
bajada: "Copete o resumen de 1-2 líneas que aparece en las tarjetas."
fecha: "2026-07-29"
categoria: "provincia"
autor: "Prensa LLA Misiones"
destacada: true
urgente: false
etiquetas: ["etiqueta1", "etiqueta2"]
imagen: "https://url-de-la-imagen.jpg"
imagenAlt: "Descripción de la imagen"
---

Primer párrafo de la noticia...

## Subtítulo opcional

Más contenido, en Markdown normal (negritas, listas, citas, etc.).
```

Categorías disponibles: `politica`, `provincia`, `legislatura`, `economia`,
`municipios`, `comunicados`, `agenda` (se configuran en `src/lib/config.ts`).

---

## Despliegue en Vercel (recomendado)

Vercel es la opción recomendada para este proyecto: es gratis para este uso, se
integra de forma nativa con Next.js, permite dominio propio y publica
automáticamente con cada cambio.

### 1. Crear la cuenta y conectar el repositorio

1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión con tu cuenta de GitHub
   (la misma donde está `alancnc/NOTICIAS-LA-LIBERTAD-AVANZA-`).
2. Hacé clic en **Add New → Project**.
3. Elegí este repositorio de la lista e importalo.
4. Vercel detecta automáticamente que es un proyecto Next.js — no hace falta
   configurar nada manualmente. Dejá el **Root Directory** en `/`.
5. Hacé clic en **Deploy**.

En 1-2 minutos vas a tener una URL pública tipo
`libertad-avanza-noticias.vercel.app` con el sitio ya online.

### 2. Conectar tu dominio propio

1. Dentro del proyecto en Vercel, andá a **Settings → Domains**.
2. Escribí tu dominio (ej: `libertadavanzamisiones.com.ar`) y confirmá.
3. Vercel te va a mostrar los registros DNS que tenés que cargar en el proveedor
   donde compraste el dominio (NIC Argentina, GoDaddy, etc.). Generalmente es:
   - Un registro `A` apuntando a `76.76.21.21`, o
   - Un registro `CNAME` apuntando a `cname.vercel-dns.com`
4. Cargás esos registros en tu proveedor de dominio y esperás la propagación
   (de minutos a unas horas). Vercel emite el certificado HTTPS automáticamente.

### 3. Publicaciones automáticas

Una vez conectado el repositorio, **cada `git push` a la rama principal dispara un
despliegue nuevo automáticamente**. Es decir: cuando Claude commitea una noticia
nueva o un cambio de diseño, Vercel la publica sola, sin que vos hagas nada.

### Variable de entorno opcional

Para que las metaetiquetas (Open Graph, sitemap, RSS) usen tu dominio real en vez
del de Vercel, agregá en **Settings → Environment Variables**:

```
NEXT_PUBLIC_SITE_URL=https://tudominio.com.ar
```

y volvé a desplegar (Redeploy).

---

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # sirve el build de producción
```

## Estructura del proyecto

```
content/noticias/        Noticias en Markdown (acá se agregan/editan)
src/app/                 Páginas (App Router de Next.js)
src/components/          Componentes de UI
src/lib/config.ts        Datos institucionales, categorías, navegación
src/lib/noticias.ts      Lectura y procesamiento de las noticias
```

## Personalización

- **Logo**: `src/components/Logo.tsx` contiene un emblema propio como marcador de
  posición. Para usar el isotipo oficial del partido, reemplazar por una imagen en
  `public/` y usar `<Image>` de Next.js.
- **Colores**: la paleta violeta institucional está definida en
  `src/app/globals.css` (variables `--color-lla-*`).
- **Datos de contacto y redes**: `src/lib/config.ts`.
