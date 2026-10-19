// Prefija rutas de /public con el basePath (necesario para <img> plano en GitHub Pages).
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
