# Coffella — comunidad cafetera

*Detrás de cada taza hay alguien.* Sitio de Coffella: la comunidad que conecta baristas, cafeterías,
tostadores y fans del café de especialidad.

**En vivo:** https://michifuzon.github.io/Coffella/

## Estructura

```
web/                      App Next.js (export estático) + Tailwind + Motion
  src/app/                Rutas: inicio, cafeterias, agenda, personas, personas/[id],
                          comunidad, club, tienda, sumate, privacidad, 404, sitemap, robots
  src/components/brand/   Logo y MiradaIsotipo (la taza que mira)
  src/components/home/    Secciones; cada una funciona como bloque de la home o página completa (prop `page`)
  src/data/comunidad.ts   Contenido de ejemplo (cafeterías, eventos, personas, momentos, productos)
  src/lib/site.ts         URL pública y mapa de rutas
  public/brand/           Logos y elementos complementarios oficiales
  public/fotos/tienda/    Fotos de producto (CC0, con un mismo grade de color)
.github/workflows/        Deploy a GitHub Pages en cada push a main
```

## Desarrollo

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # genera web/out (estático)
```

## Reglas de marca

- Colores, tipografías (Sora + Figtree) y logos salen del Kit de Branding oficial; los tokens están en `web/src/app/globals.css`.
- El isotipo va **siempre completo, con su asa**, sin rotar y a 30 px como mínimo.
- Los ojos del isotipo van siempre en un tono claro.
- Fotografía: real, nunca generada por IA. La tienda usa fotos CC0 de referencia, acreditadas en la página.

## Estado

Mapa, agenda, perfiles, comunidad, club, tienda y registro son **prototipos con datos de ejemplo** y están
marcados así en el sitio. Todavía no hay backend: no se guardan datos ni se procesan pagos.
