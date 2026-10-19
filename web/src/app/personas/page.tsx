import type { Metadata } from "next";
import { Personas } from "@/components/home/Personas";

export const metadata: Metadata = {
  title: "Personas",
  description: "Baristas, tostadores y formadores de la comunidad Coffella: su recorrido, lo que saben y lo que te recomiendan pedir.",
};

export default function PersonasPage() {
  return <Personas page />;
}
