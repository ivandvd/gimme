"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { AccountIcon, SearchIcon } from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";

const TICKER_CLASS = "--js-ticker";

function AlertContent() {
  return (
    <>
      <span className="site-alert__text">Try our new corn free chips</span> <span>-</span>{" "}
      <a href="/products/tortilla-chip-6-pack" className="site-alert__cta td-underline">
        SHOP NOW
      </a>
    </>
  );
}

/**
 * Port of the theme's SiteAlert module: when the alert text is wider than its wrap,
 * a copy of the text is appended to the wrap and `.site-alert` gets `--js-ticker`
 * (the CSS `tickerText` animation then scrolls both copies).
 */
export function SiteAlert() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const [ticker, setTicker] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const wrap = wrapRef.current;
      const text = textRef.current;
      if (!wrap || !text) return;
      const wrapWidth = wrap.getBoundingClientRect().width;
      setTicker(text.getBoundingClientRect().width > wrapWidth);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="site-alert__container position-fixed t-0 l-0 w-100 h-100 z-9000 pointer-events-none">
      <div
        className={`site-alert position-relative ta-center tt-uppercase fz-14 fz-lg-15 overflow-hidden pointer-events-all${
          ticker ? ` ${TICKER_CLASS}` : ""
        }`}
        data-ui="site-alert"
        data-site-alert=""
      >
        <div
          className="site-alert__bg position-absolute bg-color-yellow t-0 l-0 w-100 h-100 pointer-events-none"
          aria-hidden="true"
        />
        <div
          ref={wrapRef}
          className="site-alert__wrap d-flex flex-nowrap justify-content-center d-lg-grid position-relative h-100"
        >
          <aside ref={textRef} className="site-alert__alert">
            <AlertContent />
          </aside>
          <nav className="site-alert__nav d-none d-lg-flex justify-content-end ml-auto">
            <Btn
              href="/search"
              className="fz-14 tt-uppercase fw-700 ff-heading --link --link-no-underline"
              style={{ "--index": "1" } as CSSProperties}
              aria-label="Search"
              emptyBg={false}
              label="Search"
              icon={<SearchIcon />}
              iconClass="--icon-search"
            />{" "}
            <Btn
              href="/a/account/login"
              className="fz-14 tt-uppercase fw-700 ff-heading ml-30 --link --link-no-underline"
              style={{ "--index": "1" } as CSSProperties}
              aria-label="Account & Subscriptions"
              emptyBg={false}
              label="Account & Subscriptions"
              icon={<AccountIcon />}
              iconClass="--icon-account"
            />
          </nav>
          {ticker && (
            <aside className="site-alert__alert" aria-hidden="true">
              <AlertContent />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
