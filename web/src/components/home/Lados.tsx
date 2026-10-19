"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MiradaIsotipo } from "@/components/brand/MiradaIsotipo";
import { Eyebrow } from "@/components/ui/Prototipo";

const LADOS = [
  {
    id: "fan",
    tab: "Tomo café",
    cta: "Sumarme como fan",
    rol: "Fans del café",
    titulo: "Hay mucho detrás de ese flat white.",
    texto:
      "No hace falta saber de molienda para estar acá. Descubrí cafeterías con información real, conocé a quién te preparó el café y animate a probar algo nuevo.",
    puedes: ["Encontrar el lugar justo para hoy", "Saber quién estuvo detrás de tu café", "Ir a tu primera cata sin sentirte afuera", "Juntar sellos sin presión"],
    momento: { quien: "Lu", que: "le dejó un mensaje a Sofi", cita: "“Me recomendaste el Huila y ahora no tomo otra cosa.”" },
    color: "bg-amarillo",
  },
  {
    id: "barista",
    tab: "Hago café",
    cta: "Crear mi perfil profesional",
    rol: "Baristas y tostadores",
    titulo: "Tu oficio, con nombre y apellido.",
    texto:
      "Mostrá tu recorrido más allá de la barra donde trabajás hoy. Lo que aprendiste, lo que recomendás, lo que enseñás. Y encontrá nuevas oportunidades entre colegas.",
    puedes: ["Armar un perfil que cuente tu trayectoria", "Recibir reconocimiento y cafecitos", "Ofrecer talleres y catas", "Encontrar trabajo entre gente que valora tu oficio"],
    momento: { quien: "Juli", que: "publicó un taller nuevo", cita: "“Latte art desde cero. 4 lugares, traé ganas.”" },
    color: "bg-naranja",
  },
  {
    id: "cafeteria",
    tab: "Tengo un lugar",
    cta: "Sumar mi cafetería",
    rol: "Cafeterías y emprendimientos",
    titulo: "Que se sepa cómo se vive tu lugar.",
    texto:
      "Contá tu espacio como es: el ambiente, la carta, tu equipo. Organizá encuentros, sumá a tu clientela al club y formá parte de un ecosistema que crece en conjunto.",
    puedes: ["Mostrar tu carta y tu ambiente actualizados", "Presentar a tu equipo", "Abrir tu salón a catas y talleres", "Ver cómo vuelve tu gente"],
    momento: { quien: "Café Ámbar", que: "actualizó su carta", cita: "“Nuevo filtrado de la semana: Etiopía lavado.”" },
    color: "bg-cafe text-blanco",
  },
] as const;

export function Lados() {
  const [activo, setActivo] = useState(0);
  const lado = LADOS[activo];

  return (
    <section id="lado" className="relative bg-crema py-24 sm:py-32" aria-labelledby="lado-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Una comunidad, muchas formas de vivir el café</Eyebrow>
            <h2 id="lado-title" className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              ¿De qué lado de la taza estás?
            </h2>
          </div>
          <p className="max-w-sm text-cafe/70">
            Algunos hacen del café un oficio. Otros, un gusto que quieren seguir explorando. En Coffella
            los caminos se cruzan. <strong className="font-semibold text-cafe">Y podés estar de los tres lados.</strong>
          </p>
        </div>

        <div role="tablist" aria-label="Elegí tu lado" className="mt-12 flex flex-wrap gap-3">
          {LADOS.map((l, i) => (
            <button
              key={l.id}
              role="tab"
              id={`tab-${l.id}`}
              aria-selected={activo === i}
              aria-controls={`panel-${l.id}`}
              onClick={() => setActivo(i)}
              className={`relative rounded-full px-6 py-3 font-display text-lg transition-colors ${
                activo === i ? "text-blanco" : "bg-blanco/70 text-cafe hover:bg-blanco"
              }`}
            >
              {activo === i && (
                <motion.span layoutId="lado-pill" className="absolute inset-0 -z-0 rounded-full bg-cafe" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              <span className="relative">{l.tab}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={lado.id}
            id={`panel-${lado.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${lado.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr] [&>*]:min-w-0"
          >
            <div className={`relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 ${lado.color}`}>
              <p className="font-display text-sm uppercase tracking-widest opacity-70">{lado.rol}</p>
              <h3 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-5xl">{lado.titulo}</h3>
              <p className="mt-5 max-w-lg text-lg opacity-85">{lado.texto}</p>
              <ul className="relative z-10 mt-8 grid gap-2 pb-24 sm:grid-cols-2 sm:pb-28">
                {lado.puedes.map((p) => (
                  <li key={p} className="flex items-start gap-3 rounded-2xl bg-blanco/25 px-4 py-3 font-medium backdrop-blur-sm">
                    <span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-current" />
                    {p}
                  </li>
                ))}
              </ul>
              <MiradaIsotipo
                className="pointer-events-none absolute -bottom-6 -right-6 w-40 sm:w-52"
                cupColor={lado.id === "cafeteria" ? "var(--naranja)" : "var(--cafe)"}
                eyeColor={lado.id === "cafeteria" ? "var(--cafe)" : "var(--blanco)"}
                title=""
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-[2rem] bg-blanco p-6 sm:p-8">
                <p className="font-display text-xs uppercase tracking-widest text-cafe/50">Pasando ahora en Coffella</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-naranja font-display font-semibold">
                    {lado.momento.quien[0]}
                  </span>
                  <p className="text-sm">
                    <strong className="font-semibold">{lado.momento.quien}</strong> {lado.momento.que}
                  </p>
                </div>
                <p className="mt-4 font-display text-xl leading-snug">{lado.momento.cita}</p>
              </div>
              <div className="flex flex-1 flex-col justify-between rounded-[2rem] bg-degradado p-6 sm:p-8">
                <p className="font-display text-2xl font-semibold leading-tight">
                  Ser compañeros del café es compartir un mismo interés, aunque cada uno lo viva distinto.
                </p>
                <a href="#sumate" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-cafe px-5 py-3 font-display text-sm font-semibold text-blanco">
                  {lado.cta}
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
