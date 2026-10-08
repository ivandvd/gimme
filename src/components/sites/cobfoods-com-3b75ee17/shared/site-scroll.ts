/**
 * Port of the theme's "SiteScroll" engine (MILL3 windmill theme, cobfoods.com):
 *  - native scrolling, with wheel input smoothed by a lerp (0.1) on non-touch devices;
 *  - Locomotive-style `[data-scroll]` elements: `is-inview` class, `data-scroll-call`
 *    notifications (emitted as `SiteScroll.<call>` with "enter" | "exit"), `data-scroll-offset`,
 *    `data-scroll-repeat`, `data-scroll-target`, `data-scroll-speed` parallax,
 *    `data-scroll-position`, `data-scroll-progress` (writes `--scroll-progress`);
 *  - the `timeline` call (data-timeline JSON → rotate / scale seeked by scroll progress);
 *  - body classes `--js-scroll-down` / `--js-scroll-up` / `--js-scroll-min` (> 200px).
 */
import { emitter } from "./emitter";
import { clamp, isTouchDevice, lerp, translation, viewport } from "./device";

export const ENTER = "enter";
export const EXIT = "exit";
export type ScrollCallState = typeof ENTER | typeof EXIT;

export interface ScrollElement {
  id: string;
  el: HTMLElement;
  y: number;
  target: HTMLElement;
  top: number;
  middle: number;
  bottom: number;
  offset: [number, number];
  position: string | null;
  repeat: boolean;
  progress: number | false;
  progressEasing: ((t: number) => number) | null;
  call: string | string[] | null;
  called: boolean;
  delay: number | false;
  speed: number | false;
  inView: boolean;
}

const easings: Record<string, (t: number) => number> = {
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeOutQuart: (t) => 1 - --t * t * t * t,
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
};

const parseCall = (el: HTMLElement) => {
  if (!el.hasAttribute("data-scroll-call")) return null;
  const calls = (el.dataset.scrollCall ?? "").split(",").map((c) => c.trim());
  return calls.length === 1 ? calls[0] : calls;
};
const parseDelay = (el: HTMLElement) => {
  if (!el.hasAttribute("data-scroll-delay")) return false;
  const d = parseFloat(el.getAttribute("data-scroll-delay") ?? "0") || 0;
  return d <= 0 || d >= 1 ? false : d;
};
const parseOffset = (el: HTMLElement, touch: boolean): [number, number] | null => {
  if (!el.hasAttribute("data-scroll-offset")) return null;
  const raw =
    touch && el.hasAttribute("data-scroll-offset-native")
      ? el.dataset.scrollOffsetNative ?? ""
      : el.dataset.scrollOffset ?? "";
  const parts = raw.split(",").map((p) =>
    p.includes("%") ? Math.trunc((parseFloat(p.replace("%", "")) * viewport().height) / 100) : parseInt(p, 10) || 0,
  );
  return [parts[0] ?? 0, parts[1] ?? 0];
};
const parseRepeat = (el: HTMLElement) => {
  if (!el.hasAttribute("data-scroll-repeat")) return null;
  return el.dataset.scrollRepeat !== "false";
};
const parseSpeed = (el: HTMLElement) =>
  el.hasAttribute("data-scroll-speed") ? 0.1 * parseFloat(el.getAttribute("data-scroll-speed") ?? "0") : false;
const parseTarget = (el: HTMLElement): HTMLElement | null => {
  const sel = el.dataset.scrollTarget;
  if (!sel) return null;
  return document.querySelector<HTMLElement>(sel);
};
const parseProgress = (el: HTMLElement): [number | false, ((t: number) => number) | null] =>
  el.hasAttribute("data-scroll-progress")
    ? [
        parseFloat(getComputedStyle(el).getPropertyValue("--scroll-progress") || "0") || 0,
        easings[el.getAttribute("data-scroll-progress") ?? ""] ?? null,
      ]
    : [false, null];

interface TimelineItem {
  ref: ScrollElement;
  top: number;
  bottom: number;
  progress: number | null;
  from: Record<string, number>;
  to: Record<string, number>;
}

