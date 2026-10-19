import { FRASES } from "@/data/comunidad";

// Cinta de frases del banco de contenido oficial (Manual de Uso, "Banco de contenido").
export function Frases({ tono = "naranja" }: { tono?: "naranja" | "cafe" }) {
  const items = [...FRASES, ...FRASES];
  const bg = tono === "naranja" ? "bg-naranja text-cafe" : "bg-cafe text-blanco";
  return (
    <div className={`overflow-hidden border-y border-cafe/10 py-5 ${bg}`} aria-label="Frases de la comunidad">
      <ul className="marquee flex w-max gap-10 whitespace-nowrap font-display text-xl font-semibold sm:text-2xl">
        {items.map((f, i) => (
          <li key={i} className="flex items-center gap-10" aria-hidden={i >= FRASES.length}>
            {f}
            <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
              <circle cx="12" cy="12" r="6" fill="currentColor" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
