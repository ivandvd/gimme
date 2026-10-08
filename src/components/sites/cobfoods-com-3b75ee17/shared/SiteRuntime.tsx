"use client";

import { useEffect, useState } from "react";
import { applyModuleDelays, siteScroll } from "./site-scroll";

/**
 * Page boot sequence of the theme:
 *   1. a full-screen pale-yellow `.site-loader` covers the page while fonts load;
 *   2. `[data-module-delay]` elements visible in the first viewport get a 350ms stagger;
 *   3. the loader fades out (opacity 1 → 0, 250ms linear) and is removed;
 *   4. the scroll engine starts, revealing everything in view (is-inview + scroll calls).
 */
export function SiteRuntime() {
  const [loaderState, setLoaderState] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    let cancelled = false;
    siteScroll.init();
    const boot = async () => {
      try {
        await document.fonts?.ready;
      } catch {
        // fonts API unavailable: continue
      }
      if (cancelled) return;
      applyModuleDelays(350, 0);
      setLoaderState("fading");
      window.setTimeout(() => {
        if (cancelled) return;
        setLoaderState("gone");
        siteScroll.update();
        siteScroll.start();
      }, 250);
    };
    boot();
    return () => {
      cancelled = true;
      siteScroll.destroy();
    };
  }, []);

  if (loaderState === "gone") return null;
  return (
    <div
      className="site-loader d-flex justify-content-center align-items-center position-fixed t-0 l-0 w-100 vh-100 min-vh-100 z-10000 bg-color-pale-yellow overflow-hidden"
      aria-hidden="true"
      data-site-loader=""
      style={{ opacity: loaderState === "fading" ? 0 : 1, transition: "opacity 250ms linear" }}
    >
      <div className="site-loader__logo" />
    </div>
  );
}
