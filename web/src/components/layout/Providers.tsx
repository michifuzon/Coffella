"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";

// Respeta "reducir movimiento" del sistema en todas las animaciones de Motion
// y revela con scroll los elementos marcados con [data-reveal].
export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.revealed)"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    root.classList.add("reveal-ready");
    return () => io.disconnect();
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
