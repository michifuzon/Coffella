"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { MiradaIsotipo } from "@/components/brand/MiradaIsotipo";
import { RUTAS } from "@/lib/site";

const LINKS = [
  { href: RUTAS.cafeterias, label: "Cafeterías" },
  { href: RUTAS.agenda, label: "Agenda" },
  { href: RUTAS.personas, label: "Personas" },
  { href: RUTAS.comunidad, label: "Comunidad" },
  { href: RUTAS.club, label: "Club" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activo = (href: string) => pathname === href || pathname === href.replace(/\/$/, "") || pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-cafe/10 bg-blanco/80 py-2 pl-5 pr-2 backdrop-blur-md"
      >
        <Link href="/" aria-label="Coffella, inicio" className="shrink-0">
          <Logo className="h-6 w-auto sm:h-7" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={activo(l.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 font-display text-sm transition-colors hover:bg-amarillo hover:text-cafe ${
                  activo(l.href) ? "bg-amarillo text-cafe" : "text-cafe/80"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={RUTAS.sumate}
            className="group hidden items-center gap-2 rounded-full bg-cafe py-1 pl-4 pr-1 font-display text-sm font-semibold text-blanco transition-transform hover:-translate-y-0.5 sm:flex"
          >
            Sumate
            <span className="grid size-10 place-items-center rounded-full bg-naranja transition-transform group-hover:scale-110">
              <MiradaIsotipo className="w-[30px]" cupColor="var(--cafe)" eyeColor="var(--blanco)" title="" />
            </span>
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full bg-amarillo md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="flex w-[18px] flex-col gap-[6px]">
              <span className={`block h-[2px] w-full rounded-full bg-cafe transition-transform duration-200 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-full rounded-full bg-cafe transition-transform duration-200 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl bg-cafe p-3 md:hidden"
          >
            <ul className="grid gap-1">
              {[...LINKS, { href: RUTAS.sumate, label: "Sumate" }].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={activo(l.href) ? "page" : undefined}
                    className={`block rounded-2xl px-4 py-3 font-display text-lg hover:bg-blanco/10 ${activo(l.href) ? "text-naranja" : "text-blanco"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
