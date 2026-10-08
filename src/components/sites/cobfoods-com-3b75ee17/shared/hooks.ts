"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { emitter } from "./emitter";
import type { ScrollCallState, ScrollElement } from "./site-scroll";

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Subscribe to `SiteScroll.<call>` notifications for one element — the React equivalent of a
 * theme module doing `emitter.on("SiteScroll.scallop", …)` and filtering on `e.el === this.el`.
 * The element must carry `data-scroll` and `data-scroll-call="<call>"`.
 */
export function useScrollCall(
  ref: RefObject<HTMLElement | null>,
  call: string,
  handler: (state: ScrollCallState, item: ScrollElement) => void,
) {
  const handlerRef = useRef(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  useEffect(() => {
    const listener = (state: ScrollCallState, item: ScrollElement) => {
      if (item.el === ref.current) handlerRef.current(state, item);
    };
    emitter.on(`SiteScroll.${call}`, listener);
    return () => emitter.off(`SiteScroll.${call}`, listener);
  }, [call, ref]);
}

/** Subscribe to any emitter event for the lifetime of the component. */
export function useEmitter<A extends unknown[]>(event: string, handler: (...args: A) => void) {
  const handlerRef = useRef(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  useEffect(() => {
    const listener = (...args: A) => handlerRef.current(...args);
    emitter.on(event, listener);
    return () => emitter.off(event, listener);
  }, [event]);
}
