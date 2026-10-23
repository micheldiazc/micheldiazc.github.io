# Michel Díaz Cabrera · Portafolio

Sitio personal publicado en **[micheldiazc.github.io](https://micheldiazc.github.io)**, en español e inglés.

Backend & Integration Engineer: APIs, middleware y bases de datos para la banca, y herramientas a medida para negocios en Venezuela.

## Tecnología

- [Astro](https://astro.build) genera un sitio estático (HTML y CSS, con JavaScript mínimo).
- CSS propio con variables de diseño, sin frameworks.
- Rutas por idioma: español en `/` e inglés en `/en/`.
- Publicación automática en GitHub Pages con GitHub Actions.

## Estructura

```
src/
├─ i18n/          es.json y en.json: todos los textos del sitio
├─ data/          datos que no dependen del idioma (contacto, tecnologías)
├─ styles/        global.css: colores, tipografía y espaciado
├─ layouts/       estructura común de las páginas y SEO
├─ components/    una pieza por sección (Hero, Experience, Projects…)
└─ pages/         index (español), en/index (inglés) y 404
scripts/
└─ check-links.mjs  detecta enlaces y anclas rotos en el sitio compilado
```

## Comandos

Requiere Node.js 22.23.4 o superior.

| Comando                | Qué hace                                         |
| ---------------------- | ------------------------------------------------ |
| `npm install`          | Instala las dependencias                         |
| `npm run dev`          | Servidor de desarrollo en `localhost:4321`       |
| `npm run build`        | Genera el sitio final en `dist/`                 |
| `npm run preview`      | Sirve `dist/` para revisarlo antes de publicar   |
| `npm run check:links`  | Comprueba enlaces rotos (después de `build`)     |

## Cambiar un texto

1. Edita la frase en `src/i18n/es.json` y su traducción en `src/i18n/en.json`.
2. Revisa con `npm run dev`.
3. Haz commit y `git push`: el sitio se publica solo en un par de minutos.
