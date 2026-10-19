import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Frases } from "@/components/home/Frases";
import { Lados } from "@/components/home/Lados";
import { Mapa } from "@/components/home/Mapa";
import { Agenda } from "@/components/home/Agenda";
import { Personas } from "@/components/home/Personas";
import { Club } from "@/components/home/Club";
import { Sumate } from "@/components/home/Sumate";

export default function Home() {
  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cafe focus:px-4 focus:py-2 focus:text-blanco">
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido">
        <Hero />
        <Frases />
        <Lados />
        <Mapa />
        <Agenda />
        <Personas />
        <Club />
        <Frases tono="cafe" />
        <Sumate />
      </main>
      <Footer />
    </>
  );
}
