"use client";

import { MotionConfig } from "motion/react";

// Respeta "reducir movimiento" del sistema en todas las animaciones de Motion.
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
