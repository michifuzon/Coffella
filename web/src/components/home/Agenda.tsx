"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EVENTOS, NIVELES, type Nivel } from "@/data/comunidad";
import { Eyebrow, Prototipo } from "@/components/ui/Prototipo";
import { VerMas } from "@/components/ui/VerMas";
import Link from "next/link";
import { RUTAS } from "@/lib/site";

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const NIVEL_COLOR: Record<Nivel, string> = {
  curiosos: "bg-amarillo",
  fans: "bg-naranja",
  profes: "bg-cafe text-blanco",
};

export function Agenda({ page = false }: { page?: boolean }) {
  const Title = page ? "h1" : "h2";
  const [dia, setDia] = useState<number | null>(null);
  const [nivel, setNivel] = useState<Nivel | null>(null);
  const [reservado, setReservado] = useState<string | null>(null);

  const lista = useMemo(
    () => EVENTOS.filter((e) => (dia === null || e.dia === dia) && (nivel === null || e.nivel === nivel)),
    [dia, nivel],
  );

  return (
    <section id="agenda" className={`relative overflow-hidden bg-amarillo ${page ? "pb-24 pt-32 sm:pb-32 sm:pt-40" : "py-24 sm:py-32"}`} aria-labelledby="agenda-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow className="bg-blanco">Agenda de la comunidad</Eyebrow>
            <Title id="agenda-title" className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              Lo que se está tomando esta semana.
            </Title>
            <p className="mt-5 max-w-md text-lg text-cafe/80">
              Catas, talleres, meriendas y alguna coffee rave. Todo en un lugar, con un nivel claro para
              que sepas si es para vos. Spoiler: casi siempre es para vos.
            </p>

            <fieldset className="mt-8">
              <legend className="font-display text-sm text-cafe/70">¿Cuánto sabés de café? (No importa, en serio.)</legend>
              <div className="mt-3 grid gap-2">
                {NIVELES.map((n) => {
                  const on = nivel === n.id;
                  return (
                    <button
                      key={n.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setNivel(on ? null : n.id)}
                      className={`flex items-center justify-between gap-4 rounded-2xl border-2 px-5 py-3 text-left transition-colors ${
                        on ? "border-cafe bg-cafe text-blanco" : "border-cafe/15 bg-blanco/60 hover:border-cafe/40"
                      }`}
                    >
                      <span>
                        <span className="block font-display font-semibold">{n.label}</span>
                        <span className="block text-sm opacity-75">{n.desc}</span>
                      </span>
                      <span aria-hidden className={`size-4 shrink-0 rounded-full ${NIVEL_COLOR[n.id].split(" ")[0]} ring-2 ring-blanco`} />
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <Prototipo className="mt-6" />
          </div>

          <div className="min-w-0">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0 pb-2 [scrollbar-width:none]" role="group" aria-label="Elegí un día">
              <button
                onClick={() => setDia(null)}
                aria-pressed={dia === null}
                className={`shrink-0 rounded-2xl px-4 py-3 font-display text-sm transition-colors ${dia === null ? "bg-cafe text-blanco" : "bg-blanco/60"}`}
              >
                Toda la semana
              </button>
              {DIAS.map((d, i) => {
                const hay = EVENTOS.some((e) => e.dia === i);
                return (
                  <button
                    key={d}
                    onClick={() => setDia(i)}
                    aria-pressed={dia === i}
                    className={`relative w-14 shrink-0 rounded-2xl py-2 font-display transition-colors ${dia === i ? "bg-cafe text-blanco" : "bg-blanco/60 hover:bg-blanco"}`}
                  >
                    <span className="block text-xs opacity-70">{d}</span>
                    <span className="block text-lg font-semibold">{12 + i}</span>
                    {hay && <span aria-label="hay eventos" className="absolute right-2 top-2 size-1.5 rounded-full bg-naranja" />}
                  </button>
                );
              })}
            </div>

            <ul className="mt-4 grid gap-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {lista.map((e) => (
                  <motion.li
                    key={e.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="group grid gap-4 rounded-[1.75rem] bg-blanco p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6"
                  >
                    <div className="flex items-center gap-3 sm:block sm:w-16 sm:text-center">
                      <p className="font-display text-xs uppercase text-cafe/50">{DIAS[e.dia]} {12 + e.dia}</p>
                      <p className="font-display text-2xl font-semibold">{e.hora}</p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${NIVEL_COLOR[e.nivel]}`}>
                          {NIVELES.find((n) => n.id === e.nivel)?.label}
                        </span>
                        <span className="rounded-full bg-crema px-2.5 py-0.5 text-xs">{e.tipo}</span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold leading-snug">{e.titulo}</h3>
                      <p className="mt-1 text-sm text-cafe/70">{e.descripcion}</p>
                      <p className="mt-2 text-sm">
                        {e.lugar} · con <strong className="font-semibold">{e.anfitrion}</strong>
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                      <p className="font-display font-semibold">
                        {e.precio ? `$${e.precio.toLocaleString("es-AR")}` : "Libre"}
                        <span className="block text-xs font-normal text-cafe/60">{e.cupos} lugares</span>
                      </p>
                      <button
                        onClick={() => setReservado(reservado === e.id ? null : e.id)}
                        aria-expanded={reservado === e.id}
                        className="rounded-full bg-cafe px-4 py-2 font-display text-sm font-semibold text-blanco transition-transform hover:-translate-y-0.5"
                      >
                        Quiero ir
                      </button>
                    </div>
                    <AnimatePresence>
                      {reservado === e.id && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden rounded-2xl bg-crema px-4 py-3 text-sm sm:col-span-3"
                          role="status"
                        >
                          Muy pronto vas a poder reservar y pagar desde Coffella. Por ahora es un prototipo: cuando
                          abramos, {e.anfitrion} te guarda un lugar.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </AnimatePresence>
              {lista.length === 0 && (
                <li className="rounded-[1.75rem] border-2 border-dashed border-cafe/25 p-8 text-center">
                  <p className="font-display text-xl font-semibold">Ese día está tranqui.</p>
                  <p className="mt-1 text-cafe/70">Probá con otro día u otro nivel. O armá vos el próximo encuentro.</p>
                </li>
              )}
            </ul>
          </div>
        </div>

        {page ? (
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {[
              {
                t: "Publicá tu cata o taller",
                d: "Si sabés hacer algo, compartilo. Armá tu evento, definí cupos y precio, y vendé tus entradas de forma independiente.",
                cta: "Quiero publicar",
                bg: "bg-cafe text-blanco",
                btn: "bg-naranja text-cafe",
              },
              {
                t: "Ofrecé tu espacio",
                d: "¿Tu salón queda libre a la tarde? Abrilo a catas, talleres o coworking cafetero. Ingresos para tu cafetería, encuentros para la comunidad.",
                cta: "Ofrecer mi espacio",
                bg: "bg-blanco",
                btn: "bg-cafe text-blanco",
              },
            ].map((b) => (
              <div key={b.t} className={`flex flex-col gap-4 rounded-[2rem] p-7 sm:p-9 ${b.bg}`}>
                <p className="font-display text-2xl font-semibold sm:text-3xl">{b.t}</p>
                <p className="opacity-80">{b.d}</p>
                <Link href={RUTAS.sumate} className={`mt-auto w-fit rounded-full px-5 py-3 font-display text-sm font-semibold ${b.btn}`}>
                  {b.cta}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 flex justify-center">
            <VerMas href={RUTAS.agenda}>Ver toda la agenda</VerMas>
          </div>
        )}
      </div>
    </section>
  );
}
