import Link from "next/link";
import { MiradaIsotipo } from "@/components/brand/MiradaIsotipo";
import { RUTAS } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="grid min-h-[90svh] place-items-center bg-crema px-4 pb-16 pt-32 text-center">
      <div>
        <MiradaIsotipo className="mx-auto w-48 sm:w-60" title="La taza de Coffella buscando" />
        <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Esta mesa está vacía.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-cafe/75">
          La página que buscás no existe o se fue a buscar otro café. Probemos de nuevo por acá.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={RUTAS.inicio} className="rounded-full bg-cafe px-6 py-3.5 font-display font-semibold text-blanco">
            Volver al inicio
          </Link>
          <Link href={RUTAS.cafeterias} className="rounded-full border-2 border-cafe px-6 py-3 font-display font-semibold hover:bg-amarillo">
            Explorar cafeterías
          </Link>
        </div>
      </div>
    </section>
  );
}
