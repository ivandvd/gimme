"use client";

import { useEffect, useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { isTouchDevice } from "./device";

/**
 * Port of the theme's `.btn` snippet and its "buttons" module.
 *
 * Markup is always:
 *   <a|button class="btn {classes}" data-buttons="{behavior}">
 *     <span class="btn__bg">{bg}</span>
 *     <span class="btn__label">{label}</span>
 *     <span class="btn__icon {iconClass} d-inline-block">{icon}</span>   (optional)
 *   </a|button>
 *
 * Behaviors (from data-buttons, desktop only unless noted):
 *  - "cta":     on hover the 24 (or 8 for --cta-oval) circles travel along the bg path;
 *               one full loop takes 30s (10s for --cta-oval), pauses on leave.
 *  - "close" / "sharing": the bg spins while hovered (velocity ramps ×1.1 per frame up to
 *               1deg/frame), on leave it eases (5%/frame) to the next multiple of 60deg.
 *               Runs on touch devices too.
 *  - "social":  hover spawns 4 colored sparkles above the icon, one every 750ms.
 */
export type BtnBehavior = "cta" | "close" | "sharing" | "social" | "none";

interface BtnBaseProps {
  /** Classes after `btn`, e.g. "pb-row-hero-slider__slide__cta --cta --cta-medium". */
  className: string;
  behavior?: BtnBehavior;
  bg?: ReactNode;
  label?: ReactNode;
  icon?: ReactNode;
  /** e.g. "--icon-arrow-left". */
  iconClass?: string;
  /** Render `<span class="btn__bg">` even when empty (the theme always does). */
  emptyBg?: boolean;
}

type BtnProps = BtnBaseProps &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">)
  );

export function Btn(props: BtnProps) {
  const { className, behavior = "none", bg, label, icon, iconClass, emptyBg = true, ...rest } = props;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (behavior === "cta") return attachCta(el);
    if (behavior === "close" || behavior === "sharing") return attachSpin(el);
    if (behavior === "social") return attachSocial(el);
  }, [behavior]);

  const inner = (
    <>
      {(bg || emptyBg) && (
        <span className="btn__bg" aria-hidden="true">
          {bg}
        </span>
      )}
      <span className="btn__label" aria-hidden="true">
        {label}
      </span>
      {icon && (
        <span className={`btn__icon ${iconClass ?? ""} d-inline-block`} aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );

  const cls = `btn ${className}`;
  const dataButtons = behavior === "none" ? undefined : behavior;
  if ("href" in rest && typeof rest.href === "string") {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} className={cls} data-buttons={dataButtons} {...anchorProps}>
        {inner}
      </a>
    );
  }
  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={cls}
      data-buttons={dataButtons}
      {...buttonProps}
    >
      {inner}
    </button>
  );
}

function bindHover(el: HTMLElement, over: () => void, out: () => void) {
  el.addEventListener("mouseenter", over);
  el.addEventListener("mouseleave", out);
  el.addEventListener("focus", over);
  el.addEventListener("blur", out);
  return () => {
    el.removeEventListener("mouseenter", over);
    el.removeEventListener("mouseleave", out);
    el.removeEventListener("focus", over);
    el.removeEventListener("blur", out);
  };
}

/** Circles orbiting the CTA outline (theme class `Mn`). */
function attachCta(el: HTMLElement) {
  if (isTouchDevice()) return;
  const svg = el.querySelector<SVGSVGElement>(".btn__bg svg");
  const path = svg?.querySelector<SVGPathElement>("path");
  const circles = svg ? Array.from(svg.querySelectorAll<SVGCircleElement>("circle")) : [];
  if (!path || circles.length === 0) return;
  const length = path.getTotalLength();
  const step = 1 / circles.length;
  const duration = el.classList.contains("--cta-oval") ? 10000 : 30000;
  let progress = 0;
  let raf = 0;
  let last = 0;

  const update = (p: number) => {
    circles.forEach((c, i) => {
      let s = p + step * i;
      if (s > 1) s -= 1;
      const at = s * length;
      const pt = path.getPointAtLength(at >= 1 ? at : 0);
      c.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
    });
  };
  const frame = (now: number) => {
    progress = (progress + (now - last) / duration) % 1;
    last = now;
    update(progress);
    raf = requestAnimationFrame(frame);
  };
  update(0);
  const unbind = bindHover(
    el,
    () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    () => {
      cancelAnimationFrame(raf);
      raf = 0;
    },
  );
  return () => {
    unbind();
    cancelAnimationFrame(raf);
  };
}

