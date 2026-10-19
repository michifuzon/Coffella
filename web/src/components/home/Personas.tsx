"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PERSONAS, type Persona } from "@/data/comunidad";
import { MiradaIsotipo } from "@/components/brand/MiradaIsotipo";
import { Prototipo } from "@/components/ui/Prototipo";

const TONO: Record<Persona["tono"], { card: string; chip: string; cup: string; eye: string }> = {
  naranja: { card: "bg-naranja text-cafe", chip: "bg-blanco/40", cup: "var(--cafe)", eye: "var(--naranja)" },
  amarillo: { card: "bg-amarillo text-cafe", chip: "bg-blanco/50", cup: "var(--cafe)", eye: "var(--amarillo)" },
  cafe: { card: "bg-blanco text-cafe", chip: "bg-crema", cup: "var(--naranja)", eye: "var(--blanco)" },
  crema: { card: "bg-crema text-cafe", chip: "bg-blanco", cup: "var(--cafe)", eye: "var(--crema)" },
};

export function Personas() {
  return (
    <section id="personas" className="relative overflow-hidden bg-cafe py-24 text-blanco sm:py-32" aria-labelledby="personas-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-naranja px-3.5 py-1 font-display text-sm text-cafe">Las personas detrás del café</span>
            <h2 id="personas-title" className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              Si te hizo volver, merece que recuerdes su nombre.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="max-w-sm text-blanco/70 md:text-right">
              Perfiles para contar un recorrido, no para hacerse famoso. Cada barista decide qué muestra y
              qué no.
            </p>
            <Prototipo className="text-blanco" />
          </div>
        </div>
      </div>

      <ul className="mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-6 [scrollbar-width:thin] after:block after:w-px after:shrink-0 sm:scroll-px-6 sm:px-6 xl:scroll-px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] xl:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        {PERSONAS.map((p) => (
          <li key={p.id} className="snap-start">
            <PerfilCard persona={p} />
          </li>
        ))}
        <li className="snap-start">
          <div className="flex h-full w-[min(84vw,360px)] flex-col justify-between rounded-[2rem] border-2 border-dashed border-blanco/25 p-7">
            <p className="font-display text-2xl font-semibold leading-tight">¿Trabajás detrás de una barra?</p>
            <p className="text-blanco/70">Tu oficio también merece un lugar. Armá tu perfil con tu recorrido, tus capacitaciones y tus referencias.</p>
            <a href="#sumate" className="w-fit rounded-full bg-naranja px-5 py-3 font-display text-sm font-semibold text-cafe">
              Crear mi perfil
            </a>
          </div>
        </li>
      </ul>

      <div className="mx-auto mt-10 grid max-w-7xl gap-3 px-4 sm:grid-cols-3 sm:px-6">
        {[
          ["Tu ubicación es tuya", "Nunca mostramos en tiempo real dónde estás. El perfil público dice el barrio, y solo si querés."],
          ["Referencias verificadas", "Dueños y colegas verificados pueden validar tu experiencia. Nadie más."],
          ["Valoración de ida y vuelta", "Si alguien comenta tu trabajo, podés responder. Y reportar si algo estuvo fuera de lugar."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl bg-blanco/5 p-5">
            <p className="font-display font-semibold text-amarillo">{t}</p>
            <p className="mt-1 text-sm text-blanco/70">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PerfilCard({ persona: p }: { persona: Persona }) {
  const [modo, setModo] = useState<"perfil" | "cafecito" | "gracias">("perfil");
  const [monto, setMonto] = useState(2000);
  const t = TONO[p.tono];

  return (
    <article className={`relative flex h-full w-[min(84vw,360px)] flex-col overflow-hidden rounded-[2rem] p-7 ${t.card}`}>
      <div className="flex items-center gap-4">
        <div className="relative grid size-16 shrink-0 place-items-center rounded-full bg-cafe/10">
          <MiradaIsotipo className="w-12" cupColor={t.cup} eyeColor={t.eye} title="" />
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold">{p.nombre}</h3>
          <p className="text-sm opacity-75">{p.rol}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold">
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
              <circle cx="8" cy="8" r="8" fill="currentColor" />
              <path d="m4.5 8 2.2 2.2L11.5 5.5" stroke="var(--blanco)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </svg>
            Perfil verificado
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {modo === "perfil" && (
          <motion.div key="perfil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-1 flex-col">
            <p className="mt-6 font-display text-lg leading-snug">“{p.cita}”</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              <li className={`rounded-full px-3 py-1 text-xs font-semibold ${t.chip}`}>{p.anios} años de oficio</li>
              {p.especialidades.map((e) => (
                <li key={e} className={`rounded-full px-3 py-1 text-xs ${t.chip}`}>{e}</li>
              ))}
            </ul>
            <div className="mt-5">
              <p className="text-xs uppercase tracking-widest opacity-60">Qué te recomienda pedir</p>
              <p className="mt-1 text-sm">{p.recomienda}</p>
            </div>
            <ol className="mt-5 grid gap-2 border-l-2 border-current/20 pl-4 text-sm">
              {p.recorrido.map((r) => (
                <li key={r} className="relative">
                  <span aria-hidden className="absolute -left-[21px] top-1.5 size-2 rounded-full bg-current" />
                  {r}
                </li>
              ))}
            </ol>
            <p className="mt-5 flex items-center gap-1.5 text-xs opacity-70">
              <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden><path d="M8 1 2 3.5v4C2 11 4.6 14 8 15c3.4-1 6-4 6-7.5v-4L8 1Z" fill="currentColor" /></svg>
              {p.barrio} · ubicación protegida
            </p>
            <div className="mt-auto flex gap-2 pt-6">
              <button onClick={() => setModo("cafecito")} className="flex-1 rounded-full bg-cafe px-4 py-2.5 font-display text-sm font-semibold text-blanco">
                Dejarle un cafecito
              </button>
              <button onClick={() => setModo("gracias")} className="rounded-full border-2 border-cafe px-4 py-2 font-display text-sm font-semibold">
                Contale
              </button>
            </div>
          </motion.div>
        )}

        {modo === "cafecito" && (
          <motion.div key="cafecito" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-1 flex-col">
            <p className="mt-6 font-display text-2xl font-semibold leading-tight">Hay trabajos que merecen algo más que una propina.</p>
            <p className="mt-2 text-sm opacity-80">El cafecito le llega completo a {p.nombre.split(" ")[0]}.</p>
            <div className="mt-6 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Monto">
              {[1000, 2000, 3500].map((m) => (
                <button key={m} role="radio" aria-checked={monto === m} onClick={() => setMonto(m)} className={`rounded-2xl py-3 font-display font-semibold ${monto === m ? "bg-cafe text-blanco" : t.chip}`}>
                  ${m.toLocaleString("es-AR")}
                </button>
              ))}
            </div>
            <p className="mt-4 rounded-2xl bg-cafe/10 p-3 text-xs">Prototipo: todavía no se procesan pagos.</p>
            <div className="mt-auto flex gap-2 pt-6">
              <button onClick={() => setModo("perfil")} className="rounded-full border-2 border-cafe px-4 py-2 font-display text-sm font-semibold">Volver</button>
            </div>
          </motion.div>
        )}

        {modo === "gracias" && (
          <motion.div key="gracias" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-1 flex-col">
            <p className="mt-6 font-display text-2xl font-semibold leading-tight">¿Estuvo bueno? Que lo sepa quien lo hizo.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Me recomendó algo nuevo", "Buena onda en la barra", "Aprendí algo", "Me hizo volver"].map((c) => (
                <span key={c} className={`rounded-full px-3 py-1.5 text-sm ${t.chip}`}>{c}</span>
              ))}
            </div>
            <p className="mt-4 text-sm opacity-80">Sin estrellas ni puntajes. Solo lo que te pasó.</p>
            <div className="mt-auto flex gap-2 pt-6">
              <button onClick={() => setModo("perfil")} className="rounded-full border-2 border-cafe px-4 py-2 font-display text-sm font-semibold">Volver</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
