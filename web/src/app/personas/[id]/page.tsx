import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CAFETERIAS, EVENTOS, MOMENTOS, NIVELES, PERSONAS } from "@/data/comunidad";
import { MiradaIsotipo } from "@/components/brand/MiradaIsotipo";
import { Prototipo } from "@/components/ui/Prototipo";
import { RUTAS } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PERSONAS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = PERSONAS.find((x) => x.id === id);
  if (!p) return {};
  return { title: `${p.nombre} · ${p.rol}`, description: `${p.cita} Conocé el recorrido de ${p.apodo} en Coffella.` };
}

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default async function PerfilPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = PERSONAS.find((x) => x.id === id);
  if (!p) notFound();

  const cafeteria = CAFETERIAS.find((c) => c.id === p.cafeteria);
  const eventos = EVENTOS.filter((e) => e.anfitrion === p.apodo);
  const mensajes = MOMENTOS.filter((m) => m.para === p.apodo || m.de === p.apodo);

  return (
    <article className="bg-blanco pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link href={RUTAS.personas} className="inline-flex items-center gap-2 text-sm font-semibold text-cafe/70 hover:text-cafe">
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <path d="M13 8H4M7.5 4.5 4 8l3.5 3.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Todas las personas
        </Link>

        <header className="mt-6 grid gap-8 rounded-[2.5rem] bg-naranja p-6 sm:p-10 md:grid-cols-[auto_1fr] md:items-center">
          <div className="grid size-32 place-items-center rounded-full bg-blanco/40 sm:size-40">
            <MiradaIsotipo className="w-24 sm:w-28" title="" />
          </div>
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full bg-cafe px-3 py-1 text-xs font-semibold text-blanco">
              <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                <path d="m4 8 2.5 2.5L12 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              Perfil verificado
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-6xl">{p.nombre}</h1>
            <p className="mt-2 text-lg">
              {p.rol} · {p.anios} años de oficio
            </p>
            <p className="mt-5 max-w-2xl font-display text-xl leading-snug sm:text-2xl">“{p.cita}”</p>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-6">
            <section className="rounded-[2rem] bg-crema p-6 sm:p-8" aria-labelledby="recorrido">
              <h2 id="recorrido" className="font-display text-2xl font-semibold">Su recorrido</h2>
              <ol className="mt-5 grid gap-4 border-l-2 border-cafe/20 pl-5">
                {p.recorrido.map((r) => (
                  <li key={r} className="relative">
                    <span aria-hidden className="absolute -left-[27px] top-1.5 size-3 rounded-full bg-naranja ring-4 ring-crema" />
                    {r}
                  </li>
                ))}
              </ol>
              <h3 className="mt-8 font-display text-sm uppercase tracking-widest text-cafe/60">Lo que mejor hace</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.especialidades.map((e) => (
                  <li key={e} className="rounded-full bg-blanco px-3.5 py-1.5 text-sm">{e}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] bg-cafe p-6 text-blanco sm:p-8" aria-labelledby="dicen">
              <h2 id="dicen" className="font-display text-2xl font-semibold">Lo que dice la comunidad</h2>
              {mensajes.length ? (
                <ul className="mt-5 grid gap-3">
                  {mensajes.map((m) => (
                    <li key={m.id} className="rounded-2xl bg-blanco/10 p-4">
                      <p className="font-display leading-snug">“{m.texto}”</p>
                      <p className="mt-2 text-xs text-blanco/60">
                        {m.de === p.apodo ? `${p.apodo} compartió` : `${m.de}, ${m.rolDe.toLowerCase()}`} · {m.hace}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-blanco/70">Todavía nadie le dejó un mensaje. ¿Te preparó un buen café? Podés ser la primera persona.</p>
              )}
              <p className="mt-5 text-xs text-blanco/50">Sin estrellas ni puntajes. {p.apodo} puede responder cada mensaje.</p>
            </section>
          </div>

          <aside className="grid h-fit gap-6">
            <section className="rounded-[2rem] bg-amarillo p-6 sm:p-8" aria-labelledby="pedir">
              <h2 id="pedir" className="font-display text-sm uppercase tracking-widest text-cafe/70">Qué te recomienda pedir</h2>
              <p className="mt-3 font-display text-xl leading-snug">{p.recomienda}</p>
            </section>

            <section className="rounded-[2rem] bg-crema p-6 sm:p-8" aria-labelledby="donde">
              <h2 id="donde" className="font-display text-xl font-semibold">Dónde encontrarle</h2>
              {cafeteria ? (
                <p className="mt-3">
                  Eligió mostrar que trabaja en{" "}
                  <Link href={RUTAS.cafeterias} className="font-semibold underline underline-offset-4">{cafeteria.nombre}</Link>{" "}
                  ({cafeteria.barrio}).
                </p>
              ) : (
                <p className="mt-3">Prefirió no mostrar dónde trabaja.</p>
              )}
              <p className="mt-3 flex items-center gap-2 text-sm text-cafe/70">
                <svg viewBox="0 0 16 16" className="size-4 shrink-0" aria-hidden><path d="M8 1 2 3.5v4C2 11 4.6 14 8 15c3.4-1 6-4 6-7.5v-4L8 1Z" fill="currentColor" /></svg>
                Nunca mostramos su ubicación en tiempo real.
              </p>
            </section>

            {eventos.length > 0 && (
              <section className="rounded-[2rem] bg-blanco p-6 ring-1 ring-cafe/10 sm:p-8" aria-labelledby="eventos">
                <h2 id="eventos" className="font-display text-xl font-semibold">Próximos encuentros</h2>
                <ul className="mt-4 grid gap-3">
                  {eventos.map((e) => (
                    <li key={e.id} className="rounded-2xl bg-crema p-4">
                      <p className="text-xs text-cafe/60">
                        {DIAS[e.dia]} {12 + e.dia} · {e.hora} · {NIVELES.find((n) => n.id === e.nivel)?.label}
                      </p>
                      <p className="mt-1 font-display font-semibold leading-snug">{e.titulo}</p>
                    </li>
                  ))}
                </ul>
                <Link href={RUTAS.agenda} className="mt-4 inline-block text-sm font-semibold underline underline-offset-4">Ver agenda</Link>
              </section>
            )}

            <section className="rounded-[2rem] bg-cafe p-6 text-blanco sm:p-8" aria-labelledby="cafecito">
              <h2 id="cafecito" className="font-display text-xl font-semibold">Si te hizo volver, que lo sepa.</h2>
              <p className="mt-2 text-sm text-blanco/70">Dejale un mensaje o un cafecito: el reconocimiento le llega completo.</p>
              <Link href={RUTAS.sumate} className="mt-5 inline-block rounded-full bg-naranja px-5 py-3 font-display text-sm font-semibold text-cafe">
                Dejarle un cafecito
              </Link>
              <Prototipo className="mt-5 text-blanco" />
            </section>
          </aside>
        </div>
      </div>
    </article>
  );
}
