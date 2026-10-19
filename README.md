# Coffella — comunidad cafetera

Sitio web de Coffella. *Detrás de cada taza hay alguien.*

- `web/` — app en Next.js + Tailwind + Motion (export estático).
- Deploy automático a GitHub Pages en cada push a `main` (`.github/workflows/deploy.yml`).

## Desarrollo

```bash
cd web
npm install
npm run dev   # http://localhost:3000
```

## Marca

Colores, tipografías (Sora + Figtree) y logos salen del Kit de Branding oficial.
Los tokens de color están en `web/src/app/globals.css`.

Las secciones de mapa, agenda, perfiles, club y registro son **prototipos con datos de ejemplo**
(`web/src/data/comunidad.ts`); todavía no tienen backend.
