import type { Metadata } from "next";
import { Agenda } from "@/components/home/Agenda";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Catas, talleres, meriendas y encuentros cafeteros en Córdoba, con un nivel claro para que sepas si es para vos.",
};

export default function AgendaPage() {
  return <Agenda page />;
}
