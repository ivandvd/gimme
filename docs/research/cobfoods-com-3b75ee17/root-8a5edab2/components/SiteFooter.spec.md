# SiteFooter Specification (footer + site video modal)

## Overview
- **Target files:** `src/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/SiteFooter.tsx` (export `SiteFooter`),
  `.../SiteVideo.tsx` (export `SiteVideo`)
- **Source markup:** `docs/research/cobfoods-com-3b75ee17/root-8a5edab2/markup/site-footer.jsx.txt` (root `div#shopify-section-site-footer`),
  `markup/site-video.jsx.txt` (root `div.site-video …`)
- **Original JS:** `raw/js/663745-anon.js` (SiteFooter: body class + SiteVideo tail), `raw/js/660469-site-video__bg.js` (SiteVideo `Zl`),
  `raw/js/624468-anon.js` (svg-animated: SMIL pause/unpause on scroll call)
- **Screenshots:** `desktop/d-12000.png` (footer top: pink panel, rotating badge), `desktop/d-12800.png` (full footer), mobile `m-08400.png`
- **Interaction model:** scroll calls (scallop, svg-animated, site-footer) + hover (links, socials sparkles).

## DOM Structure
Port 1:1: `footer.site-footer.position-relative[data-scroll][data-scroll-call="site-footer"…]` (check exact attributes), the animated
`svg.corn-free-foods-animated` badge ("SORGHUM SUPERGRAIN" text on a circular path `#sorghum-text-path` — keep `xlinkHref`, `<textPath>`, any
`<animateTransform>` SMIL elements exactly; the converter emitted correct camelCase), giant Cob logo svg, two link columns
(Our Story, Shop, Merch, Find Us in Store, FAQ, Wholesale / Instagram, Account & Subscriptions, Blog, Contact, Shipping and returns),
burgundy band with `<Scallop>` (port classes/color/animation from the markup), email link WHATSPOPPIN@COBFOODS.COM, social `Btn`s
(behavior "social", icons + iconClass `--icon-tiktok|--icon-facebook|--icon-instagram`), legal links (Privacy Policy, Terms of services),
"Web by MILL3", "We accept" + 10 payment card svgs (copy verbatim from markup).

## States & Behaviors
- Footer in view → `document.body.classList.add("--js-site-footer-visible")`, removed on exit (`useScrollCall(footerRef, "site-footer", …)`).
- svg-animated: element with `data-scroll-call="svg-animated"` — on enter `svg.unpauseAnimations()`, on exit / initially `svg.pauseAnimations()`.
- Scallop: animated while in view (Scallop handles it).
- SiteVideo modal (port of `Zl`): listens `emitter` `"SiteVideo.play"` (url) / `"SiteVideo.stop"`, Esc, close button, and clicks on `[data-site-video-url]`.
  play(url): if already open just swap src & play; else emit `"SiteScroll.stop"` + `"Video.pauseAll"`, remove `--js-animate-out`, `aria-hidden="false"`, set src + load,
  next frame add `--js-animate-in`; when the close button's `transform` transition ends → `video.play()`.
  close(): pause, emit `"Video.resumeAll"` + `"SiteScroll.start"`, add `--js-animate-out`; when `.site-video__bg` opacity transition ends → `aria-hidden="true"`,
  remove both classes. (No element on this page currently opens it, but keep it functional.)

## Computed Styles (verification, 1440px)
Footer pink #ef98c1 with top-rounded corners; links Subtil Grotesk 24px/30px uppercase burgundy; email 24px pink on burgundy; legal 12px pink; "WE ACCEPT" 14px uppercase;
footer height ~789px.

## Responsive Behavior
CSS-driven (columns stack on mobile).
