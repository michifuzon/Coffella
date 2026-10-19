import type { MetadataRoute } from "next";
import { PERSONAS } from "@/data/comunidad";
import { RUTAS, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [RUTAS.inicio, RUTAS.cafeterias, RUTAS.agenda, RUTAS.personas, RUTAS.comunidad, RUTAS.club, RUTAS.sumate, RUTAS.privacidad];
  return [...rutas, ...PERSONAS.map((p) => RUTAS.persona(p.id))].map((r) => ({ url: `${SITE_URL}${r}` }));
}
