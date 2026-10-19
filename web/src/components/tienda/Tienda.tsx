"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIAS_PRODUCTO, CREDITOS_FOTOS, PRODUCTOS, type CategoriaProducto } from "@/data/comunidad";
import { Eyebrow, Prototipo } from "@/components/ui/Prototipo";
import { asset } from "@/lib/asset";

const precio = (n: number) => `$${n.toLocaleString("es-AR")}`;

export function Tienda() {
  const [cat, setCat] = useState<CategoriaProducto | null>(null);
  const [pro, setPro] = useState(false);
  const [carrito, setCarrito] = useState<Record<string, number>>({});
  const [entrega, setEntrega] = useState<"retiro" | "envio">("retiro");
  const [checkout, setCheckout] = useState(false);

  const lista = useMemo(
    () => PRODUCTOS.filter((p) => (!cat || p.categoria === cat) && (!pro || p.profesional)),
    [cat, pro],
  );
  const items = Object.entries(carrito).filter(([, n]) => n > 0);
  const cantidad = items.reduce((a, [, n]) => a + n, 0);
  const total = items.reduce((a, [id, n]) => a + (PRODUCTOS.find((p) => p.id === id)?.precio ?? 0) * n, 0);

  const sumar = (id: string, d: number) => {
    setCheckout(false);
    setCarrito((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));
  };

  return (
    <section className="bg-blanco pb-24 pt-32 sm:pb-32 sm:pt-40" aria-labelledby="tienda-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div data-reveal className="max-w-3xl">
          <div>
            <Eyebrow>Tienda</Eyebrow>
            <h1 id="tienda-title" className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              Comprá dentro de la comunidad.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-cafe/80">
              Café de tostadores aliados, herramientas que recomiendan los profes y cursos de quienes saben. Detrás de cada
              producto hay alguien, y te contamos quién.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar productos">
          <button
            onClick={() => setCat(null)}
            aria-pressed={cat === null}
            className={`rounded-full px-4 py-2 font-display text-sm transition-colors ${cat === null ? "bg-cafe text-blanco" : "bg-crema hover:bg-amarillo"}`}
          >
            Todo
          </button>
          {CATEGORIAS_PRODUCTO.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(cat === c.id ? null : c.id)}
              aria-pressed={cat === c.id}
              className={`rounded-full px-4 py-2 font-display text-sm transition-colors ${cat === c.id ? "bg-cafe text-blanco" : "bg-crema hover:bg-amarillo"}`}
            >
              {c.label}
            </button>
          ))}
          <label className="ml-0 flex cursor-pointer items-center gap-2 rounded-full border-2 border-cafe/15 px-4 py-1.5 text-sm font-medium has-[:checked]:border-naranja has-[:checked]:bg-naranja sm:ml-auto">
            <input type="checkbox" checked={pro} onChange={(e) => setPro(e.target.checked)} className="size-4 accent-[var(--cafe)]" />
            Solo para profesionales
          </label>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {lista.map((p) => (
                <motion.li key={p.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-crema">
                    <div className="relative aspect-[4/3] overflow-hidden bg-crema">
                      <img
                        src={asset(`/fotos/tienda/${p.imagen}.jpg`)}
                        alt={p.nombre}
                        loading="lazy"
                        width={960}
                        height={720}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {p.tueste && (
                        <span className="absolute left-4 top-4 rounded-full bg-blanco px-3 py-1 text-xs font-semibold">Tueste reciente · {p.tueste}</span>
                      )}
                      {p.profesional && (
                        <span className="absolute right-4 top-4 rounded-full bg-cafe px-3 py-1 text-xs font-semibold text-blanco">Para profes</span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs uppercase tracking-widest text-cafe/70">
                        {p.relacion} <strong className="font-semibold text-cafe">{p.quien}</strong>
                      </p>
                      <h2 className="mt-2 font-display text-lg font-semibold leading-snug">{p.nombre}</h2>
                      <p className="mt-1 text-sm text-cafe/75">{p.detalle}</p>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                        <p className="font-display text-xl font-semibold">{precio(p.precio)}</p>
                        {carrito[p.id] ? (
                          <div className="flex items-center gap-1 rounded-full bg-blanco p-1" aria-label={`${p.nombre}: ${carrito[p.id]} en el pedido`}>
                            <button onClick={() => sumar(p.id, -1)} className="grid size-8 place-items-center rounded-full hover:bg-crema" aria-label="Quitar uno">−</button>
                            <span className="w-6 text-center font-display font-semibold">{carrito[p.id]}</span>
                            <button onClick={() => sumar(p.id, 1)} className="grid size-8 place-items-center rounded-full bg-cafe text-blanco" aria-label="Sumar uno">+</button>
                          </div>
                        ) : (
                          <button onClick={() => sumar(p.id, 1)} className="rounded-full bg-cafe px-4 py-2 font-display text-sm font-semibold text-blanco transition-transform hover:-translate-y-0.5">
                            Agregar
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                </motion.li>
              ))}
            </AnimatePresence>
            {lista.length === 0 && (
              <li className="rounded-[2rem] border-2 border-dashed border-cafe/20 p-8 text-center sm:col-span-2 xl:col-span-3">
                <p className="font-display text-xl font-semibold">No hay nada así por ahora.</p>
                <p className="mt-1 text-cafe/70">Probá con otra categoría o sacá el filtro de profesionales.</p>
              </li>
            )}
          </ul>

          <aside className="h-fit rounded-[2rem] bg-cafe p-6 text-blanco lg:sticky lg:top-28" aria-labelledby="pedido">
            <div className="flex items-center justify-between gap-3">
              <h2 id="pedido" className="font-display text-xl font-semibold">Tu pedido</h2>
              <span className="rounded-full bg-naranja px-2.5 py-0.5 font-display text-sm font-semibold text-cafe" aria-live="polite">
                {cantidad}
              </span>
            </div>
            {items.length === 0 ? (
              <p className="mt-4 text-sm text-blanco/70">Todavía está vacío. Empezá por un café de tueste reciente, no falla.</p>
            ) : (
              <ul className="mt-4 grid gap-2 text-sm">
                {items.map(([id, n]) => {
                  const p = PRODUCTOS.find((x) => x.id === id)!;
                  return (
                    <li key={id} className="flex justify-between gap-3 border-b border-blanco/10 pb-2">
                      <span>{n} × {p.nombre}</span>
                      <span className="shrink-0 font-display">{precio(p.precio * n)}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            <fieldset className="mt-6">
              <legend className="text-sm text-blanco/70">¿Cómo lo querés?</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([["retiro", "Retiro en local"], ["envio", "Envío a domicilio"]] as const).map(([v, l]) => (
                  <label key={v} className={`cursor-pointer rounded-2xl border-2 px-3 py-2.5 text-center text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-naranja ${entrega === v ? "border-naranja bg-naranja font-semibold text-cafe" : "border-blanco/20"}`}>
                    <input type="radio" name="entrega" value={v} checked={entrega === v} onChange={() => setEntrega(v)} className="sr-only" />
                    {l}
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-blanco/60">
                {entrega === "retiro" ? "Retirás en la cafetería o tostadora más cercana, sin costo." : "Envío en Córdoba capital en 24 a 48 h."}
              </p>
            </fieldset>

            <div className="mt-6 flex items-baseline justify-between">
              <span className="text-sm text-blanco/70">Total</span>
              <span className="font-display text-2xl font-semibold">{precio(total)}</span>
            </div>
            <button
              disabled={!items.length}
              onClick={() => setCheckout(true)}
              className="mt-4 w-full rounded-full bg-naranja py-3.5 font-display font-semibold text-cafe transition-opacity disabled:opacity-40"
            >
              {entrega === "retiro" ? "Elegir punto de retiro" : "Continuar"}
            </button>
            {checkout && (
              <p role="status" className="mt-4 rounded-2xl bg-blanco/10 p-3 text-sm">
                Todavía no vendemos online: esta tienda es un prototipo. Cuando abra, el pago va directo a quien tostó o hizo
                lo que comprás.
              </p>
            )}
            <Prototipo className="mt-5 text-blanco" />
          </aside>
        </div>

        <p className="mt-12 text-xs text-cafe/70">
          Fotos de producto de referencia, de dominio público (CC0):{" "}
          {CREDITOS_FOTOS.map((c, i) => (
            <span key={c.id}>
              <a href={c.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-cafe">
                {c.autor}
              </a>
              {i < CREDITOS_FOTOS.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
