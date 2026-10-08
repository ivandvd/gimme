# SiteNav Specification (full-screen menu overlay)

## Overview
- **Target file:** `src/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/SiteNav.tsx`
- **Source markup:** `docs/research/cobfoods-com-3b75ee17/root-8a5edab2/markup/site-nav.jsx.txt`
  (root `div#shopify-section-site-nav` > `div#site-nav.site-nav.position-fixed.z-7000[data-site-nav][aria-hidden="true"]`)
- **Original JS:** `raw/js/646132-site-header.js` + `raw/js/651085-concatthisx.js` (class `Dl` SiteNav, `Ll` decoration item)
- **Screenshots:** `desktop/menu-opening-400ms.png` (mid-animation: yellow bg wiping up with scallop top edge, links sliding),
  `desktop/menu-open.png`, `desktop/menu-open-hover.png` (flowers moved with the mouse), `desktop/menu-closed.png`
- **Interaction model:** click-driven (MENU trigger / Esc) + mouse-follow raf for decorations.

## DOM Structure
Port the markup verbatim: `.site-nav__bg`, top scallop `.site-nav__scallopTop color-yellow`, bottom scallop `.site-nav__scallopBottom color-primary`
(use `<Scallop scrollDriven={false} ref=…>` with the exact classes from the markup: `--orientation-up --position-top --animation-left site-nav__scallopTop color-yellow`
and `… site-nav__scallopBottom color-primary`; keep their wrapper elements, e.g. `.site-nav__bottomDecoration`),
`.site-nav__decorationItems` with 4 `.site-nav__decorationItemWrap[data-traction]` (blue flowers), the menu link list
("Products", "Merch", "Our Story", "Contact", "FAQ" — huge Obviously links), "MY ACCOUNT" link, email `WHATSPOPPIN@COBFOODS.COM`,
social buttons (`.btn --social`, behavior "social", icons TikTok/Facebook/Instagram via `shared/icons`, iconClass `--icon-tiktok` etc.),
and whatever else the markup contains (small-screen header copies, etc.).

## States & Behaviors (port of `Dl`)
State `opened` (React state or ref). Triggers: every element `[aria-controls="site-nav"]` in the document (the header MENU button lives in
SiteHeader — attach click listeners via `document.querySelectorAll('[aria-controls="site-nav"]')` in an effect) and emitter event `"SiteNav.toggle"`.
- **open():** remember `scrollY`; start both scallops; on `.site-nav__bg` `transitionend` (open completed) stop the top scallop;
  `document.body.classList.add("--js-site-nav-opened")`, remove `--js-site-nav-closing`;
  `document.documentElement.classList.add("--js-scrollbar-hidden")`; emit `"SiteScroll.stop"` and `"SiteNav.open"`;
  triggers `aria-expanded="true"` + class `is-active`; `#site-nav` `aria-hidden="false"`;
  on non-touch: listen `mousemove` (store clientX/Y) and run a raf loop updating decoration items while opened.
- **close():** triggers `aria-expanded="false"`, remove `is-active`; start top scallop; body remove `--js-site-nav-opened`, add `--js-site-nav-closing`;
  `window.scrollTo({top: savedY, behavior: "auto"})`; emit `"SiteNav.close"`; stop mouse tracking/raf;
  on `.site-nav__bg` `transitionend` (close completed): remove `--js-site-nav-closing`, stop both scallops, emit `"SiteScroll.start"`,
  `aria-hidden="true"`, remove `html.--js-scrollbar-hidden`.
- Escape closes. Listen to `"SiteCart.open"` → close.
- **Decoration item (`Ll`):** on init read `getBoundingClientRect()` → x = rect.left, y = rect.top; traction = `data-traction` (default .5).
  Each raf: `x = lerp(x, mouseX*traction, .1)`, `y = lerp(y, mouseY*traction, .1)`;
  `el.style.transform = translate3d(${x}px, ${y}px, 0)`.
- All visual open/close choreography (bg wipe, link slide-in stagger, alert bar turning burgundy, MENU→CLOSE letters) is CSS in site.css keyed on
  `body.--js-site-nav-opened` / `--js-site-nav-closing`.

## Computed Styles (verification, 1440px, open)
- Panel bg yellow #ffde17; links Obviously ~96px bold burgundy; "MY ACCOUNT" Subtil Grotesk 24px; email underlined 24px.
- Blue flowers rgb(141,198,239)-ish (`color-blue`). Bottom burgundy scallop band.

## Text Content (verbatim)
From markup: MY ACCOUNT, Products, Merch, Our Story, Contact, FAQ, WHATSPOPPIN@COBFOODS.COM.

## Responsive Behavior
CSS-driven; on mobile links are smaller and stacked under the logo. Keep markup identical.
