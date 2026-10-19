import type { Metadata } from "next";
import { Club } from "@/components/home/Club";

export const metadata: Metadata = {
  title: "Club",
  description: "Coffella Club: una tarjeta de sellos simple, sin rankings ni retos que vencen. Y métricas claras para cafeterías.",
};

export default function ClubPage() {
  return <Club page />;
}
