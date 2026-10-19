// Configuración pública del sitio y mapa de rutas (con barra final: trailingSlash).
export const SITE_URL = `https://michifuzon.github.io${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}`;

export const RUTAS = {
  inicio: "/",
  cafeterias: "/cafeterias/",
  agenda: "/agenda/",
  personas: "/personas/",
  persona: (id: string) => `/personas/${id}/`,
  comunidad: "/comunidad/",
  club: "/club/",
  sumate: "/sumate/",
  privacidad: "/privacidad/",
} as const;
