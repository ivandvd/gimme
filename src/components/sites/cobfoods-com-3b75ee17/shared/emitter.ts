/**
 * Site-wide event bus, mirroring the theme's EventEmitter2 instance.
 * Event names follow the original ("SiteScroll.scallop", "SiteNav.open", …).
 */
type Handler = (...args: never[]) => void;

class Emitter {
  private handlers = new Map<string, Set<Handler>>();

  on<A extends unknown[]>(event: string, handler: (...args: A) => void) {
    let set = this.handlers.get(event);
    if (!set) {
      set = new Set();
      this.handlers.set(event, set);
    }
    set.add(handler as unknown as Handler);
  }

  off<A extends unknown[]>(event: string, handler: (...args: A) => void) {
    this.handlers.get(event)?.delete(handler as unknown as Handler);
  }

  emit(event: string, ...args: unknown[]) {
    this.handlers.get(event)?.forEach((h) => (h as (...a: unknown[]) => void)(...args));
  }
}

export const emitter = new Emitter();
