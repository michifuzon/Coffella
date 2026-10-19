import type { Metadata } from "next";
import { Tienda } from "@/components/tienda/Tienda";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Café de tostadores aliados, herramientas recomendadas por baristas y cursos de la comunidad. Detrás de cada producto hay alguien.",
};

export default function TiendaPage() {
  return <Tienda />;
}
