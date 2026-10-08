"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { isTouchDevice, lerp } from "./device";
import { useScrollCall } from "./hooks";
import { ENTER } from "./site-scroll";

/**
 * Port of the theme's "text-ticker" module (infinite marquee).
 *
 * JS mode (desktop, data-text-ticker="js"):
 *  - the template `.text-ticker__text` is duplicated until copies cover the width + 1;
 *  - every frame: target velocity decays ×0.9, but never below 0.08 %/frame in magnitude
 *    (sign kept; 0 → -0.08, i.e. leftwards) unless hovered with pause-on-hover;
 *    current velocity lerps to target by 0.2; progress (in % of one copy) wraps in (-100, 0];
 *  - wheel input sets target = 0.005 × wheelDelta (scrolling down speeds it leftwards,
 *    scrolling up reverses it); `--direction-left/right` force the sign;
 *  - copies are only transformed while the ticker is in view (scroll call "text-ticker").
 * CSS mode (touch devices): class --mode-css, the stylesheet's tickerText keyframes run instead.
 */
interface TextTickerProps {
  /** Classes after "text-ticker", e.g. "d-flex flex-nowrap align-items-center overflow-hidden --direction-both …". */
  className: string;
  children: ReactNode;
  pauseOnHover?: boolean;
  scrollOffset?: string;
  /** Extra class on each `.text-ticker__text` copy (default "m-0 p-0"). */
  textClassName?: string;
}

const MIN_VELOCITY = 0.08;
const subscribeNever = () => () => {};

export function TextTicker({ className, children, pauseOnHover = false, scrollOffset = "-200px,0", textClassName = "m-0 p-0" }: TextTickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(1);
  // Server render assumes desktop ("js"); the client picks css mode on touch UAs.
  const mode = useSyncExternalStore(subscribeNever, () => (isTouchDevice() ? "css" : "js"), () => "js" as const);
  const inView = useRef(false);

  // Duplicate the template until the copies cover the ticker width (+1 for the wrap).
  useEffect(() => {
    const el = ref.current;
    const tpl = templateRef.current;
    if (!el || !tpl) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      const t = tpl.getBoundingClientRect().width;
      if (w < 1 || t < 1) return;
      const needed = Math.ceil(w / t) + 1;
      setCopies((c) => Math.max(c, needed));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(tpl);
    return () => ro.disconnect();
  }, []);

  useScrollCall(ref, "text-ticker", (state) => {
    inView.current = state === ENTER;
  });

  useEffect(() => {
    if (mode !== "js") return;
    const el = ref.current;
    if (!el) return;
    const direction = el.classList.contains("--direction-left")
      ? -1
      : el.classList.contains("--direction-both")
        ? 0
        : el.classList.contains("--direction-right")
          ? 1
          : 0;
    const velocity = { target: MIN_VELOCITY * direction, current: MIN_VELOCITY * direction };
    let progress = 0;
    let hovering = false;
    let raf = 0;

    const onWheel = (e: WheelEvent) => {
      if (pauseOnHover && hovering) return;
      const legacy = e as WheelEvent & { wheelDeltaY?: number };
      const delta = legacy.wheelDeltaY || -1 * e.deltaY;
      velocity.target = 0.005 * delta;
      if (direction !== 0) velocity.target = Math.abs(velocity.target) * direction;
    };
    const frame = () => {
      raf = requestAnimationFrame(frame);
      velocity.target *= 0.9;
      if (!hovering) {
        velocity.target = velocity.target > 0 ? Math.max(MIN_VELOCITY, velocity.target) : Math.min(-MIN_VELOCITY, velocity.target);
      }
      velocity.current = lerp(velocity.current, velocity.target, 0.2);
      progress += velocity.current;
      if (progress < -100) progress += 100;
      else if (progress > 0) progress -= 100;
      if (inView.current) {
        el.querySelectorAll<HTMLElement>(":scope > .text-ticker__text").forEach((t) => {
          t.style.transform = `translate3d(${progress}%, 0, 0)`;
        });
      }
    };
    const over = () => (hovering = true);
    const out = () => (hovering = false);
    document.addEventListener("wheel", onWheel, { passive: true });
    if (pauseOnHover) {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("wheel", onWheel);
      el.removeEventListener("mouseenter", over);
      el.removeEventListener("mouseleave", out);
    };
  }, [mode, pauseOnHover]);

  return (
    <div
      ref={ref}
      className={`text-ticker ${className} --mode-${mode}`}
      data-scroll=""
      data-scroll-call="text-ticker"
      data-scroll-offset={scrollOffset}
      data-scroll-repeat="true"
      data-text-ticker="js"
      {...(pauseOnHover ? { "data-text-ticker-pause-hover": "" } : {})}
    >
      {Array.from({ length: copies }, (_, i) => (
        <div
          key={i}
          ref={i === 0 ? templateRef : undefined}
          className={`text-ticker__text ${textClassName}`}
          aria-hidden={i === 0 ? undefined : true}
          style={{ "--ticker-index": i } as CSSProperties}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
