"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, type CSSProperties } from "react";
import { useScrollCall } from "./hooks";
import { ENTER } from "./site-scroll";

/**
 * Port of the theme's "scallop" snippet + module: a row of half circles painted on a canvas,
 * used as the wavy edge between colored sections. The canvas is one diameter wider than the
 * element when animated, and a CSS keyframe (scallopAnimationLeft/Right, 4s linear infinite)
 * slides it while the element has `--js-started`.
 *
 * Classes carry the configuration exactly like the theme:
 *   --orientation-up|down, --position-top|bottom, --animation-left|right, --inset, color-*.
 */
export interface ScallopHandle {
  start(): void;
  stop(): void;
}

interface ScallopProps {
  /** Classes after the fixed "scallop position-absolute l-0 w-100 z-0 pointer-events-none". */
  className: string;
  /** Hex color written to `style.color` (the theme's data-scallop-color); omit to use a color-* class. */
  color?: string;
  animation?: "left" | "right";
  /** When true (default) the scallop starts/stops itself via the `scallop` scroll call. */
  scrollDriven?: boolean;
  scrollTarget?: string;
  scrollOffset?: string;
}

const DEG = Math.PI / 180;
const INSET_ANGLE = 17.5 * DEG;

function stepsFor(width: number) {
  return width < 768 ? 5 : width < 992 ? 6 : width < 1200 ? 5 : width < 1440 ? 6 : width < 1680 ? 7 : width < 1920 ? 8 : 9;
}

export const Scallop = forwardRef<ScallopHandle, ScallopProps>(function Scallop(
  { className, color, animation, scrollDriven = true, scrollTarget, scrollOffset },
  handle,
) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const started = useRef(false);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    ref.current?.classList.add("--js-started");
  }, []);
  const stop = useCallback(() => {
    if (!started.current) return;
    started.current = false;
    ref.current?.classList.remove("--js-started");
  }, []);
  useImperativeHandle(handle, () => ({ start, stop }), [start, stop]);

  useEffect(() => {
    const el = ref.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!el || !canvas || !ctx) return;
    const orientation = el.classList.contains("--orientation-down") ? "down" : "up";
    const inset = el.classList.contains("--inset");
    const counterClockwise = orientation === "up";
    let lastWidth: number | null = null;

    const render = () => {
      const width = el.getBoundingClientRect().width;
      if (width === lastWidth) return;
      lastWidth = width;
      const dpr = window.devicePixelRatio;
      const steps = stepsFor(window.innerWidth);
      const diameter = (width * dpr) / steps;
      const radius = (diameter / 2) * 1.05;
      const height = Math.ceil(radius / dpr);
      canvas.width = width * dpr + (animation ? diameter : 0);
      canvas.height = height * dpr;
      el.style.height = `${height}px`;
      el.style.setProperty("--diameter", `${diameter / dpr}px`);
      if (animation) canvas.style.width = `${Math.ceil(width + diameter / dpr)}px`;

      const count = steps + (animation ? 1 : 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = getComputedStyle(el).color;
      ctx.beginPath();
      if (inset) {
        const y = orientation === "down" ? (height + 1) * dpr : -1 * dpr;
        const edge = orientation === "down" ? 0 : height * dpr;
        const a = INSET_ANGLE * (orientation === "down" ? 1 : -1);
        for (let i = 0; i < count; i++) ctx.arc(diameter * i + diameter / 2, y, radius, Math.PI + a, -1 * a, counterClockwise);
        ctx.lineTo(width * dpr + (animation ? diameter : 0), edge);
        ctx.lineTo(0, edge);
      } else {
        const y = orientation === "down" ? 0 : height * dpr;
        for (let i = 0; i < count; i++) ctx.arc(diameter * i + diameter / 2, y, radius, 0, Math.PI, counterClockwise);
      }
      ctx.fill();
    };

    render();
    const onResize = () => render();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [animation]);

  useScrollCall(ref, "scallop", (state) => {
    if (!scrollDriven) return;
    if (state === ENTER) start();
    else stop();
  });

  const style: CSSProperties | undefined = color ? { color } : undefined;
  return (
    <div
      ref={ref}
      className={`scallop position-absolute l-0 w-100 z-0 pointer-events-none ${className}`}
      {...(scrollDriven
        ? {
            "data-scroll": "",
            "data-scroll-call": "scallop",
            "data-scroll-repeat": "true",
            "data-scroll-target": scrollTarget,
            "data-scroll-offset": scrollOffset,
          }
        : {})}
      data-scallop=""
      data-scallop-color={color ?? "false"}
      data-scallop-animation={animation}
      aria-hidden="true"
      style={style}
    >
      <canvas ref={canvasRef} className="scallop__canvas position-absolute t-0 l-0 w-100 h-100" />
    </div>
  );
});
