import type { Metadata } from "next";
import { Muro } from "@/components/comunidad/Muro";

export const metadata: Metadata = {
  title: "Comunidad",
  description: "Recomendaciones, agradecimientos, oportunidades y aprendizajes entre baristas, cafeterías y fans del café.",
};

export default function ComunidadPage() {
  return <Muro />;
}
