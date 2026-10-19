import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

// Tipografías oficiales del kit de marca: Sora (identidad) + Figtree (lectura)
const sora = localFont({
  variable: "--font-sora",
  display: "swap",
  src: [
    { path: "../fonts/Sora-Light.otf", weight: "300" },
    { path: "../fonts/Sora-Regular.otf", weight: "400" },
    { path: "../fonts/Sora-SemiBold.otf", weight: "600" },
    { path: "../fonts/Sora-Bold.otf", weight: "700" },
  ],
});

const figtree = localFont({
  variable: "--font-figtree",
  display: "swap",
  src: [
    { path: "../fonts/Figtree-Regular.ttf", weight: "400" },
    { path: "../fonts/Figtree-Medium.ttf", weight: "500" },
    { path: "../fonts/Figtree-SemiBold.ttf", weight: "600" },
    { path: "../fonts/Figtree-Bold.ttf", weight: "700" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Coffella — Comunidad cafetera",
    template: "%s · Coffella",
  },
  description:
    "Detrás de cada taza hay alguien. Coffella conecta baristas, cafeterías, tostadores y fans del café de especialidad en una misma comunidad.",
  openGraph: {
    title: "Coffella — Comunidad cafetera",
    description:
      "Descubrí cafeterías, conocé a quien hizo tu café y encontrá tu lugar en la comunidad cafetera.",
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5ed",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${sora.variable} ${figtree.variable} antialiased`}>
      <body className="min-h-dvh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