/** Spinning flower bg (theme class `Fn`). */
function attachSpin(el: HTMLElement) {
  const bg = el.querySelector<HTMLElement>(".btn__bg");
  if (!bg) return;
  let hovering = false;
  let rotation = 0;
  let target = 0;
  let velocity = 0;
  let raf = 0;
  const update = () => {
    let keepGoing = true;
    if (hovering) {
      velocity = Math.min(Math.max(1.1 * velocity, 0.1), 1);
      rotation += velocity;
    } else {
      const diff = target - rotation;
      rotation += Math.min(0.05 * diff, velocity);
      if (target - rotation < 0.1) {
        keepGoing = false;
        rotation = target;
      }
    }
    bg.style.transform = `rotate(${rotation}deg)`;
    raf = keepGoing ? requestAnimationFrame(update) : 0;
  };
  const unbind = bindHover(
    el,
    () => {
      hovering = true;
      if (!raf) update();
    },
    () => {
      target = Math.round(rotation + (60 - (rotation % 60)));
      hovering = false;
    },
  );
  return () => {
    unbind();
    cancelAnimationFrame(raf);
  };
}

const SPARKLE_COLORS = ["color-pink", "color-yellow", "color-green", "color-purple"];
const SPARKLE_SVG =
  '<svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.48574 0C7.48574 0 8.15984 9.01785 15 12.2355C15 12.2355 8.49004 14.3464 7.48574 24C6.48202 14.3464 0 12.2355 0 12.2355C6.84073 9.01785 7.48574 0 7.48574 0Z" fill="currentColor"/></svg>';

/** Sparkles over social icons (theme class `$n`). */
function attachSocial(el: HTMLElement) {
  if (isTouchDevice()) return;
  const colors = (el.getAttribute("data-social-colors")?.split(" ") ?? [...SPARKLE_COLORS])
    .map((c) => [Math.random(), c] as const)
    .sort((a, b) => a[0] - b[0])
    .map(([, c]) => c);
  let sparkles: HTMLElement[] | null = null;
  let hovering = false;
  let tick: ReturnType<typeof setTimeout> | null = null;

  const onEnd = (e: Event) => {
    const t = e.currentTarget as HTMLElement;
    t.removeEventListener("animationend", onEnd);
    t.classList.remove("--js-animate");
  };
  const create = () => {
    sparkles = Array.from({ length: 4 }, (_, n) => {
      const s = document.createElement("div");
      const left = Math.round(n % 2 === 0 ? 3 * Math.random() : 3 * Math.random() + 5);
      const polarity = Math.random() > 0.5 ? 1 : -1;
      s.className = `sparkle ${colors[n % colors.length]}`;
      s.style.setProperty("--polarity", String(polarity));
      s.style.left = `${left}px`;
      s.innerHTML = SPARKLE_SVG;
      el.appendChild(s);
      return s;
    });
  };
  const update = () => {
    tick = null;
    if (!hovering || !sparkles) return;
    const s = sparkles.shift()!;
    sparkles.push(s);
    s.addEventListener("animationend", onEnd);
    s.classList.add("--js-animate");
    tick = setTimeout(update, 750);
  };
  const unbind = bindHover(
    el,
    () => {
      if (!sparkles) create();
      hovering = true;
      if (!tick) update();
    },
    () => {
      hovering = false;
    },
  );
  return () => {
    unbind();
    if (tick) clearTimeout(tick);
    sparkles?.forEach((s) => s.remove());
  };
}
