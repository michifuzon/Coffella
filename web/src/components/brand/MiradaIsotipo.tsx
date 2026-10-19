"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Isotipo de Coffella con mirada viva: en reposo mira hacia su asa, como en el logo,
 * y cuando hay alguien cerca —el cursor— lo sigue con los ojos.
 * Geometría del cuerpo y el asa tomada de Coffella_Logo-04.svg. El isotipo siempre va completo.
 */

const CUP =
  "M628.22,710.06h0c-125.35,0-226.96-101.61-226.96-226.96v-111.06s453.92,0,453.92,0v111.06c0,125.35-101.61,226.96-226.96,226.96Z";

const EYES = [
  { cx: 564, cy: 491, r: 63 },
  { cx: 694.5, cy: 491, r: 67.5 },
];
const PUPIL_R = 33;
// Pose de reposo: igual que en el logo, ambos ojos miran hacia el asa (a la izquierda)
const REST = { x: -0.75, y: 0 };

type Props = {
  className?: string;
  cupColor?: string;
  eyeColor?: string;
  title?: string;
};

export function MiradaIsotipo({
  className,
  cupColor = "var(--cafe)",
  eyeColor = "var(--blanco)",
  title = "Isotipo de Coffella",
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState(REST);
  const [blink, setBlink] = useState(false);
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    if (reduce) return;
    let idle: ReturnType<typeof setTimeout>;
    const onMove = (e: PointerEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const box = svg.getBoundingClientRect();
      // centro de la mirada en coordenadas de pantalla
      const cx = box.left + box.width * ((628 - 210) / 660);
      const cy = box.top + box.height * ((491 - 360) / 360);
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, dist / 260);
      setLook({ x: (dx / dist) * k, y: (dy / dist) * k });
      clearTimeout(idle);
      // si nadie se mueve un rato, vuelve a la pose del logo
      idle = setTimeout(() => setLook(REST), 3200);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      clearTimeout(idle);
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        loop();
      }, 2600 + Math.random() * 3800);
    };
    loop();
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <svg
      ref={svgRef}
      viewBox="210 360 660 360"
      className={className}
      role="img"
      aria-label={title}
    >
      <path d={CUP} fill={cupColor} />
      {/* Asa de la taza: parte obligatoria del isotipo, nunca se omite */}
      <circle cx={300.48} cy={445.59} r={75.65} fill={cupColor} />
      {EYES.map((eye, i) => {
        const max = eye.r - PUPIL_R * 0.55;
        return (
          <g
            key={i}
            style={{
              transformOrigin: `${eye.cx}px ${eye.cy}px`,
              transform: `scaleY(${blink ? 0.08 : 1})`,
              transition: "transform 120ms ease",
            }}
          >
            <clipPath id={`eye-${uid}-${i}`}>
              <circle cx={eye.cx} cy={eye.cy} r={eye.r} />
            </clipPath>
            <circle cx={eye.cx} cy={eye.cy} r={eye.r} fill={eyeColor} />
            <circle
              clipPath={`url(#eye-${uid}-${i})`}
              cx={eye.cx}
              cy={eye.cy}
              r={PUPIL_R}
              fill={cupColor}
              style={{
                transform: `translate(${look.x * max}px, ${look.y * max}px)`,
                transition: "transform 260ms cubic-bezier(.2,.8,.2,1)",
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
