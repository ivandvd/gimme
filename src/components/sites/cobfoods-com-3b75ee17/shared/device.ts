/**
 * The theme's `De` flag: mobile/tablet user agents get native scrolling and skip
 * hover-only effects. Same test as the original bundle.
 */
export function isTouchDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

/** Equivalent of the theme's viewport helper `Oe`. */
export function viewport() {
  return { width: window.innerWidth, height: window.innerHeight };
}

/** The theme's `Ie(min, max, v)`. */
export const clamp = (min: number, max: number, v: number) => Math.max(min, Math.min(max, v));

/**
 * The theme's `Me(a, b, t, dt)`: frame-rate independent lerp where `dt` is the frame
 * delta in seconds, normalised to 60fps. Without `dt` it is a plain lerp.
 */
export function lerp(a: number, b: number, t: number, dt?: number) {
  if (dt === undefined) return a * (1 - t) + b * t;
  const k = 1 - Math.pow(1 - t, dt * 60);
  return a * (1 - k) + b * k;
}

/** Current translateY applied to an element via its transform matrix (the theme's `Fe`). */
export function translation(el: Element) {
  const t = getComputedStyle(el).transform;
  if (!t || t === "none") return { x: 0, y: 0 };
  const m = t.match(/^matrix3d\((.+)\)$/);
  if (m) {
    const v = m[1].split(",").map(Number);
    return { x: v[12] || 0, y: v[13] || 0 };
  }
  const m2 = t.match(/^matrix\((.+)\)$/);
  if (m2) {
    const v = m2[1].split(",").map(Number);
    return { x: v[4] || 0, y: v[5] || 0 };
  }
  return { x: 0, y: 0 };
}
