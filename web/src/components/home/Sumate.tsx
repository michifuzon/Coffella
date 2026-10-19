"use client";

import { asset } from "@/lib/asset";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MiradaIsotipo } from "@/components/brand/MiradaIsotipo";
import { Logo } from "@/components/brand/Logo";
import { Prototipo } from "@/components/ui/Prototipo";

const LADOS = ["Tomo café", "Hago café", "Tengo un lugar", "Un poco de todo"];

export function Sumate({ page = false }: { page?: boolean }) {
  const Title = page ? "h1" : "h2";
  const [lado, setLado] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [estado, setEstado] = useState<"idle" | "enviando" | "listo">("idle");
  const [modo, setModo] = useState<"sumarme" | "ingresar">("sumarme");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginEstado, setLoginEstado] = useState<"idle" | "error" | "enviado">("idle");

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lado) return setError("Contanos de qué lado de la taza estás.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Ese mail no parece andar. ¿Lo revisás?");
    setError(null);
    setEstado("enviando");
    // Prototipo: no hay backend todavía. Se simula la espera para mostrar el estado de carga.
    setTimeout(() => setEstado("listo"), 900);
  };

  return (
    <section id="sumate" className={`grain relative overflow-hidden bg-naranja ${page ? "pb-24 pt-32 sm:pb-32 sm:pt-40" : "py-24 sm:py-32"}`} aria-labelledby="sumate-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div data-reveal className="relative">
          <Title id="sumate-title" className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-tight">
            Tu lugar en la mesa ya está.
          </Title>
          <p className="mt-6 max-w-lg text-lg sm:text-xl">
            Seas quien prepara el café, quien lo sirve o quien lo toma: acá hay gente esperando para
            recomendarte algo, enseñarte algo o simplemente compartir uno.
          </p>
          <MiradaIsotipo className="mt-10 w-[min(80%,420px)]" cupColor="var(--cafe)" eyeColor="var(--amarillo)" />
        </div>

        <div className="rounded-[2.5rem] bg-blanco p-6 sm:p-10">
          <div role="tablist" aria-label="Acceso" className="mb-6 grid grid-cols-2 rounded-full bg-crema p-1">
            {([["sumarme", "Quiero sumarme"], ["ingresar", "Ya tengo cuenta"]] as const).map(([v, l]) => (
              <button
                key={v}
                role="tab"
                aria-selected={modo === v}
                onClick={() => setModo(v)}
                className={`rounded-full py-2.5 font-display text-sm font-semibold transition-colors ${modo === v ? "bg-cafe text-blanco" : "hover:bg-blanco"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {modo === "ingresar" ? (
              <motion.form
                key="login"
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoginEstado(/^\S+@\S+\.\S+$/.test(loginEmail) ? "enviado" : "error");
                }}
              >
                {loginEstado === "enviado" ? (
                  <div role="status" className="py-6 text-center">
                    <MiradaIsotipo className="mx-auto w-28" />
                    <p className="mt-5 font-display text-2xl font-semibold">Revisá tu mail.</p>
                    <p className="mx-auto mt-2 max-w-xs text-cafe/75">
                      Cuando Coffella abra, acá te va a llegar un enlace para entrar a <strong>{loginEmail}</strong>. Sin
                      contraseñas que olvidar.
                    </p>
                    <button type="button" onClick={() => setLoginEstado("idle")} className="mt-5 text-sm underline underline-offset-4">
                      Usar otro mail
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-display text-2xl font-semibold">Volviste. Qué bueno.</p>
                      <Prototipo className="shrink-0" />
                    </div>
                    <p className="mt-2 text-sm text-cafe/70">Te mandamos un enlace para entrar. Sin contraseñas.</p>
                    <label className="mt-6 block">
                      <span className="text-sm text-cafe/70">Tu mail</span>
                      <input
                        type="email"
                        autoComplete="email"
                        value={loginEmail}
                        onChange={(e) => { setLoginEmail(e.target.value); setLoginEstado("idle"); }}
                        placeholder="vos@mail.com"
                        aria-invalid={loginEstado === "error"}
                        className="mt-2 w-full rounded-2xl border-2 border-cafe/15 bg-blanco px-4 py-3.5 focus:border-cafe focus:outline-none"
                      />
                    </label>
                    <p className="mt-3 min-h-5 text-sm text-[#a3361a]" role="alert">
                      {loginEstado === "error" ? "Ese mail no parece andar. ¿Lo revisás?" : ""}
                    </p>
                    <button type="submit" className="mt-2 w-full rounded-full bg-cafe py-4 font-display text-lg font-semibold text-blanco transition-transform hover:-translate-y-0.5">
                      Mandame el enlace
                    </button>
                  </>
                )}
              </motion.form>
            ) : estado === "listo" ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center" role="status">
                <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
                  <Logo bajada className="mx-auto h-20 w-auto sm:h-24" />
                </motion.div>
                <motion.img
                  src={asset("/brand/recursos/isotipo-guino.png")}
                  alt="La taza de Coffella guiñando un ojo"
                  width={640}
                  height={379}
                  className="mx-auto mt-6 w-28"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 14 }}
                />
                <p className="mt-6 font-display text-3xl font-semibold">¡Ya sos parte, fellow!</p>
                <p className="mx-auto mt-3 max-w-sm text-cafe/75">
                  Te avisamos a <strong>{email}</strong> apenas Coffella abra en tu ciudad. Mientras tanto: la
                  próxima vez que tomes un café, preguntá quién lo hizo.
                </p>
                <button onClick={() => { setEstado("idle"); setEmail(""); setLado(null); }} className="mt-6 text-sm underline underline-offset-4">
                  Anotar a alguien más
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={enviar} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-display text-2xl font-semibold">Sumate a Coffella</p>
                  <Prototipo className="shrink-0" />
                </div>
                <fieldset className="mt-6">
                  <legend className="text-sm text-cafe/70">¿De qué lado de la taza estás?</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {LADOS.map((l) => (
                      <label key={l} className={`cursor-pointer rounded-2xl border-2 px-4 py-3 text-center font-display text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-naranja ${lado === l ? "border-cafe bg-cafe text-blanco" : "border-cafe/15 hover:border-cafe/40"}`}>
                        <input type="radio" name="lado" value={l} className="sr-only" checked={lado === l} onChange={() => setLado(l)} />
                        {l}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="mt-5 block">
                  <span className="text-sm text-cafe/70">Tu mail</span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vos@mail.com"
                    aria-invalid={!!error && !/^\S+@\S+\.\S+$/.test(email)}
                    className="mt-2 w-full rounded-2xl border-2 border-cafe/15 bg-blanco px-4 py-3.5 focus:border-cafe focus:outline-none"
                  />
                </label>
                <p className="mt-3 min-h-5 text-sm text-[#a3361a]" role="alert">{error}</p>
                <button
                  type="submit"
                  disabled={estado === "enviando"}
                  className="mt-2 w-full rounded-full bg-cafe py-4 font-display text-lg font-semibold text-blanco transition-transform hover:-translate-y-0.5 disabled:opacity-85"
                >
                  {estado === "enviando" ? "Buscándote una silla…" : "Quiero mi lugar"}
                </button>
                <p className="mt-4 text-center text-xs text-cafe/70">
                  Prototipo: el formulario todavía no guarda datos. Nada de spam, prometido.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