class SiteScrollEngine {
  touch = false;
  started = false;
  private initialised = false;
  private elements = new Map<string, ScrollElement>();
  private parallax = new Map<string, ScrollElement>();
  private timelines = new Map<string, TimelineItem>();
  private raf = 0;
  private lastTime = 0;
  private scrollMinActive = false;
  private data = { scroll: 0, targetScroll: 0, lastScroll: 0, max: 0, direction: null as null | "down" | "up", isMouseWheeling: false, wheelEnabled: true };
  private options = { lerp: 0.1, threshold: 0.5, firefoxMultiplier: 2.25, mouseMultiplier: 0.4 };
  private resizeObserver: ResizeObserver | null = null;
  private lastWidth = 0;
  private lastHeight = 0;

  /** Current scroll position. */
  get y() {
    return this.data.scroll;
  }
  get limit() {
    return this.data.max;
  }

  init() {
    if (this.initialised) return;
    this.initialised = true;
    this.touch = isTouchDevice();
    const isWindows = ((navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform || navigator.platform || "unknown").includes("Win");
    if (isWindows) this.options = { ...this.options, firefoxMultiplier: 1, mouseMultiplier: 1 };
    this.data.scroll = this.data.targetScroll = this.data.lastScroll = window.scrollY;
    this.calcScrollHeight();
    this.addElements();
    this.checkElementsProgress();
    this.transformElements(true);
    emitter.on("SiteScroll.timeline", this.onTimelineCall);
    emitter.on("SiteScroll.stop", this.onStopRequest);
    emitter.on("SiteScroll.start", this.onStartRequest);
    emitter.on("SiteScroll.update", this.onUpdateRequest);
    window.addEventListener("resize", this.onResize);
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(document.body);
    this.lastWidth = window.innerWidth;
    this.lastHeight = document.body.scrollHeight;
  }

  /** Starts listening and reveals elements currently in view. */
  start() {
    if (this.started) return;
    this.started = true;
    this.calcScrollHeight();
    window.addEventListener("scroll", this.onScroll, { passive: true });
    if (!this.touch) window.addEventListener("wheel", this.onWheel, { passive: false });
    this.updateDirection();
    this.updateScroll();
    this.checkElements();
    this.transformElements(true);
    this.notify();
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    if (!this.started) return;
    this.started = false;
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("wheel", this.onWheel);
    cancelAnimationFrame(this.raf);
  }

  destroy() {
    this.stop();
    emitter.off("SiteScroll.timeline", this.onTimelineCall);
    emitter.off("SiteScroll.stop", this.onStopRequest);
    emitter.off("SiteScroll.start", this.onStartRequest);
    emitter.off("SiteScroll.update", this.onUpdateRequest);
    window.removeEventListener("resize", this.onResize);
    this.resizeObserver?.disconnect();
    this.elements.clear();
    this.parallax.clear();
    this.timelines.clear();
    this.initialised = false;
  }

  /** Re-scan `[data-scroll]` elements (after DOM changes). */
  update() {
    this.calcScrollHeight();
    this.addElements();
    this.checkElements();
    this.transformElements(true);
  }

  scrollTo(target: number | HTMLElement | "top" | "bottom", opts: { offset?: number; smooth?: boolean } = {}) {
    let y: number;
    if (target === "top") y = 0;
    else if (target === "bottom") y = this.data.max;
    else if (typeof target === "number") y = target;
    else y = target.getBoundingClientRect().top - translation(target).y + this.data.scroll;
    y += opts.offset ?? 0;
    this.data.isMouseWheeling = false;
    window.scrollTo({ top: y, behavior: opts.smooth === false ? "auto" : "smooth" });
  }

  private onStopRequest = () => {
    this.data.wheelEnabled = false;
    this.data.isMouseWheeling = false;
  };
  private onStartRequest = () => {
    this.data.wheelEnabled = true;
    this.data.scroll = this.data.targetScroll = this.data.lastScroll = window.scrollY;
  };
  private onUpdateRequest = () => this.update();

  private onResize = () => {
    const w = window.innerWidth;
    const h = document.body.scrollHeight;
    if (w === this.lastWidth && h === this.lastHeight) return;
    this.lastWidth = w;
    this.lastHeight = h;
    this.data.isMouseWheeling = false;
    this.calcScrollHeight();
    this.resizeElements();
    this.checkElements();
    this.transformElements();
  };

  private tick = (now: number) => {
    const dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
    if (this.started && this.data.isMouseWheeling) {
      this.data.lastScroll = lerp(this.data.lastScroll, this.data.targetScroll, this.options.lerp, dt);
      this.data.isMouseWheeling = Math.abs(this.data.scroll - this.data.targetScroll) > this.options.threshold;
      if (!this.data.isMouseWheeling) this.data.lastScroll = this.data.scroll;
      window.scrollTo({ top: this.data.lastScroll, behavior: "auto" });
      this.updateDirection(this.data.lastScroll);
      this.updateScroll(this.data.lastScroll);
      this.notify();
    }
    if (this.started) {
      this.checkElements();
      this.transformElements(false, dt);
      this.timelines.forEach((item) => this.updateTimeline(item));
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  private onScroll = () => {
    if (this.data.isMouseWheeling) return;
    this.updateDirection();
    this.updateScroll();
    this.notify();
  };

  private onWheel = (e: WheelEvent) => {
    if (!this.data.wheelEnabled) return;
    if (e.ctrlKey) return;
    const legacy = e as WheelEvent & { wheelDeltaY?: number };
    let deltaY = legacy.wheelDeltaY || -1 * e.deltaY;
    if (/firefox/i.test(navigator.userAgent)) deltaY *= this.options.firefoxMultiplier;
    deltaY *= this.options.mouseMultiplier;
    // Let nested scrollable areas (data-scroll-prevent) keep native wheel behaviour.
    if ((e.target as Element | null)?.closest?.("[data-scroll-prevent]")) return;
    if (e.buttons === 4) return;
    e.preventDefault();
    if (!this.data.isMouseWheeling) this.data.targetScroll = this.data.lastScroll = window.scrollY;
    this.data.isMouseWheeling = true;
    this.data.targetScroll = clamp(0, this.data.max, this.data.targetScroll - deltaY);
  };

  private calcScrollHeight() {
    this.data.max = Math.max(0, document.body.scrollHeight - viewport().height);
  }

  private updateDirection(y = window.scrollY) {
    const delta = y - this.data.scroll;
    if (Math.abs(delta) <= 0.05) return;
    const dir = delta >= 0 ? "down" : "up";
    if (dir === this.data.direction) return;
    const prev = this.data.direction;
    this.data.direction = dir;
    const body = document.body.classList;
    if (prev === null) body.add(dir === "down" ? "--js-scroll-down" : "--js-scroll-up");
    else if (dir === "down") body.replace("--js-scroll-up", "--js-scroll-down");
    else body.replace("--js-scroll-down", "--js-scroll-up");
    emitter.emit("SiteScroll.direction", dir, prev);
  }

  private updateScroll(y = window.scrollY) {
    this.data.scroll = y;
    if (!this.data.isMouseWheeling) this.data.targetScroll = this.data.lastScroll = y;
    const min = y > 200;
    if (min !== this.scrollMinActive) {
      this.scrollMinActive = min;
      document.body.classList.toggle("--js-scroll-min", min);
      emitter.emit("SiteScroll.scroll-min", min);
    }
  }

  private notify() {
    emitter.emit("SiteScroll.scroll", {
      y: this.data.scroll,
      direction: this.data.direction,
      limit: this.data.max,
      progress: this.data.max ? this.data.scroll / this.data.max : 0,
    });
  }

  // ---- elements -------------------------------------------------------------------------

  private computeConstraints(target: HTMLElement, offset: [number, number]) {
    const rect = target.getBoundingClientRect();
    const t = translation(target);
    let top = rect.top - t.y + this.data.scroll;
    let bottom = top + rect.height;
    const middle = 0.5 * (bottom - top) + top;
    top += offset[0];
    bottom -= offset[1];
    return [top, middle, bottom] as const;
  }

  private addElements() {
    const previous = this.elements;
    this.elements = new Map();
    this.parallax = new Map();
    document.querySelectorAll<HTMLElement>("[data-scroll]").forEach((el, i) => {
      let id = el.dataset.scrollId;
      if (typeof id !== "string") {
        id = `el${i}`;
        el.setAttribute("data-scroll-id", id);
      }
      const offset = parseOffset(el, this.touch) ?? [0, 0];
      const repeat = parseRepeat(el) ?? false;
      const target = parseTarget(el) ?? el;
      const [progress, progressEasing] = parseProgress(el);
      const [top, middle, bottom] = this.computeConstraints(target, offset);
      const prev = previous.get(id);
      const item: ScrollElement = {
        id,
        el,
        y: translation(el).y,
        target,
        top,
        middle,
        bottom,
        offset,
        position: el.getAttribute("data-scroll-position"),
        repeat,
        progress,
        progressEasing,
        call: parseCall(el),
        called: prev?.el === el ? prev.called : false,
        delay: parseDelay(el),
        speed: parseSpeed(el),
        inView: prev?.el === el ? prev.inView : false,
      };
      this.elements.set(id, item);
      if (item.speed !== false && !this.touch) this.parallax.set(id, item);
    });
  }

  private resizeElements() {
    this.elements.forEach((item) => {
      const offset = parseOffset(item.el, this.touch) ?? [0, 0];
      const [top, middle, bottom] = this.computeConstraints(item.target, offset);
      Object.assign(item, { offset, top, middle, bottom, inView: false, called: false });
    });
  }

  private checkElements(silent = false) {
    const vh = viewport().height;
    const top = this.data.scroll;
    const bottom = top + vh;
    this.elements.forEach((item) => {
      if (item.progress !== false) this.updateElementProgress(item);
      if (item.inView) {
        if (bottom < item.top || top > item.bottom) this.setOutView(item, silent);
      } else if (bottom >= item.top && top < item.bottom) {
        this.setInView(item, silent);
      }
    });
  }

  private checkElementsProgress() {
    this.elements.forEach((item) => {
      if (item.progress !== false) this.updateElementProgress(item);
    });
  }

  private updateElementProgress(item: ScrollElement) {
    const vh = viewport().height;
    let p: number;
    if (item.position === "bottom") {
      const range = item.bottom - item.top;
      p = clamp(0, range, vh + this.data.scroll - item.top) / range;
    } else {
      const range = Math.min(item.bottom, vh + item.bottom - item.top);
      p = 1 - clamp(0, range, item.bottom - this.data.scroll) / range;
    }
    if (item.progressEasing) p = item.progressEasing(p);
    if (p !== item.progress) {
      item.progress = p;
      item.el.style.setProperty("--scroll-progress", String(p));
    }
  }

  private setInView(item: ScrollElement, silent: boolean) {
    if (item.inView) return;
    item.inView = true;
    item.el.classList.add("is-inview");
    if (item.call && !item.called && !silent) {
      if (!item.repeat) item.called = true;
      this.notifyCall(item, ENTER);
    }
  }

  private setOutView(item: ScrollElement, silent: boolean) {
    if (!item.inView) return;
    item.inView = false;
    if (item.call && item.repeat && !silent) this.notifyCall(item, EXIT);
    if (item.repeat) item.el.classList.remove("is-inview");
  }

  private notifyCall(item: ScrollElement, state: ScrollCallState) {
    const calls = Array.isArray(item.call) ? item.call : [item.call];
    calls.forEach((c) => c && emitter.emit(`SiteScroll.${c}`, state, item, this));
  }

  private transformElements(force = false, dt?: number) {
    if (this.parallax.size === 0) return;
    const vh = viewport().height;
    const bottom = this.data.scroll + vh;
    const middle = this.data.scroll + vh / 2;
    this.parallax.forEach((item) => {
      if (!item.inView && !force) return;
      let value: number | false = force ? 0 : false;
      const speed = item.speed as number;
      if (item.inView || force) {
        switch (item.position) {
          case "top":
            value = this.data.scroll * speed * -1;
            break;
          case "bottom":
            value = (this.data.max - bottom + vh) * speed;
            break;
          default:
            value = (middle - item.middle) * speed * -1;
        }
      }
      if (value === false) return;
      if (item.delay && !force) {
        const next = lerp(item.y, value, item.delay, dt);
        if (Math.abs(value - next) >= 0.2) value = next;
      }
      item.y = value;
      item.el.style.transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,${value},0,1)`;
    });
  }

  // ---- timeline call ----------------------------------------------------------------------

  private onTimelineCall = (state: ScrollCallState, item: ScrollElement) => {
    if (state !== ENTER) return;
    const existing = this.timelines.get(item.id);
    if (existing) {
      existing.top = item.top;
      existing.bottom = item.bottom;
      return;
    }
    const el = item.el;
    let raw: string | undefined;
    if (this.touch && el.hasAttribute("data-timeline-native")) {
      raw = el.dataset.timelineNative;
      if (!raw) return;
    } else if (viewport().width < 768 && el.hasAttribute("data-timeline-mobile")) {
      raw = el.dataset.timelineMobile;
      if (!raw) return;
    } else raw = el.dataset.timeline;
    if (!raw) return;
    const parsed = JSON.parse(raw.replace(/'/g, '"')) as Record<string, number[] | number>;
    const from: Record<string, number> = {};
    const to: Record<string, number> = {};
    for (const [prop, val] of Object.entries(parsed)) {
      const arr = Array.isArray(val) ? val : [val];
      const start = arr.length > 1 ? arr[0] : prop.startsWith("scale") ? 1 : 0;
      from[prop] = start;
      to[prop] = arr[arr.length - 1];
    }
    const tl: TimelineItem = { ref: item, top: item.top, bottom: item.bottom, progress: null, from, to };
    this.timelines.set(item.id, tl);
    this.updateTimeline(tl);
  };

  private updateTimeline(item: TimelineItem) {
    const vh = viewport().height;
    const range = Math.min(item.bottom, vh + item.bottom - item.top);
    const p = 1 - clamp(0, range, item.bottom - this.data.scroll) / range;
    if (p === item.progress) return;
    item.progress = p;
    const v = (k: string) => item.from[k] + (item.to[k] - item.from[k]) * p;
    const parts: string[] = [];
    for (const k of Object.keys(item.to)) {
      if (k === "rotate") parts.push(`rotate(${v(k)}deg)`);
      else if (k === "scale") parts.push(`scale(${v(k)})`);
      else if (k === "translateY") parts.push(`translateY(${v(k)}px)`);
      else if (k === "translateX") parts.push(`translateX(${v(k)}px)`);
    }
    item.ref.el.style.transform = parts.join(" ");
  }
}

export const siteScroll = new SiteScrollEngine();

/**
 * Port of the theme's page-load stagger (`cn(350, 0)`): every `[data-module-delay]` element
 * visible in the first viewport gets `--module-delay` 0ms, 350ms, 700ms… in DOM order.
 */
export function applyModuleDelays(step = 350, start = 0) {
  let delay = start;
  const vh = viewport().height;
  document.querySelectorAll<HTMLElement>("[data-module-delay]").forEach((el) => {
    const rect = el.getBoundingClientRect();
    const t = translation(el);
    const visible = rect.top - t.y < vh && rect.top - t.y + rect.height > 0;
    el.setAttribute("data-module-delay", String(visible));
    if (visible) {
      el.style.setProperty("--module-delay", `${delay}ms`);
      delay += el.hasAttribute("data-module-delay-increment") ? parseInt(el.dataset.moduleDelayIncrement ?? "0", 10) : step;
    }
  });
}
