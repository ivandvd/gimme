"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useRef, type CSSProperties } from "react";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { Scallop, type ScallopHandle } from "@/components/sites/cobfoods-com-3b75ee17/shared/Scallop";
import { emitter } from "@/components/sites/cobfoods-com-3b75ee17/shared/emitter";
import { isTouchDevice, lerp } from "@/components/sites/cobfoods-com-3b75ee17/shared/device";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";

/**
 * Port of the theme's "site-nav" section and its SiteNav module (`Dl`) with the mouse-following
 * decoration items (`Ll`). The whole open/close choreography (yellow wipe, link stagger, header
 * color swap, MENU -> CLOSE) is CSS in site.css keyed on the body classes set here.
 *
 * Triggers: the `SiteNav.toggle` emitter event (SiteHeader emits it on MENU click) is the single
 * toggle path; Escape and `SiteCart.open` close. Every `[aria-controls="site-nav"]` element
 * mirrors the state through aria-expanded / is-active.
 */

const OPENED = "--js-site-nav-opened";
const CLOSING = "--js-site-nav-closing";
const SCROLLBAR_HIDDEN = "--js-scrollbar-hidden";

const FLOWER_D = "M101.536 47.009C101.538 44.6503 101.075 42.3144 100.173 40.1348C99.2706 37.9552 97.9476 35.9746 96.2794 34.3061C94.6112 32.6377 92.6303 31.3142 90.4501 30.4112C88.2698 29.5081 85.9328 29.0434 83.5727 29.0434C83.4822 29.0434 83.3916 29.0434 83.3054 29.0434C84.8581 27.029 85.9648 24.7078 86.552 22.2336C87.1391 19.7594 87.1934 17.1888 86.7113 14.692C86.2291 12.1953 85.2215 9.8295 83.7552 7.75141C82.2889 5.67332 80.3974 3.93041 78.2061 2.6382C76.0148 1.34598 73.5737 0.533974 71.0446 0.255989C68.5155 -0.0219967 65.9562 0.240392 63.5363 1.02576C61.1163 1.81113 58.891 3.10154 57.0079 4.81147C55.1247 6.52141 53.6267 8.61181 52.6131 10.9441C51.5896 8.59592 50.0751 6.49382 48.1713 4.7791C46.2675 3.06437 44.0185 1.77674 41.5754 1.00271C39.1324 0.228676 36.5519 -0.0138162 34.0073 0.291523C31.4627 0.596862 29.013 1.44295 26.8227 2.77296C24.6324 4.10296 22.7524 5.88607 21.3088 8.00246C19.8653 10.1189 18.8917 12.5195 18.4535 15.0431C18.0153 17.5667 18.1226 20.1549 18.7683 22.6336C19.414 25.1123 20.583 27.4242 22.1968 29.414C19.574 28.8773 16.8644 28.9332 14.266 29.5775C11.6676 30.2218 9.2461 31.4382 7.17853 33.1379C5.11095 34.8376 3.44955 36.9776 2.31578 39.4014C1.18201 41.8252 0.604534 44.4715 0.625554 47.147C0.646574 49.8225 1.26557 52.4595 2.43728 54.8652C3.60899 57.2709 5.30381 59.3845 7.39783 61.0516C9.49186 62.7186 11.9322 63.8969 14.5404 64.5004C17.1486 65.1038 19.8587 65.1171 22.4728 64.5394C20.7997 66.5036 19.5699 68.8052 18.8672 71.2873C18.1645 73.7694 18.0055 76.3738 18.4008 78.9229C18.7962 81.472 19.7367 83.906 21.1583 86.059C22.5799 88.2121 24.4491 90.0336 26.6387 91.3994C28.8283 92.7653 31.2868 93.6434 33.8466 93.974C36.4064 94.3046 39.0074 94.0798 41.4725 93.3151C43.9375 92.5503 46.2087 91.2635 48.1312 89.5423C50.0537 87.8211 51.5824 85.706 52.6131 83.341C53.6377 85.682 55.1505 87.7774 57.0505 89.487C58.9506 91.1967 61.1939 92.4812 63.6306 93.2547C66.0673 94.0282 68.6412 94.2728 71.1801 93.9722C73.719 93.6716 76.1644 92.8327 78.3528 91.5116C80.5412 90.1905 82.4221 88.4176 83.8698 86.3116C85.3175 84.2056 86.2986 81.8149 86.7474 79.2995C87.1963 76.784 87.1026 74.2018 86.4725 71.7255C85.8425 69.2491 84.6907 66.9358 83.0941 64.9401C83.2536 64.9401 83.4089 64.9617 83.5727 64.9617C88.337 64.9617 92.906 63.0702 96.2748 59.7035C99.6436 56.3367 101.536 51.7703 101.536 47.009Z";

