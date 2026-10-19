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
      <Hero />
      <Frases />
      <Lados />
      <Mapa />
      <Agenda />
      <Personas />
      <Club />
      <Frases tono="cafe" />
      <Sumate />
    </>
  );
}
