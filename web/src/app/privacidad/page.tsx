import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Cómo cuida Coffella tus datos: principios claros, en criollo.",
};

const PRINCIPIOS = [
  ["Tu ubicación es tuya", "Nunca mostramos en tiempo real dónde estás. Si sos barista, decidís si se ve dónde trabajás, y podés ocultarlo cuando quieras."],
  ["Vos elegís qué se ve", "Tu perfil muestra lo que vos cargás. Nada más. Podés editarlo o borrarlo en cualquier momento."],
  ["Referencias solo de gente verificada", "Solo dueños y colegas verificados pueden validar tu experiencia laboral."],
  ["Métricas sin nombres", "Las cafeterías ven números agregados del club (cuánta gente vuelve, cuántos canjes), nunca quién sos."],
  ["Nada de vender datos", "No vendemos tu información a nadie. Ni a marcas de café, ni a nadie."],
  ["Podés irte cuando quieras", "Si te vas, borramos tu cuenta y tus datos. Sin vueltas."],
];

export default function PrivacidadPage() {
  return (
    <section className="bg-blanco pb-24 pt-32 sm:pt-40" aria-labelledby="priv">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="inline-block rounded-full bg-amarillo px-3.5 py-1 font-display text-sm">Privacidad</p>
        <h1 id="priv" className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Cuidamos tus datos como cuidamos el café: con atención al detalle.
        </h1>
        <p className="mt-6 text-lg text-cafe/80">
          Estos son los principios con los que se está construyendo Coffella. La política legal completa se publica antes
          del lanzamiento.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {PRINCIPIOS.map(([t, d]) => (
            <li key={t} className="rounded-[1.75rem] bg-crema p-6">
              <h2 className="font-display text-xl font-semibold">{t}</h2>
              <p className="mt-2 text-cafe/80">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
