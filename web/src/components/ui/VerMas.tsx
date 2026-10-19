import Link from "next/link";

// Enlace de la home a la página completa de cada sección.
export function VerMas({ href, children, tono = "cafe" }: { href: string; children: React.ReactNode; tono?: "cafe" | "claro" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full py-2 pl-5 pr-2 font-display font-semibold transition-colors ${
        tono === "cafe" ? "bg-cafe text-blanco hover:bg-cafe/90" : "bg-blanco text-cafe hover:bg-amarillo"
      }`}
    >
      {children}
      <span
        aria-hidden
        className={`grid size-9 place-items-center rounded-full transition-transform group-hover:translate-x-1 ${tono === "cafe" ? "bg-naranja text-cafe" : "bg-cafe text-blanco"}`}
      >
        <svg viewBox="0 0 16 16" className="size-4">
          <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
