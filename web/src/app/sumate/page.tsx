import type { Metadata } from "next";
import { Sumate } from "@/components/home/Sumate";

export const metadata: Metadata = {
  title: "Sumate",
  description: "Tu lugar en la mesa ya está. Sumate a Coffella como fan del café, barista, tostador o cafetería.",
};

const PREGUNTAS = [
  ["¿Tengo que saber de café para sumarme?", "Para nada. Si te gusta tomar café y tenés curiosidad, ya sos parte. Nadie te va a tomar examen de molienda."],
  ["¿Cuánto cuesta?", "Sumarte es gratis. Algunos talleres y catas tienen precio, y lo vas a ver siempre antes de reservar."],
  ["Soy barista, ¿qué gano con un perfil?", "Un lugar para contar tu recorrido más allá de la barra donde trabajás hoy: capacitaciones, especialidades, referencias y oportunidades entre colegas."],
  ["Tengo una cafetería, ¿cómo me sumo?", "Contanos de tu lugar: ambiente, carta y equipo. Podés organizar encuentros, abrir tu salón y sumarte al club de sellos."],
  ["¿Qué pasa con mis datos?", "Son tuyos. Nunca mostramos tu ubicación en tiempo real y vos decidís qué se ve en tu perfil. Lo contamos en detalle en Privacidad."],
  ["¿Cuándo llega a mi ciudad?", "Arrancamos por Córdoba. Si te anotás, te avisamos apenas abramos donde estás."],
];

export default function SumatePage() {
  return (
    <>
      <Sumate page />
      <section className="bg-blanco py-20 sm:py-28" aria-labelledby="faq">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 id="faq" className="font-display text-3xl font-semibold sm:text-5xl">Preguntas de mesa</h2>
          <div className="mt-10 grid gap-3">
            {PREGUNTAS.map(([q, a]) => (
              <details key={q} className="group rounded-[1.5rem] bg-crema p-5 open:bg-amarillo sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {q}
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-cafe text-blanco transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-cafe/80">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