const cssVars = (vars: Record<string, string>) => vars as CSSProperties;

const MENU = [
  { href: "/collections/all", label: "Products" },
  { href: "/collections/branded-merch", label: "Merch" },
  { href: "/pages/our-story", label: "Our Story" },
  { href: "/pages/contact", label: "Contact" },
  { href: "/pages/faq", label: "FAQ" },
];

const SOCIAL_COLORS = "color-pink color-green color-purple";

interface DecorationItem {
  el: HTMLElement;
  x: number;
  y: number;
  traction: number;
}

function DecorationFlower({ traction, index }: { traction: string; index: string }) {
  return (
    <div
      className="site-nav__decorationItemWrap position-absolute"
      data-traction={traction}
      style={cssVars({ "--index": index })}
    >
      <figure className="site-nav__decorationItem color-blue">
        <svg width="102" height="95" viewBox="0 0 102 95" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={FLOWER_D} fill="currentColor" />
        </svg>
      </figure>
    </div>
  );
}

export function SiteNav() {
  const navRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const scallopTopRef = useRef<ScallopHandle>(null);
  const scallopBottomRef = useRef<ScallopHandle>(null);

  useEffect(() => {
    const el = navRef.current;
    const bg = bgRef.current;
    if (!el || !bg) return;
    const body = document.body;
    const html = document.documentElement;
    const touch = isTouchDevice();

    let opened = false;
    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let raf = 0;

    // Ll.init: start from the item's current viewport position.
    const items: DecorationItem[] = Array.from(
      el.querySelectorAll<HTMLElement>(".site-nav__decorationItemWrap"),
    ).map((item) => {
      const rect = item.getBoundingClientRect();
      const t = item.getAttribute("data-traction");
      return { el: item, x: rect.left, y: rect.top, traction: t ? parseFloat(t) : 0.5 };
    });

    // Queried on demand: the MENU button is rendered by SiteHeader.
    const triggers = () => Array.from(document.querySelectorAll<HTMLElement>(`[aria-controls="${el.id}"]`));

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onRaf = () => {
      if (!opened) return;
      raf = requestAnimationFrame(onRaf);
      items.forEach((item) => {
        item.x = lerp(item.x, mouseX * item.traction, 0.1);
        item.y = lerp(item.y, mouseY * item.traction, 0.1);
        item.el.style.transform = `translate3d(${item.x}px,${item.y}px,0)`;
      });
    };

    const onOpenCompleted = () => {
      bg.removeEventListener("transitionend", onOpenCompleted);
      scallopTopRef.current?.stop();
    };

    const onCloseCompleted = () => {
      if (opened) return;
      body.classList.remove(CLOSING);
      scallopTopRef.current?.stop();
      scallopBottomRef.current?.stop();
      emitter.emit("SiteScroll.start");
      el.setAttribute("aria-hidden", "true");
      html.classList.remove(SCROLLBAR_HIDDEN);
    };

    const open = () => {
      if (opened) return;
      opened = true;
      scrollY = window.scrollY;
      scallopTopRef.current?.start();
      scallopBottomRef.current?.start();
      bg.removeEventListener("transitionend", onOpenCompleted);
      bg.removeEventListener("transitionend", onCloseCompleted);
      bg.addEventListener("transitionend", onOpenCompleted);
      body.classList.add(OPENED);
      body.classList.remove(CLOSING);
      html.classList.add(SCROLLBAR_HIDDEN);
      emitter.emit("SiteScroll.stop", true);
      emitter.emit("SiteNav.open");
      triggers().forEach((t) => {
        t.setAttribute("aria-expanded", "true");
        t.classList.add("is-active");
      });
      el.setAttribute("aria-hidden", "false");
      if (!touch) {
        window.addEventListener("mousemove", onMouseMove);
        raf = requestAnimationFrame(onRaf);
      }
    };

    const close = () => {
      if (!opened) return;
      opened = false;
      triggers().forEach((t) => {
        t.setAttribute("aria-expanded", "false");
        t.classList.remove("is-active");
      });
      bg.removeEventListener("transitionend", onOpenCompleted);
      bg.removeEventListener("transitionend", onCloseCompleted);
      bg.addEventListener("transitionend", onCloseCompleted);
      scallopTopRef.current?.start();
      body.classList.remove(OPENED);
      body.classList.add(CLOSING);
      window.scrollTo({ top: scrollY, behavior: "auto" });
      emitter.emit("SiteNav.close");
      if (!touch) {
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onToggle = (e?: unknown) => {
      if (e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (opened) close();
      else open();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (opened && (e.key === "Escape" || e.key === "Esc")) close();
    };

    window.addEventListener("keydown", onKeyDown);
    emitter.on("SiteNav.toggle", onToggle);
    emitter.on("SiteCart.open", close);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousemove", onMouseMove);
      emitter.off("SiteNav.toggle", onToggle);
      emitter.off("SiteCart.open", close);
      bg.removeEventListener("transitionend", onOpenCompleted);
      bg.removeEventListener("transitionend", onCloseCompleted);
      cancelAnimationFrame(raf);
      body.classList.remove(OPENED, CLOSING);
      html.classList.remove(SCROLLBAR_HIDDEN);
    };
  }, []);

  return (
    <div id="shopify-section-site-nav" className="shopify-section section-nav">
      <div
        ref={navRef}
        id="site-nav"
        className="site-nav position-fixed z-7000 t-0 l-0 w-100 vh-100 overflow-hidden"
        aria-hidden="true"
        data-ui="site-nav"
        data-site-nav=""
      >
        <div
          ref={bgRef}
          className="site-nav__bg position-absolute t-0 l-0 w-100 h-100 bg-color-yellow"
          aria-hidden="true"
        >
          <Scallop
            ref={scallopTopRef}
            className="--orientation-up --position-top --animation-left site-nav__scallopTop color-yellow"
            animation="left"
            scrollDriven={false}
          />
        </div>
        <div className="site-nav__decorationItems position-absolute t-0 w-100 l-0 h-100 position-events-none">
          <DecorationFlower traction="0.5" index="3" />
          <DecorationFlower traction="0.25" index="1" />
          <DecorationFlower traction="0.25" index="4" />
          <DecorationFlower traction="0.125" index="2" />
        </div>
        <div className="site-nav__bottomDecoration position-absolute b-0 l-0 w-100">
          <Scallop
            ref={scallopBottomRef}
            className="--orientation-up --position-top --animation-left site-nav__scallopBottom color-primary"
            animation="left"
            scrollDriven={false}
          />
        </div>
        <div
          className="site-nav__wrap d-grid grid-column-lg-2 align-items-start grid-gap-40 grid-gap-lg-20 grid-gap-xl-0 container-fluid position-relative w-100 h-lg-100"
          style={cssVars({ "--menu-length": "5" })}
        >
          <a href="/" className="site-nav__logoWrap d-block overflow-hidden">
            <figure className="site-nav__logo">
              <svg width="432" height="345" viewBox="0 0 432 345" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_42_1029)">
                  <path d="M214.248 86.9202C185.824 86.9202 161.914 127.533 154.927 182.651C146.692 228.03 128.869 244.416 115.4 250.185C86.7995 259.746 56.5559 237.746 51.8436 162.021C43.4996 27.659 93.0098 23.6751 93.0098 23.6751C93.0098 23.6751 119.29 19.5274 121.043 60.6952C123.676 122.661 74.6194 132.368 74.6194 132.368C74.6194 132.368 93.5274 154.299 129.418 148.758C150.015 145.571 170.662 126.426 166.331 79.6719C158.745 -2.20386 95.9062 0.0043191 95.9062 0.0043191C36.513 1.33833 0 66.0403 0 169.06C0 260.215 31.996 345.009 83.4038 345.009C129.387 345.009 151.096 294.963 156.244 258.334C164.588 308.79 187.404 345.009 214.248 345.009C248.155 345.009 275.643 287.236 275.643 215.969C275.643 144.702 248.155 86.9202 214.248 86.9202ZM214.248 228.294C200.37 228.294 189.12 204.646 189.12 175.48C189.12 146.313 200.37 122.665 214.248 122.665C228.126 122.665 239.38 146.309 239.38 175.48C239.38 204.65 228.126 228.294 214.248 228.294Z" fill="currentColor" />
                  <path d="M370.605 86.9205C348.36 85.459 333.665 101.9 330.46 110.373V17.7202H284.241V345H330.46V298.856C338.482 327.061 351.715 345 370.605 345C404.512 345 432 287.228 432 215.96C432 144.693 404.998 89.1834 370.605 86.9205ZM357.222 228.294C342.436 228.294 330.437 204.646 330.437 175.48C330.437 146.314 342.422 122.666 357.222 122.666C372.021 122.666 384.006 146.309 384.006 175.48C384.006 204.651 372.021 228.294 357.222 228.294Z" fill="currentColor" />
                </g>
                <defs>
                  <clipPath id="clip0_42_1029">
                    <rect width="432" height="345" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </figure>
          </a>
          <nav className="site-nav__topMenuMobile d-grid grid-gap-20 d-lg-none">
            <a
              href="/search"
              className="btn fz-24 tt-uppercase ff-heading --link --link-no-underline"
              style={cssVars({ "--index": "1" })}
              aria-label="Search"
            >
              <span className="btn__label" aria-hidden="true">
                Search
              </span>{" "}
              <span className="btn__icon --icon-search d-inline-block" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
                  <line x1="12.0587" y1="12.7226" x2="18.4226" y2="19.0865" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </a>{" "}
            <a
              href="/a/account/login"
              className="btn fz-24 tt-uppercase ff-heading --link --link-no-underline"
              style={cssVars({ "--index": "0" })}
              aria-label="Account & Subscriptions"
            >
              <span className="btn__label" aria-hidden="true">
                Account &amp; Subscriptions
              </span>{" "}
              <span className="btn__icon --icon-account d-inline-block" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.238 3.55423C10.1872 2.91061 10.6687 2.3477 11.3134 2.29686C11.3193 2.29639 11.325 2.29672 11.3309 2.29636C11.1647 2.11195 11.0549 1.87436 11.0339 1.60799C10.9831 0.964423 11.4646 0.401461 12.1093 0.350616C12.5867 0.312957 13.0192 0.567143 13.2324 0.962763C13.3809 0.538615 13.7681 0.219778 14.2456 0.18212C14.8903 0.131274 15.454 0.611795 15.5048 1.25536C15.5266 1.5318 15.4497 1.79301 15.3044 2.00552C15.3783 1.98441 15.4554 1.97017 15.535 1.96389C16.1797 1.91304 16.7435 2.39357 16.7942 3.03713C16.845 3.6807 16.3635 4.24361 15.7188 4.29445C15.6328 4.30124 15.5484 4.29791 15.4664 4.28667C15.6542 4.47607 15.7789 4.72985 15.8015 5.01641C15.8523 5.65997 15.3708 6.22288 14.7261 6.27373C14.2486 6.31139 13.8162 6.0572 13.603 5.66158C13.4545 6.08573 13.0672 6.40457 12.5898 6.44222C11.9451 6.49307 11.3813 6.01255 11.3306 5.36904C11.3089 5.09451 11.3848 4.83515 11.5281 4.62347C11.5177 4.62455 11.5077 4.62664 11.4973 4.62746C10.8526 4.67831 10.2888 4.19779 10.2381 3.55427L10.238 3.55423Z" fill="currentColor" />
                  <path d="M1.238 3.55423C1.18724 2.91061 1.66872 2.3477 2.31338 2.29686C2.31928 2.29639 2.32503 2.29672 2.33089 2.29636C2.16471 2.11195 2.05488 1.87436 2.03387 1.60799C1.98312 0.964423 2.4646 0.401461 3.10926 0.350616C3.58673 0.312957 4.01918 0.567143 4.23236 0.962763C4.38088 0.538615 4.76814 0.219778 5.24561 0.18212C5.89027 0.131274 6.45405 0.611795 6.50481 1.25536C6.52661 1.5318 6.44972 1.79301 6.30439 2.00552C6.37831 1.98441 6.45537 1.97017 6.53503 1.96389C7.17969 1.91304 7.74347 2.39357 7.79423 3.03713C7.84499 3.6807 7.3635 4.24361 6.71884 4.29445C6.63282 4.30124 6.54844 4.29791 6.46635 4.28667C6.65421 4.47607 6.7789 4.72985 6.8015 5.01641C6.85226 5.65997 6.37077 6.22288 5.72611 6.27373C5.24864 6.31139 4.81619 6.0572 4.60301 5.66158C4.45449 6.08573 4.06723 6.40457 3.58976 6.44222C2.9451 6.49307 2.38132 6.01255 2.33056 5.36904C2.30891 5.09451 2.38475 4.83515 2.52812 4.62347C2.51774 4.62455 2.5077 4.62664 2.49725 4.62746C1.85259 4.67831 1.28876 4.19774 1.238 3.55423Z" fill="currentColor" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M2 9.89249C3.04577 18.1192 14.9622 18.1192 16.008 9.89248L17 10.0186C15.8061 19.4105 2.20187 19.4105 1.00798 10.0186L2 9.89249Z" fill="currentColor" stroke="currentColor" />
                </svg>
              </span>
            </a>
          </nav>
          <nav className="site-nav__nav mr-xl-auto ml-xl-auto order-lg-2 mt-lg-40" role="navigation">
            <header className="site-nav__topMenu d-none d-lg-block mb-40">
              <div className="site-nav__accountWrap overflow-hidden">
                <a href="/a/account/login" className="site-nav__account fz-lg-24 tt-uppercase d-inline-block">
                  My account
                </a>
              </div>
            </header>
            <ul
              className="site-nav__menu ff-heading fz-54 fz-md-96 fz-xl-110 fz-xxl-128 menu list-none m-0 p-0"
              style={cssVars({ "--length": "5" })}
            >
              {MENU.map((item, i) => (
                <li key={item.href} className="menu-item" style={cssVars({ "--index": String(i + 1) })}>
                  <a href={item.href}>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <footer className="site-nav__bottomMenu order-lg-1">
            <div className="site-nav__emailWrap overflow-hidden">
              <a
                href="mailto:WHATSPOPPIN@COBFOODS.COM"
                className="btn site-nav__email fz-lg-24 d-inline-block --link"
                aria-label="WHATSPOPPIN@COBFOODS.COM"
              >
                <span className="btn__label" aria-hidden="true">
                  WHATSPOPPIN@COBFOODS.COM
                </span>
              </a>
            </div>
            <nav className="site-nav__socialLinks d-flex align-items-center mt-20 p-10">
              <Btn
                href="https://www.tiktok.com/@cobfoods?_t=8mO5aTClJVq&_r=1"
                className=" --social"
                behavior="social"
                emptyBg={false}
                style={cssVars({ "--index": "1" })}
                target="_blank"
                aria-label="tiktok"
                data-social-colors={SOCIAL_COLORS}
                icon={<TikTokIcon />}
                iconClass="--icon-tiktok"
              />{" "}
              <Btn
                href="https://www.facebook.com/cobfoods"
                className=" --social"
                behavior="social"
                emptyBg={false}
                style={cssVars({ "--index": "2" })}
                target="_blank"
                aria-label="facebook"
                data-social-colors={SOCIAL_COLORS}
                icon={<FacebookIcon />}
                iconClass="--icon-facebook"
              />{" "}
              <Btn
                href="https://www.instagram.com/cobfoods/"
                className=" --social"
                behavior="social"
                emptyBg={false}
                style={cssVars({ "--index": "3" })}
                target="_blank"
                aria-label="instagram"
                data-social-colors={SOCIAL_COLORS}
                icon={<InstagramIcon />}
                iconClass="--icon-instagram"
              />
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
