import type { Metadata } from "next";
import { Mapa } from "@/components/home/Mapa";

export const metadata: Metadata = {
  title: "Cafeterías",
  description: "Sabé cómo se vive una cafetería antes de llegar: ambiente, música, enchufes, Wi-Fi, carta y quién está en la barra.",
};

export default function CafeteriasPage() {
  return <Mapa page />;
}
