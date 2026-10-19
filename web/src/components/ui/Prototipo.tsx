// Marca visible para funcionalidades que todavía no tienen infraestructura real.
export function Prototipo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-current px-2.5 py-0.5 font-display text-[11px] uppercase tracking-wider opacity-85 ${className}`}
      title="Esta sección es un prototipo interactivo: los datos son de ejemplo."
    >
      <span className="size-1.5 rounded-full bg-naranja" aria-hidden />
      Prototipo · datos de ejemplo
    </span>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-full bg-amarillo px-3.5 py-1 font-display text-sm text-cafe ${className}`}>
      {children}
    </span>
  );
}
