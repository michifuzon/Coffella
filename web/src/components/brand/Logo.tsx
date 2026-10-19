/* eslint-disable @next/next/no-img-element */
import { asset } from "@/lib/asset";

// Wordmark oficial (Coffella_Logo-03 sin bajada / -01 con bajada), recortado al área del logo.
// Mínimo digital: 40px (sin bajada) y 60px (con bajada).
export function Logo({
  className,
  tone = "cafe",
  bajada = false,
}: {
  className?: string;
  tone?: "cafe" | "blanco";
  bajada?: boolean;
}) {
  return (
    <img
      src={asset(bajada ? "/brand/wordmark-bajada.svg" : "/brand/wordmark.svg")}
      alt="Coffella"
      className={className}
      style={tone === "blanco" ? { filter: "brightness(0) invert(0.96)" } : undefined}
      draggable={false}
    />
  );
}
