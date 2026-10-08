"use client";

import { useEffect, useRef } from "react";
import { emitter } from "@/components/sites/cobfoods-com-3b75ee17/shared/emitter";

const OPENED_CLASS = "--js-site-cart-opened";
const ANIM_CLASS = "--js-anim-playing";

/**
 * Port of the theme's SiteCart module. The original fetches `/?view=cart` into the container;
 * here the empty-cart state is rendered statically.
 *
 * Triggers are every `[aria-controls="site-cart"]` (header CART button, the backdrop) plus the
 * `SiteCart.toggle` event. Escape and `SiteNav.open` close the drawer.
 */
export function SiteCart() {
  const elRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    const container = containerRef.current;
    if (!el || !container) return;
    const body = document.body;
    const triggers = Array.from(document.querySelectorAll<HTMLElement>(`[aria-controls="${el.id}"]`));
    let opened = false;
    let savedScrollY = 0;

    const onCloseCompleted = () => {
      if (opened) return;
      container.removeEventListener("transitionend", onCloseCompleted);
      emitter.emit("SiteScroll.start");
      el.setAttribute("aria-hidden", "true");
      el.classList.remove(ANIM_CLASS);
    };

    const open = () => {
      if (opened) return;
      opened = true;
      savedScrollY = window.scrollY;
      container.removeEventListener("transitionend", onCloseCompleted);
      body.classList.add(OPENED_CLASS);
      emitter.emit("SiteScroll.stop", true);
      emitter.emit("SiteCart.open");
      triggers.forEach((t) => {
        t.setAttribute("aria-expanded", "true");
        t.classList.add("is-active");
      });
      el.setAttribute("aria-hidden", "false");
      el.classList.add(ANIM_CLASS);
    };

    const close = () => {
      if (!opened) return;
      opened = false;
      triggers.forEach((t) => {
        t.setAttribute("aria-expanded", "false");
        t.classList.remove("is-active");
      });
      body.classList.remove(OPENED_CLASS);
      window.scrollTo({ top: savedScrollY, behavior: "auto" });
      emitter.emit("SiteCart.close");
      container.addEventListener("transitionend", onCloseCompleted);
    };

    const toggle = () => (opened ? close() : open());

    const onTrigger = (e?: Event) => {
      if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
        e.stopPropagation();
      }
      toggle();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (opened && (e.key === "Escape" || e.key === "Esc")) close();
    };

    triggers.forEach((t) => t.addEventListener("click", onTrigger));
    window.addEventListener("keydown", onKeyDown);
    emitter.on("SiteCart.toggle", onTrigger);
    emitter.on("SiteNav.open", close);

    return () => {
      triggers.forEach((t) => t.removeEventListener("click", onTrigger));
      window.removeEventListener("keydown", onKeyDown);
      emitter.off("SiteCart.toggle", onTrigger);
      emitter.off("SiteNav.open", close);
      container.removeEventListener("transitionend", onCloseCompleted);
      body.classList.remove(OPENED_CLASS);
    };
  }, []);

  return (
    <div
      ref={elRef}
      className="site-cart position-fixed z-6000 t-0 l-0 w-100 vh-100 pointer-events-none overflow-hidden"
      id="site-cart"
      data-site-cart=""
      data-ui="site-cart"
      aria-hidden="true"
    >
      <div
        className="site-cart__backdrop position-absolute t-0 r-0 h-100 w-100 bg-color-burgundy"
        aria-controls="site-cart"
        aria-expanded="false"
      />
      <div
        ref={containerRef}
        className="site-cart__container position-absolute t-0 r-0 h-100 w-100 bg-color-pale-yellow d-flex flex-column"
      >
        <div className="ta-center site-cart__empty ff-heading fz-lg-32 m-0 tt-uppercase">Your cart is empty.</div>
      </div>
    </div>
  );
}
